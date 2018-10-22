import React from "react";
import {
  NavDropdown,
  Navbar,
  NavItem,
  Nav,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

class HeaderPost extends React.Component {
  renderTooltip() {
    let data = this.props.listTag;
    let listTag = data.slice();
    listTag.shift();
    let length = listTag.length;
    if (length < 6) {
      return (
        <Tooltip id="tooltip">
          {listTag.map((user, index) => {
            console.log("fullname", user.fullname);
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
            {listTag[i].fullname}
          </span>
        );
      }
      let text = "và" + (length - 6) + " người khác...";
      jsx.push(<span style={{ float: "left", clear: "both" }}>{text}</span>);
      return jsx;
    }
  }
  renderListTag() {
    let listTag = this.props.listTag;

    // if (listTag && listTag.length) {
    //   return listTag.map(user => {
    //     return (
    //       <NavLink to={"/userpage." + user.username}>{user.fullname}</NavLink>
    //     );
    //   });
    if (listTag && listTag.length == 1) {
      return (
        <NavLink to={"/userpage." + listTag && listTag[0].username}>
          {listTag && listTag[0].fullname}
        </NavLink>
      );
    }
    if (listTag && listTag.length == 2) {
      return (
        <div>
          <NavLink to={"/userpage." + listTag && listTag[0].username}>
            {listTag && listTag[0].fullname}
          </NavLink>{" "}
          và{" "}
          <NavLink to={"/userpage." + listTag && listTag[1].username}>
            {listTag && listTag[1].fullname}
          </NavLink>
        </div>
      );
    }
    if (listTag && listTag.length > 2) {
      let jsxTooltip = this.renderTooltip();
      console.log("jsxTooltip", jsxTooltip);
      return (
        <React.Fragment>
          <NavLink to={"/userpage." + listTag && listTag[0].username}>
            {listTag && listTag[0].fullname}
          </NavLink>{" "}
          và
          <OverlayTrigger placement="top" overlay={jsxTooltip}>
            <div className="number-other-tag">
              {listTag.length - 1} người khác{" "}
            </div>
          </OverlayTrigger>
        </React.Fragment>
      );
    }

    return null;
  }
  render() {
    let { feel, listTag } = this.props;
    return (
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          alignItems: "center",
          paddingRight: "7px",
          paddingLeft: "7px"
        }}
        className="list-tag-feel remove-padding-col "
      >
        <div
          style={{
            display: feel ? "flex" : "none",
            padding: "7px",
            alignItems: "center",
            marginRight: "3px"
          }}
        >
          đang{" "}
          <img
            style={{ marginLeft: "3px", marginRight: "3px" }}
            src={feel.url_image}
          />{" "}
          cảm thấy{" "}
          <div
            style={{ color: "green", marginLeft: "3px", marginRight: "3px" }}
          >
            {feel ? feel.feelname : null}
          </div>
        </div>
        <div
          style={{
            display: listTag && listTag.length > 0 ? "block" : "none",
            marginRight: "3px"
          }}
          className="text-tag"
        >
          cùng với
        </div>
        {this.renderListTag()}
      </div>
    );
  }
}
module.exports = HeaderPost;
