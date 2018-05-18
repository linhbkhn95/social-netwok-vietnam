import React from  'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addMessageSubmit,openChatbox,removeChatbox} from 'app/action/actionChatbox'
const ReactDOM = require('react-dom')

class ChatBox extends React.Component{
    // closeChatBox(e){
    //
    // 			e.preventDefault();
    // 			console.log("đóng tab chat này nhé  " + this.props.username );
    //
    // 			this.props.closeChatBox(this.props.socketid);
    // },
    constructor(props){
        super(props);
        this.state = {
           listMessage:[

           ]
        
        }
    }
    onMessageSubmit(data){
            // data.socketid = this.props.socketid;
    }
    // componentDidMount(){
    //     let self = this
    //     io.socket.post('/chat/getlist_user',{userId_patner:this.props.chatbox.id},((resdata,jwres)=>{
    //         console.log('/chat/getlist_user',this.props.chatbox.id,resdata)
    //         if(resdata.EC==0){
    //             self.setState({listMessage:resdata.DT})
            
    //         //   this.refs.textchat.value = ''
    //         }
    //         else{

    //         }
    //     }))
    // }
    handleSubmit(){
        let text = this.refs.textchat.value;
        console.log('text',text);
        this.refs.textchat.value = ''
    }
    componentWillReceiveProps(nextProps){
        this.setState({listMessage:nextProps.listchat[this.props.chatbox.id]})
    }
    componentDidMount(){
        $('#bodychat').stop().animate({
            scrollTop: $('#bodychat')[0].scrollHeight
        }, 500);
          
        
        
        
    }
    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          let text = this.refs.textchat.value;
          let data = {}
          data.userId_rec = this.props.chatbox.id;
          data.text = text
          console.log('text',text);
          if ( document.activeElement === ReactDOM.findDOMNode(this.refs.textchat) )
                console.log('focus ccmm')
          $("#chat_input").focusin(()=> {
              console.log('cmmm')
            })
          this.props.dispatch(addMessageSubmit(data));
        //   var elem = document.getElementById('bodychat');
        //   elem.scrollTop = elem.scrollHeight;
          
        $('#bodychat').stop().animate({
            scrollTop: $('#bodychat')[0].scrollHeight
        }, 0);
          
          this.refs.textchat.value = ''

        
        }
      }
   
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps)
        $('#bodychat').stop().animate({
            scrollTop: $('#bodychat')[0].scrollHeight
        }, 0);
          
         

        
        
    }

    remove(){
        let chatbox = this.props.chatbox
        let me = this.props.auth.user;
        let index = this.props.index
        let id = me.id>chatbox.id?me.id+'_'+chatbox.id:chatbox.id+'_'+me.id
        this.props.dispatch(removeChatbox({index,id}))
    }
    onFocusInput() {

          io.socket.post('/chat/updateStatusListMessage',{userId_patner:this.props.chatbox.id},((resdata)=>{
              if(resdata.EC==0){
                  console.log('updateStatusMessage',resdata.DT)
              }
          }))
      }
    render(){
            var styles ={
                        right :"243px",
                        display: "block"
            };
            let listMessage =  this.props.listchat
            console.log('listmessage',listMessage)
            let self = this
            let user = this.props.auth.user
            return(
                 <div style={{right:this.props.right+"px"}} className="row chat-window col-xs-4 col-md-2"  >
                     <div className="col-xs-12 col-md-12">
                         <div className="panel panel-default">
                            {/* <HeaderChatBox socketid = {this.props.socketid} closeChatBox = {this.props.closeChatBox} username={this.props.username} /> */}
                            <div className="panel-heading top-bar">
							 <div className="pull-left">


							<div style={{fontSize:"11px",}}><span style={{    left: "3px",
    fontSize: "10px",marginRight:"2px" ,fontWeight:"normal"}} className="glyphicon glyphicon-comment"></span> {this.props.chatbox.fullname} </div>
							 </div>
							 <div className="pull-right" >
									 <a href="#"><span style={{   
    fontSize: "10px",color:"#818781"}} id="minim_chat_window" className="glyphicon glyphicon-minus icon_minim"></span></a>
							 <a href="#" ><span style={{    
    fontSize: "10px",color:"#818781"}} className="glyphicon glyphicon-remove icon_close" onClick={this.remove.bind(this)} data-id="chat_window_1"></span></a>
						 </div>
				 </div>



                        	<div id="bodychat" className="panel-body col-md-12 msg_container_base">
                            

					        {/* <div className="message-box">
						        <div>

									<NavLink to={"/userpage.linhtd"}><img style={{marginRight:"3px"}} className="img-user" src={"/images/user/linh.jpg"} /></NavLink>
							   	</div>
                                    <div className=" message-chatbox" > <div>bạn đang lam gì thế </div>
                             </div>

                               </div> */}
                               {listMessage.length>0?
                                listMessage.map((message,index)=>{
                                    let show = true;
                                    let style= {}
                                     if(index>1&&message.userId_sent!=user.id&&listMessage[index].userId_sent== listMessage[index-1].userId_sent ){
                                        show = false,
                                        style={paddingLeft:"16%",width:"100%"}
                                     }
                                    if(message.userId_sent==user.id)
                                        return(
                                            <div  key={index} >
                                            <div  className="pull-right">
    
                                                {/* <NavLink to={"/userpage.linhtd"}><img style={{marginRight:"3px"}} className="img-user" src={"/images/user/xuan.jpg"} /></NavLink> */}
                                            </div>
                                                <div className=" message-chatbox-sent" > <div>{message.text}</div>
                                        </div>
    
                                       </div>   
                                        )
                                    else{
                                        return (
                                            <div className="message-rec" key={index}>
    
                                              <div className="img-chatbox"> {show? <NavLink to={"/userpage"+self.props.chatbox.username}><img style={{marginRight:"3px"}} className="img-user" src={self.props.chatbox.url_avatar} /></NavLink>:<div className="img-user"></div>} </div>
                                           
                                             <div style={style}  className="content-text"> <div className=" message-chatbox-rc" ><div>{message.text}</div></div></div>
                                           
                                           </div>
    
                                        )
                                    }
                                }):null
                            }
                                
                               
                              </div>
                              
                             
                          {/* <BodyChatChatBox messages = {this.props.messages} /> */}


                           <div style={{padding:"0px"}} className="panel-footer">

                                
                                    <form id="form-send-message" ref={el => this.myFormRef = el}  onSubmit={this.handleSubmit.bind(this)}>
                                    {/* <textarea 	onChange={this.changeHandler} id="btn-input" style={{borderRadius:"0px"}} className="form-control input-sm chat_input" placeholder="Nhập tin nhắn để gửi...."> </textarea> */}
              <textarea onKeyDown={this.onEnterPress}   onFocus={ this.onFocusInput.bind(this) }   id="chat_input" ref="textchat" className="form-control chat_input" style={{borderRadius:"0px",fontSize:"11px", border:"1px solid #dcd9d9"}}  placeholder="Nhập tin nhắn.." rows="1" id="comment"></textarea>

                                    </form>
                                        {/* <span className="input-group-btn">
                                            <button id="btn-chat"  className="btn btn-primary btn-sm">Gửi tin</button>
                                        </span> */}
                                   
                                    </div>


                    </div>
                    </div>
                    </div>
            );
    }
}
module.exports = 
(ChatBox)