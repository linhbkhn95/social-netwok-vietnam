import React from 'react'
import {Link} from 'react-router-dom'
class Layout extends React.Component{
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
                                                    <li style={{borderLeft:"1px solid #ebe8e8"}}>
                                                    <Link to="/userpage">  <p>
                                                            <span className="color-title">
                                                            <i className="fa fa-paper-plane" aria-hidden="true"></i>Bài đăng
                                                            </span> 
                                                            <span className="total_product">
                                                                20                            </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                    <Link to="/userpage/friends">  <p>
                                                            <span className="color-title"><i className="fa fa-users" aria-hidden="true"></i>Bạn bè</span> 
                                                            <span className="total_product">
                                                                1254                          </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                    <Link to="/userpage/follows">   <p>
                                                            <span className="color-title"><i className="fa fa-id-card-o" aria-hidden="true"></i> Người theo dõi</span> 
                                                            <span className="total_product">
                                                                200                           </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                    <Link to="/userpage/images"> <p>
                                                            <span className="color-title"><i className="fa fa-picture-o" aria-hidden="true"></i>Ảnh</span> 
                                                            <span className="total_product">
                                                                        </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li  style={{borderRight:"none"}}>
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
                                    <div className="row" >
                                         {this.props.children}
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
module.exports = Layout