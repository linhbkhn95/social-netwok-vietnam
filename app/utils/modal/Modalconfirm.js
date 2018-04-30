import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




class ModalDeleteProduct extends React.Component{   
  constructor(props){
    super(props)
    this.state = {
        listRole : null
    }
  }
    access(){
      
      this.props.access();
    }
    close(){
        this.props.close();
    }

    render(){
      let textButtonClose = this.props.textButtonClose ? this.props.textButtonClose :"Không"
      let textButtonAccess = this.props.textButtonAccess ? this.props.textButtonAccess :"Đồng ý"

      let headerModal = this.props.headerModal? this.props.headerModal :"Thông báo"
      let contentModal = this.props.contentModal? this.props.contentModal:"Bạn có chắc chắn không"
      return (
        <Modal 
        show={this.props.show} onHide={this.close.bind(this)}  bsSize="small" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg"><div style={{    fontSize: "15px",  fontWeight: "700", color: "#765e5e"}} className="title-order">{headerModal}</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">
                   <div className="col-md-12">{contentModal} ?</div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>{textButtonClose} </Button>
            <Button bsStyle="success" onClick={this.access.bind(this)}>{textButtonAccess}</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports = ModalDeleteProduct;