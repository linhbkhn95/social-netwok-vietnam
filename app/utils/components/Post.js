import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';

// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

// const CardExampleWithAvatar = () => (
//   <Card>
//     <CardHeader
//       title="URL Avatar"
//       subtitle="Subtitle"
//       avatar="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-0/p370x247/28685049_748817388650026_128987673737602857_n.jpg?oh=bbf576c95b988896ae9d8d45d30cc9e3&oe=5B4828A1"
//     />
//     <CardMedia
//       overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
//     >
//       <img src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-0/p370x247/28685049_748817388650026_128987673737602857_n.jpg?oh=bbf576c95b988896ae9d8d45d30cc9e3&oe=5B4828A1" alt="" />
//     </CardMedia>
//     <CardTitle title="Card title" subtitle="Card subtitle" />
//     <CardText>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//       Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
//       Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
//       Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
//     </CardText>
//     <CardActions>
//       <FlatButton label="Action1" />
//       <FlatButton label="Action2" />
//     </CardActions>
//   </Card>
// );

// export default CardExampleWithAvatar;
var date = Date.now();
var datedemo=151139964297
import moment from 'moment'
class Post extends React.Component{
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