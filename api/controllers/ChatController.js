/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        let body = req.body;
        body.userId_sent = req.session.user.id;
        body.time = Date.now();
        Chat.create(body).exec((err,chat)=>{
            if(err){
                return res.send(OutputInterface.errServer(err))
            }
            if(chat){
                let message ={
                    data:chat,
                    user:req.session.user
                }

                sails.sockets.broadcast('ChatUser',"chatuser"+chat.userId_rec,message,req);

                return res.send(OutputInterface.success(chat))
            }
            return   res.send(OutputInterface.errServer('no tao dc message'))
        })
    },
    getlist_user:function(req,res){
        let userId_patner = req.body.userId_patner
        // let userPatner = 
        Chat.find({
            or:[{
                userId_sent:req.session.user.id,
                userId_rec : userId_patner
            },
            { userId_rec:req.session.user.id,
            userId_sent: userId_patner
            }
        ]
        }).exec((err,listchat)=>{

            let id = userId_patner>req.session.user.id?(userId_patner+'_'+req.session.user.id):(req.session.user.id+'_'+userId_patner)
           
            return res.send(OutputInterface.success({listchat,id}))
        })
    }
};

