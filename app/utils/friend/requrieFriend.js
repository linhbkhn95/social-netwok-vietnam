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
       callDB:false
      }
    }
    componentWillReceiveProps(nextProps) {
      let self  =this
      let {username} = nextProps.match.params

      if(username !=this.props.match.params.username)
        io.socket.post('/friends/checkfriend',{username},((resdata,jwres)=>{
          if(resdata.EC==0){
              self.setState({isFriend:true,callDB:true})
              console.log('requireFriend',this.props.match,resdata)

          }
          else{
            self.setState({isFriend:false,callDB:true})

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
          self.setState({isFriend:false,callDB:true})

         }
      }))
     

    
    }

    componentWillUpdate(nextProps) {
     
    }

    render() {

       
       if(this.state.callDB) return (

          this.state.isFriend?<ComposedComponent {...this.props} />: <div className="row">
          <div className="col-md-4 col-md-offset-3">
           <div className="alert alert-danger">
               <strong>!</strong> Bạn không có quyền truy nhập trang này, hãy là bạn bè của nhau để  có thể  truy cập
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
