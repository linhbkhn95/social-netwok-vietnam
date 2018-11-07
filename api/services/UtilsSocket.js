module.exports = {
  getData: function(data, type, verb) {
    return { data: data, type: type, verb: verb };
  },
  delete: function(data) {
    return "like";
  },
  edit: function(data) {
    return "edit";
  },
  //gui bai post len tường user
  sendPost_toWall: function(post, req) {
    console.log("sendPost_toWall", post);
    let { listUserTag, userPost, userWall } = post;

    if (userWall) {
      sails.sockets.broadcast(
        "Subscribe_Status",
        "wall" + userWall.id,
        post,
        req
      );
    } else {
      sails.sockets.broadcast(
        "Subscribe_Status",
        "wall" + userPost.id,
        post,
        req
      );
    }
    if (post.police && post.police.id != 3)
      for (var i = 0; i < listUserTag.length; i++) {
        sails.sockets.broadcast(
          "Subscribe_Status",
          "wall" + listUserTag[i].id,
          post,
          req
        );
      }
  },
  notifiCommentUser_Like: async function(comment, req) {
    let datanotifi = {
      userId: req.session.user.id,
      url_ref: "/post.notifi." + comment.postId,
      text: " đã thích bình luận ''" + comment.text + "' của bạn",
      type: "like",
      time: Date.now(),
      data: comment,
      incognito: req.session.user.incognito
    };
    let notifi = await Notification.create(datanotifi);
    notifi.user_notifi = req.session.user;
    Ref_notification_user.create({
      notificationId: notifi.id,
      userId: comment.userId_comment,
      readNotifi: false,
      status: true
    }).exec({});
    sails.sockets.broadcast(
      "NotificationUser",
      "notifi_user" + comment.userId_comment,
      notifi,
      req
    );
  }
};
