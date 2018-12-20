var React = require("react");
var { connect } = require("react-redux");
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import {
  addList,
  addNotification,
  setNotification,
  resetNotification
} from "app/action/actionNotification";
import {
  addMessage,
  openChatbox,
  reOpenChatbox,
  removeChatbox
} from "app/action/actionChatbox";

import { NavLink } from "react-router-dom";
var date = Date.now();
var datedemo = 1511399642970;
class ListNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listChat: [],
      count_wait_user: 0,
      new_message: {}
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    let self = this;

    io.socket.post("/chat/getlist_message_user", {}, resdata => {
      if (resdata.EC == 0) {
        self.setState({
          listChat: resdata.DT.list_message_user,
          count_wait_user: resdata.DT.count_wait_user
        });
      }
    });
    console.log("chatusseraddadadadxxx", this.props.auth.user);

    io.socket.on("chatuser" + this.props.auth.user.id, function(data) {
      let index = self.exitsChatbox(data.user);
      if (index != -1) {
        let id =
          data.data.userId_sent > data.data.userId_rec
            ? data.data.userId_sent + "_" + data.data.userId_rec
            : data.data.userId_rec + "_" + data.data.userId_sent;
        self.state.listChat.splice(index, 1);
        self.state.listChat.unshift(data);
        self.setState({
          listChat: self.state.listChat,
          count_wait_user: self.state.count_wait_user + 1
        });
      } else {
        self.state.listChat.unshift(data);
        self.setState({
          listChat: self.state.listChat,
          count_wait_user: self.state.count_wait_user + 1
        });
      }
    });
  }
  exitsChatbox(user) {
    let { listChat } = this.state;
    for (var i = 0; i < listChat.length; i++) {
      if (listChat[i].user.id == user.id) return i;
      break;
    }
    return -1;
  }
  componentWillReceiveProps(nextProps) {
    let data = nextProps.chatbox.new_message;
    let self = this;
    let count_wait_user;
    if (data.data)
      count_wait_user =
        data.data.userId_rec == this.props.auth.user.id
          ? this.state.count_wait_user + 1
          : this.state.count_wait_user;
    if (
      (!this.state.new_message.data && nextProps.chatbox.new_message.data) ||
      (nextProps.chatbox.new_message.data &&
        nextProps.chatbox.new_message.data.id != this.state.new_message.data.id)
    ) {
      let index = self.exitsChatbox(data.user);
      if (index != -1) {
        let id =
          data.data.userId_sent > data.data.userId_rec
            ? data.data.userId_sent + "_" + data.data.userId_rec
            : data.data.userId_rec + "_" + data.data.userId_sent;
        self.state.listChat.splice(index, 1);
        self.state.listChat.unshift(data);
        self.setState({
          listChat: self.state.listChat,
          count_wait_user,
          new_message: { ...data }
        });
      } else {
        self.state.listChat.unshift(data);
        self.setState({
          listChat: self.state.listChat,
          count_wait_user,
          new_message: { ...data }
        });
      }
    }
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  showNotifi() {
    // $("#searchContainer").fadeToggle(300);
    // let self = this;
    // self.props.dispatch(resetNotification());
    // io.socket.post("/chat/reset_all_know_message", resdata => {
    //   if (resdata.EC == 0) {
    //     self.setState({ count_wait_user: 0 });
    //   }
    // });
    // // $("#notification_count").fadeOut("slow");
    // return false;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      $("#searchContainer").hide();
    }
  }
  openChatbox(user) {
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
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  onChange(e) {
    console.log("search", e.target.value);
    $("#searchContainer").show();
  }
  onFocus(e) {
    $("#searchContainer").show();
  }
  render() {
    let self = this;
    let listChat = this.state.listChat;
    let number_notifi = this.state.count_wait_user;
    let user = this.props.auth.user;
    return (
      <li
        ref={this.setWrapperRef}
        onClick={this.showNotifi.bind(this)}
        id="notification_li"
      >
        {number_notifi ? (
          <span id="notification_count">{number_notifi}</span>
        ) : null}
        <div
          className=" topnav"
          href="#"
          ref="foo"
          id="notificationLink"
          data-tip="Tin nhắn"
        >
          <div className="search-container">
            <form>
              <input
                type="text"

                onFocus={this.onFocus.bind(this)}
                onChange={this.onChange.bind(this)}
                placeholder="Tìm kiếm.."
                name="search"
              />
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </div>

        <div id="searchContainer">
          <div id="notificationTitle">Tìm kiếm</div>
          {/* <div className="">Kết quả gần đây</div> */}
          <div style={{marginTop:"8px"}} id="notificationsBody" className="notifications">
            {listChat.length > 0 ? (
              listChat.map((chat, index) => {
                console.log("châtdad", chat);
                return (
                  <div
                    onClick={self.openChatbox.bind(self, chat.user)}
                    key={index}
                    style={{
                      background:
                        chat.data.userId_rec == user.id &&
                        !chat.data.read_message
                          ? "#ebf4e7"
                          : "white"
                    }}
                    className="col-md-12 alert-message"
                  >
                    <div className="col-md-3 row">
                      <img
                        style={{ height: "36px" }}
                        className="avatar-alert"
                        src={chat.user.url_avatar}
                      />
                    </div>
                    <div className="">
                      <div className="pull-left">
                        {" "}
                        <strong>{chat.user.fullname}</strong>
                      </div>



                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center" }}>Chưa có tin nhắn nào</div>
            )}
          </div>
          <div id="notificationFooter">
            <a href="#">Xem tất cả</a>
          </div>
        </div>
      </li>
    );
  }
}
module.exports = connect(function(state) {
  return {
    auth: state.auth,
    chatbox: state.chatbox
  };
})(ListNotification);
