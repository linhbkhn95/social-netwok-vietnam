import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './components/HeaderPost'
import ListPost from './components/ListPost'
import ListCanFriend from './components/ListCanFriend'
class Wall extends React.Component{
 
  render(){
     return(

        <div className="col-md-12 row" >
             <div className="col-md-7 row" >
                 <HeaderPost />
                 <ListPost  />
              </div>
              <div className="col-md-5 row">
                <ListCanFriend />
              </div>
        </div>
     )
  }
}
module.exports =  Wall;
