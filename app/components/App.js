var React = require('react');

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink,Link} from 'react-router-dom';


var {Provider} = require('react-redux');

var store = require('app/store.js');
// var Test =require('app/components/Test.js');
var Layout = require('app/components/Layout.js');
 import Home  from 'app/components/pages/wall/Wall.js';
var Login = require('app/components/pages/login/Login.js');
// var ShopCart = require('app/components/pages/shopcart/ShopCart.js');
import UserPage from 'app/components/pages/userpage/UserPage.js';

import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from 'app/utils/setAuthorizationToken.js';
import {setCurrentUser} from 'app/action/authActions.js';
import PostNotifi from './pages/post/Post'
import {logout}  from 'app/action/actionAuthenticate.js';
// if(localStorage.jwToken){
//   console.log('cssssssssssssssssssssssssssmm');
//   setAuthorizationToken(localStorage.jwToken);
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.jwToken)));

// }

import requrieFriend from 'app/utils/friend/requrieFriend'
import CallVideo from '../components/pages/callvideo/CallVideo'
import Notfound from './Notfound'
import "node_modules/video-react/dist/video-react.css"; // import css


 class App extends React.Component{

// require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
//require('style!css!sass!./css/style.scss');
// $(document).ready(() => $(document).foundation());
      componentDidMount(){

      }

     render(){
        return(
          // <MuiThemeProvider muiTheme={muiTheme}>
             <Provider store={store}>
              <Router>

                  <Layout>
                  {/* <Link to="/user/login">Đăng nhập</Link>  */}

                 <div>

                   <Switch>

                      <Route  exact   path="/" component={Home}/>
                      <Route     path="/wall" component={Home}/>
                      {/* <Route     path="/callvideo" component={CallVideo}/> */}
                      <Route path = '/post.notifi.:postId' component ={PostNotifi} />
                      <Route  path="/userpage.:username" component={requrieFriend(UserPage)} />
                      <Route  path="/login" component={Login} />
                       {/* <Route  exact   path="/wall" component={Home}/> */}
                      <Route render={function(){
                        return       <Notfound />
                           }
                       } />
                 </Switch>
                                       {/* <Route  path="/userpage.a" component={UserPage} /> */}

                  {/* <Route   path="/userpage.a"  render={function () {
                                    return <div><UserPage  /></div>
                                }
                                } />

                        } /> */}
                </div>
               </Layout>
             </Router>
             </Provider>

            // </MuiThemeProvider>
    )
  }
}

module.exports = App;

