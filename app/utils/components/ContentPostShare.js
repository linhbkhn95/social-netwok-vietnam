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
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalShare from "./ModalShare";
import Lightbox from "react-images";
import HeaderPost from "./HeaderPost";

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

class Post extends React.Component {
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

  componentDidMount() {
    let self = this;
    console.log("socket like," + this.props.idPost + "like");

    io.socket.on(this.props.idPost + "like", function(data) {
      console.log("Socket like`" + data.id + "` joined the party!", data);

      switch (data.type) {
        case "like":
          self.accessLike(data);
      }
    });
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

  render() {
    let self = this;
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
      <div className="content-share">
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
        <div style={{ clear: "both" }} className="user-answer">
          <div className="user-avatar">
            {this.props.incognito ? (
              <img className="img-user" src="/images/user/robot.png" />
            ) : (
              <NavLink to={"/userpage." + this.props.userPost.username}>
                <img
                  className="img-user"
                  src={this.props.userPost.url_avatar}
                />
              </NavLink>
            )}

            {/* <img className="img-user" src={this.props.incognito?"/images/user/robot.png":this.props.userPost.url_avatar} /> */}
          </div>
          <div>
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
              <div style={{ marginLeft: "3px" }} className="icon-police-post">
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
        <div className="col-md-12 remove-padding-col">
          <ContainerFile post_id={this.props.idPost} />
        </div>
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return { auth: state.auth };
})(Post);
