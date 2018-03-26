import React from 'react'
import Post from 'app/utils/components/PostStatusAnDanh'
import axios from 'axios'
class ListDiscover extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            listStatus:[]
        }
    }
    componentDidMount(){
        let self  = this
        axios.get('/post/getListPost').then(function(resdata,jwres){
            self.setState({listStatus:resdata.data.DT})
        })  
    }
    render(){
        let ListStatus = this.state.listStatus.length>0?
         this.state.listStatus.map((status)=>{
             return <Post title={status.title} content={status.content} time={status.createdAt} />
         }):<div>Chưa có bài đăng nào</div>
        return(
            <div className="col-md-12">
                {ListStatus}
            </div>
        )
    }
}
module.exports = ListDiscover