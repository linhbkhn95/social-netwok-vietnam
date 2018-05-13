// import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash.isempty';

var data = {
 listUser:[
   
 ],
 listchat:{
     
 }
};

let datacopy
 var chatbox = (state = data, action) => {
  //  console.log('dmmsádadadad');
  //   console.log(!isEmpty(action.user));
  switch(action.type) {

    case "ADD_CHATBOX":
         datacopy = {...state}
        datacopy.listUser.unshift(action.data.user)
        datacopy.listchat[action.data.id] = action.data.listchat
        return datacopy
    case "ADD_MESSAGE":
        datacopy = {...state}
        datacopy.listchat[action.data.id].push(action.data.message);
        return datacopy
    default:
       return state;
  }
}
module.exports = chatbox;
