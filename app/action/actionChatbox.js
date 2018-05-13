var ADD_CHATBOX="ADD_CHATBOX";
let ADD_MESSAGE = "ADD_MESSAGE"
import axios from 'axios'

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
                let dataMessage = res.data.DT
                let id = dataMessage.userId_sent>dataMessage.userId_rec?(dataMessage.userId_sent+'_'+dataMessage.userId_rec):(dataMessage.userId_rec+'_'+dataMessage.userId_sent)
                let data ={
                    id,
                    message:res.data.DT
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
 module.exports = {addMessage,openChatbox,addMessageSubmit,addChatbox};
 