import React from "react";
import Popup from "reactjs-popup";
import {
  ButtonToolbar,
  Popover,
  OverlayTrigger,
  Button,
  Dropdown,
  MenuItem,
  Glyphicon
} from "react-bootstrap";

class PopupInfo extends React.Component {
  componentDidMount(){
    console.log('PopupInfo')
  }
  render() {
    return (
      <div className="card">
        <div className="banner-popup" />
        <div className="info-user-popup">
          <div className="img-avatar">
            <div className="avatar-user">
              <div className="thum-avatar" />
            </div>
          </div>
          <div className="name-user">Trịnh Đức Bảo Linh</div>
          <div className="info-data">
            <div className="row-data">
              <div className="icon">
                <i className="fas fa-user-friends" />
              </div>
              <div className="data">
                36 bạn chung gốm Khắc Linh và 36 người khác
              </div>
            </div>
            <div className="row-data">
              <div className="icon">
                <i className="fas fa-briefcase" />
              </div>
              <div className="data">Làm việc ở SamSung </div>
            </div>
          </div>
        </div>

        <div className="footer-popup">
          <div
            style={{ paddingLeft: "0px", lineHeight: "35px" }}
            className="btn-friend"
          >
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle>
                <Glyphicon glyph="star" />
                Bạn bè
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <MenuItem eventKey="1">
                  {" "}
                  <i
                    style={{ marginLeft: "-15px" }}
                    className="fa fa-check"
                    aria-hidden="true"
                  />
                  Nhận thông báo
                </MenuItem>
                <MenuItem eventKey="2">Bạn thân</MenuItem>

                <MenuItem divider />
                <MenuItem eventKey="4">Hủy kết bạn</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="btn-friend">
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle>
                <Glyphicon glyph="ok" />
                Đang theo dõi
              </Dropdown.Toggle>
              <Dropdown.Menu className="">
                <MenuItem eventKey="1">
                  <Glyphicon glyph="ok" />
                  Theo dõi
                </MenuItem>

                <MenuItem eventKey="2">Hủy theo dõi</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="btn-join">
            <i className="fa fa-plus" aria-hidden="true" />
            Kết bạn
          </div>
        </div>
      </div>
    );
  }
}

export default () => (
  <div className="example-warper">
    <Popup
      trigger={<button className="button"> left Center </button>}
      position="left center"
      // on="hover"
      closeOnDocumentClick
    >
      <PopupInfo  />
    </Popup>
  </div>
);
