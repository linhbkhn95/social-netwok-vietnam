import React from "react";
import Post from "app/utils/components/PostStatusAnDanh";
import axios from "axios";
import "react-select/dist/react-select.css";
import { create } from "domain";
var Select = require("react-select");
import { connect } from "react-redux";
import Skeleton from 'react-loading-skeleton';

class ListDiscover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: [],
      options: [],
      subject: null,
      items: 10,
      page: 1,
      loadingState: false,
      fulldata: false
    };
  }
  componentDidMount() {
    // this.refs.iScroll.addEventListener("scroll", () => {
    //     if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight -20){
    //       this.loadMoreItems();
    //     }
    //   });

    let self = this;
    $(window).scroll(function() {
      if (
        $(document).height() - $(window).height() - $(window).scrollTop() <
          50 &&
        !self.state.fulldata
      ) {
        self.loadMoreItems();
      }
    });

    io.socket.post("/post/getList_Wall", { page: this.state.page }, function(
      res,
      jwres
    ) {
      if (res.EC == 0) {
        self.setState({
          listStatus: res.DT,
          page: self.state.page + 1,
          loadingState: false
        });
      }
    });
    // io.socket.post('/post/getList_Wall',function(resdata,jwres){
    //     console.log('listpost',resdata)
    //     if(resdata.EC==0)
    //         self.setState({listStatus:resdata.DT})
    // })
    io.socket.get("/user/getUserId", function(resdata, jwres) {
      io.socket.on("post" + resdata.userId, function(data) {
        console.log("event posttt", data);

        self.state.listStatus.unshift(data);
        self.setState({ listStatus: self.state.listStatus });
      });
    });
  }
  deletePost(data) {
    console.log("datadel", data);
    for (var i = 0; i < this.state.listStatus.length - 1; i++) {
      if (this.state.listStatus[i].id == data.id) {
        this.state.listStatus.splice(i, 1);
        this.setState({ listStatus: this.state.listStatus });
        break;
      }
    }
  }
  likePost(postId) {
    for (var i = 0; i < this.state.listStatus.length; i++) {
      console.log(
        "i",
        i,
        this.state.listStatus[i].id,
        "==",
        postId,
        this.state.listStatus[i].id == postId
      );
      if (this.state.listStatus[i].id == postId) {
        this.state.listStatus[i].userLikePost = !this.state.listStatus[i]
          .userLikePost;
        this.setState({ listStatus: this.state.listStatus });
        console.log("indexxx", i);
        return i;
      }
    }
  }
  like(postId) {
    console.log("like", postId);
    let self = this;
    let index = this.likePost(postId);
    io.socket.post(
      "/likepost/accessLike",
      { postId, userId: this.props.auth.user.id },
      (resdata, jwres) => {
        console.log("resdata", resdata);

        if (resdata.EC == 0) {
          console.log("post", index, postId, self.state.listStatus[index]);
          self.state.listStatus[index].countLike = resdata.DT.countLike;
          self.setState({ listStatus: self.state.listStatus });
        } else {
        }
      }
    );
  }
  componentWillMount() {
    let self = this;
    io.socket.get("/notification/follow", function gotResponse(data, jwRes) {
      console.log(
        "Server responded with status code " + jwRes.statusCode + " and data: ",
        data
      );
    });
    io.socket.get("/subject/getall", (resdata, jwres) => {
      console.log("ress", resdata);
      self.setState({ options: resdata });
    });
  }

  async getlistSubject(input) {
    return { options: this.state.options };
  }
  accessLike(postId, verb) {
    for (var i = 0; i < this.state.listStatus.length; i++) {
      if (this.state.listStatus[i].id == postId) {
        this.state.listStatus[i].countLike =
          verb == "like"
            ? this.state.listStatus[i].countLike + 1
            : this.state.listStatus[i].countLike - 1;
        this.setState({ listStatus: this.state.listStatus });
      }
    }
  }
  onChangeSelect(subject) {
    this.setState({ subject, page: 2, fulldata: false });
    let self = this;
    io.socket.post(
      "/post/getList_Wall",
      { listsubject: subject },
      (resdata, jwres) => {
        if (resdata.EC == 0) self.setState({ listStatus: resdata.DT });
      }
    );
  }
  loadMoreItems() {
    if (this.state.loadingState) {
      return;
    }
    this.setState({ loadingState: true });
    let self = this;
    let { dispatch } = this.props;
    let { subject } = this.state;
    io.socket.post(
      "/post/getList_Wall",
      { page: this.state.page, listsubject: subject },
      function(res, jwres) {
        if (res.EC == 0) {
          if (res.DT.length < 10) {
            self.state.fulldata = true;
          }
          let data = self.state.listStatus.concat(res.DT);
          self.setState({
            listStatus: data,
            page: self.state.page + 1,
            loadingState: false,
            fulldata: self.state.fulldata
          });
        }
      }
    );
    // setTimeout(() => {
    //   this.setState({ items: this.state.items + 10, loadingState: false });
    // }, 1000);
  }
  render() {
    let ListStatus =
      this.state.listStatus.length > 0 ? (
        this.state.listStatus.map(status => {
          return (
            <Post
              accessLike={this.accessLike.bind(this)}
              post={status}
              like={this.like.bind(this)}
              deletePost={this.deletePost.bind(this)}
              key={status.id}
            />
          );
        })
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "12px",
            fontSize: "13px",
            color: "#7a887a"
          }}
        >
          <Skeleton/>
<Skeleton count={5}/> 
        </div>
      );
    return (
      <div ref="iScroll">
        <div
          style={{
            marginBottom: "20px",
            display: "block"
          }}
        >
          <h5 className="title-subject">
            <i className="fa fa-tags" aria-hidden="true" /> Chủ đề tâm sự{" "}
            <span className="count-subject"> {this.state.options.length}</span>
          </h5>
          <div className="">
            <Select.Async
              name="form-field-name"
              placeholder="Nhập chủ đề..."
              loadOptions={this.getlistSubject.bind(this)}
              value={this.state.subject}
              options={this.state.options}
              onChange={this.onChangeSelect.bind(this)}
              cache={false}
              multi
            />
          </div>
        </div>
        <div style={{ display: "table-footer-group" }}>{ListStatus}</div>
        {this.state.loadingState ? (
          <p className="loading"> đang tải dữ liệu..</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return { auth: state.auth };
})(ListDiscover);
