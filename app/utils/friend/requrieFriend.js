import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props)

      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {
       isFriend:false,
       callDB:false,
       userPatner:null
      }
    }
    componentWillReceiveProps(nextProps) {
      let self  =this
      let {username} = nextProps.match.params
      // self.setState({isFriend:false,callDB:false,userPatner:resdata.EM})

      // if(username !=this.props.match.params.username)
        io.socket.post('/friends/checkfriend',{username},((resdata,jwres)=>{
          if(resdata.EC==0){
              self.setState({isFriend:true,callDB:true})
              console.log('requireFriend',this.props.match,resdata)

          }
          else{
            console.log('userpartẻe',resdata.EM)

            self.setState({isFriend:false,callDB:true,userPatner:resdata.EM})

          }
        }))
     

    
    }
    accessFriend(){
       let friend = this.state.userPatner.friend
       let {username} = this.props.match.params
       let self = this
       io.socket.post('/friends/accessFriend/',{friend,username},((resdata,jwres)=>{
        console.log('resdataaa',resdata)

          if(resdata.EC==0){
              self.state.userPatner.friend = resdata.DT.status
              self.setState({userPatner:self.state.userPatner})
          }

       }))
    }
    componentWillMount() {
      let self  =this
      console.log('requireFriend',this.props.match,this.props.auth)
      let {username} = this.props.match.params
    
      io.socket.post('/friends/checkfriend',{username},((resdata,jwres)=>{
         if(resdata.EC==0){
            self.setState({isFriend:true,callDB:true})
            console.log('requireFriend',this.props.match,resdata)

         }
         else{
          console.log('userpartẻe',resdata.EM)

          self.setState({isFriend:false,callDB:true,userPatner:resdata.EM})
         }
      }))
     

    
    }

    componentWillUpdate(nextProps) {
     
    }

    getTextButton(friend){
        let text = "Kết bạn"
        if(friend==0)
            text = "Hủy yêu cầu kết bạn"
        
        
    }
    render() {
     
       
       if(this.state.callDB) return (

          this.state.isFriend?<ComposedComponent {...this.props} />: <div className="row">
          <div  style={{background:"white",padding:"20px"}} className="col-md-6 col-md-offset-3">
           <div className="alert alert-danger">
               <strong>!</strong> Bạn không có quyền truy nhập trang này, hãy là bạn bè của nhau để  có thể  truy cập
          </div>
          <div style={{}} className="col-md-12 alert-message">
                              <div className=""><img style={{float:"left",marginRight:"2px"}} className="avatar-alert" src={this.state.userPatner.url_avatar} /></div>
                                <div style={{

display: "flex",
justifyContent: "center",
alignItems: "center",
height: "33px"
                                }} className="user-request">
                                    <div style={{float:"left",width:"75%"}}> <strong>{this.state.userPatner.fullname}</strong>
                                    <br />
                                    
                                    </div>
                                    <div className="pull-right">
                                        <button onClick={this.accessFriend.bind(this)} className="btn btn-success">{this.state.userPatner.friend==-1?"Kết bạn":"Huỷ yêu câu kết bạn" }</button>
                                       

                                    </div>
                                </div>
                               
                       </div>
          </div>
          </div>
        );
     
      else{
         return(
            <div></div>
         )
      }
    }
  }

  // Authenticate.propTypes = {
  //   isAuthenticated: React.PropTypes.bool.isRequired,
  //   addFlashMessage: React.PropTypes.func.isRequired
  // }
  //
  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      role : state.auth.user.username,
      auth: state.auth
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
