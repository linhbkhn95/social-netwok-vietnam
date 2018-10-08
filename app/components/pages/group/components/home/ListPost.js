import React from 'react';
import {NavLink,Route} from 'react-router-dom';
import ListPostNew from './components/ListPostNew'
import ListDiscover from './components/ListDiscover'
import HeaderListPost from './components/HeaderListPost'
import Layout from './Layout'
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
             <Layout>
                            {/* <Route exact path="/user_shop/manager" render={() => (
                                    <h3>Please select a topic.</h3>
                                    )}/> */}
                              <Route exact path="/userpage" component={ListPostNew} />
                              <Route  path="/userpage/discover" component={ListDiscover} />
                            
                                 
                        
             </Layout>
             {/* <ListPostNew /> */}
        </div>
     )
  }
}
module.exports =  ListPost;
