import React from 'react';
import {NavLink,Route} from 'react-router-dom';
import ListPostNew from './components/ListPostNew'
import ListDiscover from './components/ListDiscover'
import HeaderPost from './HeaderPost'
import ListPost from './ListPost'
import Info from './Info'
import LayoutHome from './LayoutHome'
class Wall extends React.Component{
 
  render(){
     return(
      //  <div>
      //   <div style={{marginTop:"5px"}} className="col-md-3 col-xs-12">
      //     <Info />






      //   </div> 
      //   <div style={{paddingLeft:"0px"}} className="col-md-9 col-xs-12">
          
      //               <HeaderPost />
      //               <ListPost />
                
      //   </div>
      // </div>
        <LayoutHome username={this.props.username}>  
                              {/* <Route exact path="/userpage" component={ListPostNew} /> */}
                              <ListDiscover username={this.props.username} />
          </LayoutHome>
     )
  }
}
module.exports =  Wall;
