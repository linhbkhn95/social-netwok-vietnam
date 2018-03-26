import React from 'react';

import Toggle from 'react-toggle'
import "react-toggle/style.css"
import 'react-select/dist/react-select.css'
var Select = require('react-select');
class ContentQuestion extends React.Component{
    constructor(props){
        super(props)
        this.state={
              toggle:true,
              options: [
				{ value: true, label: 'Trịnh đức Bảo Linh' },
                { value: false, label: 'Nguyễn thị Xuân' },
                { value: false, label: 'Hà Đăng Dương' },
                { value: false, label: 'Nguyễn Đức Tài' },
                { value: false, label: 'Ngô quang Hải' },
                { value: false, label: 'Trịnh Đức Giang' }
			],
			value: null
        }
    }
    onChange(event){
        if(event.target.checked){
              this.setState({toggle:true})
        }
        else
               this.setState({toggle:false})
    }
  
	 onChangeSelect(value) {
		this.setState({ value });
		console.log('Boolean Select value changed to', value);
    }
    async  getOptionsSession(input) {
       
       
        return {options:this.state.options}
      
    }
    render(){
    
      return (
        
               <div className="content-question">
               
                <div className="row">
                  <div className="col-md-12">
                    <textarea className="form-control" placeholder="Bạn đang nghĩ gì, Bản muốn hỏi gì..." rows="5" id="comment"></textarea>
                  </div>
                </div>
                <div>
              <div className="row">
                <div className=" col-md-12" >
                     <Toggle
                        defaultChecked={this.state.toggle}
                        
                        onChange={this.onChange.bind(this)} /> 
                        < i className="text-toggle">Tâm sự ẩn danh</i>
                   </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                    <div className="nember-men">
                        <div>
                            Chọn bạn bè (0/50)
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                  
                        {/* <input type="text" name="search" placeholder="Tìm kiếm bạn bè.."/> */}
                        <Select.Async
                            name="form-field-name"
                            disabled={this.state.ISEDIT}
                            placeholder="Nhập tên bạn bè..."
                            loadOptions={this.getOptionsSession.bind(this)}
                            value={this.state.value}
                            options={this.state.options}
                            onChange={this.onChangeSelect.bind(this)}
                            cache={false}
                            multi
                  />
                
                </div>
                <div className="col-md-12">
                    <div list >
                    </div>
                </div>
              </div>
              </div>

          
      );
    }
  };
  
  module.exports = ContentQuestion;