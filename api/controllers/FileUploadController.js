/**
 * FileUploadController
 *
 * @description :: Server-side logic for managing fileuploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
fs = require("fs");
http = require("http");
path = require("path");
var appRoot = require("app-root-path");

let typeFile = {
  image: "images",
  video: "videos",
  document: "document",
  audio: "audio"
};
console.log("urlRoot", appRoot.toString());
var res = appRoot.toString().split("/");
// const nameProjectFolder = path.basename(path.dirname(appRoot.toString()));
const nameProjectFolder = res[res.length - 1];

console.log("nameProject", nameProjectFolder);
const urlParent = appRoot
  .toString()
  .substring(0, appRoot.toString().length - nameProjectFolder.length);
console.log("urlParent", urlParent);
module.exports = {
  upload_image: function(req, res) {
    try {
      let data = {};
      console.log(req.file("files"));
      req.file("files").upload(
        {
          uploadMultiple: true,

          // don't allow the total upload size to exceed ~100MB
          maxBytes: 100000000,
          // set the directory
          // dirname: "../../assets/images/upload"
          dirname: "../../../data/upload/"
        },
        async function(err, uploadedFile) {
          // if error negotiate
          if (err) return res.send(OutputInterface.errServer(err));

          //  data.url_image_gobal = uploadedFile[0].fd
          let result = [];
          for (var i = 0; i < uploadedFile.length; i++) {
            var img = uploadedFile[i].fd.split("/");
            let datafile = {};
            datafile.url = "/images/upload/" + img[img.length - 1];
            datafile.fileName = uploadedFile[i].filename;
            result[i] = datafile;
          }
          console.log(uploadedFile);

          // data.url_image = '/images/user/'+img[img.length-1]
          // User.update({id:req.session.user.id},{url_cover:data.url_image}).exec((err,gt)=>{
          //   if(err){
          //       res.send(OutputInterface.errServer(err))
          //   }
          //   res.send(OutputInterface.success(gt))
          // })
          res.send(OutputInterface.success(result));
        }
      );
    } catch (error) {
      res.send(OutputInterface.errServer(error));
    }
  },
  upload: function(req, res) {
    try {
      let data = {};
      // console.log('params',req.param,req.headers.type);
      let type_file = req.param("type_file");

      req.file("file").upload(
        {
          // uploadMultiple: true,

          // don't allow the total upload size to exceed ~100MB
          maxBytes: 100000000,
          // set the directory
          // dirname: "../../assets/images/upload"
          dirname: "../../../data/" + typeFile[type_file]
        },
        async function(err, uploadedFile) {
          // if error negotiate
          if (err) return res.send(OutputInterface.errServer(err));
          console.log(uploadedFile);
          //  data.url_image_gobal = uploadedFile.fd
          //  let result = [];
          // for (var i = 0; i < uploadedFile.length; i++) {
          var array_urlfile = uploadedFile[0].fd.split("/");
          let datafile = {};
          datafile.filename = array_urlfile[array_urlfile.length - 1];
          datafile.type_file = type_file;
          // datafile.fileName = uploadedFile[i].filename;
          //  result[i] = datafile;
          // }
          console.log(uploadedFile);

          // data.url_image = '/images/user/'+img[img.length-1]
          // User.update({id:req.session.user.id},{url_cover:data.url_image}).exec((err,gt)=>{
          //   if(err){
          //       res.send(OutputInterface.errServer(err))
          //   }
          //   res.send(OutputInterface.success(gt))
          // })
          res.send(OutputInterface.success(datafile));
        }
        // res.send(OutputInterface.success(req.headers));
      );
    } catch (error) {
      res.send(OutputInterface.errServer(error));
    }
  },
  //lấy danh sách file upload theo postid
  getFilePostId: function(req, res) {
    try {
      let { post_id } = req.body;
      return new Promise((resolve, reject) => {
        if (post_id) {
          File_post.find({ post_id }).exec((err, listFile) => {
            if (err) {
              res.send(OutputInterface.errServer(err));
            }
            let result = listFile.map(file => {
              return {
                ...file,
                url_file: sails.config.url_service_upload + file.url_file
              };
            });
            res.send(OutputInterface.success(result));
          });
        } else res.send(OutputInterface.errServer("bài post k tồn tai"));
      });
    } catch (error) {
      res.send(OutputInterface.errServer(error));
    }
  },
  //lấy danh sách image theo group
  getlist_file_with_group: function(req, res) {
    try {
      let { group_id, type_file } = req.body;
      type_file = type_file || "image";
      group_id = group_id || 1;
      // let categoryId = params['category_id'] || 0;
      // let index = params['index'] || 1;
      // let sort = params['sort'] || 'p_fromdate';
      // let typeSort = params['typeSort'] || 0; //0: DESC, 1: ASC
      // let count = params['count'] || 10; //default 20
      // let status = 'ENABLE';
      // let token = req.headers['authorization'];
      // var self = this;

      // if (count > 200) {
      //     count = 200;
      // }
      return new Promise((resolve, reject) => {
        if (group_id) {
          StoredProcedure.query(
            "call webandanh.getlist_file_group(?, ?)",
            [type_file, group_id],
            function(err, [data, server_status]) {
              if (err) {
                res.send(OutputInterface.errServer(err));
              }

              Promise.all(
                data.map(item => {
                  return new Promise((resolve, reject) => {
                    resolve({
                      ...item,
                      url_file: sails.config.url_service_upload + file.url_file
                    });
                  });
                })
              ).then(respone => {
                res.send(OutputInterface.success(respone));
              });
            }
          );
        } else res.send(OutputInterface.errServer("group k ton tai"));
      });
    } catch (error) {
      res.send(OutputInterface.errServer(error));
    }
  },
  //lay danh sachs file theo user
  getlist_file_with_user: async function(req, res) {
    try {
      let { username, type_file } = req.body;
      type_file = type_file || "image";

      let user = await User.findOne({ username });
      // let categoryId = params['category_id'] || 0;
      // let index = params['index'] || 1;
      // let sort = params['sort'] || 'p_fromdate';
      // let typeSort = params['typeSort'] || 0; //0: DESC, 1: ASC
      // let count = params['count'] || 10; //default 20
      // let status = 'ENABLE';
      // let token = req.headers['authorization'];
      // var self = this;

      // if (count > 200) {
      //     count = 200;
      // }
      console.log("suser", user);
      return new Promise((resolve, reject) => {
        if (user) {
          StoredProcedure.query(
            "call webandanh.getlist_file_user(?, ?)",
            [type_file, user.id],
            function(err, [data, server_status]) {
              if (err) {
                res.send(OutputInterface.errServer(err));
              }

              Promise.all(
                data.map(item => {
                  return new Promise((resolve, reject) => {
                    resolve({
                      ...item,
                      url_file: sails.config.url_service_upload + item.url_file
                    });
                  });
                })
              ).then(respone => {
                res.send(OutputInterface.success(respone));
              });
            }
          );
        } else res.send(OutputInterface.errServer("user k ton tai"));
      });
    } catch (error) {
      res.send(OutputInterface.errServer(error));
    }
  },
  postFile: async function(post_id, listFile) {
    return new Promise((resolve, reject) => {
      let dataInsert = [];
      for (var i = 0; i < listFile.length; i++) {
        dataInsert[i] = {
          filename: listFile[i].filename,
          url_file:
            "?hash=" +
            listFile[i].filename +
            "&type_file=" +
            listFile[i].type_file,

          post_id,
          type_file: listFile[i].type_file
        };
      }
      File_post.create(dataInsert).exec((err, listFilePost) => {
        if (err) {
          reject(err);
        }
        resolve(listFilePost);
      });
    });
  },
  readFile: function(req, res) {
    let filePath =
      appRoot +
      "/assets/images/upload/7ef9bd31-59fb-46aa-8abe-8ee0e2a70ec5.jpg";
    console.log("filepath", filePath);

    fs.exists(filePath, function(exists) {
      if (exists) {
        var img = fs.readFileSync(filePath);
        res.writeHead(200, { "Content-Type": "image/gif" });
        res.end(img, "binary");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File does not exist \n");
      }
    });
    // console.log('filePath',filePath)
    // //"/home/linhtd/Desktop/git/WebTamSuAnDanh/assets/images/upload/7ef9bd31-59fb-46aa-8abe-8ee0e2a70ec5.jpg"
    // fs.exists(filePath, function(exists){
    //   if (exists) {
    //     // Content-type is very interesting part that guarantee that
    //     // Web browser will handle response in an appropriate manner.
    //     res.writeHead(200, {
    //       "Content-Type": "application/octet-stream",
    //       "Content-Disposition": "attachment; filename=" + 'fileName'
    //     });
    //     fs.createReadStream(filePath).pipe(res);
    //   } else {
    //     res.writeHead(400, {"Content-Type": "text/plain"});
    //     res.end("ERROR File does not exist");
    //   }
    // });
  },
  delete_with_id: function(req, res) {
    let { file_id } = req.body;

    if (file_id) {
      //xoa lien ket file post
      File_post.destroy({ file_id }).exec((err, filepost) => {
        if (err) {
        }
        //xoa data file
        if (filepost) {
          fs.unlinkSync(filepost.url_file, error => {
            if (error) {
            }
            res.send(OutputInterface.success(filepost));
          });
        }
      });
    }
  }
};
