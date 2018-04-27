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
        io.socket.get('/post/getListPost',function(resdata,jwres){
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
    render(){
        let ListStatus = this.state.listStatus.length>0?
         this.state.listStatus.map((status)=>{
             return <Post idPost = {status.id} title={status.title} content={status.content} time={status.createdAt} />
         }):<div>Chưa có bài đăng nào</div>
        return(
            <div className="col-md-12">
                {ListStatus}
            </div>
        )
    }
}
module.exports = ListDiscover