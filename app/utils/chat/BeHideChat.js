import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addMessage, openChatbox } from "app/action/actionChatbox";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
const popoverFocus = (
  <Popover id="popover-trigger-focus" title="Popover bottom">
    <strong>Holy guacamole!</strong> Check this info.
  </Popover>
);
class ListBeHide extends React.Component {
  render() {
    let listChatbox = this.props.chatbox.listUser;
    return (
      <Popover id="popover-trigger-focus" title="Popover bottom">
        <strong>Holy guacamole!</strong> Check this info.
        {/* {listChatbox.length&&listChatbox.length>3?


                            listChatbox.map((chatbox,index)=>{
                            // let id = auth.user.id>chatbox.id?auth.user.id+'_'+chatbox.id:chatbox.id+'_'+auth.user.id
                           if(index>3) return(

                                <div>{chatbox.fullname}</div>

                            )

                        }) :null




                } */}
      </Popover>
    );
  }
}
module.exports = connect(function(state) {
  return {
    auth: state.auth,

    chatbox: state.chatbox
  };
})(ListBeHide);
