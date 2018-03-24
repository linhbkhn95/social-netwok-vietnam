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
            res.send(post)
        })
    },
    getListPost:function(req,res){
        Post.find({where:{sort:"createdAt DESC"}}).exec(function(err,listPost){
            if(err){
          
            }
            res.send({DT:listPost})
        })
    }
};

