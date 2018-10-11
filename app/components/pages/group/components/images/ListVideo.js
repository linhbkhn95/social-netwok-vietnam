import React, { Component } from "react";
import ComponentVideo from 'app/utils/components/ComponentVideo'

class ListImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listImage: [
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
          tile: "aaa"
        },
        {
          src:
            "/images/upload/8e4eb033-5283-40c8-9328-05b0bb17e4fd.MOV",
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
            <div className="title">Video</div>
          </div>

          <div className="list-video">
            {listImage.map((item, index) => {
              let urlBackgroup = "url(" + item.src + ")";
              return (
                <div
                  style={{ padding: "2px" }}
                  className="col-md-3 col-xs-6 item-video "
                >
                 <ComponentVideo src={item.src} />
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
