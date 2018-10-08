import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import {setCurrentUser} from 'app/action/authActions.js';
import {connect} from 'react-redux'
class ModalPost extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          
          userProfile:{

          }

      }
    }
    componentWillReceiveProps(nextProps){
        let self  = this
        if(nextProps.show){
            
            io.socket.get('/user/getProfile',((resdata,jwres)=>{
                if(resdata.EC==0){
                    self.setState({userProfile:resdata.DT})
                }
            }))
        }
        this.setState({err_msg:''})
    }
    onChange(type,event){
      if(event&&event.target)
         this.state.userProfile[type] = event.target.value
      else{
        this.state.userProfile[type] = event
      }
      this.setState(this.state)
    }
    add(){
      let self = this
      if(this.state.userProfile.fullname)
        io.socket.post('/user/updateProfile',this.state.userProfile,function(resdata,jwres){
            if(resdata.EC==0){
                self.props.dispatch(setCurrentUser(resdata.DT))
                self.props.access()

            }
            else{
            self.setState({err_msg:resdata.EM})
            }
        })
        else{
            self.setState({err_msg:"Họ tên không dc để trống"})

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
               <div className="title-modal-post"> Thay đổi thông tin người dùng ?</div>
               
               </div>
            
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="body-modal-post">
              <div>
                 <div className="row"> 
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i>Tên đăng nhập</h5>
                    <div className="col-md-4" >
                    <input disabled  value={this.state.userProfile.username} type="text" className="form-control" />

                    </div>
                    
                </div>
                <div className="row"> 
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i>Họ và tên</h5>
                    <div className="col-md-4" >
                    <input onChange={this.onChange.bind(this,'fullname')} value={this.state.userProfile.fullname} type="text" className="form-control" />

                    </div>
                    
                </div>
                {/* <div className="row"> 
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i>Giới tính</h5>
                    <div className="col-md-4" >
                    <input onChange={this.onChange.bind(this,'sex')} value={this.state.userProfile.sex} type="text" className="form-control" />

                    </div>
                    
                </div> */}
                <div className="row"> 
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i>Địa chỉ</h5>
                    <div className="col-md-4" >
                    <input onChange={this.onChange.bind(this,'address')} value={this.state.userProfile.address} type="text" className="form-control" />

                    </div>
                    
                </div>
              
              </div>
                <div style={{color:"red"}} className="col-md-12">{this.state.err_msg}</div>
              </div>
                
          </Modal.Body>
          <Modal.Footer>
            <Button   bsStyle="success" onClick={this.add.bind(this)}>Cập nhật</Button>
            <Button onClick={this.props.onHide}>Thoát</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports =connect(function(state){
    return{
    }})
   (ModalPost);