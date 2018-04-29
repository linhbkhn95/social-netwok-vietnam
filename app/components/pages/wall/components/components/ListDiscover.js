import React from 'react'
import Post from 'app/utils/components/PostStatusAnDanh'
import axios from 'axios'
import 'react-select/dist/react-select.css'
var Select = require('react-select');
class ListDiscover extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            listStatus:[],
            options:[],
            subject:null
        }
    }
    componentDidMount(){
        let self  = this
        io.socket.get('/post/getListPost',function(resdata,jwres){
            console.log('listpost',resdata)
            if(resdata.EC==0)
                self.setState({listStatus:resdata.DT})
        }) 
        io.socket.on('post', function (event) {
          
           if (event.verb === 'created') {

               self.state.listStatus.unshift(event.data)
               self.setState({ listStatus: self.state.listStatus });
           }
       }); 
    }
    componentWillMount() {
        // var that = this;
      
        // io.socket.on('post', function (event) {
        //      console.log(event);
        //     // console.log('thêm bản ghi');
        //     if (event.verb === 'created') {

        //         that.state.listStatus.unshift(event.data)
        //         that.setState({ listStatus: that.state.listStatus });
        //     }
        // });
    }
    componentWillMount(){
        let self  = this
        io.socket.get('/subject/getall',((resdata,jwres)=>{
             console.log('ress',resdata)
             self.setState({options:resdata})
        }))
    }
    onChan
    async getlistSubject(input) {
       
       
        return {options:this.state.options}
      
    }
    onChangeSelect(subject) {
        let value= ''
        if(subject)
            value = subject.value
        this.setState({ subject });
        // this.props.onChange('subject',value)
	
    }
    render(){
        let ListStatus = this.state.listStatus.length>0?
         this.state.listStatus.map((status)=>{
             return <Post subject = {status.subject} key={status.id} idPost = {status.id} title={status.title} content={status.content} time={status.createdAt} />
         }):<div>Chưa có bài đăng nào</div>
        return(
            <div>
            <div style={{marginBottom:"20px"}} className="col-md-12">
                 <h5 className="col-md-5 row" ><i className="fa fa-tags" aria-hidden="true"></i> Chủ đề  tâm sự
                </h5>
                    <div className="" >
                    <Select.Async
                            name="form-field-name"
                            placeholder="Nhập chủ đề..."
                            loadOptions={this.getlistSubject.bind(this)}
                            value={this.state.subject}
                            options={this.state.options}
                            onChange={this.onChangeSelect.bind(this)}
                            cache={false}
                            multi
                            
                  />
                    </div>
            </div>
            <div className="col-md-12">
            
                {ListStatus}
            </div>
            </div>
        )
    }
}
module.exports = ListDiscover