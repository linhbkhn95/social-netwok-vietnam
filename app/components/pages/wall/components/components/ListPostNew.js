import React from 'react'
import Post from 'app/utils/components/Post'
import Infinite  from 'react-infinite'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
class ListItem extends React.Component{
  render () {
      return <div className="infinite-list-item">
      List Item {this.props.num}
      </div>;
  }
}
class ListPostNew extends React.Component{
    constructor(props){
        super(props)
        this.state={
              toggle:true,
              showModalPost:false,
              onBlur:false,
              elements: this.buildElements(0, 20),
            isInfiniteLoading: false
        }
  }
    buildElements(start,end){
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<ListItem key={i} num={i}/>)
        }
        return elements;
    }
    
    handleInfiniteLoad(){
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 1000);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
    }
    
    elementInfiniteLoad(){
        return <div className="infinite-list-item">
            Loading...
        </div>;
    }
    render(){
        return(
            <div className="col-md-12">
                <Post />
                {/* <Infinite elementHeight={40}
                         containerHeight={250}
                         infiniteLoadBeginEdgeOffset={200}
                         onInfiniteLoad={this.handleInfiniteLoad}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
                          {this.state.elements}
        </Infinite> */}
            </div>
        )
    }
}
module.exports = ListPostNew