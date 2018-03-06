import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuCategory from './components/MenuCategory.js';
import SlideProduct from './components/SlideProduct.js';
import Slider from'react-slick';
import DetailProduct from 'app/utils/DetailProduct.js';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';

import HomePage from './components/HomePage.js';
import Category from './components/Category.js';

var Login = require('app/components/pages/login/Login.js');
class Home extends React.Component{
 
  render(){
    var that =this;
    return(
        <Router>
         
        
       </Router> 
    )
  }
}
module.exports =  Home;
