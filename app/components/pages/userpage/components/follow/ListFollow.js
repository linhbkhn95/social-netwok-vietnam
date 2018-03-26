import React from 'react';
import {NavLink} from 'react-router-dom';

import {ButtonToolbar,Popover,OverlayTrigger,Button ,Dropdown,MenuItem,Glyphicon } from 'react-bootstrap'
const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
      <strong>Holy guacamole!</strong> Check this info.
    </Popover>
  );
class ListFriend extends React.Component{
  constructor(props){
        super(props);
        this.state={
            listfriend:[
                {
                    img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p160x160/29513187_2028389617373934_236160232933059331_n.jpg?_nc_cat=0&oh=de38a8ded468a2f5512536afb1eadd15&oe=5B2A75F3',
                    fullname:'Nguyễn thị Xuân',
                    numberfriend:'26',


                },
                {
                    img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p160x160/23659259_794466457404947_5837098876567469784_n.jpg?_nc_cat=0&oh=5b5f2ca43169cc3053414b234c60afbc&oe=5B442482',
                    fullname:'Nguyễn Đức Tài',
                    numberfriend:'86',


                },
                {
                    img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/c28.0.160.160/p160x160/23519104_692874337582935_1359106547272328331_n.jpg?_nc_cat=0&oh=356931b693febb0f0912420a256d770d&oe=5B28B2BF',
                    fullname:'Hà Đăng Dương',
                    numberfriend:'44',


                },
                {
                    img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p160x160/28059274_916041425222407_471396828377774657_n.jpg?_nc_cat=0&oh=9c0e0e8bfe3379ab1ac37b1da69c3868&oe=5B46642D',
                    fullname:'Vin Omai',
                    numberfriend:'116',


                }
            ]
        }
  }
  render(){
      let {listfriend} = this.state
     return(

            <div  className="col-md-12">
                     <div style={{background:"white",    padding: "10px"}} className="col-md-12 ">
                            <div className="head col-md-12">
                                <div  style={{fontSize:"20px",fontWeight:"bold"}} className="pull-left">
                                    <i style={{marginRight:"10px"}} className="fa fa-users" aria-hidden="true"></i>
                                   Theo dõi
                                </div>
                                <div >
                                </div>
                            </div>
                            <div style={{paddingTop:"10px"}} className="row col-md-12">
                              {listfriend.map((friend,index)=>{
                                  return(
                                    <div style={{display:""}} className="col-md-6 col-xs-12 item-friend ">
                                    <div style={{float:"left"}} >
                                        <img style={{width:"100px"}} src={friend.img} />

                                    </div>
                                    <div className="info-user col-md-6 col-xs-6 ">
                                        <div className="name-user" >
                                           {friend.fullname}
                                        </div>
                                        <div className="number-friend-middle">
                                            {friend.numberfriend} bạn chung
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-xs-3">
                                         <div style={{paddingLeft:"0px",paddingTop:"35px"}} className="info-user">   
                                         
       
                                                    <Dropdown id="dropdown-custom-1">
                                                    <Dropdown.Toggle>
                                                    {/* <Glyphicon glyph="star" /> */}
                                                    kết bạn
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="">
                                                    <MenuItem eventKey="1">Nhận thông báo</MenuItem>
                                                    <MenuItem eventKey="2">Bạn thân</MenuItem>
                                                    <MenuItem divider />
                                                    <MenuItem eventKey="3" >
                                                    Đề xuất kết bạn
                                                    </MenuItem>
                                                    <MenuItem divider />
                                                    <MenuItem eventKey="4">Hủy kết bạn</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                 </div>
                                    </div>
                               </div>
                                  )
                              })}
                          
                            </div>
                     </div>
            </div>
     )
  }
}
module.exports =  ListFriend;