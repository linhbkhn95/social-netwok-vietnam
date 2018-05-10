import React from 'react';
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import ModalPost from './components/ModalPost'
class HeaderPost extends React.Component{
  constructor(props){
        super(props)
        this.state={
              toggle:true,
              showModalPost:false,
              onBlur:false
        }
  }
 
  showModalPost(){
   
             this.setState({showModalPost:true})
      
  }
  closeModal(){
       this.setState({showModalPost:false})

  }
  onFocus(){
      this.setState({showModalPost:true})
  }
  onBlur(){
    
      this.setState({onBlur:true})

  }
  access(){
    this.setState({showModalPost:false})
    toast.success( "Đăng bài thành công !", {
        position: toast.POSITION.TOP_LEFT
      });

  }
  render(){
        
     return(

        <div className="col-md-12 post-wall " >
        <div className="" >
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
         <textarea className="form-control" placeholder="Bạn đang nghĩ gì.." rows="3" id="comment"></textarea>
         </div>     
         
         <div style={{paddingTop:"6px",paddingBottom:"2px"}} className="col-md-12">
             
              <button  style={{float:"right",fontSize:"12px",padding:"3px 8px"}} onClick={this.showModalPost.bind(this)} className="btn btn-success">
                      <i style={{color:"white"}} className="fa fa-paper-plane" aria-hidden="true"></i> Đăng
              </button>

         </div>

              <ModalPost username={this.props.username} access={this.access.bind(this)} show={this.state.showModalPost} onHide={this.closeModal.bind(this)} />
        </div>
     )
  }
}
module.exports =  HeaderPost;
