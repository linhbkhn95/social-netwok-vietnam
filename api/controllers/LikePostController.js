/**
 * LikePostController
 *
 * @description :: Server-side logic for managing likeposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
      accessLike: async function(req,res){
          let {postId,userId} = req.body;
           
          Likepost.findOne({postId,userId}).exec(async (err,likePost)=>{
                if(err){
                    return res.send(OutputInterface.errServer('Lỗi hệ thống'))
                }
              let post = await Post.findOne({id:postId});
              let user = await User.findOne({id:userId})
              let userLike = {
                id:user.id,
                fullname:user.fullname,
                username:user.username,
                url_avatar:user.url_avatar
              }
              let verSocket = {

              }
              
              if(likePost){
                     if(likePost.status)
                        post.countLike -=1
                    else
                        post.countLike +=1
                     await post.save({})

                    likePost.status = !likePost.status
                    likePost.save(function(){
                        if(likePost.status)
                             NotificationUtils.notifiPostUser_Like(post,req)

                        sails.sockets.broadcast('Subscribe_Status',postId+TypeSocket.like,UtilsSocket.getData(userLike,TypeSocket.like,likePost.status?VerbSocket.like:VerbSocket.unlike),req);

                      return res.send(OutputInterface.success({countLike:post.countLike,like:likePost.like}))
                    })
              }
              else{

                   post.countLike +=1
                    await post.save({})
                   Likepost.create({postId,userId,status:true}).exec((err,result)=>{

                        sails.sockets.broadcast('Subscribe_Status',postId+TypeSocket.like,UtilsSocket.getData(userLike,TypeSocket.like,VerbSocket.like),req);
                        NotificationUtils.notifiPostUser_Like(post,req)
                         return res.send(OutputInterface.success({countLike:post.countLike,like:1}))
                  })
              }

          })
        
      },

      //lay danh sach user like post
      getlist_LikeFormatPost:function(req,res){
          let {postId} = req.body
          let status = true;
          Likepost.find({postId,status}).exec((err,list)=>{
            
            if(err){

            }
            let listUser={}
                Promise.all(list.map((item)=>{
                            
                    return new Promise(async(resolve,reject)=>{
                        

                        let user  = await User.findOne({id:item.userId});
                        let userLike = {
                            id:user.id,
                            fullname:user.fullname,
                            username:user.username,
                            url_avatar:user.url_avatar
                        }
                        listUser[user.id] = userLike
                        resolve(user.id)
                    })
            }))
            .then((response)=>{
                return res.send(OutputInterface.success({listUserId:response,listUser}))
                 })
          })

      }
};

