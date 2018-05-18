var ADD_CHATBOX="ADD_CHATBOX";
let ADD_MESSAGE = "ADD_MESSAGE"
let RE_OPEN_CHATBOX = "RE_OPEN_CHATBOX"
let REMOVE_CHATBOX  = "REMOVE_CHATBOX"
import axios from 'axios'

function reOpenChatbox(data){
    return{
        type:RE_OPEN_CHATBOX,
        data
    }
}
function removeChatbox(data){
    return{
        type:REMOVE_CHATBOX,
        data
    }
}
function openChatbox(user){
  return dispatch => {
    return axios.post('/chat/getlist_user', {userId_patner:user.id}).then(res => {

        let data ={
              user,
              id:res.data.DT.id,
              listchat:res.data.DT.listchat
        }
        
        dispatch(addChatbox(data))
      
    });
  }
}
function addMessageSubmit(message){
    console.log('data',message)

    return dispatch => {
        return axios.post('/chat/add',message).then(res => {
            if(res.data.EC==0&&res.data.DT){
                let dataMessage = res.data.DT.data
                let id = dataMessage.userId_sent>dataMessage.userId_rec?(dataMessage.userId_sent+'_'+dataMessage.userId_rec):(dataMessage.userId_rec+'_'+dataMessage.userId_sent)
                let data ={
                    id,
                    message:res.data.DT.data,
                    new_message:res.data.DT
                }
                
                dispatch(
                    addMessage(data)
                )
            }
          
        });
      }
}
 function addMessage(data){
    
   return{type:ADD_MESSAGE,data};
 }
 function addChatbox(data){
    
    return{type:ADD_CHATBOX,data};
  }
 module.exports = {addMessage,openChatbox,addMessageSubmit,addChatbox,reOpenChatbox,removeChatbox};
 