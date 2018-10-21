import React from "react";
import RestfulUtils from "../RestfulUtils";
import {
  NavDropdown,
  Navbar,
  NavItem,
  Nav,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  MenuItem
} from "react-bootstrap";
import PropTypes from 'prop-types';

class SelectPolice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listPolice:[],
      targetPolice:null
    }
  }
  componentDidMount() {
    let self = this
    RestfulUtils.post("/feel_post/getlist_option_police_post", {}).then(
      respone => {
          if(respone.EC==0&&respone.DT.length>0){
            this.props.onChange(respone.DT[0])
            self.setState({listPolice:respone.DT,targetPolice:respone.DT[0]})
          }


      }
    );
  }
  componentWillReceiveProps(nextProps){

  }
  select(police){
      this.setState({targetPolice:police})
      this.props.onChange(police)
  }
  render() {
    let self = this
    let {listPolice,targetPolice} = this.state;
    return (
      <Dropdown id="dropdown-custom-1">
        <Dropdown.Toggle>
          {/* <i className="fas fa-globe-asia"></i> */}
          <img
            style={{
              float: "left",
              marginRight: "5px"
            }}
            className="icon-plice-image"
            src={targetPolice?targetPolice.url_image:''}
          />
          {targetPolice?targetPolice.policename:''}
        </Dropdown.Toggle>
        <Dropdown.Menu >
           {
             listPolice.map((police,index)=>{
               return(
                <MenuItem onClick={self.select.bind(this,police)} key={index} eventKey={index}>

                {/* <i className="fas fa-globe-asia"></i> */}
                <div className="icon-police-post">
                  <img src={police.url_image} />
                </div>
                {police.policename}
              </MenuItem>
               )
             })
           }

        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
SelectPolice.propTypes = {
  onChange: PropTypes.func
};
SelectPolice.defaultProps = {
  onChange: ()=>{}
};
module.exports = SelectPolice;
