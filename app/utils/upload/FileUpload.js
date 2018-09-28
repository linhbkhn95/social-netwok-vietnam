import axios from 'axios'

module.exports ={
    upload:function upload(files){
      const url = '/fileupload/upload_image';
      console.log('upload',files)

      const formData = new FormData();
      for(var i =0;i<files.length;i++){
        formData.append('files', files[i]);
      }


      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',


          }
      }
      return axios.post(url,formData,config)
    }


}
