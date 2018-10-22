// import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from "lodash.isempty";

var data = {
  listUser: [],
  listchat: {},
  new_message: {}
};

let datacopy;
var chatbox = (state = data, action) => {
  //  console.log('dmmsádadadad');
  //   console.log(!isEmpty(action.user));
  switch (action.type) {
    case "ADD_CHATBOX":
      datacopy = { ...state };

      datacopy.listUser.unshift(action.data.user);
      datacopy.listchat[action.data.id] = action.data.listchat;
      return datacopy;
    case "ADD_MESSAGE":
      datacopy = { ...state };
      datacopy.new_message = action.data.new_message;
      datacopy.listchat[action.data.id].push(action.data.message);
      return datacopy;
    case "REMOVE_CHATBOX":
      datacopy = { ...state };
      datacopy.listUser.splice(action.data.index, 1);
      delete datacopy.listchat[action.data.id];
      return datacopy;

    case "RE_OPEN_CHATBOX":
      datacopy = { ...state };
      datacopy.listUser.splice(action.data.index, 1);
      datacopy.listUser.unshift(action.data.user);
      return datacopy;

    default:
      return state;
  }
};
module.exports = chatbox;
