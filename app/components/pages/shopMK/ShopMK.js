import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import Product from 'app/utils/Product.js'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import Wall from './components/home/Home'
class shopMK extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
           
          ]
        };
      }
    login(){
        var {dispatch} = this.props;
        
       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
    render(){
        return(
              <div className="container" style={{paddingTop:"10px"}}>
                  <div className="fix-product">
                      <div className="row">
                            <section id="user_main">
                                 <div className="col-md-12">
                                      <div className="home-user">
                                        <div className="banner" style={{background:"url('https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/c0.448.1537.568/1614137_218415011690269_629967604_o.jpg?_nc_cat=0&oh=a500ee40dc7a32385b873ce4eb47555e&oe=5B729458')", backgroundSize: "cover"}}>
                                                <div className="background-cover">
                                                </div>
                                                <div className="link-share visible-xs">
                                                    <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389" >
                                                        <i className="icon-svg svg-social-facebook"></i>
                                                    </a>
                                                    <a href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki" target="_blank">
                                                        <i className="icon-svg svg-social-twitter"></i>
                                                    </a>
                                                    <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
                                                        <i className="icon-svg svg-social-google"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    
                                      <div className="group-head">
                                        <div className="bt-info">
                                            <div className="img-left">
                                                <div className="avatar-user">
                                                                            <div className="img-thumbnail itemImage" style={{backgroundImage: "url(https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-1/p240x240/16602731_581627045369062_8014670435340144193_n.jpg?_nc_cat=0&oh=3504a0fac397d0db0a14d28a96895dbb&oe=5B3BED13)"}}></div>
                                                                    </div>
                                            </div>
                                            <div className="name-user">
                                              Trịnh Đức Bảo Linh         </div>
                                        </div>
                                        <div className="box-title hidden-xs">
                                            <div className="content-right">
                                                <ul>
                                                    <li>
                                                        <p>
                                                            <span className="color-title">
                                                            <i className="fa fa-paper-plane" aria-hidden="true"></i>Bài đăng :
                                                            </span> 
                                                            <span className="total_product">
                                                                20                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-users" aria-hidden="true"></i> Bạn bè:</span> 
                                                            <span className="total_product">
                                                                20                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-id-card-o" aria-hidden="true"></i> Người theo dõi:</span> 
                                                            <span className="total_product">
                                                                20                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-commenting" aria-hidden="true"></i> Bình luận :</span> 
                                                            <span className="total_product">
                                                                31                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="link-share">
                                                            <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389">
                                                                <i className="fa fa-facebook "></i>
                                                            </a>
                                                            <a href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki" target="_blank">
                                                                <i    className="fa fa-twitter "></i>
                                                            </a>
                                                            <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
                                                                <i  className="fa fa-google "></i>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                 </div>
                                 <div className="col-md-12">
                                     <div className="content-main">
                                            <div className="row">
                                                 <div className="col-md-3 col-xs-12">
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
                                             
                                        
                                        
                                        
                                        
                                        
                                                 </div> 
                                                 <div style={{paddingLeft:"0px"}} className="col-md-9">
                                                   
                                                    <Wall />
                                                 </div>
                                              
                                            </div>
                                     </div>
                                 </div>
                            </section>
                      </div>
                  </div>
              </div>
            
        )
    }
}

module.exports = connect(function(state){return{}})(shopMK);