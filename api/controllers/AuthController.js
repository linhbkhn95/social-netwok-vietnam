/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 
module.exports = {
    'index': function (req, res) {
        var username = req.param('username');
        var password = req.param('password');
        console.log(username + password);

        if (!username || !password) {
          return res.json(401, {err: 'username and password required'});
        }

        User.findOne({username: username}, function (err, user) {
          if (!user) {
           return  res.send(OutputInterface.errServer('Không tìm thấy user'))

          }

          User.comparePassword(password, user, function (err, valid) {
            if (err) {
              res.send(OutputInterface.errServer('Lỗi hệ thống'))

            }

            if (!valid) {
              return res.send(OutputInterface.errServer('Mật khẩu không chính xác'))

            } else {
              return res.send(OutputInterface.success({
                user: user,
                token: jwToken.issue({id : user.id,username:user.fullname })
              }))
            }
          });
        })
      }
};

