/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        if (req.body.password !== req.body.confirmPassword) {
          return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
        }
         console.log(req.body);
        User.create(req.body).exec(function (err, user) {
          if (err) {
            return res.json(err.status, {err: err});
          }
          // If user created successfuly we return user and token as response
          if (user) {
            // NOTE: payload is { id: user.id}
            res.json(200, {user: user, token: jwToken.issue({id: user.id})});
          }
        });
      },
      getInfo:function(req,res){
          let {username} = req.body
          User.findOne({username}).exec(async (err,user)=>{
            if(err){
              console.log(err)
              return res.send(OutputInterface.errServer('Lỗi hệ thống'))
            } 
             if(user){
                let userId = user.id
                let countPost = await Post.count({userId_post:userId});
                let countFollow = await Follows.count({userId,status:1});
                let countFriend = await Friends.count({
                  or:[
                    {userId_one:userId,status:1},
                    {userId_two:userId,status:1}
                 ]
                
                })
                let info ={
                  user,
                  countPost,
                  countFollow,
                  countFriend,
                }
                return res.send(OutputInterface.success(info)) 
             }
             else{
              return res.send(OutputInterface.errServer('User ko tồn tại'))
             }
          })
      },
      getListFollows:async function(req,res){
          let username = req.body.username
          if(username){
             let user= await User.findOne({username})
             Follows.find({userId:user.id,status:1}).exec((err,list)=>{
              if(err){
                return res.send(OutputInterface.errServer(err))
              }

              console.log('follow',username,list)

              Promise.all(list.map((item)=>{
                  
                  return new Promise(async(resolve,reject)=>{
                 
                      
                      let user = await User.findOne({id:item.userId_follow,select:['fullname','username','url_avatar']});
                      let countFriend = await Friends.count({
                        or:[
                          {userId_one:item.userId_follow,status:1},
                          {userId_two:item.userId_follow,status:1}
                       ]
                      
                      })
                      let data = {
                         user,
                         countFriend,
                      }
                      resolve(data)
                  })
          }))
          .then((response)=>{
              return res.send(OutputInterface.success(response))
          })
              // res.send({DT:listPost})
        
             })
          }
      },
      getListFriends: async function(req,res){
        let username = req.body.username

        if(username){
           let userpage = await User.findOne({username})
           console.log('userpag',userpage,req.body)
           let userId = userpage.id
           Friends.find({ or:[ {userId_one:userId,status:1},{userId_two:userId,status:1}   ]}).exec((err,list)=>{
            if(err){
              
            }
            console.log('list',list,err)
            Promise.all(list.map((item)=>{
                
                return new Promise(async(resolve,reject)=>{
                  
                    let userIdFriend = item.userId_one==userId?item.userId_two:item.userId_one
                    let user = await User.findOne({id:userIdFriend,select:['fullname','username','url_avatar']})
                    let countFriend = await Friends.count({
                      or:[
                        {userId_one:userIdFriend,status:1},
                        {userId_two:userIdFriend,status:1}
                     ]
                    
                    })
                    let data = {
                       user,
                       countFriend,
                    }
                    resolve(data)
                })
        }))
        .then((response)=>{
            return res.send(OutputInterface.success(response))
        })
            // res.send({DT:listPost})
      
           })
        }
    }

};

