import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';




import {logout} from 'app/action/actionAuthenticate.js';
import setAuthorizationToken from 'app/utils/setAuthorizationToken.js';
import {setCurrentUser} from 'app/action/authActions.js';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
             textError:""
             
        }
    }
    login(e){
        var {dispatch} = this.props;

       e.preventDefault();

      var that =this;
       var {dispatch} = this.props;
       var {username, password} = this.refs;
       console.log(username.value);
   //  io.socket.get('/session/userlogin',{u:username.value}, function gotResponse(data, jwRes) {
   //     console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
   //   });
      axios.post('/auth/index', {username: username.value,password: password.value})
       .then(res => {
         
        if(res.data.EC==0){
 
            localStorage.setItem('jwToken',res.data.DT.token);
            setAuthorizationToken(res.data.DT.token);
            dispatch(setCurrentUser(jwtDecode(res.data.DT.token)));
   
      
            dispatch(login(that.refs.username.value));
            that.props.history.push('/wall');
        }
        else{
            that.setState({textError:res.data.EM});

        }
    
      })
     .catch(function(err){
        that.setState({textError:err.response.data.err});
        
     //  dispatch(showNotifi(err.response.data.err));
     });
      
   }
    render(){
        return(
            
                <div className="row ">    
                 <div style={{marginTop:"50px"}} className="mainbox col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2">                    
                    <div className="panel panel-default" >
                            <div className="panel-heading">
                                <div className="panel-title">Đăng nhập<i style={{marginLeft:"2px"}} className="fa fa-commenting" aria-hidden="true"></i>
<i className="fa fa-question" aria-hidden="true"></i>
 </div>
                                <div style={{float:"right", fontSize: "80%", position: "relative", top:"-10px"}}><a href="#">Quên mật khẩu</a></div>
                            </div>     

                            <div style={{paddingTop:"30px"}} className="panel-body" >

                                <div style={{display:"none"}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                                    
                                <form id="loginform" className="form-horizontal" role="form">
                                            
                                    <div style={{marginBottom: "25px"}} className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                                <input ref="username"  type="text" className="form-control" defaultValue="0123456789" placeholder="Nhập tên đăng nhập.."/>                                        
                                            </div>
                                        
                                    <div style={{marginBottom: "25px"}} className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                                <input ref="password" type="password" className="form-control" placeholder="nhập mật khẩu của bạn.."/>
                                            </div>
                                            

                                    <div className="input-group">
                                            <div style={{color:"red",padding:"4px",marginTop:"-14px"}} className="">{this.state.textError}</div>
                                    </div>    
                                    <div className="input-group">
                                            <div className="checkbox">
                                                <label>
                                                <input id="login-remember" type="checkbox" name="remember" value="1"/> Nhớ mật khẩu
                                                </label>
                                            </div>
                                          
                                            </div>


                                        <div style={{marginTop:"10px"}} className="form-group">
                                        

                                            <div style={{textAlign:"center"}} className="col-sm-12 controls">
                                            <a style={{width:"100%"}} id="btn-login" onClick={this.login.bind(this)} href="#" className="btn btn-default">Đăng nhập  </a>
                                            <a  style={{marginTop:"5px",width:"100%"}} id="btn-fblogin" href="/auth/facebook" className="btn btn-primary"><i style ={{marginRight:"5px",color:"white"}} className="fa fa-facebook-official" aria-hidden="true"></i>
Đăng nhập qua Facebook</a>
                                            <div>
                                                 Nếu chưa có tài khoản thì hãy    <button className="btn btn-link">Đăng kí</button>
                                            </div>
                                            </div>
                                        </div>


                                    
                                    </form>     



                                </div>                     
                            </div>  
            
                

                    
                    
                        
                </div> 
                
        </div>
        
        )
    }
}

module.exports = connect(function(state){return{}})(Login);