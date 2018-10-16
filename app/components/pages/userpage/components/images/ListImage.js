import  React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
class ListImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            listImage:[
                {
                    src:'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-0/p417x417/29513187_2028389617373934_236160232933059331_n.jpg?_nc_cat=0&oh=6ce758473890becaa715d397bb5f5abd&oe=5B284CC1',
                    tile:''
                }
            ]
        }
    }
    componentDidMount(){
      let username = this.props.username
      let sefl = this
      if(username){
          axios.post('/fileupload/getlist_file_with_user',{username})
          .then((res)=>{
              if(res.data.EC==0){
                  sefl.setState({listImage:res.data.DT})
              }
          })
      }
    }
    render() {
        let {listImage} = this.state
        return (
            <div  className="col-md-12">
                     <div style={{background:"white",    padding: "10px"}} className="col-md-12 ">
                            <div className="head col-md-12">
                                <div  style={{fontSize:"20px",fontWeight:"bold"}} className="pull-left">
                                    <i style={{marginRight:"10px"}} className="fa fa-users" aria-hidden="true"></i>
                                   Ảnh
                                </div>
                                <div >
                                </div>
                            </div>
                            <div style={{paddingTop:"10px"}} className="row col-md-12">
                              {listImage.map((item,index)=>{
                                  let urlBackgroup = 'url('+item.url_file+')';
                                  return(
                                    <div style={{padding:"2px"}} className="col-md-3 col-xs-6 img-post item-friend ">
                                            <img title={item.title} src={item.url_file} />

                                    </div>


                                  )
                              })}

                            </div>
                     </div>
            </div>
        );
    }
}

export default connect((state)=>{
  return{
      user:state.auth.user
  }
})
(ListImage);
