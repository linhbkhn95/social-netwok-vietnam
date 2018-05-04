const ADD_NOTIFICATION = "ADD_NOTIFICATION"
const RESET_NOTIFICATION = "RESET_NOTIFICATION"
const SET_NOTIFICATION ="SET_NOTIFICATION"
const ADD_LIST ="ADD_LIST"

function addNotification(data){
   return{type:ADD_NOTIFICATION,data};
 }
 function addList(data){
  return{type:ADD_LIST,data};
}
 function setNotification(data){
  return{type:SET_NOTIFICATION,data};
}
  function  resetNotification(){
    return{type:RESET_NOTIFICATION};
 }
 module.exports = {addNotification,resetNotification,setNotification,addList};
 