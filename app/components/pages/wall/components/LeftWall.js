import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';

import ListGroup from './ListGroup'
class LeftWall extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
        <div className="col-md-12 remove-padding-col left-wall">
              <NavLink to={"/userpage."+this.props.auth.user.username}>
                         <div className="user-avatar">
                            <img style={{width:"26px",height:"26px"}} className="img-user" src={this.props.auth.user.url_avatar} />
                        </div>
                        <div style={{float:"left"}} className="">
                            <div className="user-name">
                              {this.props.auth.user.fullname?this.props.auth.user.fullname:this.props.auth.user.username}
                            </div>

                        </div>
                </NavLink>
                <div className="col-md-12 remove-padding-col list-group">
                <div className="col-md-12 remove-padding-col">
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i className="fa fa-newspaper-o" aria-hidden="true"></i></div>
                          <div className="name-group">Bảng tin</div>
                          <div className="pull-right">

                           <NavDropdown style={{color:"green"}} eventKey={3}  id="basic-nav-dropdown">
                              <MenuItem eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i>Theo độ liên quan </MenuItem>
                              {/* <MenuItem eventKey={3.1}></MenuItem>
                              <MenuItem divider /> */}
                              <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
                                Theo gần đây nhất</MenuItem>
                            </NavDropdown>

                         </div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i className="fa fa-comments" aria-hidden="true"></i></div>
                          <div className="name-group">Trò chuyện</div>
                          </NavLink>

                      </div>
                      </div>
                </div>

              <div className="col-md-12 remove-padding-col list-group">
                  <div>
                     <div className="header">Lỗi tắt</div>
                      {/* <ListGroup/> */}

                  </div>
                  <div className="col-md-12 remove-padding-col">
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">CNTT-K58</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} style={{color:"#5d5b5b"}}  className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">SV-CVV</div>
                          <div className="count-group">2</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} style={{color:"#5d5b5b"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">ReView Cát Bà</div>
                          <div className="count-group">+4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">Sống khỏe mỗi ngày</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}}  className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">U23 Việt Nam</div>
                          <div className="count-group">+9</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}}  className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">CNTT-K58</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                  </div>

                  <div className="col-md-12 remove-padding-col list-group">

                  <div style={{marginTop:"10px"}}>
                     <div className="header">Khám phá</div>
                      {/* <ListGroup/> */}

                  </div>
                  <div className="col-md-12 remove-padding-col">
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i  style={{color:"#1c8cc3"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">Nhóm</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"rgb(236, 90, 90)"}} className="fa fa-calendar" aria-hidden="true"></i></div>
                          <div className="name-group">Sự kiện</div>
                          <div className="count-group">2</div>
                          </NavLink>

                      </div>

                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>


                          <div className="icon"><i style={{color:"#8a6d3b"}} className="fa fa-briefcase" aria-hidden="true"></i></div>
                          <div className="name-group">Việc làm</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink to={"/userpage."+this.props.auth.user.username}>

                            <div className="icon"><i class="fa fa-file-text-o" aria-hidden="true"></i></div>
                            <div className="name-group">Trang</div>
                            <div className="count-group">+4</div>
                          </NavLink>

                      </div>
                  </div>
               </div>
              </div>

        </div>
    )
  }
}

LeftWall.contextTypes = {
  router: PropTypes.object.isRequired
}
 module.exports =connect(function(state){
   return{
       auth:state.auth,
   }})
  (LeftWall);
