import React from 'react'

class ToastNotifi extends React.Component{
    render(){
        let notifi = this.props.notifi
        return(

            <div style={{borderBottom:"none"}} className=" alert-message">
                      <NavLink to={notifi.url_ref} > <div className="col-md-3 "><NavLink to={"/userpage."+notifi.user_notifi.username} ><img className="avatar-alert"  src={notifi.user_notifi.url_avatar} /></NavLink></div>
                                <div className="col-md-10 row">
                                <NavLink to={"/userpage."+notifi.user_notifi.username} >  <strong>{notifi.user_notifi.fullname}</strong></NavLink> {notifi.text +" bạn"}
                                    <br />
                                    <p className="time-alert">{moment(notifi.time).lang('vi').fromNow()}</p>
                                </div>
                                </NavLink>
                       </div>
        )
    }
}
module.exports = ToastNotifi