import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import Product from 'app/utils/Product.js'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import Wall from './components/home/Home'
import LayoutPage from './components/LayoutPage'
import ListFriend from './components/friends/ListFriend'
import ListFollow from './components/follow/ListFollow'
import ListImage from './components/images/ListImage'
class shopMK extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
           
          ]
        };
      }
    login(){
        var {dispatch} = this.props;
        
       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
    render(){
        return(
            //   <div className="container" style={{paddingTop:"10px"}}>
            //       <div className="fix-product">
            //           <div className="row">
            //                 <section id="user_main">
            //                      <LayoutPage />
            //                      <div className="col-md-12">
            //                          <div className="content-main">
            //                                 <div className="row">
            //                                      <div style={{marginTop:"5px"}} className="col-md-3 col-xs-12">
            //                                        <Info />
                                             
                                        
                                        
                                        
                                        
                                        
            //                                      </div> 
            //                                      <div style={{paddingLeft:"0px"}} className="col-md-9 col-xs-12">
                                                   
            //                                         <Wall />
            //                                      </div>
                                              
            //                                 </div>
            //                          </div>
            //                      </div>
            //                 </section>
            //           </div>
            //       </div>
            //   </div>
            <LayoutPage>
                              <Route exact path="/userpage/" component={Wall} />
                              <Route path="/userpage/friends" component={ListFriend} />
                              <Route path="/userpage/follows" component={ListFollow} />
                              <Route path="/userpage/images" component={ListImage} />

            </LayoutPage>
        )
    }
}

module.exports = connect(function(state){return{}})(shopMK);