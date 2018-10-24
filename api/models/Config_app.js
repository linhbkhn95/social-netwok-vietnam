/**
 * Config_app.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    url_data_file: {
      type: "string"
    },
    url_redis: {
      type: "string"
    },
    host_redis: {
      type: "string"
    }
  }
};
