import React from 'react';
import {NavDropdown,Navbar,NavItem,MenuItem,Nav,OverlayTrigger,Tooltip,Button} from 'react-bootstrap';
import {convertComment} from '../ConvertComment'
import ModalConfirm from '../modal/Modalconfirm'
var date = Date.now();
var datedemo=151139964297
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

const tooltip = (
    <Tooltip id="tooltip">
      <span >Trịnh đức Bảo Linh</span>
       <br />
      <span>Xuân Nguyễn</span>
      <br />
      <span>Nhỏ ngọc</span>
    </Tooltip>
  );
  
class Post extends React.Component{
   

    constructor(props){
        super(props);
        this.state = {
            displayListComment:false,
            
            dataPostAccess:null,
            showModalConfirm:false,
   
      
            likeInfo:{
                listUserId:[],
                listUser:{}
            }
        
        }
    }
    renderTooltip(){
        
        let {likeInfo} = this.state
        let {listUserId,listUser} = likeInfo
        let length  = listUserId.length
        if(length<6){
            return(

                <Tooltip id="tooltip">
                  {listUserId.map((userId)=>{
                      console.log('fullname',listUser[userId].fullname)
                      return(
                        <div  key={userId}> <span style={{float:"left"}}>{listUser[userId].fullname}</span><br /> </div>
                      )
                  })}
                
              </Tooltip>
            )
        }
        else{
            let jsx = [];
            
            for(var i =0;i<6;i++){
                jsx.push(
                    <span style={{float:"left",clear:"both"}} >{listUser[listUserId[i]].fullname}</span>
                )
            }
            let text ="và"+(length - 6) +" người khác..."
            jsx.push(
                <span style={{float:"left",clear:"both"}} >{text}</span>

            )
            return jsx
        }

      
    }
    renderTextUserLike(){
        let likeInfo = this.state.likeInfo
        let textListUserLike = ''
        let {listUser,listUserId} = likeInfo
        if(listUserId.length>0){
           
            if(this.props.userLikePost){
                textListUserLike +='Bạn,'
               
            }
            let length  = listUserId.length
            if(length>2){
                for(var i=0;i<2;i++){
                    if(listUserId[i]!=this.props.auth.user.id)
                    textListUserLike +=' '+listUser[listUserId[i]].fullname+','
                }
                textListUserLike +=' và '+(length-2)+' người khác,'
            }
            else{
                for(var i=0;i<length;i++){
                    if(listUserId[i]!=this.props.auth.user.id)
                    textListUserLike +=' '+listUser[listUserId[i]].fullname+','
                }
            }

            textListUserLike = textListUserLike.substring(0, textListUserLike.length - 1);

            
             
          

        }
        console.log('texListLike',textListUserLike)
        return textListUserLike

    }
    componentDidMount(){
        let self = this
        io.socket.on(this.props.idPost+"like", function (data) {
            console.log('Socket like`' + data.id + '` joined the party!',data);

            switch(data.type){
                
                case "like" : self.accessLike(data);
            }    
       
         })
    }
    accessLike(data){
        this.props.accessLike(this.props.idPost,data.verb)
        switch(data.verb){
            case "like" :{
                var index = this.state.likeInfo.listUserId.indexOf(data.data.id);
                console.log('index',index)
                if (index == -1) {
                    this.state.likeInfo.listUserId.push(data.data.id)
                    this.state.likeInfo.listUser[data.data.id] = data.data;
                    this.setState({likeInfo:this.state.likeInfo})
                }
                break
            }
            case "unlike":{
                var index = this.state.likeInfo.listUserId.indexOf(data.data.id);
                console.log('index',index)
                if (index > -1) {
                  this.state.likeInfo.listUserId.splice(index, 1);
                  delete this.state.likeInfo.listUser[data.data.id]
                }
                this.setState({likeInfo:this.state.likeInfo})
                break
            }
        }    
    }
    
    async componentWillMount(){
        let self  =this
        io.socket.post('/likepost/getlist_LikeFormatPost',{postId:this.props.idPost},((resdata,jwres)=>{
            console.log('re',resdata)
            if(resdata.EC==0){
                 self.state.likeInfo.listUser = resdata.DT.listUser;
                 self.state.likeInfo.listUserId = resdata.DT.listUserId
                 self.setState({likeInfo:self.state.likeInfo})
            }
        }))
    }
    comment(){
        console.log('comment')
        this.props.displayListComment()
    }
    like(){
        this.props.like(this.props.idPost)
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
        let texListLike =''
         texListLike = this.renderTextUserLike()
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
                         <div  onClick={this.like.bind(this)} className="btn-footer-post btn-heart">
                          {this.props.countLike} <i style={{marginRight:"3px",fontWeight:this.props.userLikePost?"bold":"normal"}}  className="fa fa-heart-o" aria-hidden="true"></i> {this.props.userLikePost?"Bỏ thích":"Thích"}
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
                    
                   
               {this.state.likeInfo.listUserId.length?<div  className="row">
               <div style={{marginRight:"-12px"}} className="col-md-1">
                    <OverlayTrigger placement="top" overlay={this.renderTooltip()}>
                       <i  style={{marginRight:"2px",float:"left"}} className="fa fa-heart-o" aria-hidden="true"></i>
                     </OverlayTrigger>
                </div>
               <div style={{  fontSize:"11px",color:"green"}}>{texListLike}</div>
               </div>:null}
                 <ModalConfirm show={this.state.showModalConfirm} access={this.access.bind(this)} close={this.closeModalConfirm.bind(this)} />

             </div>
        )
    }
}
module.exports = connect(function(state){return{auth:state.auth}})(Post)