import axios from 'axios';

const USESOCKET = false;
module.exports = {
    post: function (url,body) {
        return new Promise((resolve,reject) => {
            if(USESOCKET) {
                io.socket.post(url,body, function (resData, jwres) {
                    if (jwres.statusCode == "200") {
                      resolve(resData);
                    } else {
                        resolve(null)
                    }
                  });
            } else {
                axios.post(url, body).then((res) => {
                    resolve(res.data);
                }).catch((err)=>{
                    resolve(null);
                });
            }
        });
    },
}
