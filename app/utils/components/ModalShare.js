import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import {RadioGroup, Radio} from 'react-radio-group'
import ContentAnDanh from './ContentAnDanh'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ContentPostAnDanh from './ContentPostShare'
import FileUpload from 'app/utils/upload/FileUpload'
import ContentEditable from "react-contenteditable";

class ModalShare extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          TYPEPOST:'TSAD',
          dataPost:{

          },
          content:'',
          getFile:false

      }
    }
    componentWillReceiveProps(nextProps){

        this.setState({err_msg:''})
    }
    onChange(type,event){
      if(event&&event.target)
         this.state[type] = event.target.value
      else{
        this.state.dataPost[type] = event
      }
      this.setState(this.state)
    }
    post(files){
      let self = this
      let group_id = 1
      let type_post = 'post'
      let data = {...this.state.dataPost}
      data.group_id = group_id
      data.type_post = 1

      FileUpload.upload(files).then((response)=>{
            if(response.data.EC==0){


                  io.socket.post('/post/postStatus',{data,urls_file:response.data.DT},function(resdata,jwres){
                    console.log('resdataaaaaa',resdata)
                      if(resdata.EC==0){
                          self.props.access()

                      }
                      else{
                        self.setState({err_msg:resdata.EM})
                      }
                    })
                     toast.success('Thành công', {
                              position: toast.POSITION.TOP_CENTER
                          });
                          self.setState({getFile:false})

          }
      })


    }
    share(){
      let self = this
      let group_id = 1
      let type_post = 'post'
      let data = {}
      data.content = this.state.content
      data.postId_parent = this.props.post.id
      data.type_post = 2


          io.socket.post('/post/postStatus',{data},function(resdata,jwres){
            console.log('resdataaaaaa',resdata)
              if(resdata.EC==0){
                  self.props.access()

              }
              else{
                self.setState({err_msg:resdata.EM})
              }
            })
              toast.success('Thành công', {
                      position: toast.POSITION.TOP_CENTER
                  });
                  self.setState({getFile:false})




    }
    onChange(type, event) {
      this.state[type] = event.target.value;
      this.setState(this.state);
      // this.props.onChange(type, event.target.value);
    }
    render(){
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            <div className="title-order">

               <div className="title-modal-post">Chia sẻ trên dòng thời gian của bạn</div>

               </div>

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="body-modal-post">

               <div style={{display: 'flex-root'}}>
                  <ContentEditable
                    className="div-textarea"
                    html={this.state.content} // innerHTML of the editable div
                    disabled={false} // use true to disable edition
                    onChange={this.onChange.bind(this, "content")} // handle innerHTML change
                    tagName="article" // Use a custom HTML tag (uses a div by default)
                  />
                  {/* <ContentAnDanh sendFile={this.post.bind(this)} getFile={this.state.getFile} onChange={this.onChange.bind(this)} /> */}
                 {this.props.post? <ContentPostAnDanh hideFooter={true} post={this.props.post} userPost = {this.props.post.userPost} accessLike={()=>{}}  countLike ={this.props.post.countLike} deletePost={()=>{}} idPost={this.props.post.id}  time={this.props.post.createdAt} title={this.props.post.title} subject={this.props.post.subject} content={this.props.post.content} incognito={this.props.post.incognito}/>:null}
                <div className="col-md-12">{this.state.err_msg}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button   bsStyle="success" onClick={this.share.bind(this)}>Đăng</Button>
            <Button onClick={this.props.onHide}>Thoát</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  module.exports = ModalShare
