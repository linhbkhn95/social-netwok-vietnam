import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './HeaderPost'
import ListPost from './ListPost'

class Info extends React.Component{
 
  render(){
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
                                                                            2,099                                            </span>
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
                                                                            15   </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <span className="color-title"><i className="fa fa-calendar"></i> Tham gia</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">1 năm</span>
                                                                    </td>
                                                                </tr>
                                                                                                        <tr>
                                                                        <td>
                                                                            <span className="color-title"><i className="fa fa-location-arrow"></i> Khu vực</span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="total_product"> Hà Nội</span>
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
                                                        <div className="left-list">
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
                                                        </div>
                                                  </div>           
     )
  }
}
module.exports =  Info;