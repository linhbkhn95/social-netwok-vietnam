import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Relative from "./Relative";
import {
  ButtonToolbar,
  Popover,
  OverlayTrigger,
  Button,
  Dropdown,
  MenuItem,
  Glyphicon
} from "react-bootstrap";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import ModalEdit from "./ModalEditInfo";

class LayoutRight extends React.Component {
  render() {
    <div className="col-md-8 remove-padding-col group-page">
      <div className="home-user">
        <div className="banner" style={styleBanner}>
          <div className="background-cover">
            <div className="image-cover">
              {" "}
              {this.props.auth.user.groupname == this.props.groupname ? (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "3px 7px",
                    fontSize: "11px",
                    float: "right"
                  }}
                  className=" btn-file"
                >
                  <i
                    style={{ marginRight: "2px" }}
                    className="fa fa-camera"
                    aria-hidden="true"
                  />
                  Thay ảnh bìa{" "}
                  <input
                    onChange={this._handleChangeCover.bind(this)}
                    type="file"
                  />
                </span>
              ) : null}{" "}
            </div>
          </div>
          <div className="link-share visible-xs">
            <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389">
              <i className="icon-svg svg-social-facebook" />
            </a>
            <a
              href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki"
              target="_blank"
            >
              <i className="icon-svg svg-social-twitter" />
            </a>
            <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
              <i className="icon-svg svg-social-google" />
            </a>
          </div>
        </div>

        <div className="group-head">
          <div className="box-title hidden-xs">
            <div className="content-right">
              <ul>
                <li className="li-layout">
                  {info.isMe ? (
                    <button
                      onClick={this.showModalSubject.bind(this)}
                      style={{
                        padding: "2px 8px",
                        fontSize: "12px",
                        marginTop: "9px"
                      }}
                      className="btn btn-default"
                    >
                      <i className="fa fa-pencil" aria-hidden="true" />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div
                      style={{
                        paddingLeft: "0px",
                        lineHeight: "35px"
                      }}
                      className="btn-friend"
                    >
                      <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle>Đã tham gia</Dropdown.Toggle>
                        <Dropdown.Menu className="">
                          <MenuItem
                            onClick={this.accessFollow.bind(this)}
                            eventKey="1"
                          >
                            {" "}
                            {info.follow && info.follow.status ? (
                              <i
                                style={{ marginLeft: "-15px" }}
                                className="fa fa-check"
                                aria-hidden="true"
                              />
                            ) : null}
                            Roi khoi nhom
                          </MenuItem>
                          <MenuItem eventKey="2">Bo theo doi nhom</MenuItem>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </li>
                <li className="li-layout">
                  {info.isMe ? (
                    <button
                      onClick={this.showModalSubject.bind(this)}
                      style={{
                        padding: "2px 8px",
                        fontSize: "12px",
                        marginTop: "9px"
                      }}
                      className="btn btn-default"
                    >
                      <i className="fa fa-pencil" aria-hidden="true" />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div
                      style={{
                        paddingLeft: "0px",
                        lineHeight: "35px"
                      }}
                      className="btn-friend"
                    >
                      <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle>
                          <Glyphicon
                            style={{
                              color: "green",
                              fontSize: "11px",
                              top: "0px"
                            }}
                            glyph="ok"
                          />
                          Thông báo
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="">
                          <MenuItem
                            onClick={this.accessFollow.bind(this)}
                            eventKey="1"
                          >
                            {" "}
                            {info.follow && info.follow.status ? (
                              <i
                                style={{ marginLeft: "-15px" }}
                                className="fa fa-check"
                                aria-hidden="true"
                              />
                            ) : null}
                            Roi khoi nhom
                          </MenuItem>
                          <MenuItem eventKey="2">Bo theo doi nhom</MenuItem>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </li>

                <li className="li-layout" style={{ borderRight: "none" }}>
                  {info.isMe ? (
                    <button
                      onClick={this.showModalSubject.bind(this)}
                      style={{
                        padding: "2px 8px",
                        fontSize: "12px",
                        marginTop: "9px"
                      }}
                      className="btn btn-default"
                    >
                      <i className="fa fa-pencil" aria-hidden="true" />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div
                      style={{
                        paddingLeft: "0px",
                        lineHeight: "35px"
                      }}
                      className="btn-friend"
                    >
                      <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle>
                          <i className="fa fa-share" aria-hidden="true" />
                          Chia sẻ
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="">
                          <MenuItem
                            onClick={this.accessFollow.bind(this)}
                            eventKey="1"
                          >
                            {" "}
                            {info.follow && info.follow.status ? (
                              <i
                                style={{ marginLeft: "-15px" }}
                                className="fa fa-check"
                                aria-hidden="true"
                              />
                            ) : null}
                            Nhận thông báo
                          </MenuItem>
                          <MenuItem eventKey="2">Bạn thân</MenuItem>

                          <MenuItem divider />
                          <MenuItem
                            onClick={this.destroyFriend.bind(this)}
                            eventKey="4"
                          >
                            Hủy kết bạn
                          </MenuItem>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </li>
                <li className="li-layout" style={{ borderRight: "none" }}>
                  {info.isMe ? (
                    <button
                      onClick={this.showModalSubject.bind(this)}
                      style={{
                        padding: "2px 8px",
                        fontSize: "12px",
                        marginTop: "9px"
                      }}
                      className="btn btn-default"
                    >
                      <i className="fa fa-pencil" aria-hidden="true" />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div
                      style={{
                        paddingLeft: "0px",
                        lineHeight: "35px"
                      }}
                      className="btn-friend"
                    >
                      <Dropdown id="dropdown-custom-1">
                        <Dropdown.Toggle>
                          <Glyphicon glyph="option-horizontal" />
                          Khác
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="">
                          <MenuItem
                            onClick={this.accessFollow.bind(this)}
                            eventKey="1"
                          >
                            {" "}
                            {info.follow && info.follow.status ? (
                              <i
                                style={{ marginLeft: "-15px" }}
                                className="fa fa-check"
                                aria-hidden="true"
                              />
                            ) : null}
                            Nhận thông báo
                          </MenuItem>
                          <MenuItem eventKey="2">Bạn thân</MenuItem>

                          <MenuItem divider />
                          <MenuItem
                            onClick={this.destroyFriend.bind(this)}
                            eventKey="4"
                          >
                            Hủy kết bạn
                          </MenuItem>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 remove-padding-col">
        <div
          className={
            this.props.url_page != "images" && this.props.url_page != "videos"
              ? "content-main col-md-8"
              : "content-main col-md-12"
          }
        >
          <div className="row">{this.props.children}</div>
        </div>
        {this.props.url_page != "images" && this.props.url_page != "videos" ? (
          <div className="col-md-4 remove-padding-col">
            <Relative />
          </div>
        ) : null}
      </div>
    </div>;
  }
}

module.exports = LayoutRight;
