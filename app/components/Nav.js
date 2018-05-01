
import {NavLink,Link} from 'react-router-dom';
import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import setAuthorizationToken from 'app/utils/setAuthorizationToken.js';
import {setCurrentUser} from 'app/action/authActions.js';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import axios from 'axios'
import {connect} from 'react-redux'
import moment from 'moment';
var date = Date.now();
var datedemo=1511399642970;
  class NavContent extends React.Component {
    constructor(props){
      super(props);
      this.state ={

      }
      this.setWrapperRef = this.setWrapperRef.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
    componentDidMount(){
      let self = this
      let {dispatch } =this.props
      axios.get('/auth/get_session')
      .then((res)=>{
         if(res.data.EC==0){
          localStorage.setItem('jwToken',res.data.DT.token);
          setAuthorizationToken(res.data.DT.token);
          dispatch(setCurrentUser(jwtDecode(res.data.DT.token)));
         }
         else{
          localStorage.removeItem('jwToken');
           self.context.router.history.push('/login');
  
         }
      })
     
      document.addEventListener('mousedown', this.handleClickOutside);

  
    }
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    showNotifi(){
      console.log('shádasdasdasdad')
      $("#notificationContainer").fadeToggle(300);
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
  render() {
    
    return (
         
          <header className="header">
             
                    <Navbar fixedTop={true} inverse collapseOnSelect>
                    
                      <Navbar.Header>
                        <Navbar.Brand>
                          <a className="title-web" href="#brand">Tâm sự cùng người lạ</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                      </Navbar.Header>
                      {this.props.auth.isAuthenticated?    <Navbar.Collapse>
                     
                        <Nav>
                          <NavItem eventKey={1} href="#">
                            Câu hỏi
                          </NavItem>
                          <NavItem eventKey={2} href="#">
                            Tag
                          </NavItem>
                          {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Câu hỏi</MenuItem>
                            <MenuItem eventKey={3.2}>Tag</MenuItem>
                            <MenuItem divider />
                          </NavDropdown> */}
                        </Nav>
                        <Nav pullRight>
                         <NavItem eventKey={2} href="#">
                         <div className="user-avatar">
                            <img className="img-user" src={this.props.auth.user.url_avatar} />
                        </div>
                        <div style={{float:"left"}} className="">
                            <div className="user-name">
                                {this.props.auth.user.fullname?this.props.auth.user.fullname:this.props.auth.user.username}
                            </div>
                          
                        </div>
                         {/* <i className="fa fa-user" aria-hidden="true"></i> */}
                          </NavItem>
                        
                          <NavItem style={{clear:""}} eventKey={2} href="#">
                                 <i className="fa fa-user-plus" aria-hidden="true"></i>                   
                         </NavItem>
                         <NavItem eventKey={1} href="#">
                           <i className="fa fa-home" aria-hidden="true"></i>
                          </NavItem>
                     
                          <NavItem eventKey={2} href="#">
                              <i className="fa fa-users" aria-hidden="true"></i>
                          </NavItem>
                              
                          <li ref={this.setWrapperRef} onClick={this.showNotifi.bind(this)} id="notification_li">
    <span id="notification_count">3</span>
    <a href="#" ref="foo" id="notificationLink" data-tip="Thông báo"><i className="fa fa-bell-o" aria-hidden="true"></i> </a>

    <div id="notificationContainer">
          <div className="beeperNub"></div>
        <div id="notificationTitle" >Thông báo</div>
        <div className="">Mới</div>
        <div id="notificationsBody" className="notifications">
          
            <div className="col-md-12 alert-message">
                <div className="col-md-3 row"><img className="avatar-alert" src="/images/avatar.jpg" /></div>
                <div className=" row">
                      <strong>Nhỏ Ngọc</strong> đã phê duyệt công tác dự án <strong>Funsurv</strong>
                      <br />
                      <p className="time-alert">{moment(datedemo).lang('vi').fromNow()}</p>
                </div>
            </div>
            <div className="col-md-12 alert-message">
                <div className="col-md-3 row"><img className="avatar-alert" src="/images/avatar.jpg" /></div>
                <div className=" row">
                      <strong>Phương Anh</strong> dã ảnh hóa đơn cho công tác của dự án <strong>Funsurv</strong>
                      <br />
                      <p className="time-alert">{moment(datedemo).lang('vi').fromNow()}</p>
                </div>
            </div>
            <div className="col-md-12 alert-message">
                <div className="col-md-3 row"><img className="avatar-alert" src="/images/avatar.jpg" /></div>
                <div className=" row">
                      <strong>Linh Trịnh</strong> đã yêu cầu phê duyệt công tác dự án <strong>Funsurv</strong>
                      <br />
                      <p className="time-alert">{moment(datedemo).lang('vi').fromNow()}</p>
                </div>
            </div>
        
        </div>
        <div id="notificationFooter"><a href="#">Xem tất cả</a></div>
    </div>

</li>
                           <NavDropdown eventKey={3}  id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Cài đặt</MenuItem>
                            {/* <MenuItem eventKey={3.1}></MenuItem>
                            <MenuItem divider /> */}
                            <MenuItem eventKey={3.2}>Đăng xuất</MenuItem>
                          </NavDropdown>
                          
                        </Nav>
                      </Navbar.Collapse>:null}
                    </Navbar>;
                                
          </header>
     
          
    );
  }
}

NavContent.contextTypes = {
  router: PropTypes.object.isRequired
}
 module.exports =connect(function(state){
   return{
       auth:state.auth,
   }})
  (NavContent);