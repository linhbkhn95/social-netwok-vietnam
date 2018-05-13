var redux = require('redux');
var username = require('./username.js');
var auth = require('./auth.js');
var shoppingCart = require('./shoppingCart.js');
var settings = require('./settings.js');
var notification = require('./notification.js')
var reqFriend = require('./requestFriend.js')
var chatbox = require('./chatbox.js');

 var reducer = redux.combineReducers ({username,chatbox,reqFriend,notification,auth,settings,shoppingCart});
 module.exports = reducer;
