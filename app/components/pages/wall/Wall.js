import React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderPost from './components/HeaderPost'
import ListPost from './components/ListPost'
import LeftWall from './components/LeftWall'
import ListCanFriend from './components/ListCanFriend'
import ListGroupRecommend from './components/ListGroupInteresting'
class Wall extends React.Component{

  render(){
     return(

        <div className="col-md-12 remove-padding-col" >
             <div className="col-md-2 remove-padding-col" >
                  <LeftWall />
               </div>
             <div className="col-md-6 remove-padiing-col" >
                 <HeaderPost />
                 <ListPost  />
              </div>
              <div className="col-md-4 remove-padding-col">
                <ListCanFriend />
                <ListGroupRecommend />
              </div>
        </div>
     )
  }
}
module.exports =  Wall;
