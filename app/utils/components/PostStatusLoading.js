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

  render() {
    let self = this;

    return (
      <div style={{ background: "white" }} className="col-md-12 post-status">
        <article className="post">


            {/* <div className="col-md-12 post-repcomment">
              {listComment.map(c => self.renderActive(c))}
            </div> */}


        
        </article>
      </div>
    );
  }
}
module.exports =

(PostStatus);
