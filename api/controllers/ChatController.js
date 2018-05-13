/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        let data = req.body;
        data.userId_sent = req.session.user.id;
        data.time = Date.now();
        Chat.create(data).exec((err,chat)=>{
            return res.send(OutputInterface.success(chat))
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
        }).exec((err,list)=>{
            return res.send(OutputInterface.success(list))
        })
    }
};

