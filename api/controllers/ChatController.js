/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require("moment");
module.exports = {
  add: function(req, res) {
    let body = req.body;
    body.userId_sent = req.session.user.id;
    body.time = Date.now();
    Chat.create(body).exec(async (err, chat) => {
      if (err) {
        return res.send(OutputInterface.errServer(err));
      }
      if (chat) {
        let message = {
          data: chat,
          user: req.session.user
        };
        let user_patner = await User.findOne({ id: chat.userId_rec });
        let key_chat =
          chat.userId_sent > chat.userId_rec
            ? chat.userId_sent + "_" + chat.userId_rec
            : chat.userId_rec + "_" + chat.userId_sent;
        Chat_new_user.findOne({ key_chat }).exec(async (err, chat_new_user) => {
          if (chat_new_user) {
            let chatnew = await Chat_new_user.update(
              { key_chat },
              {
                time: moment().format(),
                id_message_new: chat.id,
                know_message: false
              }
            );
            console.log("update", chatnew, chat_new_user);
          } else {
            let chatnew = await Chat_new_user.create({
              key_chat,
              time: moment().format(),
              id_message_new: chat.id,
              know_message: false
            });
            console.log("create", chatnew, chat_new_user);
          }
        });

        sails.sockets.broadcast(
          "ChatUser",
          "chatuser" + chat.userId_rec,
          message,
          req
        );

        message.user = user_patner;
        return res.send(OutputInterface.success(message));
      }
      return res.send(OutputInterface.errServer("no tao dc message"));
    });
  },
  //hàm này để update ng dùng đã biết nhưng chưa xem
  updateKnowMessage: function(req, res) {
    let { userId_patner } = req.body;
    let id =
      userId_patner > req.session.user.id
        ? userId_patner + "_" + req.session.user.id
        : req.session.user.id + "_" + userId_patner;

    Chat_new_user.update({ key_chat: id }, { know_message: true }).exec(
      async (err, chat_new_user) => {
        if (err) {
        }
        let message = await Chat.update(
          { id: chat_new_user.id_message_new },
          { read_message: true }
        );
        return res.send(OutputInterface.success(chat));
      }
    );
  },
  reset_all_know_message: async function(req, res) {
    let userId = req.session.user.id;

    await Chat.query("call webandanh.reset_all_know_message(?)", [userId]);

    return res.send(OutputInterface.success("ok"));
  },
  updateStatusListMessage: function(req, res) {
    let { userId_patner } = req.body;
    Chat.update(
      { userId_rec: req.session.user.id, read_message: false },
      { read_message: true }
    ).exec((err, list) => {
      if (err) {
      }
      return res.send(OutputInterface.success(list));
    });
  },
  getlist_message_user: function(req, res) {
    let userId = req.session.user.id;
    Chat.query("call webandanh.getlist_message_user(?)", [userId], function(
      err,
      [data, server_status]
    ) {
      if (err) {
        return res.send(OutputInterface.errServer("Lỗi hệ thống"));
      }
      Promise.all(
        data.map(item => {
          return new Promise(async resolve => {
            let userId_patner =
              item.userId_sent == userId ? item.userId_rec : item.userId_sent;
            let user = await User.findOne({ id: userId_patner });
            let datachat = {
              data: item,
              user
            };
            resolve(datachat);
          });
        })
      ).then(async response => {
        Chat.query("call webandanh.get_count_wait_user(?)", [userId], function(
          err,
          [count, server_status]
        ) {
          let data = {
            list_message_user: response,
            count_wait_user: count[0].count
          };
          return res.send(OutputInterface.success(data));
        });
      });
      // console.log('data menu',data,server_status)
    });
  },
  getlist_user: function(req, res) {
    let userId_patner = req.body.userId_patner;
    // let userPatner =
    Chat.find({
      or: [
        {
          userId_sent: req.session.user.id,
          userId_rec: userId_patner
        },
        {
          userId_rec: req.session.user.id,
          userId_sent: userId_patner
        }
      ]
    }).exec((err, listchat) => {
      let id =
        userId_patner > req.session.user.id
          ? userId_patner + "_" + req.session.user.id
          : req.session.user.id + "_" + userId_patner;

      return res.send(OutputInterface.success({ listchat, id }));
    });
  }
};
