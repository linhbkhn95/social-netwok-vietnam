/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // _config: {
  //   actions: false,
  //   shortcuts: false,
  //   rest: false
  // }
  //lay thong tin group theo user dang nhap
  getInfo_with_user: async function(req, res) {
    try {
      let user_id = req.session.user.id;
      let { groupname } = req.body;
      let group = await Group.findOne({ id: 1 });
      let count_member = await Group_member.count({
        group_id: groupname,
        status: 1
      });
      let user_group_member = await Group_member.findOne({
        user_id,
        group_id: groupname
      });
      let follow_group = await Follow_group.findOne({ user_id });
      let list_friend = await Friends.find({
        or: [
          { userId_one: user_id, status: 1 },
          { userId_two: user_id, status: 1 }
        ]
      });
      let response = {
        group: {},
        count_member: 0,
        isMember: false,
        role: 3,
        isFollow: false,
        listFriendMember: []
      };
      if (group) {
        response.group = group;
      }
      if (count_member) {
        response.count_member = count_member;
      }
      if (user_group_member) {
        response.isMember = user_group_member.status;
        response.role = user_group_member.role;
      }
      if (follow_group) {
        response.isFollow = follow_group.status;
      }
      if (list_friend && list_friend.length > 0) {
        listFriend_id = list_friend.map(item => {
          let userIdFriend =
            item.userId_one == user_id ? item.userId_two : item.userId_one;
          return userIdFriend;
        });
        listFriendMember = await Group_member.find({
          user_id: listFriend_id,
          status: 1
        }).limit(6);
        if (listFriendMember && listFriendMember.length > 0)
          listFriendMember_id = listFriendMember.map(item => item.user_id);
        let listFriend = await User.find({
          id: listFriendMember_id,
          select: ["id", "fullname", "username", "url_avatar"]
        });
        response.listFriendMember = listFriend;
        return res.send(OutputInterface.success(response));
      } else {
        return res.send(OutputInterface.success(response));
      }

      //lay 5 bạn bè trong group này
    } catch (error) {
      return res.send(OutputInterface.errServer(error.toString()));
    }
  },
  getTopOfUser: async function(req, res) {
    try {
      let user_id = req.session.user.id;
      let listGroupmember = await Group_member.find({ user_id, status: 1 });
      if (listGroupmember && listGroupmember.length > 0) {
        let list_group_id = listGroupmember.map(item => item.group_id);
        let listGroup = await Group.Find({ id: list_group_id });

        return res.send(OutputInterface.success(listGroup))
      }
      else{
        return res.send(OutputInterface.errServer('khong co group'));
      }
    } catch (error) {
      return res.send(OutputInterface.errServer(error.toString()));
    }
  },
  getInfo: function(req, res) {
    let { groupname } = req.body;
    Group.findOne({ id: 1 }).exec(async (err, group) => {
      if (err) {
        return res.send(OutputInterface.errServer("Lỗi hệ thống"));
      }
      if (group) {
        return res.send(OutputInterface.success(group));
      } else {
        return res.send(OutputInterface.errServer("group ko tồn tại"));
      }
    });
  },
  //yeu cau vao nhom
  join: function(req, res) {
    try {
      let { group_id, status, user_id } = req.body;

      user_id = user_id || req.session.user.id;
      status = 0; //mac dinh la yeu cau vao nhom
      let data = {
        user_id,
        group_id,
        status
      };
      Group_member.findOrCreate({ user_id, group_id }, data).exec(
        (err, group_member, wasCreated) => {
          if (err) {
            console.log("err", err);
            return res.send(OutputInterface.errServer(err.toString()));
          }

          if (!wasCreated) {
            //notification
            group_member.status = 0;
            group_member.save(() => {
              NotificationUtils.notifiGroup(group_member, req);
              return res.send(OutputInterface.success(group_member));
            });
          }
        }
      );
    } catch (error) {
      return res.send(OutputInterface.errServer(error.toString()));
    }
  },
  //chap nhan vao nhom
  acceptJoin: async function(req, res) {
    let { group_id, status, user_id } = req.body;
    let group_member = await Group_member.findOne({ group_id, user_id });
    group_member.status = status || 1;
    group_member.save(() => {
      //notification
      NotificationUtils.notifiGroup(group_member, req);
      return res.send(OutputInterface.success(group_member));
    });
  },
  cancelJoin: async function(req, res) {
    let { group_id, user_id } = req.body;
    let group_member = await Group_member.findOne({ group_id, user_id });
    group_member.status = -1;
    group_member.save(() => {
      //notification
      return res.send(OutputInterface.success(group_member));
    });
  },
  //roi khoi nhom
  leave: async function(req, res) {
    console.log("leave", req.body);
    let { group_id, status } = req.body;
    let user_id = req.session.user.id;
    let group_member = await Group_member.findOne({ group_id, user_id });
    group_member.status = status || -1;
    group_member.save({});
    return res.send(OutputInterface.success(group_member));
  },
  //lay danh sach yeu cau tham gia nhom
  getlist_requestJoin: async function(req, res) {
    try {
      let { group_id } = req.body;
      let user_id = 1;
      let member = await Group_member.findOne({
        group_id,
        user_id,
        status: 1,
        role: 1
      });
      let listRequestJoin = await Group_member.find({
        where: { sort: "createdAt DESC" }
      }).where({ group_id, status: 0 });
      //chi admin ms co quyen xem danh sach de phe duyet
      if (member && listRequestJoin && listRequestJoin.length > 0) {
        let list_user_id = listRequestJoin.map(item => item.user_id);

        let listUser = await User.find({
          id: list_user_id,
          select: ["id", "fullname", "username", "url_avatar"]
        });

        return res.send(OutputInterface.success(listUser));
      } else {
        return res.send(OutputInterface.errServer("khong co quyen xem"));
      }
    } catch (error) {
      return res.send(OutputInterface.errServer(error.toString()));
    }
  },
  getlist_memeber: function(req, res) {
    let { group_id } = req.body;
    let user_id = req.session.user.id;
    Group_member.find({ group_id, status: 1 }).exec((err, list) => {
      if (err) {
      }
      Promise.all(
        list.map(item => {
          return new Promise(async (resolve, reject) => {
            let member = await User.findOne({
              id: item.user_id,
              select: ["id", "fullname", "username", "url_avatar"]
            });
            item.member = member;

            let friend = await Friends.findOne({
              userId_one: user_id < item.user_id ? user_id : item.user_id,
              userId_two: user_id > item.user_id ? user_id : item.user_id
            });
            let countFriend = await Friends.count({
              or: [
                { userId_one: item.user_id, status: 1 },
                { userId_two: item.user_id, status: 1 }
              ]
            });
            item.isFriend = -1;
            if (friend) item.isFriend = friend.status;

            item.countFriend = countFriend;
            resolve(item);
          });
        })
      ).then(response => {
        return res.send(OutputInterface.success(response));
      });
    });
  },
  getListPost_groupname: async function(req, res) {
    if (!req.isSocket) {
      sails.log.debug("no socket");
      return res.badRequest();
    }
    let groupname = req.body.groupname;
    if (req.isSocket) {
      // If this code is running, it's made it past the `isAdmin` policy, so we can safely
      // watch for `.publishCreate()` calls about this model and inform this socket, since we're
      // confident it belongs to a logged-in administrator.
      sails.log.debug("is socket");
      //để  đăng kí sự kiện lăng nghe model Command thay đổi kích hoạt sự kiện on('command') bên phía client
      // Post.watch(req);
    }

    let pagesize = req.body.pagesize || 10;
    let page = req.body.page || 1;

    let listsubject = req.body.listsubject || [];
    let result = listsubject.map(item => {
      return item.value;
    });
    let dataQuery = {};
    let userId_post;

    if (listsubject.length > 0) dataQuery.subject = result;
    dataQuery.group_id = groupname;

    Post.find({ where: { sort: "createdAt DESC" } })
      .where(dataQuery)
      .paginate({ limit: pagesize, page: page })
      .exec(function(err, list) {
        if (err) {
        }

        Promise.all(
          list.map(item => {
            return new Promise(async (resolve, reject) => {
              if (item.userId_wall) {
                let userWall = await User.findOne({
                  id: item.userId_wall,
                  select: ["id", "fullname", "username", "url_avatar"]
                });
                item.userWall = userWall;
              }
              let userId = req.session.user ? req.session.user.id : "";
              item.userLikePost = false;
              let userPost = await User.findOne({
                id: item.userId_post,
                select: ["id", "fullname", "username", "url_avatar"]
              });
              item.userPost = userPost;
              let likePost = await Likepost.findOne({
                postId: item.id,
                userId
              });
              if (likePost) item.userLikePost = likePost.status ? true : false;

              let subjectId = item.subject;
              let subject;
              subject = await Subject.findOne({ id: subjectId });
              if (subject) {
                item.subject = subject;
              } else {
                item.subject = {
                  subjectId,
                  subjectname: "Chưa rõ"
                };
              }
              resolve(item);
            });
          })
        ).then(response => {
          return res.send(OutputInterface.success(response));
        });
        // res.send({DT:listPost})
      });
  }
};
