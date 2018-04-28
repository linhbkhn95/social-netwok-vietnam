/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getlist_WithPostId:function(req,res){
            if (!req.isSocket) {
                sails.log.debug('no socket');
                return res.badRequest();
            }
            if (req.isSocket) {
                // If this code is running, it's made it past the `isAdmin` policy, so we can safely
                // watch for `.publishCreate()` calls about this model and inform this socket, since we're
                // confident it belongs to a logged-in administrator.
                sails.log.debug('is socket');
                //để  đăng kí sự kiện lăng nghe model Command thay đổi kích hoạt sự kiện on('command') bên phía client
                Comment.watch(req);
            }
           let postId = req.body.postId
           Comment.find({postId}).exec((err,list)=>{
               if(err){
                    return res.send(OutputInterface.errServer(err))
               }
               return res.send(OutputInterface.success(list))
           })
    },
    create:function(req,res){
        let  PostId = 1
        let data  = req.body ;
        data.time = Date.now();
        console.log(data)
        Comment.create(req.body).exec((err,comment)=>{
            if(err){
                return res.send(OutputInterface.errServer(err))
           }
           if(comment){
              Comment.publishCreate(comment);

              return res.send(OutputInterface.success(comment))

           }
        })
    }
};

