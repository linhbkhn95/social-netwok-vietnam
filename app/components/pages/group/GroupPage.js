import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Product from "app/utils/Product.js";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Ridirect,
  hashHistory,
  Redirect
} from "react-router-dom";
import Wall from "./components/home/Home";
import LayoutPage from "./components/LayoutPage";
import ListFriend from "./components/friends/ListFriend";
import ListFollow from "./components/follow/ListFollow";
import ListImage from "./components/images/ListImage";
class GroupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      groupname: null
    };
  }
  componentWillReceiveProps(nextProps) {}
  componentDidMount() {}
  login() {
    var { dispatch } = this.props;

    console.log(this.refs.sdt.value + " " + this.refs.password.value);
    dispatch(login(this.refs.sdt.value));
    this.props.history.push("/");
  }
  render() {
    console.log("match", this.props.match.params);
    let { groupname } = this.props.match.params;
    return (
      <LayoutPage groupname={groupname}>
        {/* <Route exact path={"/groups/"+groupname}  component={Wall} */}
        {/* /> */}
        <Route
          exact
          path={"/groups/" + groupname}
          render={function() {
            return (
              <div>
                <Wall groupname={groupname} />
              </div>
            );
          }}
        />

        {/* <Route path={"/groups/"+groupname+"/friends"} component={ListFriend}/> */}
        <Route
          path={"/groups/" + groupname + "/members"}
          render={function() {
            return (
              <div>
                <ListFriend groupname={groupname} />
              </div>
            );
          }}
        />

        <Route
          path={"/groups/" + groupname + "/follows"}
          render={function() {
            return (
              <div>
                <ListFollow groupname={groupname} />
              </div>
            );
          }}
        />

        <Route
          path={"/groups/" + groupname + "/images"}
          render={function() {
            return (
              <div>
                <ListImage groupname={groupname} />
              </div>
            );
          }}
        />
      </LayoutPage>
    );
  }
}

module.exports = connect(function(state) {
  return {};
})(GroupPage);
