import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav} from 'react-bootstrap';

var date = Date.now();
var datedemo=151139964297
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
function renderActive(data) {
  
    if (data.listRepComment&&data.listRepComment.length>0) {
      // console.log("GroupMenu = " + data.GroupMenu)
      let classMenu = ""
      if(data.PRID){
        classMenu="dropdown-submenu"
      }
      // console.log(data,language)
      return (
        
       
        
        <div className="comment-item panel-body">
           <img className="img-user" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" />
           
           <div className="col-md-11">
               <div className="text-rep"><span style={{    color:" #b2b2bb"}} className="">
                    Linhtd </span>{data.texRepComment}
                    <div className="pull-right">
                       
                       <NavDropdown style={{color:"green"}} eventKey={3}  id="basic-nav-dropdown">
                          <MenuItem  eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i> Xóa bài đăng</MenuItem>
                          {/* <MenuItem eventKey={3.1}></MenuItem>
                          <MenuItem divider /> */}
                          <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
Ẩn bài đăng</MenuItem>
                        </NavDropdown>
                         
                       </div>
               </div>
               <div style={{marginTop:"5px"}} className="time">
                   <p style={{  color: "#604a50"}}>Thích</p>
                   <p style={{  color: "#604a50"}}>Trả lời</p>
                   <p className="">{moment(data.time).lang('vi').fromNow()}</p>
               </div>
           </div>
           <div className="col-md-12 ">

                       {data.listRepComment.map(c =>  (renderActive(c)))}                     
                    <div className="img-rep-rep"> <img src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" /> </div>
            
                    <div style={{paddingRight:"0px",paddingLeft:"6px"}} className="col-md-11">
                        <form > <input placeholder="Viết bình luận ..." type="text" className="form-control input-repcomment" />
                        </form>
                        </div>
                        
                    </div>
                                
       </div>
         
            
             
      )
    }
    else {
      return  (
        <div>
            <div className="img-rep-rep"> <img className="" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" /> </div>
            
            <div className="col-md-11">
                <div className="text-rep"><span style={{    color:" #b2b2bb"}} className="">
                Linhtd </span>{data.texRepComment}
                <div className="pull-right">
                       
                       <NavDropdown style={{color:"green"}} eventKey={3}  id="basic-nav-dropdown">
                          <MenuItem  eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i> Xóa bài đăng</MenuItem>
                          {/* <MenuItem eventKey={3.1}></MenuItem>
                          <MenuItem divider /> */}
                          <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
Ẩn bài đăng</MenuItem>
                        </NavDropdown>
                         
                       </div>
                </div>
                <div style={{marginTop:"5px"}} className="time">
                    <p style={{  color: "#604a50"}}>Thích</p>
                    <p style={{  color: "#604a50"}}>Trả lời</p>
                    <p className="">{moment(data.time).lang('vi').fromNow()}</p>
                </div>
            </div>
            </div>
      ) 
         
                  
    }
  }
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayListComment:false,
            texRepComment:'',
            listRepComment:[
                // {
                //     texRepComment:'kkkkk',
                //     time:Date.now(),
                //     listRepComment:[
                //         {
                //         texRepComment:'mmmm',
                //         time:Date.now(),
                //         listRepComment:[]
                //        }
                //     ]
                // },
                {
                    texRepComment:'sss',
                    time:Date.now(),
                    listRepComment:[
                        {
                        texRepComment:'mmmaaaam',
                        time:Date.now(),
                        listRepComment:[
                            {texRepComment:'ssadfafafm',
                            time:Date.now(),
                            listRepComment:[]}
                        ]
                       }
                    ]
                },
                // {
                //     texRepComment:'âssda',
                //     time:Date.now(),
                //     listRepComment:[
                       
                       
                //     ]
                // }
            ]
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
    repComment(e){
        e.preventDefault();
        console.log(this.state.texRepComment)
        let comment ={}
        comment.listRepComment = []
        comment.texRepComment = this.state.texRepComment
        comment.time = Date.now()
        this.state.listRepComment.push(comment)
        this.setState({listRepComment:this.state.listRepComment,texRepComment:''})
     
    }
    repToRepComment(e){

    }
    onChangeTextRepComment(e){
        this.setState({texRepComment:e.target.value})
    }
    render(){
        let self = this;
        return(
            <div  className="col-md-12 post-status">
                <article className="post"> 
                    <header>
                      <div className="pull-left title-post"><i className="fa fa-header" aria-hidden="true"></i> {this.props.title} </div>
                        <div>  <div className="pull-right title-post"><i style={{marginRight:"3px"}} className="fa fa-flag-o" aria-hidden="true"></i>Tình yêu</div></div>
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
                     <div className="footer-post row">
                         <div className="btn-footer-post btn-heart">
                            15  <i  style={{marginRight:"3px"}} onClick={this.like.bind(this)} className="fa fa-heart-o" aria-hidden="true"></i> Thích
                         </div>
                         <div onClick={this.comment.bind(this)} className="btn-footer-post btn-comment">
                           22 <i  style={{marginRight:"3px"}}  className="fa fa-comment-o" aria-hidden="true"></i>Bình luận
                         </div>
                         <div className="btn-footer-post btn-share">
                          5 <i style={{marginRight:"3px"}} onClick={this.share.bind(this)} className="fa fa-share" aria-hidden="true"></i>Chia sẻ
                        </div>
                         <div className="btn-more">
                       
                         <NavDropdown style={{color:"green"}} eventKey={3}  id="basic-nav-dropdown">
                            <MenuItem  onClick={this.deletePost.bind(this)} eventKey={3.1}><i style={{marginRight:"10px"}} className="fa fa-ban" aria-hidden="true"></i> Xóa bài đăng</MenuItem>
                            {/* <MenuItem eventKey={3.1}></MenuItem>
                            <MenuItem divider /> */}
                            <MenuItem eventKey={3.2}><i style={{marginRight:"10px"}}  className="fa fa-minus" aria-hidden="true"></i>
Ẩn bài đăng</MenuItem>
                          </NavDropdown>
                           <i >Xem thêm </i>
                         </div>
                     </div>
                     <div style={{display:this.state.displayListComment?"block":"none"}} className="list-comment row">
                         
                          <div className="col-md-12 post-repcomment">
                            {/* {this.state.listRepComment.length>0?this.state.listRepComment.map((comment,index)=>{
                                return(
                                  <div key={index}>
                                    <img className="img-user" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" />
                                    
                                    <div className="col-md-11">
                                         <div className="text-rep"><span style={{    color:" #b2b2bb"}} className="">Linhtd </span>{comment.text}</div>
                                         <div style={{marginTop:"5px"}} className="time">
                                            <p style={{  color: "#604a50"}}>Thích</p>
                                            <p style={{  color: "#604a50"}}>Trả lời</p>
                                            <p className="">{moment(comment.time).lang('vi').fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12 ">
                                         <div key={index+6}>
                                            <img className="img-user" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" />
                                            
                                            <div className="col-md-11">
                                                <div className="text-rep"><span style={{    color:" #b2b2bb"}} className="">Linhtd </span>{comment.text}</div>
                                                <div style={{marginTop:"5px"}} className="time">
                                                    <p style={{  color: "#604a50"}}>Thích</p>
                                                    <p style={{  color: "#604a50"}}>Trả lời</p>
                                                    <p className="">{moment(comment.time).lang('vi').fromNow()}</p>
                                                </div>
                                            </div>
                                        </div>
                                           <div className="img-rep-rep"> <img src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" /> </div>
                                    
                                            <div style={{paddingRight:"0px",paddingLeft:"6px"}} className="col-md-11">
                                                <form onSubmit={this.repToRepComment.bind(this,index)}> <input value={this.state.texRepComment} onChange={this.onChangeTextRepComment.bind(this)} placeholder="Viết bình luận ..." type="text" className="form-control input-repcomment" />
                                                </form>
                                             </div>
                                               
                                            </div>
                                   </div>
                                )
                            }):null}
                              */}
                             {this.state.listRepComment.map(c => renderActive(c))}
                          </div>
                          <div className="col-md-12 post-repcomment">
                      
                            <img className="img-user" src="https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c0.16.80.80/p80x80/28577300_2016525228560373_5392331788461853926_n.jpg?oh=821bf3b7ee04b7f7ffbd02e0cbc850bb&oe=5B037648" />
                     
                          <div className="col-md-11">
                              <form onSubmit={this.repComment.bind(this)}> <input value={this.state.texRepComment} onChange={this.onChangeTextRepComment.bind(this)} placeholder="Viết bình luận ..." type="text" className="form-control input-repcomment" /></form></div>
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