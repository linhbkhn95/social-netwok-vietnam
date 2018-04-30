import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';
import {convertComment} from '../ConvertComment'
import ModalConfirm from '../modal/Modalconfirm'
var date = Date.now();
var datedemo=151139964297
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'
class Post extends React.Component{
   

    constructor(props){
        super(props);
        this.state = {
            displayListComment:false,
            texRepComment:'',
            displayInputRepComment:{},
            listComment:[
                   
            ],
            dataPostAccess:null,
            showModalConfirm:false,
   
      
      
        
        }
    }
    comment(){
        console.log('comment')
        this.props.displayListComment()
    }
    like(){
        console.log('like')
    }
    share(){
        console.log('share')
    }
    access(){
        let self = this;
        if(this.state.dataPostAccess){
            io.socket.post('/post/deletePost',{idPost:this.state.dataPostAccess},function(resdata,jwres){
                if(resdata.DT){
                    self.props.deletePost(resdata.DT[0])
                    toast.success( "Xóa bài thành công !", {
                        position: toast.POSITION.TOP_LEFT
                      });
                }
                else{
                    toast.error( "Xóa bài không thành công !"+resdata.EM, {
                        position: toast.POSITION.TOP_LEFT
                      });
                }
            })
        }
        this.setState({showModalConfirm:false})
    }
  
    closeModalConfirm(){
        this.setState({showModalConfirm:false})
    }
    showModalConfirm(){
      this.setState({showModalConfirm:true,dataPostAccess:this.props.idPost})
    }
    render(){
        let self = this;
        var listComment =convertComment(this.state.listComment, {
            idKey: 'id',
            parentKey: 'parentId',
            childrenKey: 'listRepComment'
          });
        return(
            
                <div>
                    <header>
                      <div className="pull-left title-post"><i className="fa fa-header" aria-hidden="true"></i> {this.props.title} </div>
                        <div>  <div className="pull-right title-post"><i style={{marginRight:"3px"}} className="fa fa-flag-o" aria-hidden="true"></i>{this.props.subject.subjectname}</div></div>
                    </header>
                    <div className="user-answer">
                        <div className="user-avatar">
                            <img className="img-user" src={this.props.auth.user.url_avatar} />
                        </div>
                        <div className="user-detail">
                            <div className="user-name">
                            {this.props.auth.user.fullname?this.props.auth.user.fullname:this.props.auth.user.username}

                            </div>
                            <div className="time">
                                  <p className="">{moment(this.props.time).lang('vi').fromNow()}</p>
                            </div>
                        </div>
                    </div>
                     <div className="content-asw">
                            {this.props.content}
                     </div>
                     <div style={{marginLeft:"0px",marginRight:"0px"}} className="footer-post row">
                         <div className="btn-footer-post btn-heart">
                            15  <i  style={{marginRight:"3px"}} onClick={this.like.bind(this)} className="fa fa-heart-o" aria-hidden="true"></i> Thích
                         </div>
                         <div onClick={this.comment.bind(this)} className="btn-footer-post btn-comment">
                           {this.props.lengthComment} <i  style={{marginRight:"3px"}}  className="fa fa-comment-o" aria-hidden="true"></i>Bình luận
                         </div>
                         <div className="btn-footer-post btn-share">
                          5 <i style={{marginRight:"3px"}} onClick={this.share.bind(this)} className="fa fa-share" aria-hidden="true"></i>Chia sẻ
                        </div>
                         <div className="btn-more">
                       
                         <NavDropdown style={{color:"green"}} eventKey={3}  id="basic-nav-dropdown">
                            <MenuItem  onClick={this.showModalConfirm.bind(this,this.props.id)} eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i> Xóa bài đăng</MenuItem>
                           
                            <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
                                Ẩn bài đăng</MenuItem>
                          </NavDropdown>
                           <i >Xem thêm </i>
                         </div>
                     </div>
                    
           
                 <ModalConfirm show={this.state.showModalConfirm} access={this.access.bind(this)} close={this.closeModalConfirm.bind(this)} />

             </div>
        )
    }
}
module.exports = connect(function(state){return{auth:state.auth}})(Post)