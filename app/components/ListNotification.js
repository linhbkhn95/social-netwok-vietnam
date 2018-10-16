
var React = require('react');
var {connect} = require('react-redux');
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {addList,addNotification,setNotification,resetNotification} from 'app/action/actionNotification'

import {NavLink} from 'react-router-dom'
var date = Date.now();
var datedemo=1511399642970;
class ListNotification extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listnotifi:[]
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
        let self = this
        io.socket.post('/notification/get_number_notifi',{username:this.props.auth.user.username},function(res,jwRes){
            if(res.EC==0){
              self.props.dispatch(setNotification(res.DT))
            }
        })
        io.socket.post('/notification/getlist',((resdata,jwres)=>{
            console.log('listnotifi',resdata)
            if(resdata.EC==0){
                self.props.dispatch(addList(resdata.DT))

            }
        }))

    }
    componentWillReceiveProps(nextProps){

    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
      showNotifi(){
        $("#notificationContainer").fadeToggle(300);
        let self = this
        self.props.dispatch(resetNotification())

        // $("#notification_count").fadeOut("slow");
        return false;
      }
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        $("#notificationContainer").hide();
        }
      }

      setWrapperRef(node) {
        this.wrapperRef = node;
      }
       render(){
         let {data,number_notifi} = this.props.notification
         return(
            <li ref={this.setWrapperRef} onClick={this.showNotifi.bind(this)} id="notification_li">
           {number_notifi? <span id="notification_count">{number_notifi}</span>:null}
            <a href="#" ref="foo" id="notificationLink" data-tip="Thông báo"><i style={{color:" rgb(92, 184, 92)"}} className="fas fa-bell" aria-hidden="true"></i> </a>

            <div id="notificationContainer">
                  <div className="beeperNub"></div>
                <div id="notificationTitle" >Thông báo</div>
                <div className="">Mới</div>
                <div id="notificationsBody" className="notifications">

                   {data.length>0?data.map((notifi,index)=>{
                    //    let text = notifi.type=="comment"?" đã bình luận về bài"
                       return(
                        <div key={index} style={{background:notifi.readNotifi?"white":"#ebf4e7"}} className="col-md-12 alert-message">

                         <NavLink to={notifi.url_ref} > <div className="col-md-3 row">{notifi.incognito?<img className="avatar-alert" src="/images/user/robot.png" />:<NavLink to={"/userpage."+notifi.user_notifi.username} ><img className="avatar-alert" src={notifi.user_notifi.url_avatar} /></NavLink>}</div>
                                <div className="col-md-10 row">
                       {notifi.incognito? <strong>"Người lạ nào đó</strong>:<NavLink to={"/userpage."+notifi.user_notifi.username} >  <strong>{notifi.user_notifi.fullname}</strong></NavLink>} {notifi.text +" bạn"}
                                    <br />
                                    <div> <i style={{marginRight:"3px",fontSize:"12px",float:"left"}}  className={notifi.type=="like"?"fa fa-heart-o":"fa fa-comment-o"} aria-hidden="true"></i>  <p style={{float:""}} className="time-alert">{moment(notifi.time).lang('vi').fromNow()}</p> </div>
                                </div>
                                </NavLink>
                       </div>
                       )
                   }):<div style={{textAlign:"center"}}>Chưa có thông báo nào</div>}

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
        notification:state.notification
    }})
   (ListNotification);
