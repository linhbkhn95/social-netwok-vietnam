import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './components/HeaderPost'
import ListPost from './components/ListPost'

class Wall extends React.Component{
 
  render(){
     return(

        <div className="col-md-12" >
             <div className="col-md-8" >
                 <HeaderPost />
                 <ListPost />
              </div>
        </div>
     )
  }
}
module.exports =  Wall;
