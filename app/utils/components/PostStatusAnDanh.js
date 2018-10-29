import React from "react";
import { NavDropdown, Navbar, NavItem, MenuItem, Nav } from "react-bootstrap";
import { convertComment } from "../ConvertComment";
import ModalConfirm from "../modal/Modalconfirm";
var date = Date.now();
var datedemo = 151139964297;
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import ContentPostAnDanh from "./ContentPostAnDanh";
import { NavLink } from "react-router-dom";
class PostStatus extends React.Component {
  componentDidMount() {
    let self = this;
    io.socket.post(
      "/comment/getlist_WithPostId",
      { postId: this.props.post.id },
      (resdata, jwres) => {
        if (resdata.EC == 0) {
          self.setState({ listComment: resdata.DT });
        }
      }
    );
  }
  componentWillMount() {
    let self = this;
    // io.socket.on('comment', function (event) {

    //     if (event.verb === 'created') {
    //         console.log(event)
    //         if(event.data.postId==self.props.idPost){
    //             self.state.listComment.push(event.data)
    //             self.setState({ listComment: self.state.listComment });
    //         }

    //     }
    // });
    io.socket.on(this.props.post.id, function(data) {
      switch (data.type) {
        case "comment":
          self.acessSocket("listComment", data);

        // case "like" : self.accessLike(data);
      }
      // console.log('Socket `' + data.id + '` joined the party!',data);
    });
  }
  // accessLike(data){
  //     switch(data.verb){
  //         case "add" :
  //         this.state[type].push(data.data)
  //         this.setState(this.state);

  //     }
  // }
  acessSocket(type, data) {
    switch (data.verb) {
      case "add":
        this.state[type].push(data.data);
        this.setState(this.state);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      displayListComment: false,
      texRepComment: "",
      displayInputRepComment: {},
      listComment: [],
      showModalConfirm: false,
      commentAccess: null,
      listRepComment: [
        // {
        //     texRepComment:'kkkkk',
        //     time:Date.now(),
        //     listRepComment:[
        //         {
        //         texRepComment:'mmmm',
        //         time:Date.now(),
        //         listRepComment:[]
        //        }
        //     ]
        // },
        {
          texRepComment: "sss",
          time: Date.now(),
          id: 1,
          listRepComment: [
            {
              texRepComment: "mmmaaaam",
              time: Date.now(),
              id: 2,
              listRepComment: [
                {
                  texRepComment: "ssadfafafm",
                  time: Date.now(),
                  id: 3,
                  listRepComment: [
                    {
                      texRepComment: "ssadfafafm",
                      time: Date.now(),
                      id: 4,
                      listRepComment: []
                    }
                  ]
                }
              ]
            },
            {
              texRepComment: "mmmaaaam",
              time: Date.now(),
              id: 11,
              listRepComment: []
            },
            {
              texRepComment: "mmmaaaam",
              time: Date.now(),
              id: 12,
              listRepComment: []
            }
          ]
        }
        // {
        //     texRepComment:'âssda',
        //     time:Date.now(),
        //     listRepComment:[

        //     ]
        // }
      ]
    };
  }
  displayListComment() {
    // console.log("comment");
    this.setState({ displayListComment: !this.state.displayListComment });
  }

  share() {
    console.log("share");
  }
  deletePost() {
    if (this.props.post.id) {
      io.socket.post(
        "/post/deletePost",
        { idPost: this.props.post.id },
        function(resdata, jwres) {
          if (resdata.DT) {
            toast.success("Xóa bài thành công !", {
              position: toast.POSITION.TOP_LEFT
            });
          }
        }
      );
    }
  }
  repComment(e) {
    e.preventDefault();
    console.log(this.state.texRepComment);
    let comment = {};
    comment.text = this.state.texRepComment;
    (comment.postId = this.props.post.id),
      (comment.userId_comment = this.props.auth.user.id);
    this.postComment(comment);
  }
  postComment(data, id) {
    let self = this;
    // console.log("daaconenene", data);
    io.socket.post("/comment/create", data, (resdata, jwres) => {
      if (resdata.EC == 0) {
        self.state.listComment.push(resdata.DT);
        self.setState({ listComment: this.state.listComment });
        if (id) this.refs[id].value = "";
        else self.setState({ texRepComment: "" });
      } else {
        toast.error(resdata.EM, {
          position: toast.POSITION.TOP_LEFT
        });
      }
    });
  }
  repToRepComment(id, e) {
    e.preventDefault();
    let comment = {};
    comment.text = this.refs[id].value;
    // comment.time = Date.now()
    (comment.parentId = id), (comment.userId_comment = this.props.auth.user.id);
    comment.postId = this.props.post.id;
    // comment.id = Math.floor(Math.random()*(1000)+1)
    this.postComment(comment, id);
  }
  onChangeTextRepComment(e) {
    this.setState({ texRepComment: e.target.value });
  }

  showInputRep(id) {
    this.state.displayInputRepComment[id] = true;
    this.setState({
      displayInputRepComment: this.state.displayInputRepComment
    });
  }

  deleteComment(data) {
    this.setState({ showModalConfirm: true, commentAccess: data });
  }
  renderActive(data) {
    let self = this;
    if (data.listRepComment && data.listRepComment.length > 0) {
      // console.log("GroupMenu = " + data.GroupMenu)
      let classMenu = "";
      if (data.PRID) {
        classMenu = "dropdown-submenu";
      }

      // console.log(data,language)
      return (
        <div key={data.id} className="comment-item panel-body">
          {/* <img style={{width:"25px"}} className="img-user" src={data.incognito?"/images/user/robot.png":data.user_comment.url_avatar} /> */}
          {data.incognito ? (
            <img className="img-user" src="/images/user/robot.png" />
          ) : (
            <NavLink to={"/userpage." + data.user_comment.username}>
              <img className="img-user" src={data.user_comment.url_avatar} />
            </NavLink>
          )}
          <div className="col-md-10">
            <div className="text-rep">
              <span
                style={{
                  color: "rgb(21, 165, 65)",
                  fontSize: "12px",
                  fontWeight: " bold"
                }}
                className=""
              >
                {data.incognito ? (
                  "Người lạ " + data.user_comment.id
                ) : (
                  <NavLink to={"/userpage." + data.user_comment.username}>
                    {data.user_comment.fullname}
                  </NavLink>
                )}{" "}
              </span>
              {data.text}
              <div className="pull-right">
                <NavDropdown
                  style={{ color: "green" }}
                  eventKey={3}
                  id="basic-nav-dropdown"
                >
                  <MenuItem
                    onClick={self.deleteComment.bind(self, data)}
                    eventKey={3.1}
                  >
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa fa-ban"
                      aria-hidden="true"
                    />{" "}
                    Xóa bình luật
                  </MenuItem>
                  {/* <MenuItem eventKey={3.1}></MenuItem>
                              <MenuItem divider /> */}
                  <MenuItem eventKey={3.2}>
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa fa-minus"
                      aria-hidden="true"
                    />
                    Ẩn bình luận
                  </MenuItem>
                </NavDropdown>
              </div>
            </div>
            <div style={{ marginTop: "5px" }} className="time">
              <p style={{ color: "#604a50", cursor: "pointer" }}>Thích</p>
              <p style={{ color: "#604a50", cursor: "pointer" }}>Trả lời</p>
              <p style={{ float: "none" }} className="">
                {moment(data.time)
                  .lang("vi")
                  .fromNow()}
              </p>
            </div>
          </div>
          <div style={{ paddingLeft: "45px" }} className="">
            {data.listRepComment.map(c => self.renderActive(c))}
            <div className="img-rep-rep">
              {" "}
              <img src={self.props.auth.user.url_avatar} />{" "}
            </div>

            <div
              style={{ paddingRight: "0px", paddingLeft: "6px" }}
              className="col-md-10"
            >
              <form onSubmit={self.repToRepComment.bind(this, data.id)}>
                {" "}
                <input
                  ref={data.id}
                  placeholder="Viết bình luận ..."
                  type="text"
                  className="form-control input-repcomment"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={data.id}>
          <div className="img-rep-rep">
            {data.incognito ? (
              <img className="" src="/images/user/robot.png" />
            ) : (
              <NavLink to={"/userpage." + data.user_comment.username}>
                <img src={data.user_comment.url_avatar} />
              </NavLink>
            )}
          </div>

          <div className="col-md-10">
            <div className="text-rep">
              <span
                style={{
                  color: "rgb(21, 165, 65)",
                  fontSize: "12px",
                  fontWeight: " bold"
                }}
                className=""
              >
                {data.incognito ? (
                  "Người lạ " + data.user_comment.id
                ) : (
                  <NavLink to={"/userpage." + data.user_comment.username}>
                    {data.user_comment.fullname}
                  </NavLink>
                )}{" "}
              </span>
              {data.text}
              <div className="pull-right">
                <NavDropdown
                  style={{ color: "green" }}
                  eventKey={3}
                  id="basic-nav-dropdown"
                >
                  <MenuItem
                    onClick={self.deleteComment.bind(self, data)}
                    eventKey={3.1}
                  >
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa fa-ban"
                      aria-hidden="true"
                    />{" "}
                    Xóa bình luận{" "}
                  </MenuItem>
                  {/* <MenuItem eventKey={3.1}></MenuItem>
                              <MenuItem divider /> */}
                  <MenuItem eventKey={3.2}>
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa fa-minus"
                      aria-hidden="true"
                    />
                    Ẩn bình luận
                  </MenuItem>
                </NavDropdown>
              </div>
            </div>
            <div style={{ marginTop: "5px" }} className="time">
              <p style={{ color: "#604a50", cursor: "pointer" }}>Thích</p>
              <p
                onClick={self.showInputRep.bind(this, data.id)}
                style={{ color: "#604a50", cursor: "pointer" }}
              >
                Trả lời
              </p>
              <p className="">
                {moment(data.time)
                  .lang("vi")
                  .fromNow()}
              </p>
            </div>
          </div>
          <div
            style={{
              display: self.state.displayInputRepComment[data.id]
                ? "block"
                : "none",
              paddingLeft: "45px",
              marginBottom: "5px"
            }}
            className=""
          >
            <div className="img-rep-rep">
              {" "}
              <img src={self.props.auth.user.url_avatar} />{" "}
            </div>

            <div
              style={{ paddingRight: "0px", paddingLeft: "6px" }}
              className="col-md-11"
            >
              <form onSubmit={self.repToRepComment.bind(this, data.id)}>
                {" "}
                <input
                  ref={data.id}
                  placeholder="Viết bình luận ..."
                  type="text"
                  className="form-control input-repcomment"
                />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
  closeModalConfirm() {
    this.setState({ showModalConfirm: false });
  }
  access() {
    console.log("commentAccess", this.state.commentAccess);
    io.socket.post(
      "/comment/delete",
      { data: this.state.commentAccess },
      (resdata, jwres) => {
        if (resdata.EC == 0) {
        }
      }
    );
    this.setState({ showModalConfirm: false });
  }
  componentDidmount() {}
  render() {
    let self = this;
    var listComment = convertComment(this.state.listComment, {
      idKey: "id",
      parentKey: "parentId",
      childrenKey: "listRepComment"
    });
    return (
      <div style={{background:"white"}} className="col-md-12 post-status">
        <article className="post">
          <ContentPostAnDanh
            hideFooter={this.props.hideFooter}
            post={this.props.post}
            userWall={this.props.post.userWall}
            userPost={this.props.post.userPost}
            accessLike={this.props.accessLike}
            like={this.props.like}
            userLikePost={this.props.post.userLikePost}
            countLike={this.props.post.countLike}
            deletePost={this.props.deletePost}
            idPost={this.props.post.id}
            displayListComment={this.displayListComment.bind(this)}
            time={this.props.post.createdAt}
            title={this.props.post.title}
            subject={this.props.post.subject}
            content={this.props.post.content}
            incognito={this.props.post.incognito}
            lengthComment={this.state.listComment.length}
          />
          <div
            style={{
              display: this.state.displayListComment ? "block" : "none"
            }}
            className="list-comment row"
          >
            <div className="col-md-12 post-repcomment">
              {listComment.map(c => self.renderActive(c))}
            </div>
            <div
              style={{ paddingTop: "0px" }}
              className="col-md-12 post-repcomment"
            >
              <img className="img-user" src={this.props.auth.user.url_avatar} />

              <div className="col-md-11">
                <form onSubmit={this.repComment.bind(this)}>
                  {" "}
                  <input
                    value={this.state.texRepComment}
                    onChange={this.onChangeTextRepComment.bind(this)}
                    placeholder="Viết bình luận ..."
                    type="text"
                    className="form-control input-repcomment"
                  />
                </form>
              </div>
            </div>
            <div />
          </div>
        </article>
        <ModalConfirm
          show={this.state.showModalConfirm}
          access={this.access.bind(this)}
          close={this.closeModalConfirm.bind(this)}
        />
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return { auth: state.auth };
})(PostStatus);
