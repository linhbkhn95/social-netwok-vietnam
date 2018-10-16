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

          ],
          username:null
        };
      }
    componentWillReceiveProps(nextProps){

    }
    componentDidMount(){

    }
    login(){
        var {dispatch} = this.props;

       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
    render(){
        console.log('match',this.props.match.params)
        let {username} = this.props.match.params
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
            <LayoutPage username={username}>

                              {/* <Route exact path={"/userpage."+username}  component={Wall} */}
                              {/* /> */}
                        <Route exact path={"/userpage."+username}  render={function () {
                                    return <div><Wall username={username} /></div>
                                }
                                } />

                              {/* <Route path={"/userpage."+username+"/friends"} component={ListFriend}/> */}
                              <Route path={"/userpage."+username+"/friends"}  render={function () {
                                    return <div><ListFriend username={username}  /></div>
                                }
                                } />

                              <Route path={"/userpage."+username+"/follows"}  render={function () {
                                    return <div><ListFollow username={username} /></div>
                                }
                                } />

                              <Route path={"/userpage."+username+"/images"}  render={function () {
                                    return <div><ListImage username={username}  /></div>
                                }
                                } />

                      

            </LayoutPage>
        )
    }
}

module.exports = connect(function(state){return{}})(shopMK);
