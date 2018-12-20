import React from "react";
import {
  NavDropdown,
  Navbar,
  NavItem,
  Nav,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import NavLinkUtils from "app/utils/modal/NavLink_Popup";
import Skeleton from 'react-loading-skeleton';

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

    let {userPost,listTag} = this.props;

    // if (listTag && listTag.length) {
    //   return listTag.map(user => {
    //     return (
    //       <NavLinkUtils to={"/userpage." + user.username}>{user.fullname}</NavLinkUtils>
    //     );
    //   });
    if (listTag && listTag.length == 1) {
      return (
        <NavLinkUtils user_id = {listTag[0].id} to={"/userpage." + listTag[0].username}>
          {listTag[0].fullname}
        </NavLinkUtils>
      );
    }
    if (listTag && listTag.length == 2) {
      return (
        <React.Fragment>
          <NavLinkUtils style={{ marginRight: "3px" }}  user_id = {listTag[0].id} to={"/userpage." + listTag[0].username}>
            {listTag && listTag[0].fullname}
          </NavLinkUtils>{" "}
          <div style={{ float: "left"}}>và </div>
          <NavLinkUtils
            user_id = {listTag[1].id}
            style={{ wordBreak: " break-word" }}
            to={"/userpage." + listTag[1].username}
          >
            {listTag[1].fullname}
          </NavLinkUtils>
        </React.Fragment>
      );
    }
    if (listTag && listTag.length > 2) {
      let jsxTooltip = this.renderTooltip();
      return (
        <React.Fragment>
          <NavLinkUtils  style={{ marginRight: "3px" }} user_id = {listTag[0].id} to={"/userpage." + listTag[0].username}>
            {listTag[0].fullname}
          </NavLinkUtils>{" "}
          <div style={{ float: "left", marginRight: "3px" }}>và </div>
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
    let { feel, listTag, userPost, incognito } = this.props;
    return (
      <div
        style={{
          fontSize: "13px",
          alignItems: "center",
          paddingRight: "7px"
        }}
        className="list-tag-feel remove-padding-col "
      >
        {userPost ? (
          <NavLinkUtils user_id = {userPost.id} to={"/userpage." + userPost.username}>
            {userPost.fullname}
          </NavLinkUtils>
        ) :null}
        {incognito ? "Người lạ" : ""}
        {/* <a style={{float:'left'}}>Trinh linh</a> */}
        {feel ? (
          <div
            style={{
              display: feel ? "flex" : "none",

              alignItems: "center",
              float: "left"
            }}
            className="div-feel"
          >
            đang{" "}
            <img
              style={{ marginLeft: "3px", marginRight: "3px" }}
              src={feel ? feel.url_image : null}
            />{" "}
            cảm thấy{" "}
            <div
              style={{
                color: feel.colorText,
                marginLeft: "3px",
                marginRight: "3px"
              }}
            >
              {feel ? feel.feelname : null}
            </div>
          </div>
        ) : null}
        <div
          style={{
            display: listTag && listTag.length > 0 ? "block" : "none",
            marginRight: "3px",
            float: "left"
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
