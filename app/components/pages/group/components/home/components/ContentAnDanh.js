import React from "react";
import { connect } from "react-redux";
import ContentEditable from "react-contenteditable";
import axios from "axios";

import "react-select/dist/react-select.css";
var Select = require("react-select");
class ContentAnDanh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      options: [],
      subject: null,
      src: [],
      files: null,
      filename: ""
    };
  }
  componentDidMount() {
    let self = this;
    io.socket.get("/subject/getall", (resdata, jwres) => {
      self.setState({ options: resdata });
    });
  }
  onChange(type, event) {
    this.state[type] = event.target.value;
    this.setState(this.state);
    this.props.onChange(type, event.target.value);
  }
  async getlistSubject(input) {
    return { options: this.state.options };
  }
  onChangeSelect(subject) {
    let value = "";
    if (subject) value = subject.value;
    this.setState({ subject });
    this.props.onChange("subject", value);
  }
  _handleChangeCover(e) {
    let self = this;
    e.preventDefault();
    let src = [];

    for (var i = 0; i < e.target.files.length; i++) {
      src[i] = URL.createObjectURL(e.target.files[i]);
    }
    console.log("length", e.target.files.length);
    this.setState({ files: e.target.files, src: src });
    // self.uploadCover(e.target.files).then((response)=>{
    //     if(response.data.EC==0){
    //         toast.success('Thành công', {
    //                         position: toast.POSITION.TOP_CENTER
    //                     });

    //     }
    // })
  }
  uploadCover(files) {
    const url = "/fileupload/upload_image";

    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      console.log("uploasssd", files[i]);

      formData.append("files", files[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  handleChange = evt => {
    console.log(evt.target.value);
    this.setState({ html: evt.target.value });
  };
  componentWillReceiveProps(nextProps) {
    let { getFile } = nextProps;
    if (getFile) {
      console.log("componentWillReceivePropssssssssss");

      console.log("componentWillReceiveProps", this.state.files.length);
      this.props.sendFile(this.state.files);
    }
  }
  render() {
    return (
      <div style={{ height: "auto" }}>
        <div className="row">
          <h5 className="col-md-3">
            <i className="fa fa-tags" aria-hidden="true" /> Chủ đề tâm sự
          </h5>
          <div className="col-md-4">
            <Select.Async
              name="form-field-name"
              placeholder="Nhập chủ đề..."
              loadOptions={this.getlistSubject.bind(this)}
              value={this.state.subject}
              options={this.state.options}
              onChange={this.onChangeSelect.bind(this)}
              cache={false}
            />
          </div>
        </div>
        <div className="row">
          <h5 className="col-md-3">
            <i className="fa fa-header" aria-hidden="true" />
            Tiêu đề tâm sự{" "}
          </h5>
          <div className="col-md-4">
            <input
              onChange={this.onChange.bind(this, "title")}
              value={this.state.title}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="question">
              <i className="fa fa-pencil" aria-hidden="true" /> Viết bài
            </div>
            <div className="question">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "1px"
                }}
                className=" btn-file"
              >
                <i
                  style={{ marginRight: "3px", marginTop: "-1px" }}
                  className="fa fa-camera"
                  aria-hidden="true"
                />{" "}
                Thêm ảnh/Video
                <input
                  multiple
                  onChange={this._handleChangeCover.bind(this)}
                  title="Chọn file để đăng"
                  type="file"
                />
              </span>
              {/* <input type="file" className="input-file-post" accept="image" title="Chọn file để tải lên" />
                        <i className="fa fa-camera-retro" aria-hidden="true"></i> Thêm ảnh/Video */}
            </div>
            <div className="question">
              <i className="fa fa-video-camera" aria-hidden="true" /> Quay trực
              tiếp
            </div>

            {/* <div>
                     </div>      */}
          </div>
          <div
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
            className="col-md-12 remove-padding-col input-post"
          >
            <div className="col-md-2 col-sm-2 div-avatar-post remove-padding-col">
              <div className="user-avatar">
                <img
                  className="img-user"
                  src={this.props.auth.user.url_avatar}
                />
              </div>
            </div>
            <div className="col-md-10 col-sm-2  remove-padding-col">
              <ContentEditable
                className="div-textarea"
                html={this.state.content} // innerHTML of the editable div
                disabled={false} // use true to disable edition
                onChange={this.onChange.bind(this, "content")} // handle innerHTML change
                tagName="article" // Use a custom HTML tag (uses a div by default)
              />
              {/* <textarea onChange={this.onChange.bind(this,'content')} value={this.state.content} className="form-control" placeholder="Bạn đang nghĩ gì.." rows="5" id="comment"></textarea> */}
            </div>
          </div>
        </div>
        <div className="col-md-12" />

        {this.state.src.length > 0 ? (
          <div className="col-md-12 div-list-img-post remove-padding-col ">
            {this.state.src.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ height: "100%" }}
                  className="col-md-3"
                >
                  <img style={{ height: "100%" }} src={item} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

module.exports = connect(function(state) {
  return {
    auth: state.auth
  };
})(ContentAnDanh);
