import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listfriend:[
 
            ]
        }
  }
  cancel(username){
    let {listfriend}  = this.state
    for(var i =0;i<listfriend.length;i++){
        if(listfriend[i].username  == username){
             listfriend.splice(i,1)
             break
        }
    }
    
    self.setState({listfriend})
  }
  accessFriend(username){
    let self = this
    console.log('username',username)
    let {listfriend}  = this.state
    io.socket.post('/friends/accessFriend/',{username},((resdata,jwres)=>{
     console.log('resdataaa',resdata)

       if(resdata.EC==0){
           for(var i =0;i<listfriend.length;i++){
               if(listfriend[i].username  == username){
                    listfriend.splice(i,1)
                    break
               }
           }
           
           self.setState({listfriend})
       }

    }))
 }
    componentDidMount(){
       
        let sefl = this
       
            io.socket.post('/user/getListFriends_User',{},
            ((resdata)=>{
                if(resdata.EC==0){
                    sefl.setState({listfriend:resdata.DT})
                }
            }))
      
    }
   render(){
            let self =this
             let {listfriend} = this.state
               return(
          
                      <div style={{marginTop:"50px"}} className="c">
                               <div style={{   }} className="">
                                      <div style={{paddingTop:"10px",paddingBottom:"10px"}} className="col-md-12 ">
                                          <div   className="pull-left">
                                              <i style={{marginRight:"10px"}} className="fa fa-users" aria-hidden="true"></i>
                                            Danh sách bạn bè
                                          </div>
                                          <div >
                                          </div>
                                      </div>
                                      <div style={{paddingTop:"20px"}} className="">
                                        {listfriend.map((friend,index)=>{
                                            return(
                                                <NavLink key={index} to={"/userpage."+friend.user.username} ><div style={{paddingTop:"3px",paddingBottom:"3px"}} className="friend col-md-12 ">
                                              <div >
                                                 <NavLink to={"/userpage."+friend.user.username} ><img style={{width:"33px",height:"33px"}} className="img-user"  src={friend.user.url_avatar} /> </NavLink>
                                                  <div style={{float:"left"}} className="name-user" >
                                                  <NavLink to={"/userpage."+friend.user.username} >    {friend.user.fullname} </NavLink>
                                                  
                                                 
                                              
                                              </div>
                                              <div className="status-user"> 
                                                     <span className="status-online"></span>
                                                </div>
                                            </div>
                                              
                                         </div>
                                         </NavLink>
                                            )
                                        })}
                                    
                                      </div>
                               </div>
                      </div>
               )
    
    }
    
}
module.exports =connect(function(state){
    return{
        auth:state.auth,
    }})
   (List);