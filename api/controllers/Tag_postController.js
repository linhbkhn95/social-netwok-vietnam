/**
 * Tag_postController
 *
 * @description :: Server-side logic for managing tag_posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //add tag
    addTag:function(req,listTag,post_id){
      return new Promise((resolve,reject)=>{
        let dataInsert = []
        for(var i=0;i<listTag.length;i++){
          dataInsert[i] = {
            user_id : listTag[i].id,
            post_id,
          }
        }

        Tag_post.create(dataInsert).exec((err,listTagPost)=>{
          if(err){
            reject(err)

          }
           NotificationUtils.notifiPostUser_Comment(post_id,listTag,req);

           resolve(listTagPost)


        })
      })
    },
    getlist_user:function(post_id){
      return new Promise((resolve,reject)=>{
        console.log('getlist_user',post_id)
        if(post_id){
          Tag_post.find({post_id}).exec(async(err,list)=>{
              if(err){
                console.log('err',err)

                resolve(null)

              }
              console.log('resul',list)

              if(list&&list.length>0){
                  let list_user_id = list.map((item)=>{
                    return item.user_id
                })
                let result = await User.find({id:list_user_id});
                console.log('resul',result)
                resolve(result)
              }
              else
                resolve(null)

          })
        }
      })
    }

};

