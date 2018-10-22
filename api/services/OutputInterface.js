module.exports = {
  jsonAPIOutput: function(errCode, errMsg, data) {
    return { EC: errCode, EM: errMsg, DT: data };
  },
  errServer: function(err) {
    return this.jsonAPIOutput(-101339, err, null);
  },
  success: function(data) {
    return this.jsonAPIOutput(0, "Success", data);
  }
};
