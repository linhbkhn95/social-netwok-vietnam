/**
 * Tag_post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    post_id:{
      type:'string'
    },
    user_id:{
      type:'string'
    },
    desc:{
      type:'string'
    }

  }
};

