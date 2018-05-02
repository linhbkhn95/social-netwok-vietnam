
var React = require('react');
var {connect} = require('react-redux');
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
var date = Date.now();
var datedemo=1511399642970;
class ListNotification extends React.Component{
    constructor(props){
        super(props);
        this.state ={
  
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);

    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
      showNotifi(){
        console.log('shádasdasdasdad')
        $("#notificationContainer").fadeToggle(500);
        $("#notification_count").fadeOut("slow");
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
        
         return(
            <li ref={this.setWrapperRef} onClick={this.showNotifi.bind(this)} id="notification_li">
            <span id="notification_count">3</span>
            <a href="#" ref="foo" id="notificationLink" data-tip="Thông báo"><i className="fa fa-bell-o" aria-hidden="true"></i> </a>
        
            <div id="notificationContainer">
                  <div className="beeperNub"></div>
                <div id="notificationTitle" >Thông báo</div>
                <div className="">Mới</div>
                <div id="notificationsBody" className="notifications">
                  
                    <div className="col-md-12 alert-message">
                        <div className="col-md-3 row"><img className="avatar-alert" src="/images/user/xuan.jpg" /></div>
                        <div className=" row">
                              <strong>Xuân Nguyễn</strong> đã bình luận bài đăng của bạn <strong>Tình yêu</strong>
                              <br />
                              <p className="time-alert">{moment(datedemo).lang('vi').fromNow()}</p>
                        </div>
                    </div>
                    <div className="col-md-12 alert-message">
                        <div className="col-md-3 row"><img className="avatar-alert" src="/images/user/duong.jpg" /></div>
                        <div className=" row">
                              <strong>Đăng Dương</strong> đã thích bài đăng của bạn 
                              <br />
                              <p className="time-alert">{moment(datedemo).lang('vi').fromNow()}</p>
                        </div>
                    </div>
                    <div className="col-md-12 alert-message">
                        <div className="col-md-3 row"><img className="avatar-alert" src="/images/user/duong.jpg" /></div>
                        <div className=" row">
                              <strong>Đăng Dương</strong> đã thích bài đăng của bạn 
                              <br />
                              <p className="time-alert">{moment(datedemo).lang('vi').fromNow()}</p>
                        </div>
                    </div>
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
    }})
   (ListNotification);