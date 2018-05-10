
var React = require('react');
var {connect} = require('react-redux');
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {addList,resetReqFriend,removeReqFriend} from 'app/action/actionReqFriend'

import {NavLink} from 'react-router-dom'
var date = Date.now();
var datedemo=1511399642970;
class listRequesFriends extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listRequesFriends:[]
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
        // let self = this
        // io.socket.get('/friends/getlistRequestFriend',function(res,jwRes){
        //     if(res.EC==0){
        //         self.setState({listRequesFriends:resdata.DT})
        //     //   self.props.dispatch(setNotification(res.DT))
        //     }
        // })
      

    }
    accept(username){
        let self = this
        io.socket.post('/friends/accept',{username},((resdata,jwres)=>{
            if(resdata.EC==0){
                self.props.dispatch(removeReqFriend(resdata.DT))

            }
        }))
    }
    cancel(username){
        io.socket.post('/friends/cancel',{username},((resdata,jwres)=>{
            if(resdata.EC==0){
                self.props.dispatch(removeReqFriend(resdata.DT))

            }
        }))
    }
    componentWillReceiveProps(nextProps){

    }
    componentDidMount(){
        io.socket.on('notifi_user_requestFriend'+this.props.auth.user.id, function (data) {
            console.log('addnotifi',data)
      
        // toast(<ToastNotifi notifi={data}/>, {autoClose: 500000})
        // self.props.dispatch(addReq(data))
  
       })
       let self = this
       io.socket.post('/friends/getlistRequestFriend',((resdata,jwres)=>{
           console.log('listreqfriend',resdata)
           if(resdata.EC==0){
               self.props.dispatch(addList(resdata.DT))
           }
       }))
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      
      }
      showNotifi(){
        $("#listRequesFriends").fadeToggle(300);
        this.props.dispatch(resetReqFriend())

       
        // $("#notification_count").fadeOut("slow");
        return false;
      }
      handleClickOutside(event) {
        console.log('outsiedja')
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          
        $("#listRequesFriends").hide();
        }
      }
  
      setWrapperRef(node) {
        this.wrapperRef = node;
      }
       render(){
           let self  = this
         let {data,number_reqfriend} = this.props.reqFriend 
         return(
            <li ref={this.setWrapperRef} onClick={this.showNotifi.bind(this)} id="notification_li">
           {number_reqfriend? <span id="notification_count">{number_reqfriend}</span>:null}
            <a href="#" ref="foo" id="notificationLink" data-tip="Thông báo"> <i className="fa fa-user-plus" aria-hidden="true"></i>     </a>
        
            <div id="listRequesFriends">
                  <div className="beeperNub"></div>
                <div id="notificationTitle" >Yêu cầu kết bạn</div>
                <div className="">Mới</div>
                <div id="notificationsBody" className="notifications">
                  
                   {data.length>0?data.map((reqFriend,index)=>{
                     return(
                        <div key={index} style={{}} className="col-md-12 alert-message">
                              <div className="col-md-3 row"><NavLink to={"/userpage."+reqFriend.username} ><img className="avatar-alert" src={reqFriend.url_avatar} /></NavLink></div>
                                <div className="user-request">
                                    <div style={{float:"left",width:"45%"}}> <NavLink to={"/userpage."+reqFriend.username}>  <strong>{reqFriend.fullname}</strong></NavLink>
                                    <br />
                                    <p className="time-alert">2 bạn chung</p>
                                    </div>
                                    <div className="pull-right">
                                        <button onClick={self.accept.bind(this,reqFriend.username)} className="btn btn-success">Chấp nhận</button>
                                        <button  onClick={self.cancel.bind(this,reqFriend.username)} style={{marginLeft:"3px"}} className="btn btn-default">Từ chối</button>

                                    </div>
                                </div>
                               
                       </div>
                       ) 
                 }):<div style={{textAlign:"center"}}>Chưa có yêu cầu kết bạn</div>}
                   
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
        reqFriend:state.reqFriend
    }})
   (listRequesFriends);