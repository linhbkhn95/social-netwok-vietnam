import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Relative from "./Relative";
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
import LayoutRight from "./LayoutRightPage";
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      file: null,
      info: {
        group: {
          police: {}
        }
      },
      showModalSubject: false
    };
  }
  componentDidMount() {
    let groupname = this.props.groupname;
    this.getData(groupname);
  }
  getData(groupname) {
    let sefl = this;
    if (groupname) {
      axios.post("/group/getInfo_with_user", { groupname }).then(res => {
        if (res.data.EC == 0) {
          sefl.setState({ info: res.data.DT });
        }
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    if (nextProps.groupname != this.props.groupname) {
      this.getData(nextProps.groupname);
    }
  }
  accessFollow() {
    let { groupname } = this.props;
    let self = this;
    io.socket.post("/follows/accessFollow", { groupname }, (resdata, jwres) => {
      if (resdata.EC == 0) {
        // self.props.dispatch(removeReqFriend(resdata.DT))

        self.state.info.follow = resdata.DT;
        self.setState({ info: self.state.info });
      }
    });
  }
  destroyFriend() {
    let { groupname } = this.props;
    let self = this;
    io.socket.post("/friends/cancel", { groupname }, (resdata, jwres) => {
      if (resdata.EC == 0) {
        // self.props.dispatch(removeReqFriend(resdata.DT))
        self.context.router.history.push("/userpage." + groupname);
      }
    });
  }
  _handleChange(e) {
    let self = this;
    e.preventDefault();
    let file = e.target.files[0];
    var fileName = file.name;
    this.setState({ file: e.target.files[0], fileName });
    self.fileUpload(e.target.files[0]).then(response => {
      if (response.data.EC == 0) {
        toast.success("Thành công", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
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
  leaveGroup = () => {
    let { groupname } = this.props;

    if (groupname) {
      axios.post("/group/leave", { group_id: groupname }).then(res => {
        if (res.EC == 0) {
          location.reload();
        }
      });
    }
  };
  joinGroup = () => {
    let { groupname } = this.props;

    if (groupname) {
      axios.post("/group/join", { group_id: groupname }).then(res => {
        if (res.EC == 0) {
          location.reload();
        }
      });
    }
  };
  render() {
    let { info } = this.state;

    let styleBanner = {
      // backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      backgroundImage: "url('" + info.group.image + "')"
    };
    return (
      <div className="container" style={{ marginTop: "-24px" }}>
        <div className="fix-product">
          <div className="row">
            <section id="user_main">
              <div className="col-md-2 remove-padding-col">
                <div className="left-group">
                  <h1 className="name-group">{info.group.groupname}</h1>
                  <div className="_19s_">
                    <span
                      data-hover="tooltip"
                      data-tooltip-content="Bất cứ ai cũng tìm được nhóm. Chỉ thành viên mới xem được những ai tham gia nhóm và những gì họ đăng."
                      id="js_6iw"
                    >
                      {info.group.police.id==1?<i className="fas fa-globe-americas"></i>:<i className="fa fa-lock" aria-hidden="true" />}
                      {info.group.police.policename}
                    </span>
                  </div>
                  <div className="list-meu">
                    <div className="menu-item">
                      <Link
                        className="_2yau"
                        to={"/groups/" + this.props.groupname + "/about"}
                      >
                        <span className="_2yav">Giới thiệu</span>
                      </Link>
                    </div>
                    <div className="menu-item">
                      <Link
                        to={"/groups/" + this.props.groupname}
                        className="_2yau"
                      >
                        <span className="_2yav">Thảo luận</span>
                      </Link>
                    </div>
                    <div className="menu-item">
                      <Link className="_2yau" to="/">
                        <span className="_2yav">Công bố</span>
                      </Link>
                    </div>

                    <div className="menu-item">
                      <Link
                        className="_2yau"
                        to={"/groups/" + this.props.groupname + "/members"}
                      >
                        <span className="_2yav">Thành viên</span>
                      </Link>
                    </div>
                    <div className="menu-item">
                      <Link
                        className="_2yau"
                        to={"/groups/" + this.props.groupname + "/videos"}
                      >
                        <span className="_2yav">Video</span>
                      </Link>
                    </div>

                    <div className="menu-item">
                      <Link
                        className="_2yau"
                        to={"/groups/" + this.props.groupname + "/images"}
                      >
                        <span className="_2yav">Ảnh</span>
                      </Link>
                    </div>
                    <div className="menu-item">
                      <Link className="_2yau" to="/">
                        <span className="_2yav">File</span>
                      </Link>
                    </div>
                  </div>
                  <div id="imaginary_container">
                    <div className="input-group stylish-input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tim kiem trong group"
                      />
                      <span className="input-group-addon">
                        <button type="submit">
                          <span className="glyphicon glyphicon-search" />
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-12 remove-padding-col list-group">
                    <div>
                      <div className="header">Lỗi tắt</div>
                      {/* <ListGroup/> */}
                    </div>
                    <div className="col-md-12 remove-padding-col">
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink
                          to={"/userpage." + this.props.auth.user.groupname}
                        >
                          <div className="icon">
                            <i
                              style={{ color: "#5d5b5b" }}
                              className="fa fa-users"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="name-group">CNTT-K58</div>
                          <div className="count-group">4</div>
                        </NavLink>
                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink
                          to={"/userpage." + this.props.auth.user.groupname}
                        >
                          <div className="icon">
                            <i
                              style={{ color: "#5d5b5b" }}
                              style={{ color: "#5d5b5b" }}
                              className="fa fa-users"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="name-group">SV-CVV</div>
                          <div className="count-group">2</div>
                        </NavLink>
                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink
                          to={"/userpage." + this.props.auth.user.groupname}
                        >
                          <div className="icon">
                            <i
                              style={{ color: "#5d5b5b" }}
                              style={{ color: "#5d5b5b" }}
                              className="fa fa-users"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="name-group">ReView Cát Bà</div>
                          <div className="count-group">+4</div>
                        </NavLink>
                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink
                          to={"/userpage." + this.props.auth.user.groupname}
                        >
                          <div className="icon">
                            <i
                              style={{ color: "#5d5b5b" }}
                              className="fa fa-users"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="name-group">Sống khỏe mỗi ngày</div>
                          <div className="count-group">4</div>
                        </NavLink>
                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink
                          to={"/userpage." + this.props.auth.user.groupname}
                        >
                          <div className="icon">
                            <i
                              style={{ color: "#5d5b5b" }}
                              className="fa fa-users"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="name-group">U23 Việt Nam</div>
                          <div className="count-group">+9</div>
                        </NavLink>
                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink
                          to={"/userpage." + this.props.auth.user.groupname}
                        >
                          <div className="icon">
                            <i
                              style={{ color: "#5d5b5b" }}
                              className="fa fa-users"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="name-group">CNTT-K58</div>
                          <div className="count-group">4</div>
                        </NavLink>
                      </div>
                    </div>

                    <div className="col-md-12 remove-padding-col list-group">
                      <div style={{ marginTop: "10px" }}>
                        <div className="header">Khám phá</div>
                        {/* <ListGroup/> */}
                      </div>
                      <div className="col-md-12 remove-padding-col">
                        <div className="col-md-12 remove-padding-col group">
                          <NavLink
                            to={"/userpage." + this.props.auth.user.groupname}
                          >
                            <div className="icon">
                              <i
                                style={{ color: "#1c8cc3" }}
                                className="fa fa-users"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="name-group">Nhóm</div>
                            <div className="count-group">4</div>
                          </NavLink>
                        </div>
                        <div className="col-md-12 remove-padding-col group">
                          <NavLink
                            to={"/userpage." + this.props.auth.user.groupname}
                          >
                            <div className="icon">
                              <i
                                style={{ color: "rgb(236, 90, 90)" }}
                                className="fa fa-calendar"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="name-group">Sự kiện</div>
                            <div className="count-group">2</div>
                          </NavLink>
                        </div>

                        <div className="col-md-12 remove-padding-col group">
                          <NavLink
                            to={"/userpage." + this.props.auth.user.groupname}
                          >
                            <div className="icon">
                              <i
                                style={{ color: "#8a6d3b" }}
                                className="fa fa-briefcase"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="name-group">Việc làm</div>
                            <div className="count-group">4</div>
                          </NavLink>
                        </div>
                        <div className="col-md-12 remove-padding-col group">
                          <NavLink
                            to={"/userpage." + this.props.auth.user.groupname}
                          >
                            <div className="icon">
                              <i class="fa fa-file-text-o" aria-hidden="true" />
                            </div>
                            <div className="name-group">Trang</div>
                            <div className="count-group">+4</div>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 remove-padding-col group-page">
                <div className="home-user">
                  <div className="banner" style={styleBanner}>
                    <div className="background-cover">
                      <div className="image-cover">
                        {" "}
                        {this.props.auth.user.groupname ==
                        this.props.groupname ? (
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
                    <div className="box-title hidden-xs">
                      <div className="content-right">
                        <ul>
                          <li className="li-layout">
                            {info.isMember == 1 ? (
                              <div
                                style={{
                                  paddingLeft: "0px",
                                  lineHeight: "35px"
                                }}
                                className="btn-friend"
                              >
                                <Dropdown id="dropdown-custom-1">
                                  <Dropdown.Toggle>Đã tham gia</Dropdown.Toggle>
                                  <Dropdown.Menu className="">
                                    <MenuItem
                                      onClick={this.leaveGroup}
                                      eventKey="1"
                                    >
                                      Rời khỏi nhóm
                                    </MenuItem>
                                    <MenuItem
                                      onClick={this.accessFollow.bind(this)}
                                      eventKey="2"
                                    >
                                      {" "}
                                      {info.isfollow ? (
                                        <i
                                          style={{ marginLeft: "-15px" }}
                                          className="fa fa-check"
                                          aria-hidden="true"
                                        />
                                      ) : null}
                                      Bỏ theo dõi nhóm
                                    </MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            ) : info.isMember == -1 ? (
                              <div
                                onClick={this.joinGroup}
                                className="btn-join"
                              >
                                <i className="fa fa-plus" aria-hidden="true" />
                                Tham gia
                              </div>
                            ) : (
                              <div
                                style={{ cursor: "none" }}
                                className="btn-join"
                              >
                                <i className="fas fa-pause" />
                                Chờ phê duyệt
                              </div>
                            )}
                          </li>
                          {info.isMember == 1 ? (
                            <li className="li-layout">
                              <div
                                style={{
                                  paddingLeft: "0px",
                                  lineHeight: "35px"
                                }}
                                className="btn-friend"
                              >
                                <Dropdown id="dropdown-custom-1">
                                  <Dropdown.Toggle>
                                    <Glyphicon
                                      style={{
                                        color: "green",
                                        fontSize: "11px",
                                        top: "0px"
                                      }}
                                      glyph="ok"
                                    />
                                    Thông báo
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
                                      Hủy nhân thông báo
                                    </MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </li>
                          ) : null}

                          <li
                            className="li-layout"
                            style={{ borderRight: "none" }}
                          >
                            {info.isMember == 1 ? (
                              <div
                                style={{
                                  paddingLeft: "0px",
                                  lineHeight: "35px"
                                }}
                                className="btn-friend"
                              >
                                <Dropdown id="dropdown-custom-1">
                                  <Dropdown.Toggle>
                                    <i
                                      className="fa fa-share"
                                      aria-hidden="true"
                                    />
                                    Chia sẻ
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
                            ) : null}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 remove-padding-col">
                  <div
                    className={
                      this.props.url_page != "images" &&
                      this.props.url_page != "videos"
                        ? "content-main col-md-8"
                        : "content-main col-md-12"
                    }
                  >
                    <div className="row">{this.props.children}</div>
                  </div>
                  {this.props.url_page != "images" &&
                  this.props.url_page != "videos" ? (
                    <div className="col-md-4 remove-padding-col">
                      <Relative />
                    </div>
                  ) : null}
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
