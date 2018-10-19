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
import axios from 'axios'
import FileFolderShared from 'material-ui/SvgIcon';

class HeaderPost extends React.Component{
  constructor(props){
        super(props)
        this.state={
              toggle:false,
              showModalPost:false,
              showModalSubject:false,
              onBlur:false,
              src:[],
              file:null,
              filename:''

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
    _handleChangeCover(e) {
      let self = this
      e.preventDefault();
      let src = []
      let file = e.target.files[0];
      var fileName = file.name;

      for(var i =0;i<e.target.files.length;i++){
        src[i] = URL.createObjectURL(e.target.files[i])
      }

      this.setState({ files: e.target.files, fileName,src: src })
      self.uploadCover(e.target.files).then((response)=>{
          if(response.data.EC==0){
              toast.success('Thành công', {
                              position: toast.POSITION.TOP_CENTER
                          });

          }
      })

    }
      uploadCover(files) {
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
  render(){


     return(

        <div className="col-md-12 post-wall " >
             <div className="" >
                     <div className="question" >
                     <i className="fas fa-pencil-alt" aria-hidden="true" /> Viết bài

                     </div>
                     <div className="question" >
                     <span style={{display:"flex",alignItems:"center",paddingTop:"1px"}} className=" btn-file">
                                      <i style={{marginRight:"3px",marginTop:"-1px"}} className="fa fa-camera" aria-hidden="true"></i> Thêm ảnh/Video
                                      <input name="files" multiple onChange={this._handleChangeCover.bind(this)} title="Chọn file để đăng" type="file" /></span>
                       {/* <input type="file" className="input-file-post" accept="image" title="Chọn file để tải lên" />
                        <i className="fa fa-camera-retro" aria-hidden="true"></i> Thêm ảnh/Video */}
                        </div>
                        <div className="question" >
                     <i className="fa fa-video-camera" aria-hidden="true"></i> Quay trực tiếp
                     </div>

                     {/* <div>
                     </div>      */}
              </div>
              <div style={{paddingTop:"8px",paddingBottom:"8px"}} className="col-md-12 remove-padding-col input-post">
              <div className="col-md-2 col-sm-2 div-avatar-post remove-padding-col">
                  <div className="user-avatar">
                            <img  className="img-user" src={this.props.auth.user.url_avatar} />
                 </div>
              </div>


                <div className="div-textarea col-md-10 col-sm-10 remove-padding-col" placeholder="Bạn đang nghĩ gì..."  contenteditable="true"></div>
              {/* <textarea className="form-control" placeholder="Bạn đang nghĩ gì.." rows="3" id="comment"></textarea> */}
              </div>
              {this.state.src.length>0?   <div className="col-md-12 div-list-img-post remove-padding-col ">

               {this.state.src.map((item,index)=>{
                 return(
                  <div  key={index}  style={{height:"100%"}} className="col-md-3">
                    <img style={{height:"100%"}}  src={item} />
          </div>
                 )

              })}
              </div>
              :null}
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
