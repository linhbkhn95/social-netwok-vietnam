/**
 * Group_member.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {


  attributes: {
    user_id:{
      type:'integer'
    },
    group_id:{
      type:'integer'
    },
    desc:{
      type:'string'
    },
    desc:{
      role:'integer'
    },
    status:{
      type:'integer'
    },

    userId_action:{
       type:'integer',
    }
  }
};

