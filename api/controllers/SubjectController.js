/**
 * SubjectController
 *
 * @description :: Server-side logic for managing subjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: async function(req, res) {
    let data = req.body;
    let subjectExits = await Subject.findOne({ subjectname: data.subjectname });
    if (subjectExits) {
      return res.send(OutputInterface.errServer("Chủ đề  đã tồn tại"));
    }
    Subject.create(req.body).exec((err, subject) => {
      return res.send(OutputInterface.success(subject));
    });
  },
  getall: function(req, res) {
    Subject.find().exec((err, list) => {
      if (err) return res.send([]);
      let result = list.map(item => {
        return {
          value: item.id,
          label: item.subjectname
        };
      });
      res.send(result);
    });
  }
};
