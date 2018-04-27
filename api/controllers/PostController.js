/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    postStatus:function(req,res){
        let data = req.body
        Post.create(data).exec(function(err,post){
            if(err){

            }
            Post.publishCreate(post);

            res.send(post)
        })
    },
    deletePost:function(req,res){
        let id = req.body.idPost;
        Post.destroy({id:id}).exec((err,postdel)=>{
            if(err){

            }
            console.log(postdel)
            if(postdel)
                res.send({DT:postdel})
            else    
                res.send({DT:null})
        });
    },
    getListPost:function(req,res){
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
            Post.watch(req);
        }
        Post.find({where:{sort:"createdAt DESC"}}).exec(function(err,listPost){
            if(err){
          
            }
            res.send({DT:listPost})
        })
    }
};

