
/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
      type:{
        type:"string"
      },
      url_ref:{
        type:'string'
      },
      text:{
        type:'text'
      },
      userId:{
        type:'integer'
      },
      data:{
        type:'json'
      },
      time:{
        type:'float'
      }
  }
};

