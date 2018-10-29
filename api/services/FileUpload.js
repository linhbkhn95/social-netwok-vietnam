module.exports = {
    getUrlFile:function(type_file,filename){
        return sails.config.url_service_upload+'?hash='+filename+'&type_file='+type_file;
    }
}
