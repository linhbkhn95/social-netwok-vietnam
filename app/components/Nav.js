import { NavLink, Link } from "react-router-dom";
import React from "react";
import { NavDropdown, Navbar, NavItem, MenuItem, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import setAuthorizationToken from "app/utils/setAuthorizationToken.js";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { connect } from "react-redux";
import ListNotifi from "./ListNotification";
import ListSearch from "./ListSearch";

import ListRequestFrienfs from "./ListRequestFriends";
import ListFriend from "./ListFriend";
import ListChat from "./ListChat";
import { addNotification } from "app/action/actionNotification";
import { removeReqFriend, addReqFriend } from "app/action/actionReqFriend";
import { ToastContainer, toast } from "react-toastify";
import { isMoment } from "moment";
import ToastNotifiComponent from "app/utils/notifi/ToastNotifiComponent";
import moment from "moment";
import Toggle from "react-toggle";
import "react-toggle/style.css";

import { setCurrentUser } from "app/action/authActions.js";

class ToastNotifi extends React.Component {
  getClassIconNotifi(type) {
    switch (type) {
      case "like":
        return "far fa-thumbs-up";
      case "tag_post":
        return "fas fa-user-tag";
      case "comment":
        return "far fa-comment-alt";
      case "group":
        return "fa fa-users"
    }
  }
  redirect = (url)=>{
    this.context.router.history.push(url)
  }
  render() {
    let notifi = this.props.notifi;
    console.log("notifi", notifi);
    return (
      <div onClick={this.redirect(notifi.url_ref)} style={{ borderBottom: "none" }} className=" alert-message">
        <NavLink to={notifi.url_ref}>
          {" "}
          <div className="col-md-3 row">
            {notifi.incognito ? (
              <img className="avatar-alert" src="/images/user/robot.png" />
            ) : (
              <NavLink to={"/userpage." + notifi.user_notifi.username}>
                <img
                  className="avatar-alert"
                  src={notifi.user_notifi.url_avatar}
                />
              </NavLink>
            )}
          </div>
          <div className="col-md-10 row">
            {notifi.incognito ? (
              <strong>"Người lạ nào đó</strong>
            ) : (
              <NavLink to={"/userpage." + notifi.user_notifi.username}>
                {" "}
                <strong>{notifi.user_notifi.fullname}</strong>
              </NavLink>
            )}{" "}
            {notifi.text}
            <br />
            <div>
              {" "}
              <i
                style={{ marginRight: "3px", fontSize: "12px" }}
                className={
                  this.getClassIconNotifi(notifi.type)
                }
                aria-hidden="true"
              />{" "}
              <p style={{ float: "right" }} className="time-alert">
                {moment(notifi.time)
                  .lang("vi")
                  .fromNow()}
              </p>{" "}
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}
ToastNotifi.contextTypes = {
  router: PropTypes.object.isRequired
};
class NavContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  componentDidMount() {
    let self = this;
    let { dispatch } = this.props;
    axios.get("/auth/get_session").then(res => {
      if (res.data.EC == 0) {
        localStorage.setItem("jwToken", res.data.DT.token);
        setAuthorizationToken(res.data.DT.token);
        dispatch(setCurrentUser(jwtDecode(res.data.DT.token)));
      } else {
        localStorage.removeItem("jwToken");
        self.context.router.history.push("/login");
      }
    });

    io.socket.get("/notification/user", function gotResponse(data, jwRes) {

      io.socket.on("notifi_user" + data.userId, function(data) {
        console.log("addnotifi", data);

        toast(<ToastNotifi notifi={data} />, { autoClose: 500000 });
        self.props.dispatch(addNotification(data));
      });

      io.socket.on("notifi_user_requestFriend" + data.userId, function(data) {
        console.log("addnotifi", data);

        // toast(<ToastNotifi notifi={data}/>, {autoClose: 500000})
        if (data.friend.status == 0)
          self.props.dispatch(addReqFriend(data.user));
        else self.props.dispatch(removeReqFriend(data.user));
      });
    });
  }
  logOut() {
    let self = this;
    io.socket.post("/auth/logout", (resdata, jwres) => {
      if (resdata.EC == 0) {
        self.props.dispatch(setCurrentUser({}));
        self.context.router.history.push("/login");
      }
    });
  }
  componentWillMount() {
    let self = this;

    io.socket.get("/user/getIncognito", (resdata, jwres) => {
      console.log("dâdadadadad", resdata);
      if (resdata.EC == 0) self.setState({ toggle: resdata.DT });
    });
  }
  onChange(event) {
    let self = this;
    console.log("change", event);

    io.socket.post("/user/accessBehide", {}, (resdata, jwres) => {
      if (resdata.EC == 0) {
        self.props.dispatch(setCurrentUser(resdata.DT));
      }
    });
    if (event.target.checked) {
      this.setState({ toggle: true });
    } else this.setState({ toggle: false });
  }

  render() {
    return (
      <header className="header">
        <Navbar fixedTop={true} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="title-web" href="#brand">
                Tâm sự cùng người lạ
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {this.props.auth.isAuthenticated ? (
            <Navbar.Collapse>
              <Nav>
                {/* <NavItem eventKey={1} href="#">
                            Câu hỏi
                          </NavItem> */}
                <NavItem eventKey={2} href="#">
                  <div style={{ padding: "0px" }} className="post-toggle">
                    <Toggle
                      // defaultChecked={this.state.toggle}
                      checked={this.state.toggle}
                      onChange={this.onChange.bind(this)}
                    />
                    <i
                      style={{
                        fontSize: " 11px",
                        fontFamily: "inherit",
                        color: "#f3a023"
                      }}
                      className="text-toggle"
                    >
                      Tâm sự ẩn danh
                    </i>
                  </div>
                </NavItem>
               <ListSearch/>
                {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Câu hỏi</MenuItem>
                            <MenuItem eventKey={3.2}>Tag</MenuItem>
                            <MenuItem divider />
                          </NavDropdown> */}
              </Nav>
              <Nav pullRight>
                <NavItem
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "46px"
                  }}
                  eventKey={2}
                  href="#"
                >
                  <NavLink to={"/userpage." + this.props.auth.user.username}>
                    <div className="user-avatar">
                      <img
                        style={{ width: "31px", height: "31px" }}
                        className="img-user"
                        src={this.props.auth.user.url_avatar}
                      />
                    </div>
                    <div style={{ float: "left" }} className="">
                      <div className="user-name">
                        {this.props.auth.user.fullname
                          ? this.props.auth.user.fullname
                          : this.props.auth.user.username}
                      </div>
                    </div>
                  </NavLink>
                  {/* <i className="fa fa-user" aria-hidden="true"></i> */}
                </NavItem>
                <ListRequestFrienfs />
                {/* <NavItem style={{clear:""}} eventKey={2} href="#">
                                 <i className="fa fa-user-plus" aria-hidden="true"></i>
                         </NavItem> */}
                <NavItem eventKey={1} href="#">
                  <NavLink to="/wall">
                    {" "}
                    <i className="fa fa-home" aria-hidden="true" />
                  </NavLink>
                </NavItem>

                {/* <NavItem eventKey={2} href="#">
                              <i style={{color: "#5cb85c"}} className="glyphicon glyphicon-comment" aria-hidden="true"></i>
                          </NavItem> */}
                <ListChat />
                <ListNotifi />

                <NavDropdown eventKey={3} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Cài đặt</MenuItem>
                  {/* <MenuItem eventKey={3.1}></MenuItem>
                            <MenuItem divider /> */}
                  <MenuItem onClick={this.logOut.bind(this)} eventKey={3.2}>
                    Đăng xuất
                  </MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          ) : null}
        </Navbar>
        {this.props.auth.isAuthenticated ? <ListFriend /> : null}
      </header>
    );
  }
}

NavContent.contextTypes = {
  router: PropTypes.object.isRequired
};
module.exports = connect(function(state) {
  return {
    auth: state.auth
  };
})(NavContent);
