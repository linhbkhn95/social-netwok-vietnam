import React from 'react';
import {NavLink} from 'react-router-dom';

import Toggle from 'react-toggle'
import "react-toggle/style.css"


class HeaderPost extends React.Component{
  constructor(props){
        super(props)
        this.state={
              toggle:true
        }
  }
  onChange(event){
      if(event.target.checked){
            this.setState({toggle:true})
      }
      else
             this.setState({toggle:false})
  }
  render(){
     return(

        <div className="col-md-12 post-wall " >
             <div className="col-md-8 hearder-post" >
                     <div className="question" >
                         <i className="fa fa-question" aria-hidden="true"></i> Câu hỏi

                     </div>
                     <div className="vote" >
                        <i className="fa fa-star" aria-hidden="true"></i> Bình chọn ảnh
                        </div>
                     {/* <div>
                     </div>      */}
              </div>

              <div className="col-md-12 input-post">
                    <input className="form-control" type="text" />
              </div>     
              
              <div className="col-md-12">
                   <div className="post-toggle" >
                     <Toggle
                        defaultChecked={this.state.toggle}
                        
                        onChange={this.onChange.bind(this)} /> 
                        < i className="text-toggle">Tâm sự ẩn danh</i>
                   </div>
                   <div className="btn-post">
                           <i className="fa fa-paper-plane" aria-hidden="true"></i> Đăng
                   </div>

              </div>
        </div>
     )
  }
}
module.exports =  HeaderPost;
