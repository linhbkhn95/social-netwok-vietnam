import React from 'react';
import HeaderListPost from './components/HeaderListPost'
import HeaderPost from './HeaderPost'
import ListPost from './ListPost'
import Info from './Info'

import {NavLink,Route} from 'react-router-dom';

class Wall extends React.Component{
 
  render(){
     return(
       <div>
        <div style={{marginTop:"5px"}} className="col-md-3 col-xs-12">
          <Info />






        </div> 
        <div style={{paddingLeft:"0px"}} className="col-md-9 col-xs-12">
          
                    <HeaderPost />
                    <div className="col-md-12 list-post " >
                    <div className="">
                        {/* <HeaderListPost /> */}
                        <div>
                            {this.props.children}
                        </div>

                    </div>
                    </div>
                
        </div>
      </div>
      
     )
  }
}
module.exports =  Wall;
