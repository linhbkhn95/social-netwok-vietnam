import React from  'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
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
    componentDidMount(){
        let self = this
        io.socket.post('/chat/getlist_user',{userId_patner:2},((resdata,jwres)=>{
            console.log('rss',resdata)
            if(resdata.EC==0){
                self.setState({listMessage:resdata.DT})
            
            //   this.refs.textchat.value = ''
            }
            else{

            }
        }))
    }
    handleSubmit(){
        let text = this.refs.textchat.value;
        console.log('text',text);
        this.refs.textchat.value = ''
    }
    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          let text = this.refs.textchat.value;
          let data = {}
          data.userId_rec = 2;
          data.text = text
          console.log('text',text);
          let self = this
          io.socket.post('/chat/add',data,((resdata,jwres)=>{
              console.log('rss',resdata)
              if(resdata.EC==0){
                self.state.listMessage.push(resdata.DT);
                self.setState({listMessage:self.state.listMessage})
                self.refs.textchat.value = ''
              }
              else{

              }
          }))
        
        //   this.myFormRef.submit();
        }
      }
    render(){
            var styles ={
                        right :"243px",
                        display: "block"
            };
            let {listMessage} =  this.state
            let user = this.props.auth.user
            return(
                 <div style={styles} className="row chat-window col-xs-4 col-md-2"  >
                     <div className="col-xs-12 col-md-12">
                         <div className="panel panel-default">
                            {/* <HeaderChatBox socketid = {this.props.socketid} closeChatBox = {this.props.closeChatBox} username={this.props.username} /> */}
                            <div className="panel-heading top-bar">
							 <div className="pull-left">


							<div style={{fontSize:"11px",}}><span style={{    left: "3px",
    fontSize: "10px",marginRight:"2px" ,fontWeight:"normal"}} className="glyphicon glyphicon-comment"></span> Nguyễn Xuân </div>
							 </div>
							 <div className="pull-right" >
									 <a href="#"><span style={{   
    fontSize: "10px",color:"#818781"}} id="minim_chat_window" className="glyphicon glyphicon-minus icon_minim"></span></a>
							 <a href="#" ><span style={{    
    fontSize: "10px",color:"#818781"}} className="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></a>
						 </div>
				 </div>



                        	<div className="panel-body col-md-12 msg_container_base">
                            

					        {/* <div className="message-box">
						        <div>

									<NavLink to={"/userpage.linhtd"}><img style={{marginRight:"3px"}} className="img-user" src={"/images/user/linh.jpg"} /></NavLink>
							   	</div>
                                    <div className=" message-chatbox" > <div>bạn đang lam gì thế </div>
                             </div>

                               </div> */}
                               {listMessage.length>0?
                                listMessage.map((message,index)=>{
                                    if(message.userId_sent==user.id)
                                        return(
                                            <div key={index} >
                                            <div  className="pull-right">
    
                                                {/* <NavLink to={"/userpage.linhtd"}><img style={{marginRight:"3px"}} className="img-user" src={"/images/user/xuan.jpg"} /></NavLink> */}
                                            </div>
                                                <div className=" message-chatbox-sent" > <div>{message.text}</div>
                                        </div>
    
                                       </div>   
                                        )
                                    else{
                                        return (
                                            <div key={index}>
                                            <div  className="pull-left">
    
                                                <NavLink to={"/userpage.linhtd"}><img style={{marginRight:"3px"}} className="img-user" src={"/images/user/xuan.jpg"} /></NavLink>
                                            </div>
                                                <div className=" message-chatbox-rc" > <div>{message.text}</div>
                                        </div>
    
                                   </div>
    
                                        )
                                    }
                                }):null
                            }
                                
                               
                              </div>
                              
                             
                          {/* <BodyChatChatBox messages = {this.props.messages} /> */}


                           <div style={{padding:"0px"}} className="panel-footer">

                                
                                    <form ref={el => this.myFormRef = el}  onSubmit={this.handleSubmit.bind(this)}>
                                    {/* <textarea 	onChange={this.changeHandler} id="btn-input" style={{borderRadius:"0px"}} className="form-control input-sm chat_input" placeholder="Nhập tin nhắn để gửi...."> </textarea> */}
              <textarea onKeyDown={this.onEnterPress}  id="chat_input" ref="textchat" className="form-control chat_input" style={{borderRadius:"0px",fontSize:"11px"}}  placeholder="Nhập tin nhắn.." rows="1" id="comment"></textarea>

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
module.exports = connect(function(state){return{auth:state.auth}})(ChatBox)