import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Layout extends React.Component{
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
        this.getData(username)
    }
    getData(username){
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
    componentWillReceiveProps(nextProps){
        if(nextProps.username!=this.props.username){
            this.getData(nextProps.username)
        }
    }
    render(){
        let {info} = this.state
        return(
           
            <div className="container" style={{paddingTop:"10px"}}>
            <div className="fix-product">
                <div className="row">
                      <section id="user_main">
                      <div className="col-md-12">
                                      <div className="home-user">
                                        <div className="banner" style={{background:"url('"+info.user.url_cover+"')", backgroundSize: "cover"}}>
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
                                                                            <div className="img-thumbnail itemImage" style={{backgroundImage: "url("+info.user.url_avatar+")"}}></div>
                                                                    </div>
                                            </div>
                                            <div className="name-user">
                                             {info.user.fullname}        </div>
                                        </div>
                                        <div className="box-title hidden-xs">
                                            <div className="content-right">
                                                <ul>
                                                    <li style={{borderLeft:"1px solid #ebe8e8"}}>
                                                    <Link to={"/userpage."+this.props.username}>  <p>
                                                            <span className="color-title">
                                                            <i className="fa fa-paper-plane" aria-hidden="true"></i>Bài đăng
                                                            </span> 
                                                            <span className="total_product">
                                                                {info.countPost}                          </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                    <Link to={'/userpage.'+this.props.username+'/friends'}>  <p>
                                                            <span className="color-title"><i className="fa fa-users" aria-hidden="true"></i>Bạn bè</span> 
                                                            <span className="total_product">
                                                            {info.countFriend}                         </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                    <Link to={"/userpage."+this.props.username+"/follows"}>   <p>
                                                            <span className="color-title"><i className="fa fa-id-card-o" aria-hidden="true"></i> Người theo dõi</span> 
                                                            <span className="total_product">
                                                            {info.countFollow}                            </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                    <Link to={"/userpage."+this.props.username+"/images"}> <p>
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