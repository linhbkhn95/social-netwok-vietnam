/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var FileUploadController = require('./FileUploadController')

module.exports = {

    postStatus:async function(req,res){
        let {data,urls_file} = req.body

        data.userId_post = req.session.user.id;

        data.incognito = req.session.user.incognito //ẩn danh hay k
        let userWall;
        if(data.username&&data.username!=req.session.user.username){
            userWall = await User.findOne({username:data.username})
            data.userId_wall = userWall.id
        }

        console.log('datapost',data)
        Post.create(data).exec(async function(err,post){
            if(err){

            }
            if(post){
                 if(urls_file&&urls_file.length>0)
                    FileUploadController.postFile(post.id,urls_file).then((data)=>{

                  })
                  Elasticsearch.add('post','post',post)

                 let subject  = await Subject.findOne({id:data.subject})
                 post.subject  = subject;
                 post.userLikePost = false
                 let userPost = await User.findOne({id:post.userId_post,select:['fullname','username','url_avatar','id']});
                 post.userPost = userPost
                 post.userWall = userWall
                 Post.publishCreate(post);
                 NotificationUtils.postToFriend(post,req);
                 Elasticsearch.add('post','post',post)

                 return res.send(OutputInterface.success(post))
            }
        })
    },

    //cập nhật post
    updatePost:function(req,res){
        let id = req.body.idPost;
        let {data} = req.body ;
        let dataUpdate = {
        }
        if(data.content)
             dataUpdate.content = data.content
        if(data.content)
             dataUpdate.feeli = data.content
        if(data.file){

        }





    },
    deletePost:function(req,res){
        let id = req.body.idPost;
        Post.destroy({id:id}).exec(async(err,postdel)=>{
            if(err){
                return res.send(OutputInterface.errServer('Lỗi hệ thống'))
            }
             if(err){
                return res.send(OutputInterface.errServer('Lỗi hệ thống'))
            }

            await Comment.destroy({postId:id})
            if(postdel.length>0){
                    // Post.publishDestroy(postdel);
                    return res.send(OutputInterface.success(postdel))
            }

            return res.send(OutputInterface.errServer('không có phần tử để  xóa '))
        });
    },
    getListPost_username:async function(req,res){
        if (!req.isSocket) {
            sails.log.debug('no socket');
            return res.badRequest();
        }
        let username = req.body.username
        if (req.isSocket) {
            // If this code is running, it's made it past the `isAdmin` policy, so we can safely
            // watch for `.publishCreate()` calls about this model and inform this socket, since we're
            // confident it belongs to a logged-in administrator.
            sails.log.debug('is socket');
            //để  đăng kí sự kiện lăng nghe model Command thay đổi kích hoạt sự kiện on('command') bên phía client
            // Post.watch(req);
        }

        let pagesize = req.body.pagesize||10
        let page = req.body.page||1


        let listsubject = req.body.listsubject||[]
        let result  = listsubject.map((item)=>{
            return item.value

        })
        let dataQuery = {};
        let userId_post
        if(username){
            let user = await User.findOne({username});
            if(user)
                userId_post = user.id
        }
        if(userId_post)
            dataQuery.userId_post = userId_post
        if(listsubject.length>0)
            dataQuery.subject=result
          Post.find({where:{sort:"createdAt DESC"}}).where(dataQuery).paginate({ limit: pagesize, page: page }).exec(function(err,list){
                    if(err){

                    }

                    Promise.all(list.map((item)=>{

                        return new Promise(async(resolve,reject)=>{

                            if(item.userId_wall){
                                let userWall = await User.findOne({id:item.userId_wall,select:['fullname','username','url_avatar']});
                                item.userWall = userWall

                            }
                            let userId = req.session.user?req.session.user.id:''
                            item.userLikePost = false
                            let userPost = await User.findOne({id:item.userId_post,select:['fullname','username','url_avatar']});
                            item.userPost = userPost
                            let likePost = await Likepost.findOne({postId:item.id,userId});
                            if(likePost)
                               item.userLikePost = likePost.status?true:false

                            let subjectId = item.subject
                            let subject
                            subject = await Subject.findOne({id : subjectId})
                            if(subject){
                                    item.subject = subject;
                            }


                            else{
                                item.subject = {
                                    subjectId,
                                    subjectname:"Chưa rõ"
                                }
                            }
                            resolve(item)
                        })
                }))
                .then((response)=>{
                    return res.send(OutputInterface.success(response))
                })
                    // res.send({DT:listPost})
                })
    },
    getDetail:function(req,res){
        if (!req.isSocket) {
            sails.log.debug('no socket');
            return res.badRequest();
        }
        if (req.isSocket) {
            // If this code is running, it's made it past the `isAdmin` policy, so we can safely
            // watch for `.publishCreate()` calls about this model and inform this socket, since we're
            // confident it belongs to a logged-in administrator.
            sails.log.debug('is socket');
            //để  đăng kí sự kiện lăng nghe model Command thay đổi kích hoạt sự kiện on('command') bên phía client
        }
        let postId = req.body.postId


          Post.findOne({id:postId}).exec(async function(err,item){
                    if(err){

                    }

                            if(item.userId_wall){
                                let userWall = await User.findOne({id:item.userId_wall,select:['fullname','username','url_avatar']});
                                item.userWall = userWall

                            }
                            let userId = req.session.user?req.session.user.id:''
                            item.userLikePost = false

                            let likePost = await Likepost.findOne({postId:item.id,userId});
                            if(likePost)
                               item.userLikePost = likePost.status?true:false

                            let userPost = await User.findOne({id:item.userId_post,select:['fullname','username','url_avatar']})
                            item.userPost = userPost


                            let subjectId = item.subject
                            let subject
                            subject = await Subject.findOne({id : subjectId})
                            if(subject){
                                    item.subject = subject;
                            }


                            else{
                                item.subject = {
                                    subjectId,
                                    subjectname:"Chưa rõ"
                                }
                            }
                            return res.send(OutputInterface.success(item))
                    // res.send({DT:listPost})
                })
    },
    //lấy danh sách bài đăng trên tường
    getList_Wall:async function(req,res){
        if (!req.isSocket) {
            sails.log.debug('no socket');
            return res.badRequest();
        }
        if (req.isSocket) {
            // If this code is running, it's made it past the `isAdmin` policy, so we can safely
            // watch for `.publishCreate()` calls about this model and inform this socket, since we're
            // confident it belongs to a logged-in administrator.
            sails.log.debug('is socket');
            //để  đăng kí sự kiện lăng nghe model Command thay đổi kích hoạt sự kiện on('command') bên phía client
            // Post.watch(req);
        }

        let pagesize = req.body.pagesize||10
        let page = req.body.page||1
        let listsubject = req.body.listsubject||[]
        let result  = listsubject.map((item)=>{
            return item.value

        })
        let dataQuery = {};

        if(listsubject.length>0)
            dataQuery.subject=result

        //lấy danh id bạn bè
        let listfriend = await Friends.find({ or:[ {userId_one:req.session.user.id,status:1},{userId_two:req.session.user.id,status:1}   ]});
       let listIdFriend =  listfriend.map((friend)=>{
           return(friend.userId_one==req.session.user.id?friend.userId_two:friend.userId_one)
       })

        listIdFriend[listIdFriend.length] = req.session.user.id
       dataQuery.userId_post = listIdFriend;
       console.log('datqẻy',dataQuery,pagesize,page)
        Post.find({where:{sort:"createdAt DESC"}}).where(dataQuery).paginate({ limit: pagesize, page: page }).exec(function(err,list){
                    if(err){

                    }

                    Promise.all(list.map((item)=>{

                        return new Promise(async(resolve,reject)=>{

                            if(item.userId_wall){
                                let userWall = await User.findOne({id:item.userId_wall,select:['fullname','username','url_avatar']});
                                item.userWall = userWall

                            }
                            let userId = req.session.user?req.session.user.id:''
                            item.userLikePost = false
                            let userPost = await User.findOne({id:item.userId_post,select:['fullname','username','url_avatar']});
                            item.userPost = userPost
                            let likePost = await Likepost.findOne({postId:item.id,userId});
                            if(likePost)
                               item.userLikePost = likePost.status?true:false

                            if(item.type_post==2){
                               item.postParent = await Post.findOne({id:item.postId_parent})

                            }
                            let subjectId = item.subject
                            let subject
                            subject = await Subject.findOne({id : subjectId})
                            if(subject){
                                    item.subject = subject;
                            }


                            else{
                                item.subject = {
                                    subjectId,
                                    subjectname:"Chưa rõ"
                                }
                            }
                            resolve(item)
                        })
                }))
                .then((response)=>{
                    return res.send(OutputInterface.success(response))
                })
                    // res.send({DT:listPost})
                })
    },
    getListPost:function(req,res){
        if (!req.isSocket) {
            sails.log.debug('no socket');
            return res.badRequest();
        }
        if (req.isSocket) {
            // If this code is running, it's made it past the `isAdmin` policy, so we can safely
            // watch for `.publishCreate()` calls about this model and inform this socket, since we're
            // confident it belongs to a logged-in administrator.
            sails.log.debug('is socket');
            //để  đăng kí sự kiện lăng nghe model Command thay đổi kích hoạt sự kiện on('command') bên phía client
            Post.watch(req);
        }

        let pagesize = req.body.pagesize||10
        let page = req.body.page||1
        let listsubject = req.body.listsubject||[]
        let result  = listsubject.map((item)=>{
            return item.value

        })
        let dataQuery = {};

        if(listsubject.length>0)
            dataQuery.subject=result

            console.log('datqẻy',dataQuery,pagesize,page)

          Post.find({where:{sort:"createdAt DESC"}}).where(dataQuery).paginate({ limit: pagesize, page: page }).exec(function(err,list){
                    if(err){

                    }

                    Promise.all(list.map((item)=>{

                        return new Promise(async(resolve,reject)=>{

                            if(item.userId_wall){
                                let userWall = await User.findOne({id:item.userId_wall,select:['fullname','username','url_avatar']});
                                item.userWall = userWall

                            }
                            let userId = req.session.user?req.session.user.id:''
                            item.userLikePost = false

                            let likePost = await Likepost.findOne({postId:item.id,userId});
                            if(likePost)
                               item.userLikePost = likePost.status?true:false


                            let userPost = await User.findOne({id:item.userId_post,select:['fullname','username','url_avatar']});
                            item.userPost = userPost


                            let subjectId = item.subject
                            let subject
                            subject = await Subject.findOne({id : subjectId})
                            if(subject){
                                    item.subject = subject;
                            }


                            else{
                                item.subject = {
                                    subjectId,
                                    subjectname:"Chưa rõ"
                                }
                            }
                            resolve(item)
                        })
                }))
                .then((response)=>{
                    return res.send(OutputInterface.success(response))
                })
                    // res.send({DT:listPost})
                })
    }
};

