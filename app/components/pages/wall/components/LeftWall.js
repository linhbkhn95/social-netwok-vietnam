import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavDropdown, Navbar, NavItem, MenuItem, Nav } from "react-bootstrap";
import axios from "axios";
import ListGroup from "./ListGroup";
import Skeleton from "react-loading-skeleton";
import ModalCreatGroup from './ModalCreateGroup'
class LeftWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listGroup: [],
      showModalCreateGroup:false
    };
  }
  componentDidMount() {
    let self = this;
    axios.get("/group/getTopOfUser").then(resdata => {
      if (resdata.data.EC == 0) {
        self.setState({ listGroup: resdata.data.DT });
      }
    });
  }
  openChat = ()=>{
    $("#messagerContainer").fadeToggle(300);
  }
  access=()=>{
      this.setState({showModalCreateGroup:false})
  }
  showModalCreateGroup=()=>{
    this.setState({showModalCreateGroup:true})
  }
  render() {
    return (
      <div className="col-md-12 remove-padding-col left-wall">
        <NavLink to={"/userpage." + this.props.auth.user.username}>
          <div className="user-avatar">
            <img
              style={{ width: "26px", height: "26px" }}
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
        <div className="col-md-12 remove-padding-col list-group">
          <div className="col-md-12 remove-padding-col">
            <div className="col-md-12 remove-padding-col group">
              <NavLink to={"/userpage." + this.props.auth.user.username}>
                <div className="icon">
                  <i className="fa fa-newspaper-o" aria-hidden="true" />
                </div>
                <div className="name-group">Bảng tin</div>
                <div className="pull-right">
                  <NavDropdown
                    style={{ color: "green" }}
                    eventKey={3}
                    id="basic-nav-dropdown"
                  >
                    <MenuItem eventKey={3.1}>
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-ban"
                        aria-hidden="true"
                      />
                      Theo độ liên quan{" "}
                    </MenuItem>
                    {/* <MenuItem eventKey={3.1}></MenuItem>
                              <MenuItem divider /> */}
                    <MenuItem eventKey={3.2}>
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-minus"
                        aria-hidden="true"
                      />
                      Theo gần đây nhất
                    </MenuItem>
                  </NavDropdown>
                </div>
              </NavLink>
            </div>
            <div className="col-md-12 remove-padding-col group">
              {/* <NavLink to={"/userpage." + this.props.auth.user.username}> */}
                <div onClick={this.openChat}  className="icon">
                  <i className="fa fa-comments" aria-hidden="true" />
                </div>
                <div className="name-group">Trò chuyện</div>
              {/* </NavLink> */}
            </div>
          </div>
        </div>

        <div className="col-md-12 remove-padding-col list-group">
          <div>
            <div className="header">Lỗi tắt</div>
            {/* <ListGroup/> */}
          </div>
          <div className="col-md-12 remove-padding-col">
            <div onClick={this.showModalCreateGroup} className="btn-join">
              <i className="fa fa-plus" aria-hidden="true" />
              Tạo nhóm
            </div>
            {this.state.listGroup && this.state.listGroup.length > 0 ? (
              this.state.listGroup.map(group => {
                return (
                  <div className="col-md-12 remove-padding-col group">
                    <NavLink to={`/groups/${group.id}`}>
                      <div className="icon">
                        <i
                          style={{ color: "#5d5b5b" }}
                          className="fa fa-users"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="name-group">{group.groupname}</div>
                      <div className="count-group">4</div>
                    </NavLink>
                  </div>
                );
              })
            ) : (
              <div style={{ fontSize: 15, lineHeight: 2 }}>
                <Skeleton count={10} />
              </div>
            )}
          </div>

          <div className="col-md-12 remove-padding-col list-group">
            <div style={{ marginTop: "10px" }}>
              <div className="header">Khám phá</div>
              {/* <ListGroup/> */}
            </div>
            <div className="col-md-12 remove-padding-col">
              <div className="col-md-12 remove-padding-col group">
                <NavLink to={"/userpage." + this.props.auth.user.username}>
                  <div className="icon">
                    <i
                      style={{ color: "#1c8cc3" }}
                      className="fa fa-users"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="name-group">Nhóm</div>
                  <div className="count-group">4</div>
                </NavLink>
              </div>
              <div className="col-md-12 remove-padding-col group">
                <NavLink to={"/userpage." + this.props.auth.user.username}>
                  <div className="icon">
                    <i
                      style={{ color: "rgb(236, 90, 90)" }}
                      className="fa fa-calendar"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="name-group">Sự kiện</div>
                  <div className="count-group">2</div>
                </NavLink>
              </div>

              <div className="col-md-12 remove-padding-col group">
                <NavLink to={"/userpage." + this.props.auth.user.username}>
                  <div className="icon">
                    <i
                      style={{ color: "#8a6d3b" }}
                      className="fa fa-briefcase"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="name-group">Việc làm</div>
                  <div className="count-group">4</div>
                </NavLink>
              </div>
              <div className="col-md-12 remove-padding-col group">
                <NavLink to={"/userpage." + this.props.auth.user.username}>
                  <div className="icon">
                    <i class="fa fa-file-text-o" aria-hidden="true" />
                  </div>
                  <div className="name-group">Trang</div>
                  <div className="count-group">+4</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <ModalCreatGroup onHide={this.access} access={this.access} show={this.state.showModalCreateGroup} />
      </div>
    );
  }
}

LeftWall.contextTypes = {
  router: PropTypes.object.isRequired
};
module.exports = connect(function(state) {
  return {
    auth: state.auth
  };
})(LeftWall);
