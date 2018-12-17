import React from "react";
import Post from "app/utils/components/Post";
class ListPostNew extends React.Component {
  render() {
    return (
      <div className="col-md-12 remove-padding-col">
        <Post />
      </div>
    );
  }
}
module.exports = ListPostNew;
