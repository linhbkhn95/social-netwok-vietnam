import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';

var date = Date.now();
var datedemo=151139964297
import moment from 'moment'
class Comment extends React.Component{
    render(){
        return(
            <div style={{    marginBottom: "20px"}} className="col-md-12">
                <article className="post"> 
                    <header>
                      <h2> sao bạn chưa lấy vk </h2>
                    </header>
                    <div className="user-answer">
                        <div className="user-avatar">
                            <img className="img-user" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" />
                        </div>
                        <div className="user-detail">
                            <div className="user-name">
                                Linh td
                            </div>
                            <div className="time">
                                  <p className="">{moment(datedemo).lang('vi').fromNow()}</p>
                            </div>
                        </div>
                    </div>
                     <div className="content-asw">
                            Tớ chưa thích
                     </div>
                     <div className="footer-post">
                         <div className="btn-footer-post btn-heart">
                            15  <i className="fa fa-heart-o" aria-hidden="true"></i>
                         </div>
                         <div className="btn-footer-post btn-comment">
                           22 <i className="fa fa-comment-o" aria-hidden="true"></i>
                         </div>
                         <div className="btn-footer-post btn-share">
                          5 <i className="fa fa-share" aria-hidden="true"></i>
                        </div>
                         <div className="btn-more">
                       
                         <NavDropdown eventKey={3}  id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i> Xóa bài đăng</MenuItem>
                            {/* <MenuItem eventKey={3.1}></MenuItem>
                            <MenuItem divider /> */}
                            <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
Ẩn bài đăng</MenuItem>
                          </NavDropdown>
                           <i>Xem thêm </i>
                         </div>
                     </div>
                </article>

            </div>
        )
    }
}
module.exports = Post