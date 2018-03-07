import React from 'react';
import {NavLink} from 'react-router-dom'
class HeaderListPost extends React.Component{
    render(){
        return(
             <section className="header-listpost">
                   <div className="col-md-12">
                        <ul className="tab-header-list-post  ">
                          
                            <li  data-target="step-4" className="active">
                                <NavLink to="/new">
                                    <span className="number">Mới nhất</span>
                                </NavLink>
                            </li>
                            <li data-target="step-5" className="">
                                     <NavLink to="/new">
                                        <span style={{color:"#afaaaa"}} className="number">Khám phá</span>
                                    </NavLink>
                               
                            </li>
                        </ul>
                     </div>
                  
            </section>
        )
    }
}
module.exports = HeaderListPost;