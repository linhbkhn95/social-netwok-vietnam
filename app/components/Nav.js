
import {NavLink,Link} from 'react-router-dom';
import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
  class NavContent extends React.Component {

  render() {
    

    return (
         
          <header>
             
                    <Navbar fixedTop={true} inverse collapseOnSelect>
                      <Navbar.Header>
                        <Navbar.Brand>
                          <a href="#brand">Tâm sự cùng người lạ</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                      </Navbar.Header>
                      <Navbar.Collapse>
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
                              <i className="fa fa-user" aria-hidden="true"></i>
                          </NavItem>
                        
                          <NavItem eventKey={2} href="#">
                                 <i className="fa fa-user-plus" aria-hidden="true"></i>                   
                         </NavItem>
                         <NavItem eventKey={1} href="#">
                           <i className="fa fa-home" aria-hidden="true"></i>
                          </NavItem>
                     
                          <NavItem eventKey={2} href="#">
                              <i className="fa fa-users" aria-hidden="true"></i>
                          </NavItem>
                          <NavItem eventKey={2} href="#">
                              <i className="fa fa-bell-o" aria-hidden="true"></i>
                          </NavItem>
                           <NavDropdown eventKey={3}  id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Cài đặt</MenuItem>
                            {/* <MenuItem eventKey={3.1}></MenuItem>
                            <MenuItem divider /> */}
                            <MenuItem eventKey={3.2}>Đăng xuất</MenuItem>
                          </NavDropdown>
                          
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>;
                                
          </header>
     
          
    );
  }
}


 module.exports =connect(function(state){
   return{
       auth:state.auth,
       count :state.shoppingCart.count
   }})
  (NavContent);