/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport')

 
module.exports = {
    'index': function (req, res) {
        var username = req.param('username');
        var password = req.param('password');

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
                 user.url_avatar = '/images/user/robot.png'
              User.subscribe(req, user);
              req.session.user = user;

              return res.send(OutputInterface.success({
                user: user,
                token: jwToken.issue({id : user.id,username:user.username,fullname:user.fullname,url_avatar:user.url_avatar,incognito:user.incognito })
              }))
            }
          });
        })
      },
      facebook: function(req, res) {
        passport.authenticate('facebook', 
                              { failureRedirect: '/login', scope: ['email','public_profile'] }, 
                              function(err, user) {
          req.logIn(user, function(err) {
            console.log('auth/fb',user,err)
            if (err) {
              console.log(err);
              return res.redirect('/login');
              return;
            }
            if(!user.url_avatar)
               user.url_avatar = '/images/user/robot.png'
            User.subscribe(req, user);
            req.session.user = user
            return res.redirect('/wall');
          });
        })(req, res);
      },
      logOut:function(req,res){
          if(req.session.user){
            delete req.session.user
             res.send(OutputInterface.success('Đăng xuất thành công'))
          }
          else{
            return res.send(OutputInterface.errServer('Chưa login'))
          }
      },
       get_session :function(req,res){
         console.log('getsession',req.session)
          if(req.session.user){
            if(!req.session.user.url_avatar )
                req.session.user.url_avatar = '/images/user/robot.png'
            let user = {...req.session.user}
           

            return res.send(OutputInterface.success({
              user: user,
              token: jwToken.issue({id : user.id,username:user.username,fullname:user.fullname,url_avatar:user.url_avatar,incognito:user.incognito })
            }))
          }
          else{
           return  res.send(OutputInterface.errServer('Chưa login'))
          }
        
      }
};

