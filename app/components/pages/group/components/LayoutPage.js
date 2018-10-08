import React from 'react'
import {Link,NavLink} from 'react-router-dom'
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
                      <div className="col-md-3 remove-padding-col">
                           <div className="left-group">

                              <h1 className="name-group">
                                  BK2.04
                              </h1>
                              <div className="_19s_">
                                  <span data-hover="tooltip" data-tooltip-content="Bất cứ ai cũng tìm được nhóm. Chỉ thành viên mới xem được những ai tham gia nhóm và những gì họ đăng." id="js_6iw">
                                  <i className="fa fa-lock" aria-hidden="true"></i>Nhóm kín</span>
                              </div>
                              <div className="list-meu">
                                       <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">Giới thiệu</span>

                                         </Link>
                                        </div>
                                        <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">Thao luan</span>

                                         </Link>
                                        </div>
                                        <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">Cong bo</span>

                                         </Link>
                                        </div>

                                         <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">Thanh vien</span>

                                         </Link>
                                        </div>
                                        <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">Video</span>

                                         </Link>
                                        </div>

                                         <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">Anh</span>

                                         </Link>
                                        </div>
                                        <div className="menu-item">
                                         <Link className="_2yau" to="/">
                                              <span className="_2yav">File</span>

                                         </Link>
                                        </div>


                              </div>
                              <div id="imaginary_container">
                                <div className="input-group stylish-input-group">
                                    <input type="text" className="form-control"  placeholder="Tim kiem trong group" />
                                    <span className="input-group-addon">
                                        <button type="submit">
                                            <span className="glyphicon glyphicon-search"></span>
                                        </button>
                                      </span>
                                 </div>
                                </div>
                                <div className="col-md-12 remove-padding-col list-group">
                  <div>
                     <div className="header">Lỗi tắt</div>
                      {/* <ListGroup/> */}

                  </div>
                  <div className="col-md-12 remove-padding-col">
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">CNTT-K58</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} style={{color:"#5d5b5b"}}  className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">SV-CVV</div>
                          <div className="count-group">2</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} style={{color:"#5d5b5b"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">ReView Cát Bà</div>
                          <div className="count-group">+4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">Sống khỏe mỗi ngày</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}}  className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">U23 Việt Nam</div>
                          <div className="count-group">+9</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"#5d5b5b"}}  className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">CNTT-K58</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                  </div>

                  <div className="col-md-12 remove-padding-col list-group">

                  <div style={{marginTop:"10px"}}>
                     <div className="header">Khám phá</div>
                      {/* <ListGroup/> */}

                  </div>
                  <div className="col-md-12 remove-padding-col">
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i  style={{color:"#1c8cc3"}} className="fa fa-users" aria-hidden="true"></i></div>
                          <div className="name-group">Nhóm</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>

                          <div className="icon"><i style={{color:"rgb(236, 90, 90)"}} className="fa fa-calendar" aria-hidden="true"></i></div>
                          <div className="name-group">Sự kiện</div>
                          <div className="count-group">2</div>
                          </NavLink>

                      </div>

                      <div className="col-md-12 remove-padding-col group">
                      <NavLink to={"/userpage."+this.props.auth.user.username}>


                          <div className="icon"><i style={{color:"#8a6d3b"}} className="fa fa-briefcase" aria-hidden="true"></i></div>
                          <div className="name-group">Việc làm</div>
                          <div className="count-group">4</div>
                          </NavLink>

                      </div>
                      <div className="col-md-12 remove-padding-col group">
                        <NavLink to={"/userpage."+this.props.auth.user.username}>

                            <div className="icon"><i class="fa fa-file-text-o" aria-hidden="true"></i></div>
                            <div className="name-group">Trang</div>
                            <div className="count-group">+4</div>
                          </NavLink>

                      </div>
                  </div>
               </div>
               </div>



                            </div>
                      </div>
                          <div className="col-md-9 remove-padding-col group-page">

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

                                        <div className="box-title hidden-xs">
                                            <div className="content-right">
                                                <ul>
                                                  <li className="li-layout">
                                                  {info.isMe?<button onClick={this.showModalSubject.bind(this)} style={{padding:"2px 8px",fontSize:"12px",marginTop:"9px"}} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i>Chỉnh sửa</button>:     <div style={{paddingLeft:"0px",lineHeight:"35px"}} className="btn-friend">

                                                    <Dropdown id="dropdown-custom-1">

                                                        <Dropdown.Toggle>

                                                         Da tham gia
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="">
                                                        <MenuItem onClick={this.accessFollow.bind(this)} eventKey="1"> {info.follow&&info.follow.status? <i style={{marginLeft:"-15px"}} className="fa fa-check" aria-hidden="true"></i>:null}
                                                          Roi khoi nhom</MenuItem>
                                                        <MenuItem eventKey="2">Bo theo doi nhom</MenuItem>

                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    </div>}
                                                  </li>
                                                    <li className="li-layout">
                                                    {info.isMe?<button onClick={this.showModalSubject.bind(this)} style={{padding:"2px 8px",fontSize:"12px",marginTop:"9px"}} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i>Chỉnh sửa</button>:     <div style={{paddingLeft:"0px",lineHeight:"35px"}} className="btn-friend">

                                                        <Dropdown id="dropdown-custom-1">

                                                            <Dropdown.Toggle>
                                                            <Glyphicon glyph="ok" />

                                                             Thong bao
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="">
                                                            <MenuItem onClick={this.accessFollow.bind(this)} eventKey="1"> {info.follow&&info.follow.status? <i style={{marginLeft:"-15px"}} className="fa fa-check" aria-hidden="true"></i>:null}
                                                              Roi khoi nhom</MenuItem>
                                                            <MenuItem eventKey="2">Bo theo doi nhom</MenuItem>

                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        </div>}
                                                    </li>


                                                    <li className="li-layout" style={{borderRight:"none"}}>

                                                        {info.isMe?<button onClick={this.showModalSubject.bind(this)} style={{padding:"2px 8px",fontSize:"12px",marginTop:"9px"}} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i>Chỉnh sửa</button>:     <div style={{paddingLeft:"0px",lineHeight:"35px"}} className="btn-friend">


                                                        <Dropdown id="dropdown-custom-1">
                                                        <Dropdown.Toggle>
                                                        <i className="fa fa-share" aria-hidden="true"></i>
                                                        Chia se
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
                                                    <li className="li-layout" style={{borderRight:"none"}}>

                                                          {info.isMe?<button onClick={this.showModalSubject.bind(this)} style={{padding:"2px 8px",fontSize:"12px",marginTop:"9px"}} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i>Chỉnh sửa</button>:     <div style={{paddingLeft:"0px",lineHeight:"35px"}} className="btn-friend">


                                                          <Dropdown id="dropdown-custom-1">
                                                          <Dropdown.Toggle>
                                                          <Glyphicon glyph="option-horizontal" />
                                                          Khac
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
