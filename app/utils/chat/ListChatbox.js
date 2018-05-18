import React from  'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
 import ChatBox from './Chatbox'
 import {addMessage,openChatbox,reOpenChatbox,removeChatbox} from 'app/action/actionChatbox'
import {Button,OverlayTrigger,Popover} from 'react-bootstrap'
import ListBehide from './BeHideChat'
const popoverFocus = (
    <Popover id="popover-trigger-focus" title="Popover bottom">
      <strong>Holy guacamole!</strong> Check this info.
    </Popover>
  );
class ListChatBox extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
           listMessage:[

           ]
        
        }
    }
    reOpenchatbox(index,user){
        this.props.dispatch(reOpenChatbox({index,user}))
        console.log('reopen',user);
    }
    remove(index,user){
        let me = this.props.auth.user
        let id = user.id >me.id ? user.id+'_'+me.id:me.id+'_'+user.id
        this.props.dispatch(removeChatbox({index,id}));
    }
    popoverFocus(){
        let self = this
        let listUser = this.props.chatbox.listUser
        return(
            <Popover id="popover-trigger-click" className="focus-behide" title="Danh sách ẩn">
                
             {listUser.map((user,index)=>{
                if(index>2) return   <div  key={index}> <span className="item-user"><div onClick={self.reOpenchatbox.bind(this,index,user)} className="name-user-behide" style={{cursor:"point"}}>{user.fullname}</div> <i onClick={self.remove.bind(this,index,user)} className="fa fa-times" aria-hidden="true"></i></span><br /> </div>

             })}
            </Popover>
        )
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

                    self.props.dispatch(addMessage({message:data.data,id,new_message:data}))
                    
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
           let behidechat = listChatbox.length>3? <div className="chat-window-hide">
           
            <OverlayTrigger  placement="top" trigger="click"  overlay={this.popoverFocus()}>
          <Button> <i className="fa fa-comments" aria-hidden="true"></i>   </Button>
         </OverlayTrigger>    
         </div>:null
            return(
                <div>
                {listChatbox.length&&listChatbox.length>0?
            
              
                            listChatbox.map((chatbox,index)=>{
                            let id = auth.user.id>chatbox.id?auth.user.id+'_'+chatbox.id:chatbox.id+'_'+auth.user.id
                           if(index<3) return(
                                <ChatBox key={index} index={index} dispatch ={dispatch} auth={auth} listchat={this.props.chatbox.listchat[id]} right={(index+1)*243} key={index} chatbox={chatbox} />
                            )
                          
                        }) :null
                    
                     
                   
                    
                }
                {behidechat}
                {/* <OverlayTrigger  placement="top" trigger="focus"  overlay={popoverFocus}>
      <Button>Focus</Button>
    </OverlayTrigger> */}
            </div>
            )
    }
}
module.exports = connect(function(state){return{
    auth:state.auth,

    chatbox:state.chatbox,
}})(ListChatBox)