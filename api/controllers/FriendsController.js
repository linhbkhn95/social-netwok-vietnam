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
     },
     checkFriend:async function(req,res){
         let username  = req.body.username
         if(username==req.session.user.username)
            return   res.send(OutputInterface.success(username));
         let userPatner  = await User.findOne({username});
         if(userPatner){
             let userId_one = req.session.user.id<userPatner.id?req.session.user.id:userPatner.id
             let userId_two = req.session.user.id>userPatner.id?req.session.user.id:userPatner.id
             let friend = await Friends.findOne({userId_one,userId_two,status:2});
             if(friend){
                return res.send(OutputInterface.success(friend));
             }
             return res.send(OutputInterface.errServer(''));
         }
         else
            return  res.send(OutputInterface.errServer(''));
        
     }
};

