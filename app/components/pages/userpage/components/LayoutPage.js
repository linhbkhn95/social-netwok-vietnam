import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {ButtonToolbar,Popover,OverlayTrigger,Button ,Dropdown,MenuItem,Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'
import ModalEdit from './ModalEditInfo'
class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            fileName: '',
            file: null,
            info:{
                user:{}
            },
            showModalSubject:false
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
    accessFollow(){
        let {username} = this.props
        let self  = this;
        io.socket.post('/follows/accessFollow',{username},((resdata,jwres)=>{
            if(resdata.EC==0){
                // self.props.dispatch(removeReqFriend(resdata.DT))

                self.state.info.follow = resdata.DT;
                self.setState({info:self.state.info})
            }
        }))
    }
    destroyFriend(){
        let {username} = this.props
        let self  = this;
        io.socket.post('/friends/cancel',{username},((resdata,jwres)=>{
            if(resdata.EC==0){
                // self.props.dispatch(removeReqFriend(resdata.DT))
                self.context.router.history.push('/userpage.'+username);

            }
        }))
    }
    _handleChange(e) {
        let self = this
        e.preventDefault();
        let file = e.target.files[0];
        var fileName = file.name;
        this.setState({ file: e.target.files[0], fileName })
        self.fileUpload(e.target.files[0]).then((response)=>{
            if(response.data.EC==0){
                toast.success('Thành công', {
                                position: toast.POSITION.TOP_CENTER
                            });
                   
            }
        })

    }
    _handleChangeCover(e) {
        let self = this
        e.preventDefault();
        let file = e.target.files[0];
        var fileName = file.name;
        this.setState({ file: e.target.files[0], fileName })
        self.uploadCover(e.target.files[0]).then((response)=>{
            if(response.data.EC==0){
                toast.success('Thành công', {
                                position: toast.POSITION.TOP_CENTER
                            });
                   
            }
        })

    }
    uploadCover(file) {
        const url = '/user/updateCover';
        
        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                

            }
        }
        return axios.post(url,formData,config)
    }
    fileUpload(file) {
        const url = '/user/updateAvatar';
        
        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                

            }
        }
        return axios.post(url,formData,config)
    }
    showModalSubject(){
        this.setState({showModalSubject:true})
      }
      closeModal(){
           this.setState({showModalPost:false})
    
      }
      closeModalSubject(){
        this.setState({showModalSubject:false})
    
        }
    accessSubject(){
        this.setState({showModalSubject:false})
        toast.success( "Thay đổi thông tin thành công!", {
           position: toast.POSITION.TOP_LEFT
         });
      }
    
    render(){
        let {info} = this.state
        return(
           
            <div className="container" style={{marginTop:"-24px"}}>
            <div className="fix-product">
                <div className="row">
                      <section id="user_main">
                      <div className="col-md-12">
                                      <div className="home-user">
                                        <div className="banner" style={{background:"url('"+info.user.url_cover+"')", backgroundSize: "cover"}}>
                                                <div className="background-cover">
                                                <div className="image-cover" >   {this.props.auth.user.username == this.props.username?  <span style={{display:"flex",justifyContent:"center",padding:"3px 7px",fontSize:"11px",float:'right'}} className=" btn-file">
                                                <i style={{marginRight:"2px"}} className="fa fa-camera" aria-hidden="true"></i>
  Thay ảnh bìa <input onChange={this._handleChangeCover.bind(this)} type="file" />
</span>:null} </div>
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
                                               
                                                                            <div className="img-thumbnail itemImage" style={{backgroundImage: "url("+info.user.url_avatar+")"}}>
                                                                       <div className="image-avatar" style={{width:"100%",display:"",background:"black",color:"white"}}>
                                                                       {this.props.auth.user.username == this.props.username?  <span style={{display:"flex",justifyContent:"center",padding:"3px 7px",fontSize:"11px"}} className=" btn-file">
    <i style={{marginRight:"2px"}} className="fa fa-camera" aria-hidden="true"></i> Thay ảnh đại diện <input onChange={this._handleChange.bind(this)} type="file" />
</span>:null} </div>

                                                                            </div>
                                                                    </div>
                                            </div>
                                            <div className="name-user">
                                             {info.user.fullname}        </div>
                                        </div>
                                        <div className="box-title hidden-xs">
                                            <div className="content-right">
                                                <ul>
                                                    <li className="li-layout" style={{borderLeft:"1px solid #ebe8e8"}}>
                                                    <Link to={"/userpage."+this.props.username}>  <p>
                                                            <span className="color-title">
                                                            <i className="fa fa-paper-plane" aria-hidden="true"></i>Bài đăng
                                                            </span> 
                                                            <span className="total_product">
                                                                {info.countPost}                          </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li className="li-layout">
                                                    <Link to={'/userpage.'+this.props.username+'/friends'}>  <p>
                                                            <span className="color-title"><i className="fa fa-users" aria-hidden="true"></i>Bạn bè</span> 
                                                            <span className="total_product">
                                                            {info.countFriend}                         </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li className="li-layout">
                                                    <Link to={"/userpage."+this.props.username+"/follows"}>   <p>
                                                            <span className="color-title"><i className="fa fa-id-card-o" aria-hidden="true"></i> Người theo dõi</span> 
                                                            <span className="total_product">
                                                            {info.countFollow}                            </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li className="li-layout">
                                                    <Link to={"/userpage."+this.props.username+"/images"}> <p>
                                                            <span className="color-title"><i className="fa fa-picture-o" aria-hidden="true"></i>Ảnh</span> 
                                                            <span className="total_product">
                                                                        </span>
                                                        </p>
                                                        </Link>
                                                    </li>
                                                    <li className="li-layout" style={{borderRight:"none"}}>
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
                                                    <li className="li-layout" style={{borderRight:"none"}}>

                                                        {info.isMe?<button onClick={this.showModalSubject.bind(this)} style={{padding:"2px 8px",fontSize:"12px",marginTop:"9px"}} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i>Chỉnh sửa</button>:     <div style={{paddingLeft:"0px",lineHeight:"35px"}} className="btn-friend">   

       
                                         <Dropdown id="dropdown-custom-1">
                                         <Dropdown.Toggle>
                                         <Glyphicon glyph="star" />
                                         Bạn bè
                                         </Dropdown.Toggle>
                                         <Dropdown.Menu className="">
                                         <MenuItem onClick={this.accessFollow.bind(this)} eventKey="1"> {info.follow&&info.follow.status? <i style={{marginLeft:"-15px"}} className="fa fa-check" aria-hidden="true"></i>:null}
Nhận thông báo</MenuItem>
                                         <MenuItem eventKey="2">Bạn thân</MenuItem>
                                        
                                         <MenuItem divider />
                                         <MenuItem onClick={this.destroyFriend.bind(this)} eventKey="4">Hủy kết bạn</MenuItem>
                                         </Dropdown.Menu>
                                     </Dropdown>

                                   </div>}
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
            <ModalEdit access={this.accessSubject.bind(this)} show={this.state.showModalSubject} onHide={this.closeModalSubject.bind(this)} />
        </div>
        )
    }
}
Layout.contextTypes = {
    router: PropTypes.object.isRequired
  }
  module.exports = connect(function(state){return{auth:state.auth}})(Layout);