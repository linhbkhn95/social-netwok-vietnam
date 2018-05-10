import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import {RadioGroup, Radio} from 'react-radio-group'
import ContentAnDanh from './ContentAnDanh'
import ContentQuestion from './ContentQuestion'
class ModalPost extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          
          subject:{

          }

      }
    }
    componentWillReceiveProps(nextProps){
        this.setState({err_msg:''})
    }
    onChange(type,event){
      if(event&&event.target)
         this.state.subject[type] = event.target.value
      else{
        this.state.subject[type] = event
      }
      this.setState(this.state)
    }
    add(){
      let self = this
      if(this.state.subject.subjectname)
        io.socket.post('/subject/add',this.state.subject,function(resdata,jwres){
            if(resdata.EC==0){
                self.props.access()

            }
            else{
            self.setState({err_msg:resdata.EM})
            }
        })
        else{
            self.setState({err_msg:"Chủ đề tâm sự không được để  trống"})

        }
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
               <div className="title-modal-post"> Bạn muốn thêm chủ đề ?</div>
               
               </div>
            
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="body-modal-post">
              <div>
                 <div className="row"> 
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i> Chủ đề  tâm sự
</h5>
                    <div className="col-md-4" >
                    <input onChange={this.onChange.bind(this,'subjectname')} value={this.state.title} type="text" className="form-control" />

                    </div>
                    
                </div>
               
                <div className="row">
                  <div className="col-md-12">
                    <textarea onChange={this.onChange.bind(this,'note')} value={this.state.note} className="form-control" placeholder="Mô tả chủ đề  tâm sự" rows="3" id="comment"></textarea>
                  </div>
                </div>
              </div>
                <div style={{color:"red"}} className="col-md-12">{this.state.err_msg}</div>
              </div>
                
          </Modal.Body>
          <Modal.Footer>
            <Button   bsStyle="success" onClick={this.add.bind(this)}>Thêm</Button>
            <Button onClick={this.props.onHide}>Thoát</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports = ModalPost;