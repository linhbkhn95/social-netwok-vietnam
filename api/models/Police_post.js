/**
 * Police_post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    policename: {
      type: "string"
    },
    url_image: {
      type: "string"
    },
  
    colorText: {
      type: "string"
    },
    type: {
      type: "integer"
    }
  }
};
