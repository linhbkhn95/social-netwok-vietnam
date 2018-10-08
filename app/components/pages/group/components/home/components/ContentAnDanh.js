import React from 'react';

import 'react-select/dist/react-select.css'
var Select = require('react-select');
class ContentAnDanh extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            content:'',
            options:[],
            subject:null
        }
    }
    componentDidMount(){
        let self  = this
        io.socket.get('/subject/getall',((resdata,jwres)=>{
             console.log('ress',resdata)
             self.setState({options:resdata})
        }))
    }
    onChange(type,event){
        this.state[type]=event.target.value;
        this.setState(this.state);
        this.props.onChange(type,event.target.value)
    }
    async getlistSubject(input) {
       
       
        return {options:this.state.options}
      
    }
    onChangeSelect(subject) {
        let value= ''
        if(subject)
            value = subject.value
        this.setState({ subject });
        this.props.onChange('subject',value)
	
    }
    render(){
    
      return (
        
               <div>
                 <div className="row"> 
                    <h5 className="col-md-3" ><i className="fa fa-tags" aria-hidden="true"></i> Chủ đề  tâm sự
</h5>
                    <div className="col-md-4" >
                    <Select.Async
                            name="form-field-name"
                            placeholder="Nhập chủ đề..."
                            loadOptions={this.getlistSubject.bind(this)}
                            value={this.state.subject}
                            options={this.state.options}
                            onChange={this.onChangeSelect.bind(this)}
                            cache={false}
                            
                  />
                    </div>
                    
                </div>
                <div className="row">
                    <h5 className="col-md-3" ><i className="fa fa-header" aria-hidden="true"></i>Tiêu đề tâm sự </h5>
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