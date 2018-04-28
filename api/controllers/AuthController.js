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
              if(!user.url_avatar)
                 user.url_avatar = '/images/user/me.png'
              req.session.user = user;

              return res.send(OutputInterface.success({
                user: user,
                token: jwToken.issue({id : user.id,username:user.username,fullname:user.fullname,url_avatar:user.url_avatar })
              }))
            }
          });
        })
      },
      logOut:function(req,res){
        console.log('logout',req.session)
          if(req.session.user){
            delete req.session.user
             res.send(OutputInterface.success('Đăng xuất thành công'))
          }
          else{
            return res.send(OutputInterface.errServer('Chưa login'))
          }
      },
       get_session :function(req,res){
         console.log('session',req.session)
          if(req.session.user){
            let user = {...req.session.user}
            return res.send(OutputInterface.success({
              user: user,
              token: jwToken.issue({id : user.id,username:user.username,fullname:user.fullname,url_avatar:user.url_avatar })
            }))
          }
          else{
           return  res.send(OutputInterface.errServer('Chưa login'))
          }
        
      }
};

