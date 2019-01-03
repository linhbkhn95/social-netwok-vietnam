import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { addChatbox, openChatbox } from "app/action/actionChatbox";
import Skeleton from "react-loading-skeleton";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listfriend: [],
      loading: true
    };
  }
  cancel(username) {
    let { listfriend } = this.state;
    for (var i = 0; i < listfriend.length; i++) {
      if (listfriend[i].username == username) {
        listfriend.splice(i, 1);
        break;
      }
    }

    self.setState({ listfriend });
  }
  addChatbox(user) {
    let auth = this.props.auth;
    let id =
      user.id > auth.user.id
        ? user.id + "_" + auth.user.id
        : auth.user.id + "_" + user.id;
    if (
      this.props.chatbox.listchat[id] == undefined ||
      this.props.chatbox.listchat[id] == null
    )
      this.props.dispatch(openChatbox(user));
  }
  accessFriend(username) {
    let self = this;
    let { listfriend } = this.state;
    io.socket.post("/friends/accessFriend/", { username }, (resdata, jwres) => {
      if (resdata.EC == 0) {
        for (var i = 0; i < listfriend.length; i++) {
          if (listfriend[i].username == username) {
            listfriend.splice(i, 1);
            break;
          }
        }

        self.setState({ listfriend });
      }
    });
  }
  componentDidMount() {
    let sefl = this;

    io.socket.post("/user/getListFriends_User", {}, resdata => {
      if (resdata.EC == 0) {
        sefl.setState({ listfriend: resdata.DT, loading: false });
      }
    });
    io.socket.on("status_user", function(data) {
      console.log("status_user", data);
    });
  }

  render() {
    let self = this;
    let { listfriend, loading } = this.state;
    return (
      <div
        style={{ display: this.props.auth.isAuthenticated ? "block" : "none" }}
        className="list-friend"
      >
        <div className="header">
          <div className="title">
            <div className="text-title">Chat</div>
            <div>
              <i className="fas fa-cog" />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }} className="list">
          <div style={{}} className="">
            <div
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              className="col-md-12 "
            >
              <div className="pull-left">
                <i
                  style={{ marginRight: "10px" }}
                  className="fas fa-users"
                  aria-hidden="true"
                />
                Danh sách bạn bè
              </div>
              <div />
            </div>
            <div style={{ paddingTop: "20px" }} className="">
              {listfriend.length == 0 && loading ? (
                <div style={{ fontSize: 15, lineHeight: 2 }}>
                  <Skeleton count={10} />
                </div>
              ) : (
                listfriend.map((friend, index) => {
                  return (
                    // <NavLink key={index} to={"/userpage."+friend.user.username} >
                    <div
                      onClick={this.addChatbox.bind(this, friend.user)}
                      style={{ paddingTop: "3px", paddingBottom: "3px" }}
                      className="friend col-md-12 "
                    >
                      <div>
                        <NavLink to={"/userpage." + friend.user.username}>
                          <img
                            style={{ width: "33px", height: "33px" }}
                            className="img-user"
                            src={friend.user.url_avatar}
                          />{" "}
                        </NavLink>
                        <div style={{ float: "left" }} className="name-user">
                          <NavLink to={"/userpage." + friend.user.username}>
                            {" "}
                            {friend.user.fullname}{" "}
                          </NavLink>
                        </div>
                        <div className="status-user">
                          {friend.user.is_online ? (
                            <span className="status-online" />
                          ) : (
                            <div className="time">
                              {moment(
                                friend.user.time_offline
                                  ? friend.user.time_offline
                                  : Date.now()
                              )
                                .lang("vi")
                                .fromNow()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="input-search" id="imaginary_container  ">
              <div className="input-group stylish-input-group">
                <span className="input-group-addon">
                  <button type="submit">
                    <span className="glyphicon glyphicon-search" />
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return {
    auth: state.auth,
    chatbox: state.chatbox
  };
})(List);
