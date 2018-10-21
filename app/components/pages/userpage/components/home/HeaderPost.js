import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Infinite from "react-infinite";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { connect } from "react-redux";
import { setCurrentUser } from "app/action/authActions.js";
import ModalSubject from "./components/ModalSubject";
import ModalPost from "./components/ModalPost";
import axios from "axios";
import FileFolderShared from "material-ui/SvgIcon";
import SelectUtils from "app/utils/input/ReactSelectCustom";
var Select = require("react-select");
import {
  NavDropdown,
  Navbar,
  NavItem,
  Nav,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import FileUpload from "app/utils/upload/FileUpload";
import Header from "app/utils/components/HeaderPost";
import {
  ButtonToolbar,
  Popover,
  Button,
  Dropdown,
  MenuItem,
  Glyphicon
} from "react-bootstrap";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
class HeaderPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      showModalPost: false,
      showModalSubject: false,
      onBlur: false,
      src: [],
      file: null,
      filename: "",

      showSelect: {
        tag: false,
        feel: false
      },
      valueSelect: {}
    };
  }
  onChangeSelect(value) {
    this.setState({ value });
    console.log("Boolean Select value changed to", value);
  }
  async getOptionsSession(input) {
    return { options: this.state.options };
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  showModalPost() {
    this.setState({ showModalPost: true });
  }
  showModalSubject() {
    this.setState({ showModalSubject: true });
  }
  closeModal() {
    this.setState({ showModalPost: false });
  }
  closeModalSubject() {
    this.setState({ showModalSubject: false });
  }
  onFocus() {
    this.setState({ showModalPost: true });
  }
  onBlur() {
    this.setState({ onBlur: true });
  }
  access() {
    this.setState({ showModalPost: false });
    console.log("ok");
    toast.success("Đăng bài thành công !", {
      position: toast.POSITION.TOP_LEFT
    });
    //   this.props.addPost(postmodel)
  }
  accessSubject() {
    this.setState({ showModalSubject: false });
    toast.success("Thêm chủ đề  thành công!", {
      position: toast.POSITION.TOP_LEFT
    });
  }
  _handleChangeCover(e) {
    let self = this;
    e.preventDefault();
    let src = [];
    let file = e.target.files[0];
    var fileName = file.name;

    for (var i = 0; i < e.target.files.length; i++) {
      src[i] = URL.createObjectURL(e.target.files[i]);
    }

    this.setState({ files: e.target.files, fileName, src: src });
    // self.uploadCover(e.target.files).then(response => {
    //   if (response.data.EC == 0) {
    //     toast.success("Thành công", {
    //       position: toast.POSITION.TOP_CENTER
    //     });
    //   }
    // });
  }
  uploadCover(files) {
    const url = "/fileupload/upload_image";
    console.log("upload", files);

    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, formData, config);
  }
  tag = () => {
    if (!this.state.showSelect.tag) this.state.showSelect.feel = false;
    this.state.showSelect.tag = !this.state.showSelect.tag;

    this.setState({ showSelect: this.state.showSelect });
  };
  feel = () => {
    if (!this.state.showSelect.feel) this.state.showSelect.tag = false;
    this.state.showSelect.feel = !this.state.showSelect.feel;
    this.setState({ showSelect: this.state.showSelect });
  };
  onChange = (type, value) => {
    this.state.valueSelect[type] = value;
    this.setState({ valueSelect: this.state.valueSelect });
  };
  onChangeContent(type, event) {
    this.state[type] = event.target.value;
    this.setState(this.state);
    // this.props.onChange(type,event.target.value)
  }

  post = () => {
    let { valueSelect, files, content } = this.state;
    let { feel, tag } = valueSelect;
    let dataPost = {
      content,
      feel_id: valueSelect.feel ? feel.id : null
    };
    let self = this;
    if (files) {
      FileUpload.upload(files).then(response => {
        if (response.data.EC == 0) {
          io.socket.post(
            "/post/postStatus",
            {
              data: dataPost,
              urls_file: response.data.DT,
              listTag: valueSelect["tag"]
            },
            function(resdata, jwres) {
              if (resdata.EC == 0) {
                toast.success("Thành công", {
                  position: toast.POSITION.TOP_CENTER
                });
              } else {
                self.setState({ err_msg: resdata.EM });
              }
            }
          );
        }
      });
    } else {
      io.socket.post(
        "/post/postStatus",
        { data: dataPost, listTag: valueSelect["tag"] },
        function(resdata, jwres) {
          if (resdata.EC == 0) {
            toast.success("Thành công", {
              position: toast.POSITION.TOP_CENTER
            });
          } else {
            self.setState({ err_msg: resdata.EM });
          }
        }
      );
    }
  };
  componentDidMount(){
    
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <div className="col-md-12 post-wall remove-padding-col ">
        <div className="header-post-new">
          <div className="question">
            <i className="fas fa-pencil-alt" aria-hidden="true" /> Viết bài
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
                name="files"
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
        <div className="col-md-12 remove-padding-col input-post">
          <div className="col-md-2 col-sm-2 div-avatar-post remove-padding-col">
            <div className="user-avatar">
              <img className="img-user" src={this.props.auth.user.url_avatar} />
            </div>
          </div>

          {/* <div
            className="div-textarea col-md-10 col-sm-10 remove-padding-col"
            placeholder="Bạn đang nghĩ gì..."
            contenteditable="true"
          /> */}
          <div className="col-md-10 col-sm-2  remove-padding-col">
            <ContentEditable
              className="div-textarea "
              html={this.state.content} // innerHTML of the editable div
              disabled={false} // use true to disable edition
              onChange={this.onChangeContent.bind(this, "content")} // handle innerHTML change
              tagName="article" // Use a custom HTML tag (uses a div by default)
            />
          </div>
          {/* <textarea className="form-control" placeholder="Bạn đang nghĩ gì.." rows="3" id="comment"></textarea> */}
        </div>
        {/* <div
          style={{ display: "flex", fontSize: "13px" , alignItems: 'center',padding:"7px" }}
          className="col-md-12 list-tag-feel remove-padding-col "
        >
             <div    style={{
              display: this.state.valueSelect["feel"] ? "flex" : "none",padding:"7px",    alignItems: 'center',
              marginRight: "3px"
            }} >đang <img style={{marginLeft:"3px",marginRight:"3px"}} src="/images/icons/feel/in-love.png" /> cảm thấy  <div style={{color:"green",marginLeft:"3px",marginRight:"3px"}}>{  this.state.valueSelect.feel ?   this.state.valueSelect.feel.label:null}</div></div>
          <div
            style={{
              display: this.state.valueSelect["tag"] ? "block" : "none",
              marginRight: "3px"
            }}
          >

            cùng với
          </div>
          {this.renderListTag()}
        </div> */}
        <Header
          listTag={this.state.valueSelect.tag}
          feel={this.state.valueSelect.feel}
        />
        <div className="col-md-12  remove-padding-col ">
          {this.state.showSelect.tag ? (
            <SelectUtils
              value={this.state.valueSelect["tag"]}
              multi
              onChangeValue={this.onChange}
              type="tag"
              placeholder="Bạn đang ở cùng với ai"
              urlApi="/friends/getlist_option"
            />
          ) : null}
          {this.state.showSelect.feel ? (
            <SelectUtils
              value={this.state.valueSelect["feel"]}
              onChangeValue={this.onChange}
              type="feel"
              placeholder="Chọn cảm xúc của bạn"
              urlApi="/feel_post/getlist_option"
            />
          ) : null}

          {/* <Select.Async
                            name="form-field-name"
                            disabled={this.state.ISEDIT}
                            placeholder="Nhập tên bạn bè..."
                            loadOptions={this.getOptionsSession.bind(this)}
                            value={this.state.value}
                            options={this.state.options}
                            onChange={this.onChangeSelect.bind(this)}
                            cache={false}
                            multi
                  /> */}
        </div>
        {this.state.src.length > 0 ? (
          <div className="col-md-12 div-list-img-post remove-padding-col ">
            {this.state.src.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ height: "100px" }}
                  className="col-md-3"
                >
                  <img style={{ height: "100%", width: "100%" }} src={item} />
                </div>
              );
            })}
          </div>
        ) : null}
        <div
          style={{ paddingTop: "9px", paddingBottom: "9px", display: "flex" }}
          className="col-md-12 tag-post"
        >
          <div className="input-post-userpage">
            {" "}
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
                className="fas fa-image"
                aria-hidden="true"
              />{" "}
              Thêm ảnh/Video
              <input
                name="files"
                multiple
                onChange={this._handleChangeCover.bind(this)}
                title="Chọn file để đăng"
                type="file"
              />
            </span>
          </div>
          <div
            onClick={this.tag}
            style={{ background: "#f5f6f7" }}
            className="input-post-userpage"
          >
            <i className="fas fa-user-tag" />
            Gắn thẻ
          </div>

          <div
            onClick={this.feel}
            style={{ background: "#f5f6f7" }}
            className="input-post-userpage"
          >
            <i className="far fa-grin-alt" />
            Cảm xúc
          </div>
        </div>

        <div className="col-md-12  police-post">
          <div className="icon">
            <div className="icon-newpost">
              <i className="fa fa-newspaper-o" aria-hidden="true" />
            </div>
            Bảng tin
          </div>
          <div
            style={{ paddingLeft: "0px", lineHeight: "35px" }}
            className="select-police"
          >
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle>
                {/* <i className="fas fa-globe-asia"></i> */}
                <img
                  style={{
                    float: "left",
                    marginRight: "5px"
                  }}
                  className="icon-plice-image"
                  src="/images/icons/police/internet.png"
                />
                Công khai
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <MenuItem eventKey="1">
                  {" "}
                  {/* <i className="fas fa-globe-asia"></i> */}
                  <div className="icon-police-post">
                    <img src="/images/icons/police/internet.png" />{" "}
                  </div>
                  Công khai
                </MenuItem>
                <MenuItem eventKey="2">
                  {/* <i className="fas fa-user-friends"></i> */}
                  <div className="icon-police-post">
                    <img src="/images/icons/police/friendship.png" />{" "}
                  </div>
                  Bạn bè
                </MenuItem>
                <MenuItem eventKey="3">
                  <div className="icon-police-post">
                    <img src="/images/icons/police/private.png" />{" "}
                  </div>
                  {/* <i className="fas fa-lock"></i> */}
                  Chỉ mình tôi
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* <button  style={{float:"right",fontSize:"12px",padding:"3px 8px"}} onClick={this.showModalPost.bind(this)} className="btn btn-success">
                           <i style={{color:"white"}} className="fa fa-paper-plane" aria-hidden="true"></i> Đăng
                   </button>
                   <button  style={{float:"left",fontSize:"12px",padding:"3px 8px"}} onClick={this.showModalSubject.bind(this)} className="btn btn-success">
                           <i style={{color:"white"}} className="fa fa-plus" aria-hidden="true"></i> Thêm chủ đề  tâm sự
                   </button> */}
        </div>
        <div className="col-md-12 btn-post police-post">
          <div onClick={this.post} className="button-post">
            Đăng bài
          </div>
        </div>
        <ModalSubject
          access={this.accessSubject.bind(this)}
          show={this.state.showModalSubject}
          onHide={this.closeModalSubject.bind(this)}
        />

        <ModalPost
          access={this.access.bind(this)}
          show={this.state.showModalPost}
          onHide={this.closeModal.bind(this)}
        />
      </div>
    );
  }
}
module.exports = connect(function(state) {
  return {
    auth: state.auth
  };
})(HeaderPost);
