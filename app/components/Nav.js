
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
import ListNotifi from './ListNotification'
import {addNotification} from 'app/action/actionNotification'
  class NavContent extends React.Component {
   
    
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
     

  
    }
   componentWillMount(){
     let self = this;
    io.socket.get('/notification/user', function gotResponse(data, jwRes) {
     ; console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data)
      io.socket.on('notifi_user'+self.props.auth.user.id, function (data) {
            
         
         self.props.dispatch(addNotification(data))
        console.log('Socket `' + data.id + '` joined the party!',data);
  
       })
    
    });
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
                         <NavLink to={"/userpage."+this.props.auth.user.username}> 
                         <div className="user-avatar">
                            <img className="img-user" src={this.props.auth.user.url_avatar} />
                        </div>
                        <div style={{float:"left"}} className="">
                            <div className="user-name">
                              {this.props.auth.user.fullname?this.props.auth.user.fullname:this.props.auth.user.username}
                            </div>
                          
                        </div>
                        </NavLink>
                         {/* <i className="fa fa-user" aria-hidden="true"></i> */}
                          </NavItem>
                        
                          <NavItem style={{clear:""}} eventKey={2} href="#">
                                 <i className="fa fa-user-plus" aria-hidden="true"></i>                   
                         </NavItem>
                         <NavItem eventKey={1} href="#">
                         <NavLink to="/wall">   <i className="fa fa-home" aria-hidden="true"></i></NavLink>
                          </NavItem>
                     
                          <NavItem eventKey={2} href="#">
                              <i className="fa fa-users" aria-hidden="true"></i>
                          </NavItem>
                          <ListNotifi /> 
                          
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