 var redux = require('redux');
 import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux'
 var reducer = require('app/reducer/reducer.js');
 //import thunk from 'redux-thunk';
 redux.applyMiddleware(thunk)
  //var store = redux.createStore(reducer);
  const initialState = { 
    settings:{
      backgroupNav:"#00bcd4",
      backgroupSlideMenu:"White",
      backgroupBody:"White",
      colorNav:"white",
      nameHeader:"WebAssitant"
 }
 
  };
  var store = redux.createStore(reducer,
    redux.compose(
      applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension(): f => f
  ));
  module.exports = store;
