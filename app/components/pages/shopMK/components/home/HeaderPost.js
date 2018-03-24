import React from 'react';
import {NavLink} from 'react-router-dom';

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import ModalPost from './components/ModalPost'
class HeaderPost extends React.Component{
  constructor(props){
        super(props)
        this.state={
              toggle:true,
              showModalPost:false,
              onBlur:false
        }
  }
  onChange(event){
      if(event.target.checked){
            this.setState({toggle:true})
      }
      else
             this.setState({toggle:false})
  }
  showModalPost(){
   
             this.setState({showModalPost:true})
      
  }
  closeModal(){
       this.setState({showModalPost:false})

  }
  onFocus(){
      this.setState({showModalPost:true})
  }
  onBlur(){
    
      this.setState({onBlur:true})

  }
  access(){
    this.setState({showModalPost:false})

  }
  render(){
        
     return(

        <div className="col-md-12 post-wall " >
             <div className="col-md-8 hearder-post" >
                     <div className="question" >
                         <i className="fa fa-question" aria-hidden="true"></i> Câu hỏi

                     </div>
                     <div className="vote" >
                        <i className="fa fa-star" aria-hidden="true"></i> Bình chọn ảnh
                        </div>
                     {/* <div>
                     </div>      */}
              </div>

              <div className="col-md-12 input-post">
                   <input  placeholder="Bạn đang nghĩ gì ?"   className="form-control" type="text" />
              </div>     
              
              <div className="col-md-12">
                   <div className="post-toggle" >
                     <Toggle
                        defaultChecked={this.state.toggle}
                        
                        onChange={this.onChange.bind(this)} /> 
                        < i className="text-toggle">Tâm sự ẩn danh</i>
                   </div>
                   <div onClick={this.showModalPost.bind(this)} className="btn-post">
                           <i  className="fa fa-paper-plane" aria-hidden="true"></i> Đăng
                   </div>

              </div>
              <ModalPost access={this.access.bind(this)} show={this.state.showModalPost} onHide={this.closeModal.bind(this)} />
        </div>
     )
  }
}
module.exports =  HeaderPost;
