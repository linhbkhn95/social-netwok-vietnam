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
            let result={}
            for(var i=0 ;i<uploadedFile.length;i++){
              var img = uploadedFile[0].fd.split("/");
                result[uploadedFile[i].filename] =              '/images/upload'+img[img.length-1]

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


     }
};

