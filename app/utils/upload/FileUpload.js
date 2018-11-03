import axios from "axios";
const url_host = "http://192.168.0.105:1338";
module.exports = {
  upload: function upload(files) {
    const url = "/fileupload/upload_image";
    console.log("upload", files);

    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  },
  upload_file: function(data) {
    const url = url_host + "/file/upload";

    const formData = new FormData();

    formData.append("file", data.file);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: { type_file: data.type_file }
    };
    return axios.post(url, formData, config);
  },
  upload_with_src: function(src) {
    let self = this;
    return new Promise((resolve, reject) => {
      Promise.all(
        src.map(item => {
          return new Promise((resolve, reject) => {
            self.upload_file(item).then(resdata => {
              if (resdata.data.EC == 0) {
                resolve(resdata.data.DT);
                reject(resdata.data.EM);
              }
            });
          });
        })
      )
        .then(respone => {
          console.log("respone", respone);
          resolve(respone);
        })
        .catch(err => {
          console.log("errr", err);
          reject(err);
        });
    });
  }
};
