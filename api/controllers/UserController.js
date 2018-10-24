/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, { err: "Password doesn't match, What a shame!" });
    }
    console.log(req.body);
    User.create(req.body).exec(function(err, user) {
      if (err) {
        return res.json(err.status, { err: err });
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, { user: user, token: jwToken.issue({ id: user.id }) });
      }
    });
  },
  getInfo: function(req, res) {
    let { username } = req.body;
    User.findOne({ username }).exec(async (err, user) => {
      if (err) {
        console.log(err);
        return res.send(OutputInterface.errServer("Lỗi hệ thống"));
      }
      if (user) {
        let userId = user.id;
        let countPost = await Post.count({ userId_post: userId });
        let countFollow = await Follows.count({ userId, status: 1 });
        let countFriend = await Friends.count({
          or: [
            { userId_one: userId, status: 1 },
            { userId_two: userId, status: 1 }
          ]
        });
        let follow = await Follows.findOne({
          userId_follow: req.session.user.id,
          userId: user.id
        });

        let info = {
          user,
          countPost,
          countFollow,
          countFriend,
          follow,
          isMe: user.id == req.session.user.id
        };
        return res.send(OutputInterface.success(info));
      } else {
        return res.send(OutputInterface.errServer("User ko tồn tại"));
      }
    });
  },
  getIncognito: function(req, res) {
    return res.send(OutputInterface.success(req.session.user.incognito));
  },
  accessBehide: function(req, res) {
    let incognito = req.session.user.incognito;

    User.findOne({ id: req.session.user.id }).exec((err, user) => {
      if (err) {
      }
      if (user) {
        user.incognito = !incognito;
        req.session.user = user;
        user.save({});
        return res.send(OutputInterface.success(user));
      }
    });
  },
  getListFollows: async function(req, res) {
    let username = req.body.username;
    if (username) {
      let user = await User.findOne({ username });
      Follows.find({ userId: user.id, status: 1 }).exec((err, list) => {
        if (err) {
          return res.send(OutputInterface.errServer(err));
        }

        console.log("follow", username, list);

        Promise.all(
          list.map(item => {
            return new Promise(async (resolve, reject) => {
              let user = await User.findOne({
                id: item.userId_follow,
                select: ["id", "fullname", "username", "url_avatar"]
              });
              let countFriend = await Friends.count({
                or: [
                  { userId_one: item.userId_follow, status: 1 },
                  { userId_two: item.userId_follow, status: 1 }
                ]
              });
              let data = {
                user,
                countFriend
              };
              resolve(data);
            });
          })
        ).then(response => {
          return res.send(OutputInterface.success(response));
        });
        // res.send({DT:listPost})
      });
    }
  },
  updateProfile: function(req, res) {
    let data = req.body;
    User.update({ username: data.username }, data).exec((err, listupdate) => {
      if (err) {
        return res.send(OutputInterface.errServer(err));
      }
      if (listupdate.length > 0) {
        req.session.user = listupdate[0];
        return res.send(OutputInterface.success(listupdate[0]));
      } else {
        return res.send(OutputInterface.errServer("not update"));
      }
    });
  },

  updateCover: async function(req, res) {
    sails.log.info("req.headers", req.headers);
    let file = req.file("file");

    let data = {};

    req.file("file").upload(
      {
        // don't allow the total upload size to exceed ~100MB
        maxBytes: 100000000,
        // set the directory
        dirname: "../../assets/images/user"
      },
      async function(err, uploadedFile) {
        // if error negotiate
        if (err) return res.negotiate(err);
        //  data.url_image_gobal = uploadedFile[0].fd
        var img = uploadedFile[0].fd.split("/");

        data.url_image = "/images/user/" + img[img.length - 1];
        User.update(
          { id: req.session.user.id },
          { url_cover: data.url_image }
        ).exec((err, gt) => {
          if (err) {
            res.send(OutputInterface.errServer(err));
          }
          res.send(OutputInterface.success(gt));
        });
      }
    );
  },
  updateAvatar: async function(req, res) {
    sails.log.info("req.headers", req.headers);
    let file = req.file("file");

    let data = {};

    req.file("file").upload(
      {
        // don't allow the total upload size to exceed ~100MB
        maxBytes: 100000000,
        // set the directory
        dirname: "../../assets/images/user"
      },
      async function(err, uploadedFile) {
        // if error negotiate
        if (err) return res.negotiate(err);
        console.log("filename", uploadedFile[0]);
        //  data.url_image_gobal = uploadedFile[0].fd
        var img = uploadedFile[0].fd.split("/");

        data.url_image = "/images/user/" + img[img.length - 1];
        User.update(
          { id: req.session.user.id },
          { url_avatar: data.url_image }
        ).exec((err, gt) => {
          if (err) {
            res.send(OutputInterface.errServer(err));
          }
          res.send(OutputInterface.success(gt));
        });
        // logging the filename
        // console.log('filename',uploadedFile[0].filename);
        // console.log('url',uploadedFile[0].fd);
        // send ok response
      }
    );
  },
  getUserId: function(req, res) {
    return res.send({ userId: req.session.user["id"] });
  },
  getListFriends: async function(req, res) {
    let username = req.body.username;

    if (username) {
      let userpage = await User.findOne({ username });
      console.log("userpag", userpage, req.body);
      let userId = userpage.id;
      Friends.find({
        or: [
          { userId_one: userId, status: 1 },
          { userId_two: userId, status: 1 }
        ]
      }).exec((err, list) => {
        if (err) {
        }
        console.log("list", list, err);
        Promise.all(
          list.map(item => {
            return new Promise(async (resolve, reject) => {
              let userIdFriend =
                item.userId_one == userId ? item.userId_two : item.userId_one;
              let user = await User.findOne({
                id: userIdFriend,
                select: [
                  "fullname",
                  "username",
                  "url_avatar",
                  "is_online",
                  "time_offline"
                ]
              });
              let countFriend = await Friends.count({
                or: [
                  { userId_one: userIdFriend, status: 1 },
                  { userId_two: userIdFriend, status: 1 }
                ]
              });
              let data = {
                user,
                countFriend
              };
              resolve(data);
            });
          })
        ).then(response => {
          return res.send(OutputInterface.success(response));
        });
        // res.send({DT:listPost})
      });
    }
  },
  getProfile: function(req, res) {
    User.findOne({ id: req.session.user.id }).exec((err, user) => {
      return res.send(OutputInterface.success(user));
    });
  },
  getListFriends_User: async function(req, res) {
    let username = req.session.user.username;

    if (username) {
      let userpage = await User.findOne({ username });
      console.log("userpag", userpage, req.body);
      let userId = userpage.id;
      Friends.find({
        or: [
          { userId_one: userId, status: 1 },
          { userId_two: userId, status: 1 }
        ]
      }).exec((err, list) => {
        if (err) {
        }
        console.log("list", list, err);
        Promise.all(
          list.map(item => {
            return new Promise(async (resolve, reject) => {
              let userIdFriend =
                item.userId_one == userId ? item.userId_two : item.userId_one;
              let user = await User.findOne({
                id: userIdFriend,
                select: [
                  "fullname",
                  "id",
                  "username",
                  "url_avatar",
                  "is_online",
                  "time_offline"
                ]
              });
              let countFriend = await Friends.count({
                or: [
                  { userId_one: userIdFriend, status: 1 },
                  { userId_two: userIdFriend, status: 1 }
                ]
              });
              let data = {
                user,
                countFriend
              };
              resolve(data);
            });
          })
        ).then(response => {
          return res.send(OutputInterface.success(response));
        });
        // res.send({DT:listPost})
      });
    }
  },
  getlist_friend_general: async function(user_id, patner_id) {
    // let { user_id, patner_id } = req.body;
    return new Promise(async (resolve, reject) => {
      if (user_id && patner_id) {
        let count_user = await Friends.count({
          or: [
            { userId_one: user_id, status: 1 },
            { userId_two: user_id, status: 1 }
          ]
        });
        let count_patner = await Friends.count({
          or: [
            { userId_one: patner_id, status: 1 },
            { userId_two: patner_id, status: 1 }
          ]
        });

        let userId_Friend = count_user > count_patner ? patner_id : user_id;

        User.query("call getlist_friend(?)", [userId_Friend], function(
          err,
          [data, server_status]
        ) {
          if (err) {
            resolve(null);
          }
          let result = [];
          Promise.all(
            data.map(item => {
              return new Promise(async (resolve, reject) => {
                let user_id_other =
                  userId_Friend == user_id ? patner_id : user_id;
                let userId_one =
                  item.id < user_id_other ? item.id : user_id_other;
                let userId_two =
                  item.id > user_id_other ? item.id : user_id_other;

                let friend = await Friends.findOne({ userId_one, userId_two });

                if (friend && friend.status == 1) {
                  result.push(item);
                  resolve(item);
                }
                resolve(item);
              });
            })
          )
            .then(response => {
              resolve(result);
            })
            .catch(e => {
              resolve(e);
            });
          // //loai bo
          // let result = data.filter(item=>item.id!=user_id)
        });
      }
    });
  },
  get_info_user: async function(req, res) {
    let { patner_id } = req.body;
    let user_id = req.session.user.id||1;
    let user = await User.findOne({
      id: patner_id,
      select: [
        "fullname",
        "id",
        "username",
        "url_avatar",
        "is_online",
        "time_offline",
        'url_cover'
      ]
    });
    user.list_friends_general = await this.getlist_friend_general(
      user_id,
      patner_id
    );
    user.work_place_id = null;
    let userId_one = user_id < patner_id ? user_id : patner_id;
    let userId_two = user_id > patner_id ? user_id : patner_id;

    let friend = await Friends.findOne({ userId_one, userId_two });
    let follow = await Follows.findOne({userId_follow:user_id,userId:patner_id,status:1});

    user.friend = friend;
    user.follow = follow;


    return res.send(OutputInterface.success(user));
  }
};
