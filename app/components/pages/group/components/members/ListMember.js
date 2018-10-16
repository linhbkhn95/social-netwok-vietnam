import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios'
import {ButtonToolbar,Popover,OverlayTrigger,Button ,Dropdown,MenuItem,Glyphicon } from 'react-bootstrap'

const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
      <strong>Holy guacamole!</strong> Check this info.
    </Popover>
  );
class listmember extends React.Component{
  constructor(props){
        super(props);
        this.state={
            listmember:[

            ]
        }
  }
  componentDidMount(){
    let groupname = this.props.groupname
    let sefl = this
    console.log('member componentDidMount ')
    if(groupname){
        axios.post('/group/getlist_memeber',{group_id:1})
        .then((res)=>{
            if(res.data.EC==0){
                sefl.setState({listmember:res.data.DT})
            }
        })
    }
}
  render(){
      let {listmember} = this.state
     return(

            <div style={{paddingLeft:"0px"}}  className="col-md-12 page-member">
                     <div style={{background:"white",    padding: "10px"}} className="col-md-12 ">
                            <div className="header col-md-12">
                                  <div className="info-group">
                                        <a href="#">Thành viên</a><div className="number">9,122</div>
                                  </div>
                                  <div className="input-search">

                                  </div>
                            </div>
                            <div className="info-admin">
                                          <div style={{marginTop:"20px"}}>Quản trị viên và người kiểm duyệt <span className="number-admin">11</span></div>
                            </div>


                              {listmember.length?listmember.map((member)=>{
                                return(
                                  <div className="list-member">
                                <div className="member">
                                    <div className="info-member">
                                            <div className="div-avatar"><img src={member.member.url_avatar} /></div>
                                            <div className="info-detail">
                                                <div className="name">{member.member.fullname}</div>
                                                <div className="work">{`Có ${member.countFriend} bạn bè`}</div>
                                            </div>

                                    </div>
                                    {member.isFriend==1?<div className="btn-friend">


                                         <Dropdown id="dropdown-custom-1">
                                         <Dropdown.Toggle>
                                         <Glyphicon glyph="ok" />
                                         Bạn bè
                                         </Dropdown.Toggle>
                                         <Dropdown.Menu className="">
                                         <MenuItem  eventKey="1"> <i style={{marginLeft:"-15px"}} className="fa fa-check" aria-hidden="true"></i>
Nhận thông báo</MenuItem>
                                         <MenuItem eventKey="2">Bạn thân</MenuItem>

                                         <MenuItem divider />
                                         <MenuItem eventKey="4">Hủy kết bạn</MenuItem>
                                         </Dropdown.Menu>
                                     </Dropdown>

                                   </div>:<div className="btn-join">
                                        <i className="fa fa-plus" aria-hidden="true"></i>Kết bạn
                                    </div>}
                                </div>

                            </div>
                                )
                              }):null}


                     </div>
            </div>
     )
  }
}
module.exports =  listmember;
