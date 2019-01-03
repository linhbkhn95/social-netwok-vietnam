import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { setCurrentUser } from "app/action/authActions.js";
import { connect } from "react-redux";
import SelectPolice from "app/utils/input/SelectPolice";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";

class ModalCreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {}
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   let self = this;
  //   if (nextProps.show) {
  //     io.socket.get("/user/getProfile", (resdata, jwres) => {
  //       if (resdata.EC == 0) {
  //         self.setState({ group: resdata.DT });
  //       }
  //     });
  //   }
  //   this.setState({ err_msg: "" });
  // }
  onChange(type, event) {
    if (event && event.target) this.state.group[type] = event.target.value;
    else {
      this.state.group[type] = event;
    }
    this.setState(this.state);
  }
  add() {
    let self = this;

    if (this.state.group.groupname)
      io.socket.post("/group/add", this.state.group, function(resdata, jwres) {
        if (resdata.EC == 0) {
          toast.success("Thành công", {
            position: toast.POSITION.TOP_CENTER
          });
          self.context.router.history.push("/groups/" + resdata.DT.id);
          self.props.access();
        } else {
          self.setState({ err_msg: resdata.EM });
        }
      });
    else {
      self.setState({ err_msg: "Tên nhóm không được để trống" });
    }
  }
  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            <div className="title-order">
              <div style={{ float: "left" }}>
                <i className="fa fa-users" aria-hidden="true" />
              </div>
              <div className="title-modal-post"> Tạo Nhóm mới</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-modal-post">
            <div>
              <div className="row">
                <h5 className="col-md-3 label-input">Tên nhóm</h5>
                <div className="col-md-7">
                  <input
                    onChange={this.onChange.bind(this, "groupname")}
                    value={this.state.group.groupname}
                    type="text"
                    placeholder="Nhập tên nhóm"
                    className="form-control"
                  />
                </div>
              </div>
              {/* <div className="row">
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i>Giới tính</h5>
                    <div className="col-md-4" >
                    <input onChange={this.onChange.bind(this,'sex')} value={this.state.group.sex} type="text" className="form-control" />

                    </div>

                </div> */}
              <div className="row">
                <h5 className="col-md-3 label-input">Mô tả nhóm</h5>
                <div className="col-md-7">
                  <textarea
                    rows={3}
                    placeholder="Nhập mô tả nhóm"
                    onChange={this.onChange.bind(this, "desc")}
                    value={this.state.group.address}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row select-police">
              <h5 className="col-md-3 label-input">Chính sách nhóm</h5>
              <div className="col-md-7">
                <SelectPolice
                  urlApi="/feel_post/getlist_option_police_group"
                  onChange={this.onChange.bind(this, "police")}
                />
              </div>
            </div>
            <div
              style={{ color: "#f71313", marginTop: "5px", fontSize: "13px" }}
            >
              {this.state.err_msg}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!this.state.group.groupname}
            bsStyle="success"
            onClick={this.add.bind(this)}
          >
            Tạo nhóm
          </Button>
          <Button onClick={this.props.onHide}>Thoát</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
ModalCreateGroup.contextTypes = {
  router: PropTypes.object.isRequired
};
module.exports = connect(function(state) {
  return {};
})(ModalCreateGroup);
