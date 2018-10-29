import React from "react";
import Popup from "reactjs-popup";
import {
  ButtonToolbar,
  Popover,
  OverlayTrigger,
  Button,
  Dropdown,
  MenuItem,
  Glyphicon,
  Tooltip
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RestfulUtils from "../RestfulUtils";
class PopupInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }
  componentDidMount() {
    let self = this;
    RestfulUtils.post("/user/get_info_user", {
      patner_id: this.props.user_id
    }).then(res => {
      if (res.EC == 0) {
        self.setState({ userInfo: res.DT });
      }
    });
  }
  renderTooltip() {
    let data = this.state.userInfo.list_friends_general;
    let list_friends_general = data.slice();
    list_friends_general.shift();
    let length = list_friends_general.length;
    if (length < 6) {
      return (
        <Tooltip id="tooltip">
          {list_friends_general.map((user, index) => {
            return (
              <div key={index}>
                {" "}
                <span style={{ float: "left" }}>{user.fullname}</span>
                <br />{" "}
              </div>
            );
          })}
        </Tooltip>
      );
    } else {
      let jsx = [];

      for (var i = 0; i < 6; i++) {
        jsx.push(
          <span style={{ float: "left", clear: "both" }}>
            {list_friends_general[i].fullname}
          </span>
        );
      }
      let text = "và" + (length - 6) + " người khác...";
      jsx.push(<span style={{ float: "left", clear: "both" }}>{text}</span>);
      return jsx;
    }
  }
  renderListFriendGeneral() {
    let { userInfo } = this.state;
    let { list_friends_general } = userInfo;

 
    if (list_friends_general && list_friends_general.length == 1) {
      return (
        <NavLink
          user_id={list_friends_general[0].id}
          to={"/userpage." + list_friends_general[0].username}
        >
          {list_friends_general[0].fullname}
        </NavLink>
      );
    }
    if (list_friends_general && list_friends_general.length == 2) {
      return (
        <React.Fragment>
          <NavLink
            user_id={list_friends_general[0].id}
            to={"/userpage." + list_friends_general[0].username}
            style={{ marginRight: "3px" }}
          >
            {list_friends_general && list_friends_general[0].fullname}
          </NavLink>{" "}
          <div style={{ float: "left", marginRight: "3px" }}>và </div>
          <NavLink
            user_id={list_friends_general[1].id}
            style={{ wordBreak: " break-word" }}
            to={"/userpage." + list_friends_general[1].username}
          >
            {list_friends_general[1].fullname}
          </NavLink>
        </React.Fragment>
      );
    }
    if (list_friends_general && list_friends_general.length > 2) {
      let jsxTooltip = this.renderTooltip();
      return (
        <React.Fragment>
          <NavLink
            user_id={list_friends_general[0].id}
            to={"/userpage." + list_friends_general[0].username}
          >
            {list_friends_general[0].fullname}
          </NavLink>{" "}
          <div style={{ float: "left", marginRight: "3px" }}>và </div>

          <OverlayTrigger placement="top" overlay={jsxTooltip}>
            <div  style={{ wordBreak: " break-word",    fontSize: '12px',marginLeft:"0px",marginRight:"0px"}} className="number-other-tag">
              {list_friends_general.length - 1} người khác{" "}
            </div>
          </OverlayTrigger>
        </React.Fragment>
      );
    }

    return null;
  }
  render() {
    const { userInfo } = this.state;
    let avatarStyle = {
      backgroundImage: "url('" + userInfo.url_avatar + "')"
    };
    let coverStyle = {
      backgroundImage: "url('" + userInfo.url_cover + "')"
    };
    return (
      <div className="card">
        <div style={coverStyle} className="banner-popup">
          <div className="img-cover" />
        </div>
        <div className="info-user-popup">
          <div className="img-avatar">
            <div className="avatar-user">
              <div style={avatarStyle} className="thum-avatar" />
            </div>
          </div>

          <div className="info-data">
            <div className="name-user">{userInfo.fullname}</div>
            <div className="row-data">
              <div className="icon">
                <i className="fas fa-user-friends" />
              </div>
              {userInfo.list_friends_general ? (
                <div className="data">
                  <div style={{ float: "left", marginRight: "3px" }}>
                    {userInfo.list_friends_general.length}
                  </div>{" "}
                  <div style={{ float: "left", marginRight: "3px" }}>
                    bạn chung bao gồm{" "}
                  </div>
                  {this.renderListFriendGeneral()}
                </div>
              ) : null}
            </div>
            <div className="row-data">
              <div className="icon">
                <i className="fas fa-briefcase" />
              </div>
              <div className="data">
                {" "}
                <div style={{ float: "left", marginRight: "3px" }}>
                  Làm việc ở{" "}
                </div>
                <NavLink style={{ float: "left", marginRight: "3px" }} to="#">
                  SamSung Ltd{" "}
                </NavLink>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-popup">
          <div
            style={{ paddingLeft: "0px", lineHeight: "35px" }}
            className="btn-friend"
          >
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle>
                <Glyphicon glyph="star" />
                Bạn bè
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <MenuItem eventKey="1">
                  {" "}
                  <i
                    style={{ marginLeft: "-15px" }}
                    className="fa fa-check"
                    aria-hidden="true"
                  />
                  Nhận thông báo
                </MenuItem>
                <MenuItem eventKey="2">Bạn thân</MenuItem>

                <MenuItem divider />
                <MenuItem eventKey="4">Hủy kết bạn</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="btn-friend">
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle>
                <Glyphicon glyph="ok" />
                Đang theo dõi
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <MenuItem eventKey="1">
                  <Glyphicon glyph="ok" />
                  Theo dõi
                </MenuItem>

                <MenuItem eventKey="2">Hủy theo dõi</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="btn-join">
            <i className="fa fa-plus" aria-hidden="true" />
            Kết bạn
          </div>
        </div>
      </div>
    );
  }
}

export default props => {
  if (props.to)
    return (
      <Popup
        trigger={
          <NavLink to={props.to} style={props.style}>
            {props.children}
          </NavLink>
        }
        position="left center"
        on="hover"
        // closeOnDocumentClick
      >
        <PopupInfo user_id={props.user_id} />
      </Popup>
    );
  return null;
};
