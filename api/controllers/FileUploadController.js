/**
 * FileUploadController
 *
 * @description :: Server-side logic for managing fileuploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
     upload_image:function(req,res){
       try {

        let data ={}
        console.log(req.file('files'))
       req.file('files').upload({
         uploadMultiple: true,

          // don't allow the total upload size to exceed ~100MB
          maxBytes: 100000000,
          // set the directory
          dirname: '../../assets/images/upload'
        }, async function (err, uploadedFile) {
          // if error negotiate
          if (err) return res.send(OutputInterface.errServer(err));

            //  data.url_image_gobal = uploadedFile[0].fd
            let result=[]
            for(var i=0 ;i<uploadedFile.length;i++){
              var img = uploadedFile[i].fd.split("/");
                let datafile={}
                datafile.url = '/images/upload/'+img[img.length-1]
                datafile.fileName = uploadedFile[i].filename
                result[i] = datafile

            }

          // data.url_image = '/images/user/'+img[img.length-1]
          // User.update({id:req.session.user.id},{url_cover:data.url_image}).exec((err,gt)=>{
          //   if(err){
          //       res.send(OutputInterface.errServer(err))
          //   }
          //   res.send(OutputInterface.success(gt))
          // })
          res.send(OutputInterface.success(result))



        });
       } catch (error) {
        res.send(OutputInterface.errServer(error))
       }


     },
     //lấy danh sách file upload theo postid
     getFilePostId:function(req,res){
       try {
          let {post_id} = req.body
          return new Promise((resolve,reject)=>{
              if(post_id){
                File_post.find({post_id}).exec((err,listFile)=>{
                      if(err){
                        res.send(OutputInterface.errServer(err))
                      }
                      res.send(OutputInterface.success(listFile))
                    })

              }
              else
              res.send(OutputInterface.errServer('bài post k tồn tai'))
            })

       } catch (error) {
           res.send(OutputInterface.errServer(error))

       }

     },
     postFile:async function(post_id,listFile){
       return new Promise((resolve,reject)=>{
            let dataInsert = []
            for(var i=0;i<listFile.length;i++){
              dataInsert[i] = {
                filename : listFile[i].filename,
                url_file :listFile[i].url,
                post_id,
                type_file:"img"
              }
            }
            File_post.create(dataInsert).exec((err,listFilePost)=>{
                if(err){
                  reject(err)

                }
                resolve(listFilePost)


            })
       })

     }
};

