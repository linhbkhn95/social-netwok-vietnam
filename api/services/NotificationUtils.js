module.exports = {
   
    //thông báo những người comment bài đăng đến ng đăng bài và ng comment bài
    notifiPostUser_Comment:async function(postId,data,req){
        let post = await Post.findOne({id:postId});
        let datanotifi ={
            userId:req.session.user.id,
            url_ref:'/post.notifi.'+postId,
            text:' đã bình luận bài đăng '+post.title+ ' của',
            type:'comment',
            time:Date.now(),
            data:data
             }
        let notifi = await Notification.create(
datanotifi
     )
         notifi.user_notifi = req.session.user;
         let listUserComment= await Comment.find({postId,groupBy:'userId_comment',userId_comment:{'!':[req.session.user.id,post.userId_post]}}).sum();
         console.log('listusser',listUserComment)
         if(post.userId_post!=req.session.user.id)
             listUserComment.push({userId_comment:post.userId_post})

          listUserComment.forEach(user => {
            //tăng sô thông báo tưng user
            User.findOne({id:user.userId_comment}).exec((err,user)=>{
                if(!user.number_notifi)
                    user.number_notifi = 1;
               else
                   user.number_notifi +=1;
                user.save({});
            })
            //tạo thông báo
            Ref_notification_user.create({notificationId:notifi.id,userId:user.userId_comment,readNotifi:false,status:true}).exec({})

            //đồng bộ thông báo điến các user
            sails.sockets.broadcast('NotificationUser',"notifi_user"+user.userId_comment,notifi,req);

         });
    },
    notifiPostUser_Like:function(postId,req){

    },
   
    like: "like"

}
