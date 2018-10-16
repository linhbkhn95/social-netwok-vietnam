import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import {RadioGroup, Radio} from 'react-radio-group'
import ContentAnDanh from './ContentAnDanh'
import ContentQuestion from './ContentQuestion'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import FileUpload from 'app/utils/upload/FileUpload'
class ModalPost extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          TYPEPOST:'TSAD',
          dataPost:{

          },
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
      FileUpload.upload(files).then((response)=>{
            if(response.data.EC==0){


                  io.socket.post('/post/postStatus',{data:this.state.dataPost,urls_file:response.data.DT},function(resdata,jwres){
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
    getFile(){
      this.setState({getFile:true})
    }

    render(){
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            <div className="title-order">
              <div style={{float:"left"}}>
                <i className="fa fa-commenting" aria-hidden="true"></i>---<i className="fa fa-question-circle" aria-hidden="true"></i>
              </div>
               <div className="title-modal-post"> Bạn muốn tâm sự điều gì ?</div>

               </div>

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="body-modal-post">
               {/* <div>
                  <div>
                     Hình thức tâm sự
                  </div> */}
               {/* </div> */}
               <div className="row">
                 <div>
                 <h5 className="col-md-3"> <i style={{marginRight:"10px"}} className="fa fa-info" aria-hidden="true"></i>Bạn muốn</h5>
                 <div className="col-md-4">
                  <select onChange={this.onChange.bind(this,"TYPEPOST")}  className="form-control">
                      <option value="TSAD">Tâm sự ẩn danh  </option>
                      <option value="HBB">Hỏi bạn bè </option>
                  </select>
                 </div>
                 </div>
                </div>

                {this.state.TYPEPOST=="TSAD"?<ContentAnDanh sendFile={this.post.bind(this)} getFile={this.state.getFile} onChange={this.onChange.bind(this)} />: <ContentQuestion />}
                <div className="col-md-12">{this.state.err_msg}</div>
              </div>

          </Modal.Body>
          <Modal.Footer>
            <Button   bsStyle="success" onClick={this.getFile.bind(this)}>Đăng</Button>
            <Button onClick={this.props.onHide}>Thoát</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  module.exports = ModalPost;
