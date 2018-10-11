import React, { Component } from "react";

class ListImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listImage: [
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        },
        {
          src:
            "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-0/s261x260/43050727_1523581307741458_1821107880586117120_n.jpg?_nc_cat=102&oh=885f4e0cc46daba3244e9a8a3b586a3c&oe=5C557EC1",
          tile: "aaa"
        }
      ]
    };
  }
  render() {
    let { listImage } = this.state;
    return (
      <div className="page-image">
        <div style={{ background: "white" }} className="">
          <div className="header">
            <div className="title">Ảnh</div>
          </div>

          <div className="list-image">
            {listImage.map((item, index) => {
              let urlBackgroup = "url(" + item.src + ")";
              return (
                <div
                  style={{ padding: "2px" }}
                  className="col-md-3 col-xs-6 item-image "
                >
                  <img className="" src={item.src} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ListImage;
