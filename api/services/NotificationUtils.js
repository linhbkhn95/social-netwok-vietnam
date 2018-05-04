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
         Ref_notification_user.create({notificationId:notifi.id,userId:post.userId_post,readNotifi:false,status:true}).exec({})

         sails.sockets.broadcast('NotificationUser',"notifi_user"+post.userId_post,notifi,req);

         listUserComment.forEach(user => {
            Ref_notification_user.create({notificationId:notifi.id,userId:user.userId_comment,readNotifi:false,status:true}).exec({})

            sails.sockets.broadcast('NotificationUser',"notifi_user"+user.userId_comment,notifi,req);

         });
    },
    notifiPostUser_Like:function(postId,req){

    },
   
    like: "like"

}
