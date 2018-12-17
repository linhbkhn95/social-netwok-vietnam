import React from "react";
import HeaderListPost from "./components/HeaderListPost";
import ModalPostStatus from "app/utils/modal/ModalPostStatus";
import ListPost from "./ListPost";
import Relative from "../Relative";

import { NavLink, Route } from "react-router-dom";

class Wall extends React.Component {
  render() {
    return (
      <div style={{ paddingLeft: "0px" }} className="col-md-12 remove-padding-col">
        <ModalPostStatus groupname={this.props.groupname} />
        <div className="col-md-12 list-post remove-padding-col">
          <div className="">
            {/* <HeaderListPost /> */}
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Wall;
