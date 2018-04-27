import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import {RadioGroup, Radio} from 'react-radio-group'
import ContentAnDanh from './ContentAnDanh'
import ContentQuestion from './ContentQuestion'
class ModalPost extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          TYPEPOST:'TSAD',
          dataPost:{

          }

      }
    }
    onChange(type,event){
      if(event.target)
         this.state[type] = event.target.value
      else{
        this.state.dataPost[type] = event
      }
      this.setState(this.state)
    }
    post(){
      io.socket.post('/post/postStatus',this.state.dataPost,function(resdata,jwres){
         
      })
       this.props.access()
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
                 <h5 className="col-md-3"> Bạn muốn <i className="fa fa-info" aria-hidden="true"></i> </h5>
                 <div className="col-md-4">
                  <select onChange={this.onChange.bind(this,"TYPEPOST")}  className="form-control">
                      <option value="TSAD">Tâm sự ẩn danh  </option>
                      <option value="HBB">Hỏi bạn bè </option>
                  </select>
                 </div>
                 </div>
                </div>
                  {/* <div className="" >
                       
                        <RadioGroup
                                    name="radiogroup"
                                    onChange={this.handleChange.bind(this)}
                                     selectedValue={this.state.radiogroup}
                                   >
                                   <div className="col-md-12">
                                     <label>
                                      <Radio value="ISSSN" />Tâm sự cùng người lạ
                                    </label>
                                    </div>
                                    <div className="col-md-12">
                                    <label>
                                      <Radio value="ISIRS" /> Hỏi câu hỏi đến bạn bè
                                    </label>
                                    </div>
                                  
                                   
                         </RadioGroup>
                        
                   </div> */}
               
                {/* <div className="row">
                    <h5 className="col-md-2" >Tiêu đê tâm sự <i className="fa fa-header" aria-hidden="true"></i></h5>
                    <div className="col-md-4" >
                        <input type="text" className="form-control" />
                    </div>
                    
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <textarea className="form-control" placeholder="Bạn đang nghĩ gì.." rows="5" id="comment"></textarea>
                  </div>
                </div> */}
                 {/* <ContentAnDanh /> */}
                {this.state.TYPEPOST=="TSAD"?<ContentAnDanh onChange={this.onChange.bind(this)} />: <ContentQuestion />}
                
              </div>

          </Modal.Body>
          <Modal.Footer>
            <Button   bsStyle="success" onClick={this.post.bind(this)}>Đăng</Button>
            <Button onClick={this.props.onHide}>Thoát</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports = ModalPost;