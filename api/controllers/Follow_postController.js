/**
 * Follow_postController
 *
 * @description :: Server-side logic for managing follow_posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
      // add follow theo danh sach gan the
      add_with_listTag:function(req,listTag,post_id){
        return new Promise((resolve, reject) => {
          let dataInsert = [];
          for (var i = 0; i < listTag.length; i++) {
            dataInsert[i] = {
              post_id,
              user_id:listTag[i].id,
              status:1

            };
          }
          Follow_post.create(dataInsert).exec((err, listFollowPost) => {
            if (err) {
              reject(err);
            }
            resolve(listFollowPost);
          });
        });
      }
};

