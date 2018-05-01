/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    postStatus:function(req,res){
        let data = req.body
        Post.create(data).exec(async function(err,post){
            if(err){

            }
            if(post){
                 let subject  = await Subject.findOne({id:data.subject})
                 post.subject  = subject;
                 post.userLikePost = false
                
                 Post.publishCreate(post);

                 return res.send(OutputInterface.success(post))
            }
        })
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
                    console.log('postdel',postdel)
                    // Post.publishDestroy(postdel);
                    return res.send(OutputInterface.success(postdel))
            }

            return res.send(OutputInterface.errServer('không có phần tử để  xóa '))
        });
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
        let listsubject = req.body.listsubject||[]
        let result  = listsubject.map((item)=>{
            console.log(item,item.value)
            return item.value
            
        })
        let dataQuery = {};
        
        if(listsubject.length>0)
            dataQuery.subject=result
        console.log('dataqery',dataQuery,listsubject)
          Post.find({where:{sort:"createdAt DESC"}}).where(dataQuery).exec(function(err,list){
                    if(err){
                
                    }
                
                    Promise.all(list.map((item)=>{
                        
                        return new Promise(async(resolve,reject)=>{
                       
                            
                            let userId = req.session.user?req.session.user.id:''
                            item.userLikePost = false

                            let likePost = await LikePost.findOne({postId:item.id,userId});
                            if(likePost)
                               item.userLikePost = likePost.like?true:false
                          
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

