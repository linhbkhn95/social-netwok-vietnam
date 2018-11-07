import React from "react";
import { convertComment } from "../ConvertComment";
import { NavDropdown, Navbar, NavItem, MenuItem, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import ModalConfirm from "../modal/Modalconfirm";

class ListComment extends React.Component {
  componentDidMount() {
    let self = this;
    io.socket.post(
      "/comment/getlist_WithPostId",
      { postId: this.props.post.id },
      (resdata, jwres) => {
        if (resdata.EC == 0) {
          self.props.countComment(resdata.DT.length);
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
        case "like":
          console.log("dataadadadaddadad", data.data);
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
  closeModalConfirm() {
    this.setState({ showModalConfirm: false });
  }
  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
  updateCountLike_comment(comment_id, count_like, isLike) {
    let { listComment } = this.state;
    let index = this.findWithAttr(listComment, "id", comment_id);
    if (index != -1) {
      listComment[index].count_like = count_like;
      listComment[index].isLike = isLike;
    }
    this.setState({ listComment });
  }
  likeComment(comment_id) {
    let self = this;
    io.socket.post("/comment/like", { comment_id }, (resdata, jwres) => {
      if (resdata.EC == 0) {
        self.updateCountLike_comment(
          comment_id,
          resdata.DT.countLike,
          resdata.DT.like
        );
      }
    });
  }
  renderActive(data) {
    let self = this;
    if (data.listRepComment && data.listRepComment.length > 0) {
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
          <div className="col-md-11">
            <div className="text-rep">
              <div style={{ float: "left" }}>
                <span
                  style={{
                    color: "rgb(21, 165, 65)",
                    fontSize: "12px",
                    fontWeight: " bold",
                    marginRight: "5px",
                    float: "left"
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
                <div
                  className="div-text-comment"
                  style={{ float: "left", wordBreak: "break-word" }}
                >
                  {data.text}
                </div>
                {data.count_like ? (
                  <div className="div-like-comment">
                    <i
                      style={{ marginRight: "2px", float: "left" }}
                      className="far fa-thumbs-up"
                      aria-hidden="true"
                    />{" "}
                    {data.count_like ? data.count_like : null}
                  </div>
                ) : null}
              </div>
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
                    Xóa bình luận
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
            <div style={{ marginBottom: "5px" }} className="time">
              <p
                onClick={self.likeComment.bind(self, data.id)}
                style={{ color: "#604a50", cursor: "pointer" }}
              >
                {data.isLike ? <div>Bỏ thích</div> : "Thích"}
              </p>
              <p
                onClick={self.showInputRep.bind(this, data.id)}
                style={{ color: "#604a50", cursor: "pointer" }}
              >
                Trả lời
              </p>
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
        <div className="data-comment" key={data.id}>
          <div className="img-rep-rep">
            {data.incognito ? (
              <img className="" src="/images/user/robot.png" />
            ) : (
              <NavLink to={"/userpage." + data.user_comment.username}>
                <img src={data.user_comment.url_avatar} />
              </NavLink>
            )}
          </div>

          <div className="col-md-11">
            <div className="text-rep">
              <div style={{ float: "left" }}>
                <span
                  style={{
                    color: "rgb(21, 165, 65)",
                    fontSize: "12px",
                    fontWeight: " bold",
                    marginRight: "5px",
                    float: "left"
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
                <div
                  className="div-text-comment"
                  style={{ float: "left", wordBreak: "break-word" }}
                >
                  {data.text}
                </div>
                {data.count_like ? (
                  <div className="div-like-comment" style={{ float: "left" }}>
                    <i
                      style={{ marginRight: "2px", float: "left" }}
                      className="far fa-thumbs-up"
                      aria-hidden="true"
                    />{" "}
                    {data.count_like ? data.count_like : null}
                  </div>
                ) : null}
              </div>

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
            <div className="time">
              <p
                onClick={self.likeComment.bind(self, data.id)}
                style={{ color: "#604a50", cursor: "pointer" }}
              >
                {data.isLike ? <div>Bỏ thích</div> : "Thích"}
              </p>
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
                ? "flex"
                : "none",
              clear: "both",
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

  showInputRep(id) {
    this.state.displayInputRepComment[id] = !this.state.displayInputRepComment[
      id
    ];
    this.setState({
      displayInputRepComment: this.state.displayInputRepComment
    });
  }

  deleteComment(data) {
    this.setState({ showModalConfirm: true, commentAccess: data });
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
  onChangeTextRepComment(e) {
    this.setState({ texRepComment: e.target.value });
  }
  postComment(data, id) {
    let self = this;
    // console.log("daaconenene", data);
    io.socket.post("/comment/create", data, (resdata, jwres) => {
      if (resdata.EC == 0) {
        self.state.listComment.push(resdata.DT);
        self.props.countComment(this.state.listComment.length);
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
  repComment(e) {
    e.preventDefault();
    console.log(this.state.texRepComment);
    let comment = {};
    comment.text = this.state.texRepComment;
    (comment.postId = this.props.post.id),
      (comment.userId_comment = this.props.auth.user.id);
    this.postComment(comment);
  }
  render() {
    let self = this;
    var listComment = convertComment(this.state.listComment, {
      idKey: "id",
      parentKey: "parentId",
      childrenKey: "listRepComment"
    });
    return (
      <React.Fragment>
        <div className="col-md-12 post-repcomment">
          {listComment.map(c => self.renderActive(c))}
          <ModalConfirm
            show={this.state.showModalConfirm}
            access={this.access.bind(this)}
            close={this.closeModalConfirm.bind(this)}
          />
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
      </React.Fragment>
    );
  }
}

module.exports = connect(function(state) {
  return { auth: state.auth };
})(ListComment);
