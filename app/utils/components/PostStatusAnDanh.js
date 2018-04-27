import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';

var date = Date.now();
var datedemo=151139964297
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayListComment:false
        }
    }
    comment(){
        console.log('comment')
        this.setState({displayListComment:!this.state.displayListComment})
    }
    like(){
        console.log('like')
    }
    share(){
        console.log('share')
    }
    deletePost(){
        if(this.props.idPost){
            io.socket.post('/post/deletePost',{idPost:this.props.idPost},function(resdata,jwres){
                if(resdata.DT){
                    toast.success( "Xóa bài thành công !", {
                        position: toast.POSITION.TOP_LEFT
                      });
                }
            })
        }
    }
    render(){
        return(
            <div style={{    marginBottom: "20px"}} className="col-md-12">
                <article className="post"> 
                    <header>
                      <h2> {this.props.title} </h2>
                    </header>
                    <div className="user-answer">
                        <div className="user-avatar">
                            <img className="img-user" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" />
                        </div>
                        <div className="user-detail">
                            <div className="user-name">
                                Trịnh Đức Bảo Linh
                            </div>
                            <div className="time">
                                  <p className="">{moment(this.props.time).lang('vi').fromNow()}</p>
                            </div>
                        </div>
                    </div>
                     <div className="content-asw">
                            {this.props.content}
                     </div>
                     <div className="footer-post">
                         <div className="btn-footer-post btn-heart">
                            15  <i onClick={this.like.bind(this)} className="fa fa-heart-o" aria-hidden="true"></i>
                         </div>
                         <div className="btn-footer-post btn-comment">
                           22 <i onClick={this.comment.bind(this)} className="fa fa-comment-o" aria-hidden="true"></i>
                         </div>
                         <div className="btn-footer-post btn-share">
                          5 <i onClick={this.share.bind(this)} className="fa fa-share" aria-hidden="true"></i>
                        </div>
                         <div className="btn-more">
                       
                         <NavDropdown eventKey={3}  id="basic-nav-dropdown">
                            <MenuItem  onClick={this.deletePost.bind(this)} eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i> Xóa bài đăng</MenuItem>
                            {/* <MenuItem eventKey={3.1}></MenuItem>
                            <MenuItem divider /> */}
                            <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
Ẩn bài đăng</MenuItem>
                          </NavDropdown>
                           <i>Xem thêm </i>
                         </div>
                     </div>
                     <div style={{display:this.state.displayListComment?"block":"none"}} className="list-comment">
                         <div>
                          <input type="text" className="form-control" />
                        </div>
                         <div>
                         </div>
                     </div>
                </article>

            </div>
        )
    }
}
module.exports = Post