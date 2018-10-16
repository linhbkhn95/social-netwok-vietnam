import React from "react";
import { NavLink } from "react-router-dom";

import HeaderPost from "./HeaderPost";
import ListPost from "./ListPost";
import moment from "moment";
import axios from "axios";
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        user: {}
      },
      listImage:[
        {}
      ]
    };
  }
  componentDidMount() {
    let username = this.props.username;
    let sefl = this;
    if (username) {
      axios.post("/user/getInfo", { username }).then(res => {
        if (res.data.EC == 0) {
          sefl.setState({ info: res.data.DT });
        }
      });
    }
  }
  componentWillMount(){
    let username = this.props.username
    let sefl = this
    if(username){
        axios.post('/fileupload/getlist_file_with_user',{username})
        .then((res)=>{
            if(res.data.EC==0){
                sefl.setState({listImage:res.data.DT})
            }
        })
    }
  }
  render() {
    let { info,listImage } = this.state;
    return (
      <div className="fixMenu">
        <div className="left-list">
          <h3 className="text-box">Giới thiệu</h3>
          <div className="text-info">
                          Vui vẻ hoàn đồng
          </div>
          <table className="table table-reflow">
            <tbody>
              <tr>
                <td>
                  <span className="color-title">
                    <i className="fa fa-shopping-bag" /> Bài đăng
                  </span>
                </td>
                <td>
                  <span className="total_product">{info.countPost} </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="color-title">
                    <i className="fa fa-users" /> Người theo dõi
                  </span>
                </td>
                <td>
                  <span className="total_product">{info.countFollow} </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="color-title">
                    <i className="fa fa-calendar" /> Tham gia
                  </span>
                </td>
                <td>
                  <span className="total_product">
                    {moment(info.user.createdAt)
                      .lang("vi")
                      .fromNow()}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="color-title">
                    <i className="fa fa-location-arrow" />
                    Quê quán
                  </span>
                </td>
                <td>
                  <span className="total_product"> {info.user.address}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="color-title">
                    <i className="fa fa-check-circle" /> Tình trạng
                  </span>
                </td>
                <td>
                  <span className="total_product">Online </span>
                </td>
              </tr>
              <tr className="visible-xs">
                <td>
                  <span className="color-title">
                    <i className="fa fa-info-circle" /> Status
                  </span>
                </td>
                <td />
              </tr>
              <tr className="visible-xs">
                <td colSpan="2">
                  <span className="status">Vui vẻ, hòa đồng... </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="col-md-12 remove-padding-col">
              <div className="col-md-12 remove-padding-col"><span className="color-title"><i style={{marginRight:"5px"}} className="fa fa-picture-o" aria-hidden="true"></i>Ảnh gần đây chia sẻ</span></div>
              <div className="col-md-12 remove-padding-col">
                   <div style={{paddingTop:"10px"}} className="col-md-12 remove-padding-col">
                              {listImage.map((item,index)=>{
                                  let urlBackgroup = 'url('+item.url_file+')';
                                  return(
                                    <div style={{padding:"2px"}} className="col-md-6 col-xs-6 img-post item-friend ">
                                            <img style={{    height: '117px'}} title={item.title} src={item.url_file} />

                                    </div>


                                  )
                              })}

                    </div>
              </div>
          </div>

        </div>


      </div>
    );
  }
}
module.exports = Info;
