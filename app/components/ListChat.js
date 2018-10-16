
var React = require('react');
var {connect} = require('react-redux');
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {addList,addNotification,setNotification,resetNotification} from 'app/action/actionNotification'
import {addMessage,openChatbox,reOpenChatbox,removeChatbox} from 'app/action/actionChatbox'

import {NavLink} from 'react-router-dom'
var date = Date.now();
var datedemo=1511399642970;
class ListNotification extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listChat:[],
            count_wait_user:0,
            new_message:{}
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
        let self = this
        // io.socket.post('/notification/get_number_notifi',{username:this.props.auth.user.username},function(res,jwRes){
        //     if(res.EC==0){
        //       self.props.dispatch(setNotification(res.DT))
        //     }
        // })
        // io.socket.post('/notification/getlist',((resdata,jwres)=>{
        //     console.log('listnotifi',resdata)
        //     if(resdata.EC==0){
        //         self.props.dispatch(addList(resdata.DT))

        //     }
        // }))
        io.socket.post('/chat/getlist_message_user',{},((resdata)=>{
            console.log('listchatnew',resdata)
             if(resdata.EC==0){
                 self.setState({listChat:resdata.DT.list_message_user,count_wait_user:resdata.DT.count_wait_user})
             }
        }))
        console.log('chatusseraddadadadxxx',this.props.auth.user)

        io.socket.on('chatuser'+this.props.auth.user.id, function (data) {
            console.log('chatusseraddadadad',data)
            let index = self.exitsChatbox(data.user);
            if(index!=-1){
               let id = data.data.userId_sent>data.data.userId_rec?(data.data.userId_sent+'_'+data.data.userId_rec):(data.data.userId_rec+'_'+data.data.userId_sent)
               self.state.listChat.splice(index,1)
               self.state.listChat.unshift(data);
                self.setState({listChat:self.state.listChat,count_wait_user:self.state.count_wait_user+1})

            }
             else{
                self.state.listChat.unshift(data);
                self.setState({listChat:self.state.listChat,count_wait_user:self.state.count_wait_user+1})

             }

        })

    }
    exitsChatbox(user){
        console.log('userexxit',user)
        let {listChat} = this.state;
        for(var i=0;i<listChat.length;i++){
            if(listChat[i].user.id==user.id)
                return i;
                break

        }
        return -1;
    }
    componentWillReceiveProps(nextProps){
        let data = nextProps.chatbox.new_message
        let self = this
        let count_wait_user
        if(data.data)
            count_wait_user = data.data.userId_rec == this.props.auth.user.id ? this.state.count_wait_user+1:this.state.count_wait_user
         if(!this.state.new_message.data&&nextProps.chatbox.new_message.data||nextProps.chatbox.new_message.data&&nextProps.chatbox.new_message.data.id!=this.state.new_message.data.id)
         {
            let index = self.exitsChatbox(data.user);
            if(index!=-1){
               let id = data.data.userId_sent>data.data.userId_rec?(data.data.userId_sent+'_'+data.data.userId_rec):(data.data.userId_rec+'_'+data.data.userId_sent)
               self.state.listChat.splice(index,1)
               self.state.listChat.unshift(data);
                self.setState({listChat:self.state.listChat,count_wait_user,new_message:{...data}})

            }
             else{
                self.state.listChat.unshift(data);
                self.setState({listChat:self.state.listChat,count_wait_user,new_message:{...data}})

             }

        }

            console.log('newmessage',nextProps.chatbox.new_message)

    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
      showNotifi(){
        $("#messagerContainer").fadeToggle(300);
        let self = this
        self.props.dispatch(resetNotification())
        io.socket.post('/chat/reset_all_know_message',((resdata)=>{
            if(resdata.EC==0){
                self.setState({count_wait_user:0})
            }
        }))
        // $("#notification_count").fadeOut("slow");
        return false;
      }
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        $("#messagerContainer").hide();
        }
      }
      openChatbox(user){
        let auth = this.props.auth
        let id = user.id>auth.user.id? user.id+'_'+auth.user.id: auth.user.id+'_'+user.id
        if(this.props.chatbox.listchat[id]==undefined||this.props.chatbox.listchat[id]==null)
             this.props.dispatch(openChatbox(user))
      }
      setWrapperRef(node) {
        this.wrapperRef = node;
      }
       render(){
         let self = this
         let listChat = this.state.listChat
         let number_notifi = this.state.count_wait_user
        let user = this.props.auth.user
         return(
            <li ref={this.setWrapperRef} onClick={this.showNotifi.bind(this)} id="notification_li">
           {number_notifi? <span id="notification_count">{number_notifi}</span>:null}
            <a href="#" ref="foo" id="notificationLink" data-tip="Tin nhắn">
             <i style={{color: "#5cb85c"}} className="glyphicon glyphicon-comment" aria-hidden="true"></i>
 </a>

            <div id="messagerContainer">
                  <div className="beeperNub"></div>
                <div id="notificationTitle" >Tin nhắn</div>
                <div className="">Mới</div>
                <div id="notificationsBody" className="notifications">

                   {listChat.length>0?listChat.map((chat,index)=>{
                     console.log('châtdad',chat)
                       return(
                        <div onClick={self.openChatbox.bind(self,chat.user)} key={index} style={{background:chat.data.userId_rec==user.id&&!chat.data.read_message?"#ebf4e7":"white"}} className="col-md-12 alert-message">

                    <div className="col-md-3 row"><img style={{height:"36px"}} className="avatar-alert" src={chat.user.url_avatar} /></div>
                                <div className="">
                                 <div  className="pull-left"> <strong>{chat.user.fullname}</strong></div>
                                  <div className="pull-right">
                                  <p style={{float:"",height:"36px"}} className="time-alert">{moment(chat.time).lang('vi').fromNow()}</p>
                                  </div>
                                    <br />
                                    {chat.data.text}

                                </div>

                       </div>
                       )
                   }):<div style={{textAlign:"center"}}>Chưa có tin nhắn nào</div>}

                </div>
                <div id="notificationFooter"><a href="#">Xem tất cả</a></div>
            </div>

        </li>

         )
     }
}
module.exports =connect(function(state){
    return{
        auth:state.auth,
        chatbox:state.chatbox,

    }})
   (ListNotification);
