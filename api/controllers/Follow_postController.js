/**
 * Follow_postController
 *
 * @description :: Server-side logic for managing follow_posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let typeFollow = {
  0: "Bài đăng của bạn",
  1: "Gắn thẻ ",
  2: "Bài đăng bạn theo dõi",
  3: "Bài đăng của ai đó",
  4: "Bài đăng của ai đó trên tường của bạn",
  5: "Trả lời bình luận của bạn",
  6:"Nhắc đến bạn trong 1 bình luận",
  7:"có mặt bạn"
};
module.exports = {
  // add follow theo danh sach gan the
  add_with_listTag: function(req, listTag, post_id) {
    return new Promise((resolve, reject) => {
      let dataInsert = [];
      for (var i = 0; i < listTag.length; i++) {
        dataInsert[i] = {
          post_id,
          user_id: listTag[i].id,
          status: 1,
          type: "1"
        };
      }
      Follow_post.create(dataInsert).exec((err, listFollowPost) => {
        if (err) {
          reject(err);
        }
        resolve(listFollowPost);
      });
    });
  },
  add:async function(data){
      Follow_post.create(data).exec(()=>{})
  }
};
