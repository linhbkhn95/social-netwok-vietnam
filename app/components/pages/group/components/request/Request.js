import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { emojify } from "react-emojione";
import Emojify from "react-emojione";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRequestJoin: []
    };
  }
  cancel(user_id) {
    let self = this;
    let { groupname } = this.props;
    let { listRequestJoin } = this.state;
    io.socket.post(
      "/group/cancelJoin",
      { group_id: groupname, user_id },
      (resdata, jwres) => {
        if (resdata.EC == 0) {
          for (var i = 0; i < listRequestJoin.length; i++) {
            if (listRequestJoin[i].id == user_id) {
              listRequestJoin.splice(i, 1);
              break;
            }
          }

          self.setState({ listRequestJoin });
        }
      }
    );
  }
  acceptJoin(user_id) {
    let self = this;
    let { groupname } = this.props;
    let { listRequestJoin } = this.state;
    io.socket.post(
      "/group/acceptJoin",
      { group_id: groupname, user_id },
      (resdata, jwres) => {
        if (resdata.EC == 0) {
          for (var i = 0; i < listRequestJoin.length; i++) {
            if (listRequestJoin[i].id == user_id) {
              listRequestJoin.splice(i, 1);
              break;
            }
          }

          self.setState({ listRequestJoin });
        }
      }
    );
  }
  componentDidMount() {
    let { groupname } = this.props;
    let sefl = this;
    if (groupname) {
      io.socket.post(
        "/group/getlist_requestJoin",
        { group_id: groupname },
        resdata => {
          if (resdata.EC == 0) {
            sefl.setState({ listRequestJoin: resdata.DT });
          }
        }
      );
    }
  }

  render() {
    let self = this;
    let { listRequestJoin } = this.state;
    return (
      <div
        style={{ background: "white", padding: "10px" }}
        className="col-md-12 "
      >
        <div className=" col-md-12 row">
          <div className="pull-left">
            <i
              style={{ marginRight: "10px" }}
              className="fa fa-users"
              aria-hidden="true"
            />
            Danh sách yêu cầu vào nhóm
            {/* <Emojify>
        <span>Easy! :wink:</span>
        <span>ðŸ˜¸ :D  ^__^</span>
    </Emojify>, */}
          </div>
          <div />
        </div>
        <div style={{ paddingTop: "10px" }} className="row col-md-12">
          {listRequestJoin.map((user, index) => {
            return (
              <div
                style={{ padding: "5px 10px 5px 5px" }}
                className="row-request"
              >
                <div className="info-user-join">
                  <NavLink to={"/userpage." + user.username}>
                    <img
                      style={{ width: "33px", height: "33px" }}
                      className="img-user"
                      src={user.url_avatar}
                    />{" "}
                  </NavLink>

                  <div style={{marginLeft:"5px"}} className="name-user">
                    <NavLink to={"/userpage." + user.username}>
                      {" "}
                      {user.fullname}{" "}
                    </NavLink>
                  </div>
                  {/* <div className="number-friend-middle">
                        {friend.countFriend} bạn bè
                      </div> */}
                </div>
                <div className="btn-acess-request">
                  <button
                    onClick={self.acceptJoin.bind(this, user.id)}
                    style={{
                      padding: "3px 12px",
                      fontSize: "11px",
                      marginRight: "3px"
                    }}
                    className="btn btn-success"
                  >

                    <i
                      style={{ color: "white", marginRight: "2px" }}
                      className="fas fa-check"
                      aria-hidden="true"
                    />
                    Phê duyệt
                  </button>
                  <button
                    onClick={self.cancel.bind(this, user.id)}
                    style={{
                      padding: "3px 12px",
                      fontSize: "11px",
                      marginRight: "3px"
                    }}
                    className="btn btn-default"
                  >
                    <i
                      style={{ color: "none", marginRight: "2px" }}
                      className="fa fa-times"
                      aria-hidden="true"
                    />
                    Từ chối
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return {
    auth: state.auth
  };
})(List);
