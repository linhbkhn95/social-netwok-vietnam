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
  getInfo: function(req, res) {
    console.log("groupgetinfoadadadadada");
    let { groupname } = req.body;
    Group.findOne({ id: 1 }).exec(async (err, group) => {
      if (err) {
        console.log("ddadadad errr", err);
        return res.send(OutputInterface.errServer("Lỗi hệ thống"));
      }
      if (group) {
        return res.send(OutputInterface.success(group));
      } else {
        return res.send(OutputInterface.errServer("group ko tồn tại"));
      }
    });
  },
  join: function(req, res) {
    console.log("joinGroup", req.body);
    let { group_id, status, user_id } = req.body;

    user_id = user_id || req.session.user.id;
    status = status || 0; //mac dinh la yeu cau vao nhom
    let data = {
      user_id,
      group_id,
      status
    };
    Group_member.create(data).exec((err, group_member) => {
      if (err) {
        console.log("err", err);
        return res.send(OutputInterface.errServer(err));
      }
      if (group_member) {
        return res.send(OutputInterface.success(group_member));
      }
    });
  },
  leave: async function(req, res) {
    console.log("leave", req.body);
    let { group_id, status, user_id } = req.body;

    let group_member = await Group_member.findOne({ group_id, user_id });
    group_member.status = status || -1;
    group_member.save({});
    return res.send(OutputInterface.success(group_member));
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
            console.log("firneadda", friend);

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
