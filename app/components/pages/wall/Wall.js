import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './components/HeaderPost'


class Wall extends React.Component{
 
  render(){
     return(

        <div className="col-md-12" >
             <div className="col-md-8" >
                 <HeaderPost />
              </div>
        </div>
     )
  }
}
module.exports =  Wall;
