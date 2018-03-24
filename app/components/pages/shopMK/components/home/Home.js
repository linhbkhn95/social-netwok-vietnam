import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './HeaderPost'
import ListPost from './ListPost'

class Wall extends React.Component{
 
  render(){
     return(

        <div className="" >
            
                 <HeaderPost />
                 <ListPost />
             
        </div>
     )
  }
}
module.exports =  Wall;
