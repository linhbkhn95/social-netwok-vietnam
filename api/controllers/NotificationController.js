/**
 * NotifycationController
 *
 * @description :: Server-side logic for managing notifycations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	follow: function(req, res) {

        // Make sure this is a socket request (not traditional HTTP)
        if (!req.isSocket) {
          return res.badRequest();
        }
    
        // Have the socket which made the request join the "funSockets" room.
        sails.sockets.join(req, 'Subscribe_Status');
    
        // Broadcast a notification to all the sockets who have joined
        // the "funSockets" room, excluding our newly added socket:
        // sails.sockets.broadcast('funSockets', 'follow', {id:req.socketid, howdy: 'hi there!'}, req);
        // sails.sockets.broadcast('funSockets', 'add', {id:req.socketid, howdy: 'hi there!'}, req);

        // ^^^
        // At this point, we've blasted out a socket message to all sockets who have
        // joined the "funSockets" room.  But that doesn't necessarily mean they
        // are _listening_.  In other words, to actually handle the socket message,
        // connected sockets need to be listening for this particular event (in this
        // case, we broadcasted our message with an event name of "hello").  The
        // client-side you'd need to write looks like this:
        // ```
        // io.socket.on('hello', function (broadcastedData){
        //   console.log(data.howdy);
        //   // => 'hi there!'
        // }
        // ```
    
        // Now that we've broadcasted our socket message, we still have to continue on
        // with any other logic we need to take care of in our action, and then send a
        // response.  In this case, we're just about wrapped up, so we'll continue on
    
        // Respond to the request with a 200 OK.
        // The data returned here is what we received back on the client as `data` in:
        // `io.socket.get('/say/hello', function gotResponse(data, jwRes) { /* ... */ });`
        return res.json({
          data: 'Nhận thông báo Status'
        });
    
      },
      user: function(req, res) {

        // Make sure this is a socket request (not traditional HTTP)
        if (!req.isSocket) {
          return res.badRequest();
        }
    
        // Have the socket which made the request join the "funSockets" room.
        sails.sockets.join(req, 'NotificationUser');
    
        // Broadcast a notification to all the sockets who have joined
        // the "funSockets" room, excluding our newly added socket:
        // sails.sockets.broadcast('funSockets', 'follow', {id:req.socketid, howdy: 'hi there!'}, req);
        // sails.sockets.broadcast('funSockets', 'add', {id:req.socketid, howdy: 'hi there!'}, req);

        // ^^^
        // At this point, we've blasted out a socket message to all sockets who have
        // joined the "funSockets" room.  But that doesn't necessarily mean they
        // are _listening_.  In other words, to actually handle the socket message,
        // connected sockets need to be listening for this particular event (in this
        // case, we broadcasted our message with an event name of "hello").  The
        // client-side you'd need to write looks like this:
        // ```
        // io.socket.on('hello', function (broadcastedData){
        //   console.log(data.howdy);
        //   // => 'hi there!'
        // }
        // ```
    
        // Now that we've broadcasted our socket message, we still have to continue on
        // with any other logic we need to take care of in our action, and then send a
        // response.  In this case, we're just about wrapped up, so we'll continue on
    
        // Respond to the request with a 200 OK.
        // The data returned here is what we received back on the client as `data` in:
        // `io.socket.get('/say/hello', function gotResponse(data, jwRes) { /* ... */ });`
        return res.json({
          data: 'Nhận thông báo user'
        });
    
      },
      add: function(req,res) {

        // Make sure this is a socket request (not traditional HTTP)
        if (!req.isSocket) {
          return res.badRequest();
        }
    
        // Have the socket which made the request join the "funSockets" room.
        // sails.sockets.join(req, 'funSockets');
    
        // Broadcast a notification to all the sockets who have joined
        // the "funSockets" room, excluding our newly added socket:
        // sails.sockets.broadcast('funSockets', 'follow', {id:req.socketid, howdy: 'hi there!'}, req);
        sails.sockets.broadcast('funSockets', 'add', {id:req.socketid, howdy: 'adddd!'}, req);

        // ^^^
        // At this point, we've blasted out a socket message to all sockets who have
        // joined the "funSockets" room.  But that doesn't necessarily mean they
        // are _listening_.  In other words, to actually handle the socket message,
        // connected sockets need to be listening for this particular event (in this
        // case, we broadcasted our message with an event name of "hello").  The
        // client-side you'd need to write looks like this:
        // ```
        // io.socket.on('hello', function (broadcastedData){
        //   console.log(data.howdy);
        //   // => 'hi there!'
        // }
        // ```
    
        // Now that we've broadcasted our socket message, we still have to continue on
        // with any other logic we need to take care of in our action, and then send a
        // response.  In this case, we're just about wrapped up, so we'll continue on
    
        // Respond to the request with a 200 OK.
        // The data returned here is what we received back on the client as `data` in:
        // `io.socket.get('/say/hello', function gotResponse(data, jwRes) { /* ... */ });`
        return res.json({
          anyData: 'we want to send back'
        });
    
      },

      getlist:async function(req,res){
        let pagesize = req.body.pagesize||10
        let page = req.body.page||1

        if (!req.isSocket) {
          return res.badRequest();
        }
          let username = req.session.user.username
          this.reset_number_notifi(username)
          let listIdNotifi = await  Ref_notification_user.find({userId:req.session.user.id,status:true});

            let result = await Promise.all(listIdNotifi.map((item) => {
              return new Promise((resolve, reject) => {
                  resolve(item.notificationId)
              })
           }))
          //  let response = await Tree.find(keySearch).paginate({ limit: pagesize, page: req.body.page })
           let response = await Notification.find({}).where({ id: result }).sort('time DESC').paginate({ limit: pagesize, page: page });
           Promise.all(response.map((notifi) => {
            return new Promise(async (resolve, reject) => {
                let user = await User.findOne({id:notifi.userId});
                let  ref_notifi = listIdNotifi.find(function(element) {
                  return element.notificationId === notifi.id;
                });
                notifi.user_notifi = user
                if(ref_notifi)
                   notifi.readNotifi = ref_notifi.readNotifi
                resolve(notifi)
            })
         })).then((rp)=>{
          return res.send(OutputInterface.success(rp));
         })
          

      },
      get_number_notifi:function(req,res){
        let username = req.body.username||req.session.user&&req.session.user.username||null
        if(username){
        // this.reset_number_notifi(username);

        User.findOne({username}).exec((err,user)=>{
            if(err){
              return res.send(OutputInterface.errServer(err))
            }
            if(user){
             
                  return  res.send(OutputInterface.success(user.number_notifi))

              
            }
            return res.send(OutputInterface.errServer('Khong tim thay user'))
          });
        }
        else
          return res.send(OutputInterface.errServer('Chưa login'))

      },
      reset_number_notifi: function(username){
         
          User.findOne({username:username}).exec((err,user)=>{
            if(err){
              return ''
            }
            if(user){
              user.number_notifi = 0;
              user.save(()=>{})
            }
          });
      },
      count_number_notifi: async function(room_id){
          // let username = req.body.username||req.session.user.username
          console.log('room_id',room_id)
          let listSub = await Subscribe_tree.find({room_id});
          return new Promise((resolve,reject)=>{
              Promise.all(listSub.map((item)=>{
              
                return new Promise((resolve,reject)=>{
    
                  User.findOne({username:item.username}).exec((err,user)=>{
                    if(err){
                      return resolve(null)
                    }
                    if(user){
                        if(!user.number_notifi)
                          user.number_notifi =0;
                        user.number_notifi +=1;
                        user.save(()=>{
                          return  resolve(user)
                        })
                    }
                  resolve(null)
                    
                })
                })
              })).then((response)=>{
                resolve(response)
              })
          
          })
          
         
         
      }
};

