/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
     username:{
       type:'string'
     },
     fullname:{
       type:'string'
     },
     url_avartar:{
       type:'string'
     },
     sex:{
       type:'string'
     },
     url_profile:{
       type:'string'
     },
    //  adress:{
    //    type:'string'
    //  },
     encryptedPassword: {
      type: 'string'
    },
    // vip:{
    //   type:'boolean'
    // },
    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
    
  },
   // Here we encrypt password before creating a User
   beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};

