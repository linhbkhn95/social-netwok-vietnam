import React from "react";
import { NavDropdown, Navbar, NavItem, MenuItem, Nav } from "react-bootstrap";
var date = Date.now();
var datedemo = 151139964297;
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import ContentPostAnDanh from "./ContentPostAnDanh";
import { NavLink } from "react-router-dom";
import ListComment from "app/utils/comment/ListComment";
class PostStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayListComment: false,
      countComment: 0
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

  getCountComment(countComment) {
    console.log('getCountComment',countComment)
    this.setState({ countComment });
  }
  componentDidmount() {}
  render() {
    let self = this;

    return (
      <div
        style={{ background: "white", display: "block", position: "relative" }}
        className="col-md-12 post-status"
      >
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
            lengthComment={this.state.countComment}
          />
          <div
            style={{
              display: this.state.displayListComment ? "block" : "none"
            }}
            className="list-comment row"
          >
            {/* <div className="col-md-12 post-repcomment">
              {listComment.map(c => self.renderActive(c))}
            </div> */}
            <ListComment
              countComment={this.getCountComment.bind(this)}
              post={this.props.post}
            />

            <div />
          </div>
        </article>
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return { auth: state.auth };
})(PostStatus);
