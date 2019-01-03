/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {


  attributes: {
    groupname:{
      type:'string'
    },
    link:{
      type:'string'
    },
    title:{
      type:'string'
    },
    image:{
      type:'string'
    },
    desc:{
      type:'string'
    },
    status:{
       type:'integer',
       defaultsTo : 1
    },
    police:{
      type:'integer',
      defaultsTo : 1
    },
    user_id_create:{
      type:'integer'
    }

  }
};

