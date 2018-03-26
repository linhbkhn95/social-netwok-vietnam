import React from 'react';
import {Link} from 'react-router-dom'
class HeaderListPost extends React.Component{
    render(){
        return(
           
             <section className="header-listpost">
                   <div className="">
                        <ul className="tab-header-list-post  ">
                          
                            <li  data-target="step-4" className="">
                                <Link to="/userpage/newpost">
                                    <span className="number">Mới nhất</span>
                                </Link>
                            </li>
                            <li data-target="step-5" className="">
                                     <Link to="/userpage/discover">
                                        <span className="number">Tâm sự ẩn danh</span>
                                    </Link>
                               
                            </li>
                        </ul>
                     </div>
                  
            </section>
        )
    }
}
module.exports = HeaderListPost;