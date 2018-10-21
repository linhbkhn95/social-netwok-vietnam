/**
 * FeelpostController
 *
 * @description :: Server-side logic for managing feelposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getlist_option: function(req, res) {
    try {
      Feel_post.find({}).exec((err, list) => {
        if (err) {
        }
        return res.send(OutputInterface.success(list));
      });
    } catch (error) {}
  },
  getlist_option_police_post: function(req, res) {
    try {
      Police_post.find({}).exec((err, list) => {
        if (err) {
        }
        return res.send(OutputInterface.success(list));
      });
    } catch (error) {}
  }
};
