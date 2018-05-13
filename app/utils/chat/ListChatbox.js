import React from  'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
 import ChatBox from './Chatbox'
 import {addMessage,openChatbox} from 'app/action/actionChatbox'

class ListChatBox extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
           listMessage:[

           ]
        
        }
    }
    exitsChatbox(user){
        let {listUser} = this.props.chatbox;
        for(var i=0;i<listUser.length;i++){
            if(listUser[i].id==user.id)
                return i;
                break

        }
        return -1;
    }
    componentWillMount(){
        let self = this;
        io.socket.get('/notification/chat', function gotResponse(data, jwRes) {
            console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data)
            io.socket.on('chatuser'+data.userId, function (data) {
                 let index = self.exitsChatbox(data.user);
                 if(index!=-1){
                    let id = data.data.userId_sent>data.data.userId_rec?(data.data.userId_sent+'_'+data.data.userId_rec):(data.data.userId_rec+'_'+data.data.userId_sent)

                    self.props.dispatch(addMessage({message:data.data,id}))
                    
                 }
                  else{

                        self.props.dispatch(openChatbox(data.user))
                  }
        
             })
    
            
    
    
        
          
          });
    }
    render(){
           let listChatbox = this.props.chatbox.listUser
           console.log('listusser',this.props.chatbox)
           let {auth,dispatch} = this.props
        
            return(
                <div>
                {listChatbox.length&&listChatbox.length>0?
            
              
                            listChatbox.map((chatbox,index)=>{
                            let id = auth.user.id>chatbox.id?auth.user.id+'_'+chatbox.id:chatbox.id+'_'+auth.user.id
                            return(
                                <ChatBox dispatch ={dispatch} auth={auth} listchat={this.props.chatbox.listchat[id]} right={(index+1)*243} key={index} chatbox={chatbox} />
                            )
                        }) :null
                    
            
              
                    
                }
            </div>
            )
    }
}
module.exports = connect(function(state){return{
    auth:state.auth,

    chatbox:state.chatbox,
}})(ListChatBox)