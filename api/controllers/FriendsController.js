/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
     getlist:function(req,res){
         Friends.find({  or:[
            {userId_one:req.session.user.id,status:0},
            {userId_two:req.session.user.id,status:0}
         ]}).where({action_userId:{'!':[req.session.user.id]}}).exec((err,list)=>{
             res.send(list)
         })
     }
};

