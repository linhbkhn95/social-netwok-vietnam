/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title:{
      type:"string"
    },
    content:{
      type:"string"
    },
    subject:{
        type:"integer"
    },
    userId_post:{
       type:"integer"
    },
    feel_id:{
      type:"integer"
   },
    countLike:{
      type:"integer",
      defaultsTo : 0
    },
    police_id:{
      type:"integer",
      defaultsTo : 1
    },
    userId_wall:{
      type:'integer'
    },
    group_id:{
      type:'integer'
    },
    postId_parent:{
      type:'integer'
    },
    type_post:{
      type:'integer'

    },
    incognito:{
      type:"boolean",
      defaultsTo:false
    }

  }
};

