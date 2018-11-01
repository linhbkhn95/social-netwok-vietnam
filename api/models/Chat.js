/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    userId_sent: {
      type: "integer"
    },
    userId_rec: {
      type: "integer"
    },
    time: {
      type: "float"
    },
    text: {
      type: "string"
    },
    
    read_message: {
      type: "boolean",
      defaultsTo: false
    }
  }
};
