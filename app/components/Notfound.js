import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
class Notfound extends React.Component{
   
  
    
    render(){

        return(
             <div className="row">
            <div className="col-md-4 col-md-offset-3">
            <div></div>
            <div  className="alert alert-info">
              <strong>Thông báo</strong> trang không tồn tại
            </div>
            </div>
            </div>
        )
    }
}

Notfound.contextTypes = {
  router: PropTypes.object.isRequired
};
module.exports = Notfound