import React from 'react'
import HeaderListPost from './components/HeaderListPost'
class Layout extends React.Component{
    render(){
        return(
            <div className="">
                <HeaderListPost />
                <div>
                    {this.props.children}
                </div>

            </div>
        )
    }
}
module.exports = Layout