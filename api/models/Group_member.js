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
    user_id: {
      type: "integer"
    },
    group_id: {
      type: "integer"
    },
    desc: {
      type: "string"
    },
    desc: {
      role: "integer"
    },
    status: {
      type: "integer"
    },
    role: {
      type: "integer"
    },
    userId_action: {
      type: "integer"
    }
  },
  updateOrCreate: function(criteria, values) {
    var self = this; // reference for use by callbacks
    // If no values were specified, use criteria
    if (!values) values = criteria.where ? criteria.where : criteria;

    return this.findOne(criteria).then(function(result) {
      if (result) {
        return self.update(criteria, values);
      } else {
        return self.create(values);
      }
    });
  }
};
