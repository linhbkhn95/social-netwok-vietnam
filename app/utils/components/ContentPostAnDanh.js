import React from "react";
import {
  NavDropdown,
  Navbar,
  NavItem,
  MenuItem,
  Nav,
  OverlayTrigger,
  Tooltip,
  Button
} from "react-bootstrap";
import { convertComment } from "../ConvertComment";
import ModalConfirm from "../modal/Modalconfirm";
import ContainerFile from "./ContainerFile";
var date = Date.now();
var datedemo = 151139964297;
import moment from "moment";
import Skeleton from 'react-loading-skeleton';

import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalShare from "./ModalShare";
import Lightbox from "react-images";
import Post from "./Post";
import HeaderPost from "./HeaderPost";
import NavLinkUtils from "app/utils/modal/NavLink_Popup";
const Msg = ({ closeToast }) => (
  <div style={{ borderBottom: "none" }} className=" alert-message">
    <NavLink to={"/"}>
      {" "}
      <div className="col-md-3 ">
        <NavLink to={"/userpage.5"}>
          <img className="avatar-alert" src="/images/user/linh.jpg" />
        </NavLink>
      </div>
      <div className="col-md-10 row">
        <NavLink to={"/userpage." + "1"}>
          {" "}
          <strong>Trịnh linh</strong>
        </NavLink>{" "}
        đã cmnt bài viet cua ban
        <br />
        <p className="time-alert">
          {moment(datedemo)
            .lang("vi")
            .fromNow()}
        </p>
      </div>
    </NavLink>
  </div>
);
const tooltip = (
  <Tooltip id="tooltip">
    <span>Trịnh đức Bảo Linh</span>
    <br />
    <span>Xuân Nguyễn</span>
    <br />
    <span>Nhỏ ngọc</span>
  </Tooltip>
);

class PostAnhDanh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayListComment: false,

      dataPostAccess: null,
      showModalConfirm: false,
      showModalShare: false,

      likeInfo: {
        listUserId: [],
        listUser: {}
      },
      dataPostShare: null
    };
  }
  closeModalShare() {
    this.setState({ showModalShare: false });
  }
  renderTooltip() {
    let { likeInfo } = this.state;
    let { listUserId, listUser } = likeInfo;
    let length = listUserId.length;
    if (length < 6) {
      return (
        <Tooltip id="tooltip">
          {listUserId.map(userId => {
            return (
              <div key={userId}>
                {" "}
                <span style={{ float: "left" }}>
                  {listUser[userId].fullname}
                </span>
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
            {listUser[listUserId[i]].fullname}
          </span>
        );
      }
      let text = "và" + (length - 6) + " người khác...";
      jsx.push(<span style={{ float: "left", clear: "both" }}>{text}</span>);
      return jsx;
    }
  }
  renderTextUserLike() {
    let likeInfo = this.state.likeInfo;
    let textListUserLike = "";
    let { listUser, listUserId } = likeInfo;
    if (listUserId.length > 0) {
      if (this.props.userLikePost) {
        textListUserLike += "Bạn,";
      }
      let length = listUserId.length;
      if (length > 2) {
        for (var i = 0; i < 2; i++) {
          if (listUserId[i] != this.props.auth.user.id)
            textListUserLike += " " + listUser[listUserId[i]].fullname + ",";
        }
        textListUserLike += " và " + (length - 2) + " người khác,";
      } else {
        for (var i = 0; i < length; i++) {
          if (listUserId[i] != this.props.auth.user.id)
            textListUserLike += " " + listUser[listUserId[i]].fullname + ",";
        }
      }

      textListUserLike = textListUserLike.substring(
        0,
        textListUserLike.length - 1
      );
    }
    // console.log('texListLike',textListUserLike)
    return textListUserLike;
  }
  componentDidMount() {
    let self = this;
    // console.log("socket like," + this.props.idPost + "like");

    io.socket.on(this.props.idPost + "like", function(data) {
      console.log("Socket like`" + data.id + "` joined the party!", data);

      switch (data.type) {
        case "like":
          self.accessLike(data);
      }
    });
  }
  accessLike(data) {
    this.props.accessLike(this.props.idPost, data.verb);
    switch (data.verb) {
      case "like": {
        var index = this.state.likeInfo.listUserId.indexOf(data.data.id);
        if (index == -1) {
          this.state.likeInfo.listUserId.push(data.data.id);
          this.state.likeInfo.listUser[data.data.id] = data.data;
          this.setState({ likeInfo: this.state.likeInfo });
        }
        break;
      }
      case "unlike": {
        var index = this.state.likeInfo.listUserId.indexOf(data.data.id);
        if (index > -1) {
          this.state.likeInfo.listUserId.splice(index, 1);
          delete this.state.likeInfo.listUser[data.data.id];
        }
        this.setState({ likeInfo: this.state.likeInfo });
        break;
      }
    }
  }

  async componentWillMount() {
    let self = this;

    console.log("componentWillMount contentStatus");

    io.socket.post(
      "/likepost/getlist_LikeFormatPost",
      { postId: this.props.idPost },
      (resdata, jwres) => {
        if (resdata.EC == 0) {
          self.state.likeInfo.listUser = resdata.DT.listUser;
          self.state.likeInfo.listUserId = resdata.DT.listUserId;
          self.setState({ likeInfo: self.state.likeInfo });
        }
      }
    );
  }
  comment() {
    this.props.displayListComment();
  }
  accessLikeUser() {
    switch (this.props.userLikePost) {
      case false: {
        var index = this.state.likeInfo.listUserId.indexOf(
          this.props.auth.user.id
        );
        if (index == -1) {
          this.state.likeInfo.listUserId.push(this.props.auth.user.id);
          this.state.likeInfo.listUser[
            this.props.auth.user.id
          ] = this.props.auth.user;
          this.setState({ likeInfo: this.state.likeInfo });
        }
        break;
      }
      case true: {
        var index = this.state.likeInfo.listUserId.indexOf(
          this.props.auth.user.id
        );
        if (index > -1) {
          this.state.likeInfo.listUserId.splice(index, 1);
          delete this.state.likeInfo.listUser[this.props.auth.user.id];
        }
        this.setState({ likeInfo: this.state.likeInfo });
        break;
      }
    }
  }
  like() {
    this.accessLikeUser();
    this.props.like(this.props.idPost);
  }
  share() {
    this.setState({ showModalShare: true, dataPostShare: this.props.post });
  }
  access() {
    let self = this;
    if (this.state.dataPostAccess) {
      io.socket.post(
        "/post/deletePost",
        { idPost: this.state.dataPostAccess },
        function(resdata, jwres) {
          if (resdata.DT) {
            self.props.deletePost(resdata.DT[0]);
            toast.success("Xóa bài thành công !", {
              position: toast.POSITION.TOP_LEFT
            });
          } else {
            toast.error("Xóa bài không thành công !" + resdata.EM, {
              position: toast.POSITION.TOP_LEFT
            });
          }
        }
      );
    }
    this.setState({ showModalConfirm: false });
  }
  accessShare() {
    this.setState({ showModalPost: false });
    toast.success("Đăng bài thành công !", {
      position: toast.POSITION.TOP_LEFT
    });
    //   this.props.addPost(postmodel)
  }
  closeModalConfirm() {
    this.setState({ showModalConfirm: false });
  }
  showModalConfirm() {
    this.setState({
      showModalConfirm: true,
      dataPostAccess: this.props.idPost
    });
  }
  render() {
    let self = this;
    let texListLike = "";
    texListLike = this.renderTextUserLike();
    let jsxAtribute;
    let { type_post } = this.props.post;
    if (type_post == 2)
      jsxAtribute = (
        <React.Fragment>
          đã chia sẻ{" "}
          <NavLink
            style={{ marginRight: "5px", marginLeft: "5px" }}
            to={"/post.notifi." + this.props.post.postId_parent}
          >
            bài viết
          </NavLink>{" "}
        </React.Fragment>
      );
    return (
      <div>
        {this.props.subject&&this.props.subjectId||this.props.title?<header>
          <div className="pull-left title-post">
            <i className="fa fa-header" aria-hidden="true" /> {this.props.title}{" "}

          </div>
          <div>
            {" "}
            <div className="pull-right title-post">
              <i
                style={{ marginRight: "3px" }}
                className="fa fa-flag-o"
                aria-hidden="true"
              />
              {this.props.subject ? this.props.subject.subjectname : ""}
            </div>
          </div>
        </header>:null}
        <div className="user-answer">
          <div className="user-avatar">
            {this.props.incognito ? (
              <img className="img-user" src="/images/user/robot.png" />
            ) :  this.props.userPost? (
              <NavLink
                style={{ marginRight: "5px" }}
                to={"/userpage." + this.props.userPost.username}
              >
                <img
                  className="img-user"
                  src={this.props.userPost.url_avatar}
                />
              </NavLink>
            ):<Skeleton count={2} />}

            {/* <img className="img-user" src={this.props.incognito?"/images/user/robot.png":this.props.userPost.url_avatar} /> */}
          </div>

          <div>
            {" "}
            <div className="user-detail">
              <div className="user-name">
                {/* {this.props.incognito?"Người lạ":<NavLink to={"/userpage."+this.props.userPost.username}>{this.props.userPost.fullname}</NavLink>} */}
                <HeaderPost
                  incognito={this.props.incognito}
                  userPost={this.props.userPost}
                  listTag={this.props.post.listUserTag}
                  feel={this.props.post.feel}
                />
                {jsxAtribute}
              </div>
              {this.props.userWall ? (
                <div style={{ display: "flex" }}>
                  <i
                    style={{
                      float: "left",
                      fontSize: "17px",
                      color: "black",
                      marginLeft: "-3px",
                      marginRight: "5px"
                    }}
                    className="fa fa-caret-right"
                    aria-hidden="true"
                  />
                  <div className="user-name">
                    <NavLink to={"/userpage." + this.props.userWall.username}>
                      {this.props.userWall.fullname}
                    </NavLink>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="time">
              <p className="">
                {moment(this.props.time)
                  .lang("vi")
                  .fromNow()}
              </p>
              {/* <i title="Công khai" className="fas fa-globe-asia"></i> */}
              <div className="icon-police-post">
                <img
                  title={
                    this.props.post.police
                      ? this.props.post.police.policename
                      : "Công khai"
                  }
                  src={
                    this.props.post.police
                      ? this.props.post.police.url_image
                      : "/images/icons/police/internet.png"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content-asw">{this.props.content}</div>

        <ContainerFile post_id={this.props.idPost} />
        {this.props.post.type_post == 2 ? (
          <Post postId={this.props.post.postId_parent} />
        ) : null}
        {this.state.likeInfo.listUserId.length ? (
          <div className=" content-like-post row">
            <div className="">
              <OverlayTrigger placement="top" overlay={this.renderTooltip()}>
                <i
                  style={{ marginRight: "2px", float: "left" }}
                  className="far fa-thumbs-up"
                  aria-hidden="true"
                />
              </OverlayTrigger>
            </div>
            <div style={{ fontSize: "11px", color: "green" }}>
              {texListLike}
            </div>
          </div>
        ) : null}
        {this.props.hideFooter ? null : (
          <div
            // style={{ marginLeft: "0px", marginRight: "0px" }}
            className="footer-post row"
          >
            <div
              onClick={this.like.bind(this)}
              className="btn-footer-post btn-heart"
            >
              <span className="count-action"> {this.props.countLike}</span>
              <i
                style={{
                  WebkitTextStroke: this.props.userLikePost
                    ? "1.2px #33771a"
                    : "1.2px #a9a1a1"
                }}
                className="far fa-thumbs-up"
                aria-hidden="true"
              />{" "}
              {this.props.userLikePost ? "Bỏ thích" : "Thích"}
            </div>
            <div
              onClick={this.comment.bind(this)}
              className="btn-footer-post btn-comment"
            >
              <span className="count-action">{this.props.lengthComment} </span>
              <i className="far fa-comment-alt" aria-hidden="true" />
              Bình luận
            </div>
            <div
              onClick={this.share.bind(this)}
              className="btn-footer-post btn-share"
            >
              <span className="count-action">
                {this.props.post.count_share}
              </span>
              <i className="fas fa-share" aria-hidden="true" />
              Chia sẻ
            </div>
            <div className="btn-more">
              <NavDropdown
                style={{ color: "green" }}
                eventKey={3}
                id="basic-nav-dropdown"
              >
                <MenuItem
                  onClick={this.showModalConfirm.bind(this, this.props.id)}
                  eventKey={3.1}
                >
                  <i
                    style={{ marginRight: "10px" }}
                    className="fa fa-ban"
                    aria-hidden="true"
                  />{" "}
                  Xóa bài đăng
                </MenuItem>

                <MenuItem eventKey={3.2}>
                  <i
                    style={{ marginRight: "10px" }}
                    className="fa fa-minus"
                    aria-hidden="true"
                  />
                  Ẩn bài đăng
                </MenuItem>
              </NavDropdown>
            </div>
          </div>
        )}

        <ModalConfirm
          show={this.state.showModalConfirm}
          access={this.access.bind(this)}
          close={this.closeModalConfirm.bind(this)}
        />
        {this.props.hideFooter ? null : (
          <ModalShare
            post={this.state.dataPostShare}
            access={this.accessShare.bind(this)}
            show={this.state.showModalShare}
            onHide={this.closeModalShare.bind(this)}
          />
        )}
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return { auth: state.auth };
})(PostAnhDanh);
