import React from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        user: {}
      }
    };
  }
  componentDidMount() {}
  render() {
    let { info } = this.state;
    return (
      <div className="col-md-11">
        <div className="group-relative">
          <div className="header">
            <div className="title-group-relative">Nhóm được đề xuất</div>
            <div>
              <div className="group-item">
                <div style={{    height: '158px'}} className="img-cover">
                  <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" />
                </div>
                <div className="content">
                  <div className="info-group">
                    <div className="name-group">BK2.03</div>
                    <div className="number-member">41,7123 thành viên</div>
                  </div>
                  <div className="btn-join">
                    <i className="fa fa-plus" aria-hidden="true" />
                    Tham gia
                  </div>
                </div>
              </div>
              <div className="group-item">
                <div style={{    height: '158px'}} className="img-cover">
                  <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" />
                </div>
                <div className="content">
                  <div className="info-group">
                    <div className="name-group">Hội cuồng phim con heo</div>
                    <div className="number-member">1,100 thành viên</div>
                  </div>
                  <div className="btn-join">
                    <i className="fa fa-plus" aria-hidden="true" />
                    Tham gia
                  </div>
                </div>
              </div>
              <div className="group-item">
                <div style={{    height: '158px'}} className="img-cover">
                  <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/p200x200/11034230_782381971883799_4069893463521274151_n.jpg?_nc_cat=110&oh=ee0b8d68090129fa92c21ccd42a73be0&oe=5C4CC744" />
                </div>
                <div className="content">
                  <div className="info-group">
                    <div className="name-group">Haivl.com</div>
                    <div className="number-member">500,233 thành viên</div>
                  </div>
                  <div className="btn-join">
                    <i className="fa fa-plus" aria-hidden="true" />
                    Tham gia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Info;
