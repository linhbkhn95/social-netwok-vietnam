const ADD_REQFRIEND = "ADD_REQFRIEND"
const RESET_REQFRIEND = "RESET_REQFRIEND"
const SET_REQFRIEND ="SET_REQFRIEND"
const ADD_LIST_REQ ="ADD_LIST_REQ"
const REMOVE_REQFRIEND ="REMOVE_REQFRIEND"
function addReqFriend(data){
   return{type:ADD_REQFRIEND,data};
 }
 function removeReqFriend(data){
  return{type:REMOVE_REQFRIEND,data};
 }
 function addList(data){
  return{type:ADD_LIST_REQ,data};
}
 function setReqFriend(data){
  return{type:SET_REQFRIEND,data};
}
  function  resetReqFriend(){
    return{type:RESET_REQFRIEND};
 }
 module.exports = {addReqFriend,resetReqFriend,setReqFriend,addList,removeReqFriend};
 