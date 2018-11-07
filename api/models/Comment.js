/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    text: {
      type: "text"
    },
    time: {
      type: "float"
    },
    parentId: {
      type: "integer"
    },
    postId: {
      type: "integer"
    },
    userId_comment: {
      type: "integer"
    },
    incognito: {
      type: "boolean",
      defaultsTo: false
    },
    count_like: {
      type: "integer",
      defaultsTo: 0
    }
  }
};
