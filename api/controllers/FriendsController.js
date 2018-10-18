

/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getlistRequestFriend:function(req,res){
         Friends.find({  or:[
            {userId_one:req.session.user.id,status:0},
            {userId_two:req.session.user.id,status:0}
         ]}).where({action_userId:{'!':[req.session.user.id]}}).exec((err,list)=>{
             Promise.all(list.map((item)=>{
                 return new Promise(async(resolve,reject)=>{
                     let userPatnerId = item.userId_one == req.session.user.id ?item.userId_two:item.userId_one

                     let userPatner  = await User.findOne({id:userPatnerId,select:['fullname','url_avatar','username']})
                     resolve(userPatner)
                 })
             })).then((response)=>{
                res.send(OutputInterface.success(response));
             })

         })

        // var query = 'SELECT * from friends,user where (user.id = userId_one or user.id=userId_two) and user';
        // Friends.query(query, [], function(err, metaLang) {
        //     console.log('findCurrent');
        //     if (err) return console.log(err);
        //     console.log(metaLang);
        //     // OK this works exactly as I want (I would have prefered a 'findOne' result, only 1 object instead of an array with 1 object in it, but I can do with it.)
        // });
     },
     accept:async function(req,res){
        let {username} = req.body
        let userPatner = await User.findOne({username})
        let userId_one = req.session.user.id<userPatner.id?req.session.user.id:userPatner.id
        let userId_two = req.session.user.id>userPatner.id?req.session.user.id:userPatner.id
        let friend = await Friends.findOne({userId_one,userId_two});
        friend.status  = 1;
        NotificationUtils.notifiAccessFriend(friend.status,userPatner,req);

        friend.action_userId = req.session.user.id
        friend.save({})
        return res.send(OutputInterface.success(userPatner));

     },
     cancel:async function(req,res){
        let {username} = req.body
        let userPatner = await User.findOne({username})
        let userId_one = req.session.user.id<userPatner.id?req.session.user.id:userPatner.id
        let userId_two = req.session.user.id>userPatner.id?req.session.user.id:userPatner.id
        let friend = await Friends.findOne({userId_one,userId_two});
        friend.status  = -1;
        friend.action_userId = req.session.user.id
        friend.save({})
        return res.send(OutputInterface.success(userPatner));

     },
     accessFriend:function(req,res){

         let {username,friend}  = req.body;
         console.log('data',req.body)

         User.findOne({username}).exec(async(err,user)=>{
             if(err){
                return res.send(OutputInterface.errServer(err));
             }

             if(user){
                let userId_one = req.session.user.id<user.id?req.session.user.id:user.id
                let userId_two = req.session.user.id>user.id?req.session.user.id:user.id
                let friend = await Friends.findOne({userId_one,userId_two});
                if(friend){
                    friend.status = friend.status==-1?0:-1
                    friend.action_userId = req.session.user.id
                    console.log('data',req.body,friend)
                    let dataSocket = {}
                    dataSocket.user = req.session.user
                    dataSocket.friend = friend
                    friend.save({})
                    if(friend.status==0)
                          NotificationUtils.notifiAccessFriend(friend.status,user,req);

                    sails.sockets.broadcast('NotificationUser',"notifi_user_requestFriend"+user.id,dataSocket,req);

                    return res.send(OutputInterface.success(friend));

                }
                else{
                    Friends.create({userId_one,userId_two,status:0,action_userId:req.session.user.id}).exec((err,result)=>{
                        if(err){
                            return res.send(OutputInterface.errServer(err));

                        }
                        return res.send(OutputInterface.success(result));

                    })
                }
             }
            else
             return res.send(OutputInterface.errServer('no user'));
         })
    },
    getCanFriend:async function(req,res){
           let userId = req.session.user.id
           Friends.find({ or:[ {userId_one:userId,status:1},{userId_two:userId,status:1}   ]}).exec(async (err,list)=>{
            if(err){

            }
            let listUserId = list.map((friend)=>{
                return(friend.userId_one==userId?friend.userId_two:friend.userId_one)
            })
            let listUser
            console.log('listfreined',listUserId)
            listUserId[listUserId.length]=req.session.user.id
              listUser = await User.find({select:['fullname','username','url_avatar','id']}).where({id:{'!':listUserId}});

              console.log('listuser',listUser)


            Promise.all(listUser.map((user)=>{

                return new Promise(async(resolve,reject)=>{

                    let countFriend = await Friends.count({
                      or:[
                        {userId_one:user.id,status:1},
                        {userId_two:user.id,status:1}
                     ]

                    })
                    let userId_one = req.session.user.id<user.id?req.session.user.id:user.id
                    let userId_two = req.session.user.id>user.id?req.session.user.id:user.id
                    let friend = await Friends.findOne({userId_one,userId_two});
                    let data = {
                       user,
                       countFriend,
                       friend
                    }
                    resolve(data)
                })
        }))
        .then((response)=>{
            return res.send(OutputInterface.success(response))
        })
            // res.send({DT:listPost})

           })

    },
     checkFriend:async function(req,res){
         let username  = req.body.username
         if(username==req.session.user.username)
            return   res.send(OutputInterface.success(username));
         let userPatner  = await User.findOne({username,select:['fullname','username','url_avatar','id']});
         if(userPatner){
             let userId_one = req.session.user.id<userPatner.id?req.session.user.id:userPatner.id
             let userId_two = req.session.user.id>userPatner.id?req.session.user.id:userPatner.id
             let friend = await Friends.findOne({userId_one,userId_two});
             if(friend&&friend.status==1)
                return res.send(OutputInterface.success(friend));

             userPatner.friend = friend?friend.status:-1;
             console.log('userpatner',userPatner,friend,userId_one,userId_two)

             return res.send(OutputInterface.errServer(userPatner));
         }
         else
            return  res.send(OutputInterface.errServer(''));

     },
     getlist_option:function(req,res){
       console.log('getlist_option')
       try {
        let userId = req.session.user.id
        Friends.find({ or:[ {userId_one:userId,status:1},{userId_two:userId,status:1}   ]}).exec((err,list)=>{
         if(err){

         }
         Promise.all(list.map((item)=>{

             return new Promise(async(resolve,reject)=>{

                 let userIdFriend = item.userId_one==userId?item.userId_two:item.userId_one
                 let user = await User.findOne({id:userIdFriend,select:['fullname','username','url_avatar','is_online','time_offline','id']})
                 user.value = user.id
                 user.label = user.fullname

                 resolve(user)
             })
     }))
     .then((response)=>{
         return res.send(OutputInterface.success(response))
     })
         // res.send({DT:listPost})
        })
       } catch (error) {

       }



     }
};

