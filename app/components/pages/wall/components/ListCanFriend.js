import React from 'react'
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
        let username = 'linhtd'
        let sefl = this
        if(username){
            io.socket.post('/friends/getCanFriend',{},
            ((resdata)=>{
                if(resdata.EC==0){
                    sefl.setState({listfriend:resdata.DT})
                }
            }))
        }
    }
   render(){
            let self =this
             let {listfriend} = this.state
               return(
          
                      <div  className="col-md-12">
                               <div style={{background:"white",    padding: "10px"}} className="col-md-12 ">
                                      <div className=" col-md-12 row">
                                          <div   className="pull-left">
                                              <i style={{marginRight:"10px"}} className="fa fa-users" aria-hidden="true"></i>
                                            Những người bạn có thể  biết
                                          </div>
                                          <div >
                                          </div>
                                      </div>
                                      <div style={{paddingTop:"10px"}} className="row col-md-12">
                                        {listfriend.map((friend,index)=>{
                                            return(
                                              <div style={{padding:"5px 10px 5px 5px"}} className="col-md-12 use">
                                              <div >
                                                 <NavLink to={"/userpage."+friend.user.username} ><img style={{width:"33px",height:"33px"}} className="img-user"  src={friend.user.url_avatar} /> </NavLink>
                                                 <div className="col-md-8">
                                                  <div className="name-user" >
                                                  <NavLink to={"/userpage."+friend.user.username} >    {friend.user.fullname} </NavLink>
                                                  </div>
                                                  <div className="number-friend-middle">
                                                      {friend.countFriend} bạn bè
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="pull-right">
                                                 <button onClick={self.accessFriend.bind(this,friend.user.username)} style={{padding:"3px 12px",fontSize:"11px",marginRight:"3px"}} className="btn btn-success"><i style={{color:"white",marginRight:"2px"}} className="fa fa-user-plus" aria-hidden="true"></i>Kết bạn
</button>
                                                 <button onClick={self.cancel.bind(this,friend.user.username)} style={{padding:"3px 12px",fontSize:"11px",marginRight:"3px"}} className="btn btn-default"><i style={{color:"none",marginRight:"2px"}} className="fa fa-times" aria-hidden="true"></i>Bỏ qua
</button>

                                              </div>
                                              
                                         </div>
                                            )
                                        })}
                                    
                                      </div>
                               </div>
                      </div>
               )
    
    }
    
}
module.exports = List