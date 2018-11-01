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
  }
};
