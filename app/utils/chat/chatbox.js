var HeaderChatBox =React.createClass({
	closeChatBox(e){

				e.preventDefault();
				console.log("đóng tab chat này nhé  " + this.props.username );

				this.props.closeChatBox(this.props.username);
	},
			render(){
				 return(

					  React.DOM.div ({className:"panel-heading top-bar"},
							  React.DOM.div({className:"col-md-8 col-xs-8 head-name-chatbox"},


							   React.DOM.h3( {className:"panel-title name-chatbox"}, React.DOM.a({href:"#user/"+this.props.username},React.DOM.span({ className:"glyphicon "}),this.props.username))),

							   React.DOM.div({className:" head-icon-close-open-chatbox"},
									  React.DOM.a(null,  React.DOM.span({ id:"minim_chat_window",className:"glyphicon glyphicon-minus icon_minim icon-close-open"})),
							  React.DOM.a({onClick:this.closeChatBox},  React.DOM.span({className:"glyphicon glyphicon-remove icon-close-open icon_close",id:"chat_window_1"}))
						)
				)
			 );
			}
});

var BodyChatChatBox = React.createClass({
	render(){
			return(
				  React.DOM.div({ className:"panel-body msg_container_base"},

                ListMessageChatBox({messages:this.props.messages,me:this.props.me})
           )
				 )



	}
});

var FooterChatBox = React.createClass({
	getInitialState(){
			return{
					text:' '

			}
	},
	componentWillMount: function(){
    this.channel = postal.channel();
  },
	getTimeMsg() {
		var objToday = new Date(),
				weekday = new Array('Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'),
				dayOfWeek = weekday[objToday.getDay()],
				domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "ngày"; a = parseInt((a + "").charAt(1)); return 1 == a ? "ngày " : 2 == a ? "ngày" : 3 == a ? "ngày" : "ngày" }(),
				dayOfMonth =domEnder + today  + ( domEnder + objToday.getDate() < 10) ? '0' + objToday.getDate()  : objToday.getDate()  ,
				months = new Array(' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9', ' 10', ' 11', ' 12'),
				curMonth = months[objToday.getMonth()],
				curYear = objToday.getFullYear(),
				curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
				curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
				curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
				curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
				var today = curHour + ":" + curMinute + " " +curMeridiem   +" " + dayOfMonth + " - " + curMonth + " - " + curYear;
		return today;
	},
	onKey(e) {
		this.setState({ text : e.target.value });
	},
	handleSubmit(e) {
		console.log('vào gửi')
		e.preventDefault();
		var message = {
			user : 'linh',
			text : this.state.text,
			timemsg : this.getTimeMsg()

		}
		this.props.onMessageSubmit(message);

		this.setState({ text: ' ' });
	},
	sendMessage(){
	//  e.preventDefault();
		var message = {
			user : this.props.me,
			text : this.state.text,
			timemsg : this.getTimeMsg()

		}
		console.log(message);
		this.props.onMessageSubmit(message);
    this.channel.publish('ChatBox'+this.props.username+'.Add', message);
		//var objDiv = document.getElementById("body-chat");

		this.setState({ text: ' ' });
	},
	changeHandler(e){
		this.setState({ text : e.target.value });
	},
		render(){
				return(

					  React.DOM.div({className:"panel-footer"},

									  React.DOM.div({className:"input-group"},
										  React.DOM.form({ onSubmit:this.handleSubmit},
										  React.DOM.input({onChange:this.changeHandler,
											value:this.state.text, type:"text", id:"btn-input", className:"form-control input-sm chat_input",placeholder:"Nhập tin nhắn để gửi...."})),


													  React.DOM.span({className:"input-group-btn"},
														  React.DOM.button({ id:"btn-chat" ,onChange :this.onKey, onClick:this.sendMessage,className:"btn btn-primary btn-sm"},'Gửi tin'))

												)

					)

				)
		}
});


var ChatBox_Demo =React.createClass({
		// closeChatBox(e){
		//
		// 			e.preventDefault();
		// 			console.log("đóng tab chat này nhé  " + this.props.username );
		//
		// 			this.props.closeChatBox(this.props.username);
		// },
		componentWillMount: function(){
			var channel = postal.channel();
			this._boundForceUpdate = this.forceUpdate.bind(this, null);
	    this.props.messages.on('add change remove', this._boundForceUpdate, this);
			this.chatBoxSub = channel.subscribe('ChatBox'+this.props.username +'.Add', this.chatBoxAdd);
		},
		componentWillUnmount: function() {
			this.props.messages.off("add change remove", this._boundForceUpdate);
			//this.props.users.off("add change remove", this._boundForceUpdate);
			this.chatBoxSub.unsubscribe();
		},
		chatBoxAdd: function(data){
	    console.log(data)
	    this.props.messages.sync('create', {message: data.text, user_recevice: data.username});
	  },
		onMessageSubmit(data){
				data.username = this.props.username;
				this.props.onMessageSubmit(data);
		},
		render: function(){
				var styles ={
							right : this.props.right,
							display: this.props.display
				};
				return(
					   React.DOM.div({ style:styles, className:"row chat-window col-xs-5 col-md-3", id:this.props.username},
						   React.DOM.div({ className:"col-xs-12 col-md-12"},
							   React.DOM.div({ className:"panel panel-default"},
								HeaderChatBox({closeChatBox : this.props.closeChatBox, username:this.props.username}),

						  	BodyChatChatBox({messages:this.props.messages,me:this.props.me}),


								FooterChatBox({me:this.props.me,username:this.props.username,onMessageSubmit:this.onMessageSubmit})


					)))
				);
		}
});
var ListChatBox = React.createClass({

		getInitialState(){
			return{
					listStyle:[227,497,767,1037],
					names:this.props.names

			}
		},

		render(){


								return(

								 React.DOM.div(null,

										this.state.names.map((name, index) => {
											return ChatBox_Demo({me:this.props.me,onMessageSubmit:this.props.onMessageSubmit,messages:name.messages, display:name.display,closeChatBox:this.props.closeChatBox, username:name.username, right:this.state.listStyle[index],key:index})



										})

								)
							);






		}


});


var TabChatBox = React.createClass({
  getInitialState() {
    return {

      listchat:this.props.listchat,

      text: ' ',
      timemsg:''

    };
  },
  closeChatBox(data){

  },

  handleAccess(data){



   },

   _messageRecieveChatBox(data){



   },
   onMessageSubmitChatBox(data){

   },
  render(){
             console.log(this.props.me);

             return(

              React.DOM.div(null,
            ListChatBox({ me:this.props.me ,onMessageSubmit:this.onMessageSubmitChatBox,closeChatBox:this.closeChatBox,names:this.state.listchat})
          )
        )
}
});
