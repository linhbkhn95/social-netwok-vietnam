/**
 * Friends.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

   
    userId_one :{
      type:"integer"
    },
    userId_two:{
      type:"integer"
    },
    status:{
      type:"integer"
    },
    action_userId:{
      type:'integer'
    },
    time:{
      type:"float"
    }
  }
};

