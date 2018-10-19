import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Gravatar from 'react-gravatar';

const USERS =[
{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' },
{ value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' },
{ value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }]
const GRAVATAR_SIZE = 15;

const stringOrNode = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.node,
]);

const GravatarOption = createClass({
	propTypes: {
		children: PropTypes.node,
		className: PropTypes.string,
		isDisabled: PropTypes.bool,
		isFocused: PropTypes.bool,
		isSelected: PropTypes.bool,
		onFocus: PropTypes.func,
		onSelect: PropTypes.func,
		option: PropTypes.object.isRequired,
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	render () {
		let gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
      verticalAlign: 'middle',
      width:'36px',
      height:'36px',
    };
    console.log('props',this.props)
		return (
			<div className={this.props.className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
        					<img src={this.props.option.url_avatar} style={gravatarStyle} />

				{/* <Gravatar email={this.props.option.email} size={GRAVATAR_SIZE} style={gravatarStyle} /> */}
				{this.props.children}
			</div>
		);
	}
});

const GravatarValue = createClass({
	propTypes: {
		children: PropTypes.node,
		placeholder: stringOrNode,
		value: PropTypes.object
	},
	render () {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					{/* <img src={this.props.value.url_avatar} style={gravatarStyle} /> */}
					{this.props.children}
				</span>
			</div>
		);
	}
});

const UsersField = createClass({
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string,
  },
  componentDidMount(){
    let sefl = this
    const {urlApi} = this.props;
    io.socket.post(urlApi,{},
    ((resdata)=>{
        if(resdata.EC==0){
           console.log('list.frdâdadadainffff',resdata)
            sefl.setState({options:resdata.DT})
        }
    }))
  },
  async getlist_option(input) {


    return {options:this.state.options}

},
  convertToOption(data) {
    let {
      optionValue,
      optionLabel,
      optionLabelAtribute,
      classNameOption,
    } = this.props;
    return data.map(item => {
      return {
        label:
          item[optionLabelAtribute] && item[optionLabelAtribute] != "null"
            ? item[optionLabel] + " - " + item[optionLabelAtribute]
            : item[optionLabel],
        value: item[optionValue],
        data: item,
        className: classNameOption,
      };
    });
  },

	getInitialState () {
		return {
      options:[]
    };
	},
	setValue (value) {
    console.log('setvaue',value)
    this.setState({ value });
    this.props.onChangeValue(this.props.type,value)
	},
	render () {
  var placeholder = <span>&#9786; {this.props.placeholder}</span>;

		return (
				<Select
					arrowRenderer={arrowRenderer}
					onChange={this.setValue.bind(this)}
					optionComponent={GravatarOption}
					options={this.state.options}
					placeholder={placeholder}
					value={this.state.value}
          loadOptions={this.getlist_option.bind(this)}

					// valueComponent={GravatarValue}
          {...this.props}
          clearable

          cache={false}
					/>

		);
	}
});

function arrowRenderer () {
	return (
		<span>+</span>
	);
}

module.exports = UsersField;
