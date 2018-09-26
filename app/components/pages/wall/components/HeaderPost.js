import React from 'react';
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Infinite  from 'react-infinite'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import {connect} from 'react-redux'
import {setCurrentUser} from 'app/action/authActions.js';
import ModalSubject from './components/ModalSubject'
import ModalPost from './components/ModalPost'
class HeaderPost extends React.Component{
  constructor(props){
        super(props)
        this.state={
              toggle:false,
              showModalPost:false,
              showModalSubject:false,
              onBlur:false,

        }
  }


  showModalPost(){

             this.setState({showModalPost:true})

  }
  showModalSubject(){
    this.setState({showModalSubject:true})
  }
  closeModal(){
       this.setState({showModalPost:false})

  }
  closeModalSubject(){
    this.setState({showModalSubject:false})

    }
  onFocus(){
      this.setState({showModalPost:true})
  }
  onBlur(){

      this.setState({onBlur:true})

  }
  access(){
    this.setState({showModalPost:false})
     console.log('ok');
     toast.success( "Đăng bài thành công !", {
        position: toast.POSITION.TOP_LEFT
      });
    //   this.props.addPost(postmodel)
  }
  accessSubject(){
    this.setState({showModalSubject:false})
    toast.success( "Thêm chủ đề  thành công!", {
       position: toast.POSITION.TOP_LEFT
     });
  }


  render(){


     return(

        <div className="col-md-12 post-wall " >
             <div className="" >
                     <div className="question" >
                     <i className="fa fa-pencil" aria-hidden="true"></i> Viết bài

                     </div>
                     <div className="question" >
                       <input type="file" className="input-file-post" accept="image" title="Chọn file để tải lên" />
                        <i className="fa fa-camera-retro" aria-hidden="true"></i> Thêm ảnh/Video
                        </div>
                        <div className="question" >
                     <i className="fa fa-video-camera" aria-hidden="true"></i> Quay trực tiếp
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
                   <button  style={{float:"left",fontSize:"12px",padding:"3px 8px"}} onClick={this.showModalSubject.bind(this)} className="btn btn-success">
                           <i style={{color:"white"}} className="fa fa-plus" aria-hidden="true"></i> Thêm chủ đề  tâm sự
                   </button>
              </div>

                          <ModalSubject access={this.accessSubject.bind(this)} show={this.state.showModalSubject} onHide={this.closeModalSubject.bind(this)} />

              <ModalPost access={this.access.bind(this)} show={this.state.showModalPost} onHide={this.closeModal.bind(this)} />
        </div>
     )
  }
}
module.exports =connect(function(state){
  return{
      auth:state.auth,

  }})
 (HeaderPost);
