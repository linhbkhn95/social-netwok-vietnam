import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './HeaderPost'
import ListPost from './ListPost'
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

        <div className="fixMenu">
                                                        <div className="left-list">
                                                            <h3 className="text-box">Giới thiệu</h3>
                                                            <table className="table table-reflow">
                                                            <tbody><tr>
                                                                    <td>
                                                                        <span className="color-title">
                                                                            <i className="fa fa-shopping-bag"></i> Bài đăng
                                                                        </span> 
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">
                                                                           {info.countPost}                                         </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <span className="color-title">
                                                                            <i className="fa fa-users"></i> Người theo dõi
                                                                        </span> 
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">
                                                                            {info.countFollow}   </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <span className="color-title"><i className="fa fa-calendar"></i> Tham gia</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">{moment(info.user.createdAt).lang('vi').fromNow()}</span>
                                                                    </td>
                                                                </tr>
                                                                                                        <tr>
                                                                        <td>
                                                                            <span className="color-title"><i className="fa fa-location-arrow"></i>Quê quán</span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="total_product"> {info.user.address}</span>
                                                                        </td>
                                                                    </tr>
                                                                                                    <tr>
                                                                    <td>
                                                                        <span className="color-title">
                                                                            <i className="fa fa-check-circle"></i> Tình trạng
                                                                        </span> 
                                                                    </td>
                                                                    <td>

                                                                        <span className="total_product">
                                                                            Online                                            </span>
                                                                    </td>
                                                                </tr>
                                                                <tr className="visible-xs">
                                                                    <td>
                                                                        <span className="color-title">
                                                                        <i className="fa fa-info-circle"></i> Status
                                                                        </span> 
                                                                    </td>
                                                                    <td>
                                                                    </td>
                                                                </tr>
                                                                <tr className="visible-xs">
                                                                    <td colSpan="2">
                                                                        <span className="status">
                                                                           Vui vẻ, hòa đồng...                                </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        </div>
                                                        {/* <div className="left-list">
                                                            <h3 className="text-box">Bình luận gần đây</h3>
                                                            <aside>
                                                                <div className="comment">
                                                                <div className="item">
                                                                    <figure>
                                                                            <img className="commentor_avatar" src="https://moki.vn//moki/images/default-avatar.png" alt="Moki.vn - Ứng dụng mua bán trên di động | ZIN XaLa"/>
                                                                    </figure>
                                                                    <p className="text-a truncated" style={{wordWrap: "break-word"}}>
                                                                        rất tốt                                                    </p>
                                                                    <div className="sub-content">
                                                                        <span>Bởi</span> <a className="sub">ZIN XaLa</a> <span>lúc</span> <a className="sub">01:57 09-07-2017</a>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </aside>
                                                        </div> */}
                                                  </div>           
     )
  }
}
module.exports =  Info;