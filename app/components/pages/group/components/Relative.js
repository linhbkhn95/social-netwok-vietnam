import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './home/HeaderPost'
import ListPost from './home/ListPost'
import moment from 'moment'
import axios from 'axios'
class Info extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            info:{
                user:{}
            }
        }
    }
    componentDidMount(){
        let username = this.props.username
        let sefl = this
        if(username){
            axios.post('/user/getInfo',{username})
            .then((res)=>{
                if(res.data.EC==0){
                    sefl.setState({info:res.data.DT})
                }
            })
        }
    }
  render(){
      let {info} = this.state
     return(

        <div className="group-relative">
              <div className="header"><div className="title" >Thêm thành viên</div></div>
              <div className="header member">
                  <div className="title" >Thành viên  <div className="number">9.744 thành viên</div></div>
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
              <div className="header suggestion-member">
                  <div className="title" >gợi ý Thành viên <div className="action">ẩn</div></div>
                  <div className="title-mini">Bạn bè</div>
                  <div className="content">
                      <ul >
                         <li>
                            <div className="friend-item"></div>

                         </li>
                      </ul>

                  </div>


              </div>
              <div className="header desc">
                  <div className="title" >Mô tả </div>
                  <div className="text-desc">
                      Hội Sinh viên, cựu Sinh viên CNTT & TT cùng giáo viên cựu giáo viên ngành CNTT
                      SOICT GROUP chia sẻ thông tin
                      Điểm, Môn học, BTL, Đề tài
                      Đào tạo, nghiên cứu: Học bổng du học, hỗ trợ cty, post nghiên cứu, thực tập đào tạo, hội thảo
                      Giao lưu, khởi nghiệp: Kết nối , kết nhóm
                  </div>
              </div>
              <div className="header">
                  <div className="title" >Vị trí</div>

              </div>
              <div className="header add-group">
                  <div className="title" >Tạo nhóm mới </div>
                  <div className="content">
                      <div className="text-note"> Nhóm giúp chia sẻ với bạn bè, gia đình và thành viên nhóm dễ dàng hơn bao giờ hết</div>
                      <div className="btn-create"><btn className="div-btn"><div className="btn-add" >Tạo nhóm</div> </btn></div>
                  </div>
              </div>
              <div className="header">
                  <div className="title" >Ảnh gần đây</div>
                  <div>

                  </div>
              </div>


               <div className="header">
                  <div className="title-group-relative" >Nhóm được đề  xuất</div>
                  <div>
                      <div className="group-item">
                            <div className="img-cover"><img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" /></div>
                            <div className="content">
                                  <div className="info-group">
                                      <div className="name-group">BK2.03</div>
                                      <div className="number-member">41,7123 thành viên</div>

                                  </div>
                                  <div className="btn-join">
                                  <i className="fa fa-plus" aria-hidden="true"></i>Tham gia
                                  </div>
                            </div>
                      </div>
                      <div className="group-item">
                            <div className="img-cover"><img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" /></div>
                            <div className="content">
                                  <div className="info-group">
                                      <div className="name-group">Hội cuồng phim con heo</div>
                                      <div className="number-member">1,100 thành viên</div>

                                  </div>
                                  <div className="btn-join">
                                  <i className="fa fa-plus" aria-hidden="true"></i>Tham gia
                                  </div>
                            </div>
                      </div>
                      <div className="group-item">
                            <div className="img-cover"><img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" /></div>
                            <div className="content">
                                  <div className="info-group">
                                      <div className="name-group">Haivl.com</div>
                                      <div className="number-member">500,233 thành viên</div>

                                  </div>
                                  <div className="btn-join">
                                  <i className="fa fa-plus" aria-hidden="true"></i>Tham gia
                                  </div>
                            </div>
                      </div>
                      <div className="group-item">
                            <div className="img-cover"><img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" /></div>
                            <div className="content">
                                  <div className="info-group">
                                      <div className="name-group">U23-Việt Nam</div>
                                      <div className="number-member">9,002 thành viên</div>

                                  </div>
                                  <div className="btn-join">
                                  <i className="fa fa-plus" aria-hidden="true"></i>Tham gia
                                  </div>
                            </div>
                      </div>
                  </div>
              </div>
        </div>
     )
  }
}
module.exports =  Info;
