module.exports = {
  //thông báo những người comment bài đăng đến ng đăng bài và ng comment bài
  notifiPostUser_Comment: async function(post_id, data, req) {
    let post = await Post.findOne({ id: post_id });
    // let datanotifi = {
    //   userId: req.session.user.id,
    //   url_ref: "/post.notifi." + postId,
    //   text: " đã bình luận bài đăng " + post.title + " của",
    //   type: "comment",
    //   time: Date.now(),
    //   data: data,
    //   incognito: req.session.user.incognito
    // };
    // let notifi = await Notification.create(datanotifi);
    // notifi.user_notifi = req.session.user;

    // let listIdPostRef = [];
    // listIdPostRef[0] = req.session.user.id;
    // listIdPostRef[1] = post.userId_post;
    // if (post.userId_wall) listIdPostRef[2] = post.userId_wall;

    // let listUserComment = await Comment.find({
    //   postId,
    //   groupBy: "userId_comment",
    //   userId_comment: { "!": listIdPostRef }
    // }).sum();
    // console.log("lisst", listUserComment);
    // if (post.userId_post != req.session.user.id)
    //   listUserComment.push({ userId_comment: post.userId_post });
    // if (post.userId_wall)
    //   listUserComment.push({ userId_comment: post.userId_wall });
    // console.log("list", listUserComment);
    // listUserComment.forEach(user => {
    //   //tăng sô thông báo tưng user

    //   User.findOne({ id: user.userId_comment }).exec((err, user) => {
    //     if (!user.number_notifi) user.number_notifi = 1;
    //     else user.number_notifi += 1;
    //     user.save({});
    //   });
    //   //tạo thông báo
    //   Ref_notification_user.create({
    //     notificationId: notifi.id,
    //     userId: user.userId_comment,
    //     readNotifi: false,
    //     status: true
    //   }).exec({});

    //   //đồng bộ thông báo điến các user
    //   sails.sockets.broadcast(
    //     "NotificationUser",
    //     "notifi_user" + user.userId_comment,
    //     notifi,
    //     req
    //   );
    // });
    let listFollow_Post = await Follow_post.find({
      post_id,
      status: 1,
      user_id: { "!": [req.session.user.id] }
    });
    let listTagUser = await Tag_post.find({ post_id });
    let datanotifi = {
      userId: req.session.user.id,
      url_ref: "/post.notifi." + post_id,
      text: " đã bình luận bài đăng bạn đang theo dõi",
      type: "comment",
      time: Date.now(),
      data: data,
      incognito: req.session.user.incognito
    };
    let notifi = await Notification.create(datanotifi);
    notifi.user_notifi = req.session.user;

    let listDataInsert = [];

    //duyệt trên danh sác1h follow bài viết để gửi notify
    listFollow_Post.forEach(follow_post => {
      User.findOne({ id: follow_post.user_id }).exec((err, user) => {
        if (!user.number_notifi) user.number_notifi = 1;
        else user.number_notifi += 1;
        user.save({});
      });
      let dataInsert = {
        notificationId: notifi.id,
        userId: follow_post.user_id,
        readNotifi: false,
        status: true
      };
      listDataInsert.push(dataInsert);

      //đồng bộ thông báo điến các user
      //gender data notify theo use
      let user_tag = listTagUser.filter(
        tag => tag.user_id == follow_post.user_id
      );
      if (user_tag && user_tag.length > 0) {
        notifi.text = "đã bình luận bài đăng bạn đang được gắn thẻ";
        notifi.type = "tag";
      } else if (follow_post.user_id == post.userId_post) {
        notifi.text = "đã bình luận bài về  bài đăng của bạn";
        notifi.type = "mypost";
      } else if (follow_post.user_id == post.userId_wall) {
        notifi.text = "đã bình luận bài về  bài đăng trên tường của bạn";
        notifi.type = "tag";
      }

      sails.sockets.broadcast(
        "NotificationUser",
        "notifi_user" + follow_post.user_id,
        notifi,
        req
      );
    });

    //insert listdataNotifi ref
    //tao ref nhung thong bao cho user
    Ref_notification_user.create(listDataInsert).exec(() => {});
    //check user do da follow den bai post chua neu chua thi insert con khong thi update
    let follow_post = await Follow_post.findOne({
      post_id,
      user_id: req.session.user.id
    });
    if (follow_post) {
      follow_post.status = 1;
      follow_post.save(() => {});
    } else {
      await Follow_post.findOne({
        post_id,
        user_id: req.session.user.id,
        status: 1
      });
    }
  },
  follow_post: async function(post_id, data) {
    let listFollow_Post = await Follow_post.find({ post_id, status: 1 });
    let datanotifi = {
      userId: req.session.user.id,
      url_ref: "/post.notifi." + postId,
      text: " đã bình luận bài đăng  của",
      type: "comment",
      time: Date.now(),
      data: data,
      incognito: req.session.user.incognito
    };
    let notifi = await Notification.create(datanotifi);
    notifi.user_notifi = req.session.user;

    let listDataInsert = [];

    //duyệt trên danh sách follow bài viết để gửi notify
    listFollow_Post.forEach(follow_post => {
      User.findOne({ id: user.follow_post.user_id }).exec((err, user) => {
        if (!user.number_notifi) user.number_notifi = 1;
        else user.number_notifi += 1;
        user.save({});
      });
      let dataInsert = {
        notificationId: notifi.id,
        userId: follow_post.user_id,
        readNotifi: false,
        status: true
      };
      listDataInsert.push(dataInsert);
      //đồng bộ thông báo điến các user
      sails.sockets.broadcast(
        "NotificationUser",
        "notifi_user" + follow_post.user_id,
        notifi,
        req
      );
    });

    //insert listdataNotifi ref
    Ref_notification_user.create(listDataInsert).exec(() => {});
  },
  //thông báo like bài viết
  notifiPostUser_Like: async function(post, req) {
    let title = post.text ? post.text : "";
    if (post.text && post.text.length > 10) title = post.text.substring(0, 10);

    let datanotifi = {
      userId: req.session.user.id,
      url_ref: "/post.notifi." + post.id,
      text: " đã thích bài đăng " + title + " của",
      type: "like",
      time: Date.now(),
      data: post,
      incognito: req.session.user.incognito
    };
    let notifi = await Notification.create(datanotifi);
    notifi.user_notifi = req.session.user;
    Ref_notification_user.create({
      notificationId: notifi.id,
      userId: post.userId_post,
      readNotifi: false,
      status: true
    }).exec({});

    
    sails.sockets.broadcast(
      "NotificationUser",
      "notifi_user" + post.userId_post,
      notifi,
      req
    );
  },
  //thông báo tag bài viết lúc tạo bài viết
  tagPost: async function(post_id, listTag, req) {
    let datanotifi = {
      userId: req.session.user.id,
      url_ref: "/post.notifi." + post_id,
      text: "Đã gắn thẻ bạn vào 1 bài viết",
      type: "tag_post",
      time: Date.now()
      // data:post
    };

    let notifi = await Notification.create(datanotifi);
    let listDataInsert = [];
    for (var i = 0; i < listTag.length; i++) {
      notifi.user_notifi = req.session.user;
      User.findOne({ id: listTag[i].id }).exec((err, user) => {
        if (!user.number_notifi) user.number_notifi = 1;
        else user.number_notifi += 1;
        user.save({});
      });
      let dataInsert = {
        notificationId: notifi.id,
        userId: listTag[i].id,
        readNotifi: false,
        status: true
      };
      sails.sockets.broadcast(
        "NotificationUser",
        "notifi_user" + listTag[i].id,
        notifi,
        req
      );
      listDataInsert[i] = dataInsert;
    }
    Ref_notification_user.create(listDataInsert).exec({});
  },
  postToFriend: async function(post, req) {
    let listfriend = await Friends.find({
      or: [
        { userId_one: req.session.user.id, status: 1 },
        { userId_two: req.session.user.id, status: 1 }
      ]
    });
    if (post.userWall) {
      let datanotifi = {
        userId: req.session.user.id,
        url_ref: "/post.notifi." + post.id,
        text: "Đã đăng lên tường của bạn",
        type: "friend",
        time: Date.now(),
        data: post,
        incognito: req.session.user.incognito
      };
      let notifi = await Notification.create(datanotifi);
      notifi.user_notifi = req.session.user;
      User.findOne({ id: post.userWall.id }).exec((err, user) => {
        if (!user.number_notifi) user.number_notifi = 1;
        else user.number_notifi += 1;
        user.save({});
      });
      Ref_notification_user.create({
        notificationId: notifi.id,
        userId: post.userWall.id,
        readNotifi: false,
        status: true
      }).exec({});
      sails.sockets.broadcast(
        "NotificationUser",
        "notifi_user" + post.userWall.id,
        notifi,
        req
      );
    }
    if (post.police && post.police.id != 3) {
      for (var i = 0; i < listfriend.length; i++) {
        let userIdPatner =
          listfriend[i].userId_one == req.session.user.id
            ? listfriend[i].userId_two
            : listfriend[i].userId_one;

        sails.sockets.broadcast(
          "Subscribe_Status",
          "post" + userIdPatner,
          post,
          req
        );
      }
    }
  },
  notifiAccessFriend: async function(statusFriend, userFriend, req) {
    // let post = await Post.findOne({id:postId});
    let datanotifi = {
      userId: req.session.user.id,
      url_ref: "",
      text:
        statusFriend == 0
          ? " đã yêu gửi yêu cầu kết bạn đến "
          : " đã đồng ý kết bạn với ",
      type: "friend",
      time: Date.now(),
      data: userFriend,
      incognito: req.session.user.incognito
    };
    let notifi = await Notification.create(datanotifi);
    notifi.user_notifi = req.session.user;
    User.findOne({ id: userFriend.id }).exec((err, user) => {
      if (!user.number_notifi) user.number_notifi = 1;
      else user.number_notifi += 1;
      user.save({});
    });

    Ref_notification_user.create({
      notificationId: notifi.id,
      userId: userFriend.id,
      readNotifi: false,
      status: true
    }).exec({});
    sails.sockets.broadcast(
      "NotificationUser",
      "notifi_user" + userFriend.id,
      notifi,
      req
    );
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
    console.log("notifiCommentUser_Like", datanotifi);
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
  },
  // thông báo về  yêu cầu,đồng ý,từ chối tham gia nhóm
  notifiGroup: async function(data, req) {
    let datanotifi = {
      userId: req.session.user.id,
      url_ref:
        data.status == 0
          ? "/groups/" + data.group_id + "/requestJoin"
          : "/groups/" + data.group_id,
      text:
        data.status == 0
          ? " đã yêu cầu được vào nhóm "
          : " đã chấp nhận bạn vào nhóm",
      type: "group",
      time: Date.now(),
      data: data,
      incognito: req.session.user.incognito
    };

    let user_id_admin_group;
    let user = req.session.user;
    let { group_id } = data;

    let notifi = await Notification.create(datanotifi);
    notifi.user_notifi = req.session.user;
    //yeu cau vao nhóm
    if (data.status == 0) {
      let group = await Group.findOne({ id: group_id });
      let group_member_admin = await Group_member.find({ group_id, role: 1 }); //lay danh sach thanh vien admin


      let listDataInsert = [];

      //duyệt trên danh sác1h member admin group  để gửi notify
      group_member_admin.forEach(merber_admin => {
        User.findOne({ id: merber_admin.user_id }).exec((err, user) => {
          if (!user.number_notifi) user.number_notifi = 1;
          else user.number_notifi += 1;
          user.save({});
        });
        let dataInsert = {
          notificationId: notifi.id,
          userId: merber_admin.user_id,
          readNotifi: false,
          status: true
        };
        listDataInsert.push(dataInsert);

        //đồng bộ thông báo điến các user
        //gender data notify theo use

        sails.sockets.broadcast(
          "NotificationUser",
          "notifi_user" + merber_admin.user_id,
          notifi,
          req
        );
      });
      Ref_notification_user.create(listDataInsert).exec(() => {});
    } else {
      sails.sockets.broadcast(
        "NotificationUser",
        "notifi_user" + data.user_id,
        notifi,
        req
      );
    }
  },
  like: "like"
};
