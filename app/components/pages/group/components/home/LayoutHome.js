import React from 'react';
import HeaderListPost from './components/HeaderListPost'
import HeaderPost from './HeaderPost'
import ListPost from './ListPost'
import Relative from '../Relative'

import {NavLink,Route} from 'react-router-dom';

class Wall extends React.Component{

  render(){
     return(

        <div style={{paddingLeft:"0px"}} className="col-md-12">

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

     )
  }
}
module.exports =  Wall;