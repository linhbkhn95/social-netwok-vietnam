/**
 * Chat_new_user.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    key_chat: {
      type: "string"
    },
    id_message_new: {
      type: "integer"
    },
    time: {
      type: "datetime"
    },
    know_message: {
      type: "boolean",
      defaultsTo: false
    }
  }
};
