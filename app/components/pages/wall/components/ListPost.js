import React from 'react';
import {NavLink} from 'react-router-dom';
import ListPostNew from './components/ListPostNew'
import HeaderListPost from './components/HeaderListPost'
class ListPost extends React.Component{
  constructor(props){
        super(props)
        this.state={
              toggle:true
        }
  }
  onChange(event){
      if(event.target.checked){
            this.setState({toggle:true})
      }
      else
             this.setState({toggle:false})
  }
  render(){
     return(

        <div className="col-md-12 list-post " >
             <HeaderListPost />
             <ListPostNew />
        </div>
     )
  }
}
module.exports =  ListPost;
