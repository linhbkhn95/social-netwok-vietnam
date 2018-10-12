import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios'
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
                // {
                //     img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p160x160/29513187_2028389617373934_236160232933059331_n.jpg?_nc_cat=0&oh=de38a8ded468a2f5512536afb1eadd15&oe=5B2A75F3',
                //     fullname:'Nguyễn thị Xuân',
                //     numberfriend:'26',


                // },
                // {
                //     img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p160x160/23659259_794466457404947_5837098876567469784_n.jpg?_nc_cat=0&oh=5b5f2ca43169cc3053414b234c60afbc&oe=5B442482',
                //     fullname:'Nguyễn Đức Tài',
                //     numberfriend:'86',


                // },
                // {
                //     img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/c28.0.160.160/p160x160/23519104_692874337582935_1359106547272328331_n.jpg?_nc_cat=0&oh=356931b693febb0f0912420a256d770d&oe=5B28B2BF',
                //     fullname:'Hà Đăng Dương',
                //     numberfriend:'44',


                // },
                // {
                //     img:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p160x160/28059274_916041425222407_471396828377774657_n.jpg?_nc_cat=0&oh=9c0e0e8bfe3379ab1ac37b1da69c3868&oe=5B46642D',
                //     fullname:'Vin Omai',
                //     numberfriend:'116',


                // }
            ]
        }
  }
  componentDidMount(){
    let username = this.props.username
    let sefl = this
    console.log('member componentDidMount ')
    if(username){
        axios.post('/user/getlistFriends',{username})
        .then((res)=>{
            if(res.data.EC==0){
                sefl.setState({listfriend:res.data.DT})
            }
        })
    }
}
  render(){
      let {listfriend} = this.state
     return(

            <div style={{paddingLeft:"0px"}}  className="col-md-12 page-about">
                     <div style={{background:"white",display:"grid"}} className="">
                            <div className="about-text">
                                  <div className="header">
                                        Giới thiệu về nhóm này
                                  </div>
                                 <div className="content-text">

                                    <div className="text-title">Mô tả</div>
                                    <div className="text">Hội Sinh viên, cựu Sinh viên CNTT & TT cùng giáo viên cựu giáo viên ngành CNTT
SOICT GROUP chia sẻ thông tin
Điểm, Môn học, BTL, Đề tài
Đào tạo, nghiên cứu: Học bổng du học, hỗ trợ cty, post nghiên cứu, thực tập đào tạo, hội... </div>
                                    <div className="text-title">Loại nhóm</div>
                                    <div className="type-group">Trường lớp</div>
                                </div>
                            </div>
                            <div className="about-text">
                                  <div className="header">
                                       Thành viên nhóm  9780
                                  </div>
                                  <div className="div-member">
                              <ul className="list-member">
                                <li><div className="div-img"><img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p40x40/43065464_1290271367779869_5724331772158672896_n.jpg?_nc_cat=102&oh=b350db1a5ba8ea6e700808b529ea954f&oe=5C1533C0" /></div></li>
                                <li><div className="div-img"><img src="https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p40x40/41769887_1001820906665146_4065829158670827520_n.jpg?_nc_cat=104&oh=f4681c5a97974ef54793aec9d54930b2&oe=5C516E7D" /></div></li>
                                <li><div className="div-img"><img src="https://scontent.fhan5-6.fna.fbcdn.net/v/t1.0-1/p40x40/41719216_855933534610347_5463926784015728640_n.jpg?_nc_cat=105&oh=bc4107e4687a2ef312b694e2765e9703&oe=5C5D758A" /></div></li>
                                <li><div className="div-img"><img src="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-1/p50x50/19959055_1442566135809857_5263977069378558177_n.jpg?_nc_cat=108&oh=c79ae51faa5e9f22b2aa1589e77c6980&oe=5C196B48" /></div></li>
                                <li><div className="div-img"><img src="https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-1/p40x40/20663701_633925460143450_4308823456224829255_n.jpg?_nc_cat=104&oh=25c64648ff01e33cfb20d918d0fa70ee&oe=5C1A6D82" /></div></li>
                                <li><div className="div-img"><img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-1/p40x40/42289782_1230681137071258_8052830716678897664_n.jpg?_nc_cat=110&oh=ff701334996793f41ca06d80ada9e6ee&oe=5C43006C" /></div></li>
                              </ul>
                           </div>
                           </div>

                     </div>
            </div>
     )
  }
}
module.exports =  ListFriend;
