import React from "react";
import HeaderListPost from "./components/HeaderListPost";
import HeaderPost from "./HeaderPost";
import ListPost from "./ListPost";
import Info from "./Info";
import ModalPostStatus from "app/utils/modal/ModalPostStatus";
import { NavLink, Route } from "react-router-dom";

class Wall extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ background: "white" }}
          className="col-md-4 col-xs-12 remove-padding-col"
        >
          <Info username={this.props.username} />
        </div>
        <div style={{paddingRight:"0px"}} className="col-md-8 col-xs-12 ">
          <ModalPostStatus username={this.props.username} />
          <div className="col-md-12 list-post remove-padding-col ">
            <div className="">
              {/* <HeaderListPost /> */}
              <div>{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Wall;
