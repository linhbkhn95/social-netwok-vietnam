import React from 'react'
import Post from 'app/utils/components/PostStatusAnDanh'
import axios from 'axios'
import 'react-select/dist/react-select.css'
import { create } from 'domain';
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
        io.socket.post('/post/getListPost',function(resdata,jwres){
            console.log('listpost',resdata)
            if(resdata.EC==0)
                self.setState({listStatus:resdata.DT})
        }) 
        io.socket.on('post', function (event) {
            console.log('event',event)
            switch(event.verb){
                case 'created' :{
                    self.state.listStatus.unshift(event.data)
                    self.setState({ listStatus: self.state.listStatus });
                    break 
                }
               
            }
      
       }); 
    }
    deletePost(data){
        console.log('datadel',data)
        for(var i=0;i<this.state.listStatus.length-1;i++){
            if(this.state.listStatus[i].id==data.id){
                 this.state.listStatus.splice(i,1);
                 this.setState({listStatus:this.state.listStatus})
                break;
            }
        }
        
    }
    componentWillMount(){
        let self  = this
        io.socket.get('/notification/follow', function gotResponse(data, jwRes) {
            console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
          
          });
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
       
        this.setState({ subject });
        let self  = this
        io.socket.post('/post/getListPost',{listsubject:subject},((resdata,jwres)=>{
            console.log('listpost',resdata)
            if(resdata.EC==0)
                self.setState({listStatus:resdata.DT})
        }))
	
    }
    render(){
        let ListStatus = this.state.listStatus.length>0?
         this.state.listStatus.map((status)=>{
             return <Post deletePost={this.deletePost.bind(this)} subject = {status.subject} key={status.id} idPost = {status.id} title={status.title} content={status.content} time={status.createdAt} />
         }):<div>Chưa có bài đăng nào</div>
        return(
            <div>
            <div style={{marginBottom:"20px"}} className="col-md-12">
                 <h5 className="title-subject" ><i className="fa fa-tags" aria-hidden="true"></i> Chủ đề  tâm sự <span className="count-subject"> {this.state.options.length}</span>
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