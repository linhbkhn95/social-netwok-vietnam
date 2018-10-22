/**
 * FollowsController
 *
 * @description :: Server-side logic for managing follows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  accessFollow: async function(req, res) {
    let { username } = req.body;
    let userPatner = await User.findOne({ username });
    Follows.findOne({
      userId_follow: req.session.user.id,
      userId: userPatner.id
    }).exec((err, follow) => {
      if (err) {
      }
      console.log("hiihi", follow);
      if (follow) {
        follow.status = follow.status == 1 ? 0 : 1;
        follow.save({});
        return res.send(OutputInterface.success(follow));
      } else {
        Follows.create({
          userId_follow: req.session.user.id,
          userId: userPatner.id,
          status: 1
        }).exec((err, followuser) => {
          if (err) {
          }
          return res.send(OutputInterface.success(followuser));
        });
      }
    });
  }
};
