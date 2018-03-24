import React from 'react';
import {NavLink} from 'react-router-dom'
class HeaderListPost extends React.Component{
    render(){
        return(
           
             <section className="header-listpost">
                   <div className="">
                        <ul className="tab-header-list-post  ">
                          
                            <li  data-target="step-4" className="">
                                <NavLink to="/wall/newpost">
                                    <span className="number">Mới nhất</span>
                                </NavLink>
                            </li>
                            <li data-target="step-5" className="">
                                     <NavLink to="/wall/discover">
                                        <span className="number">Tâm sự ẩn danh</span>
                                    </NavLink>
                               
                            </li>
                        </ul>
                     </div>
                  
            </section>
        )
    }
}
module.exports = HeaderListPost;