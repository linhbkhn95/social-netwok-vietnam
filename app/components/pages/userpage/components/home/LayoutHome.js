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
        <div style={{background:'white'}} className="col-md-4 col-xs-12 remove-padding-col">
          <Info username={this.props.username} />






        </div>
        <div  className="col-md-8 col-xs-12">

                    <HeaderPost username={this.props.username} />
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
