import React from "react";
import { NavLink, Route } from "react-router-dom";
import ListPostNew from "./components/ListPostNew";
import ListDiscover from "./components/ListDiscover";
import HeaderPost from "./HeaderPost";
import ListPost from "./ListPost";
import LayoutHome from "./LayoutHome";
class Wall extends React.Component {
  componentDidMount() {
    console.log("homeaaaa");
  }
  render() {
    return (
      //  <div>
      //   <div style={{marginTop:"5px"}} className="col-md-3 col-xs-12">
      //     <Info />

      //   </div>
      //   <div style={{paddingLeft:"0px"}} className="col-md-9 col-xs-12">

      //               <HeaderPost />
      //               <ListPost />

      //   </div>
      // </div>
      <LayoutHome groupname={this.props.groupname}>
        {/* <Route exact path="/userpage" component={ListPostNew} /> */}
        <ListDiscover groupname={this.props.groupname} />
      </LayoutHome>
    );
  }
}
module.exports = Wall;
