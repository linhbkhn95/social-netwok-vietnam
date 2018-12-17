import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ButtonToolbar,
  Popover,
  OverlayTrigger,
  Button,
  Dropdown,
  MenuItem,
  Glyphicon
} from "react-bootstrap";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import ModalEdit from "./ModalEditInfo";
import FileUpload from "app/utils/upload/FileUpload";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      file: null,
      info: {
        user: {}
      },
      showModalSubject: false
    };
  }
  componentDidMount() {
    let username = this.props.username;
    this.getData(username);
  }
  getData(username) {
    let sefl = this;
    if (username) {
      axios.post("/user/getInfo", { username }).then(res => {
        if (res.data.EC == 0) {
          sefl.setState({ info: res.data.DT });
        }
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.username != this.props.username) {
      this.getData(nextProps.username);
    }
  }
  accessFollow() {
    let { username } = this.props;
    let self = this;
    io.socket.post("/follows/accessFollow", { username }, (resdata, jwres) => {
      if (resdata.EC == 0) {
        // self.props.dispatch(removeReqFriend(resdata.DT))

        self.state.info.follow = resdata.DT;
        self.setState({ info: self.state.info });
      }
    });
  }
  destroyFriend() {
    let { username } = this.props;
    let self = this;
    io.socket.post("/friends/cancel", { username }, (resdata, jwres) => {
      if (resdata.EC == 0) {
        // self.props.dispatch(removeReqFriend(resdata.DT))
        self.context.router.history.push("/userpage." + username);
      }
    });
  }
  _handleChange(e) {
    let self = this;
    e.preventDefault();
    let file = e.target.files[0];
    var fileName = file.name;
    this.setState({ file: e.target.files[0], fileName });

    this.upload_file(item).then(resdata => {
    })

    // self.fileUpload(e.target.files[0]).then(response => {
    //   if (response.data.EC == 0) {
    //     toast.success("Thành công", {
    //       position: toast.POSITION.TOP_CENTER
    //     });
    //   }
    // });
  }
  _handleChangeCover(e) {
    let self = this;
    e.preventDefault();
    let file = e.target.files[0];
    var fileName = file.name;
    this.setState({ file: e.target.files[0], fileName });
    self.uploadCover(e.target.files[0]).then(response => {
      if (response.data.EC == 0) {
        toast.success("Thành công", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
  }
  uploadCover(file) {
    const url = "/user/updateCover";

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  fileUpload(file) {
    const url = "/user/updateAvatar";

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  showModalSubject() {
    this.setState({ showModalSubject: true });
  }
  closeModal() {
    this.setState({ showModalPost: false });
  }
  closeModalSubject() {
    this.setState({ showModalSubject: false });
  }
  accessSubject() {
    this.setState({ showModalSubject: false });
    toast.success("Thay đổi thông tin thành công!", {
      position: toast.POSITION.TOP_LEFT
    });
  }

  render() {
    let { info } = this.state;
    let styleBanner = {
      // backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // backgroundSize: "100% 100%",
      backgroundImage: "url('" + info.user.url_cover + "')"
    };
    return (
      <div className="container" style={{ marginTop: "-24px" }}>
        <div className="fix-product">
          <div className="row">
            <section id="user_main">
              <div style={{ paddingLeft: "0px" }} className="col-md-9">
                <div className="home-user">
                  <div className="banner" style={styleBanner}>
                    <div className="background-cover">
                      <div className="image-cover">
                        {" "}
                        {this.props.auth.user.username ==
                        this.props.username ? (
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "3px 7px",
                              fontSize: "11px",
                              float: "right"
                            }}
                            className=" btn-file"
                          >
                            <i
                              style={{ marginRight: "2px" }}
                              className="fa fa-camera"
                              aria-hidden="true"
                            />
                            Thay ảnh bìa{" "}
                            <input
                              onChange={this._handleChangeCover.bind(this)}
                              type="file"
                            />
                          </span>
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>

                  <div className="group-head">
                    <div className="bt-info">
                      <div className="img-left">
                        <div className="avatar-user">
                          <div
                            className="img-thumbnail itemImage"
                            style={{
                              backgroundImage:
                                "url(" + info.user.url_avatar + ")"
                            }}
                          >
                            <div
                              className="image-avatar"
                              style={{
                                width: "100%",
                                display: "",
                                background: "black",
                                color: "white"
                              }}
                            >
                              {this.props.auth.user.username ==
                              this.props.username ? (
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "3px 7px",
                                    fontSize: "11px"
                                  }}
                                  className=" btn-file"
                                >
                                  <i
                                    style={{ marginRight: "2px" }}
                                    className="fa fa-camera"
                                    aria-hidden="true"
                                  />{" "}
                                  Thay ảnh đại diện
                                  <input
                                    onChange={this._handleChange.bind(this)}
                                    type="file"
                                  />
                                </span>
                              ) : null}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="name-user">{info.user.fullname} </div>
                    </div>
                    <div className="box-title hidden-xs">
                      <div className="content-right">
                        <ul>
                          <li
                            className="li-layout"
                            style={{ borderLeft: "1px solid #ebe8e8" }}
                          >
                            <Link to={"/userpage." + this.props.username}>
                              {" "}
                              <p>
                                <span className="color-title">
                                  <i
                                    className="fa fa-paper-plane"
                                    aria-hidden="true"
                                  />
                                  Bài đăng
                                </span>
                                <span className="total_product">
                                  {info.countPost}{" "}
                                </span>
                              </p>
                            </Link>
                          </li>
                          <li className="li-layout">
                            <Link
                              to={
                                "/userpage." + this.props.username + "/friends"
                              }
                            >
                              {" "}
                              <p>
                                <span className="color-title">
                                  <i
                                    className="fa fa-users"
                                    aria-hidden="true"
                                  />
                                  Bạn bè
                                </span>
                                <span className="total_product">
                                  {info.countFriend}{" "}
                                </span>
                              </p>
                            </Link>
                          </li>
                          <li className="li-layout">
                            <Link
                              to={
                                "/userpage." + this.props.username + "/follows"
                              }
                            >
                              {" "}
                              <p>
                                <span className="color-title">
                                  <i
                                    style={{ color: "#19ab27" }}
                                    className="fas fa-id-card"
                                    aria-hidden="true"
                                  />{" "}
                                  Người theo dõi
                                </span>
                                <span className="total_product">
                                  {info.countFollow}{" "}
                                </span>
                              </p>
                            </Link>
                          </li>
                          <li className="li-layout">
                            <Link
                              to={
                                "/userpage." + this.props.username + "/images"
                              }
                            >
                              {" "}
                              <p>
                                <span className="color-title">
                                  <i
                                    className="fa fa-picture-o"
                                    aria-hidden="true"
                                  />
                                  Ảnh
                                </span>
                                <span className="total_product" />
                              </p>
                            </Link>
                          </li>

                          <li
                            className="li-layout"
                            style={{ borderRight: "none" }}
                          >
                            {info.isMe ? (
                              <button
                                onClick={this.showModalSubject.bind(this)}
                                style={{ padding: "2px 8px", fontSize: "12px" }}
                                className="btn btn-default"
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                />
                                Chỉnh sửa
                              </button>
                            ) : (
                              <div
                                style={{
                                  paddingLeft: "0px",
                                  lineHeight: "35px"
                                }}
                                className="btn-friend"
                              >
                                <Dropdown id="dropdown-custom-1">
                                  <Dropdown.Toggle>
                                    <Glyphicon glyph="star" />
                                    Bạn bè
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="">
                                    <MenuItem
                                      onClick={this.accessFollow.bind(this)}
                                      eventKey="1"
                                    >
                                      {" "}
                                      {info.follow && info.follow.status ? (
                                        <i
                                          style={{ marginLeft: "-15px" }}
                                          className="fa fa-check"
                                          aria-hidden="true"
                                        />
                                      ) : null}
                                      Nhận thông báo
                                    </MenuItem>
                                    <MenuItem eventKey="2">Bạn thân</MenuItem>

                                    <MenuItem divider />
                                    <MenuItem
                                      onClick={this.destroyFriend.bind(this)}
                                      eventKey="4"
                                    >
                                      Hủy kết bạn
                                    </MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{paddingLeft:"0px"}} className="col-md-9">
                <div className="content-main">
                 {this.props.children}
                </div>
              </div>
            </section>
          </div>
        </div>
        <ModalEdit
          access={this.accessSubject.bind(this)}
          show={this.state.showModalSubject}
          onHide={this.closeModalSubject.bind(this)}
        />
      </div>
    );
  }
}
Layout.contextTypes = {
  router: PropTypes.object.isRequired
};
module.exports = connect(function(state) {
  return { auth: state.auth };
})(Layout);
