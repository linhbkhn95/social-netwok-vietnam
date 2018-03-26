import React from 'react';


class ContentAnDanh extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:''
        }
    }
    onChange(type,event){
        this.state[type]=event.target.value;
        this.setState(this.state);
        this.props.onChange(type,event.target.value)
    }
    render(){
    
      return (
        
               <div>
                <div className="row">
                    <h5 className="col-md-3" >Tiêu đề tâm sự <i className="fa fa-header" aria-hidden="true"></i></h5>
                    <div className="col-md-4" >
                        <input onChange={this.onChange.bind(this,'title')} value={this.state.title} type="text" className="form-control" />
                    </div>
                    
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <textarea onChange={this.onChange.bind(this,'content')} value={this.state.content} className="form-control" placeholder="Bạn đang nghĩ gì.." rows="5" id="comment"></textarea>
                  </div>
                </div>
              </div>

          
      );
    }
  };
  
  module.exports = ContentAnDanh;