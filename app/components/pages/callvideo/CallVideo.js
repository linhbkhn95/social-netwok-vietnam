// import React from 'react'

// export default class MediaBridge extends React.Component {
//   static propTypes = {
//     socket: React.PropTypes.object.isRequired,
//     getUserMedia: React.PropTypes.object.isRequired,
//     media: React.PropTypes.func.isRequired
//   }
//   state = {
//     bridge: '',
//     user: ''
//   }
//   componentWillMount() {
//     // chrome polyfill for connection between the local device and a remote peer
//     window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
//   }
//   componentDidMount() {
//     navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true
//       }).then(stream => {
//         this.localStream = stream;
//         this.localVideo.src = window.URL.createObjectURL(stream);
//       }).catch(e => alert('getUserMedia() error: ' + e.name))



//   }
//   setupDataHandlers() {
//     this.dc.onmessage = e => {
//         var msg = JSON.parse(e.data);
//         console.log('received message over data channel:' + msg);
//     };
//     this.dc.onclose = () => {
//       this.remoteStream.getVideoTracks()[0].stop();
//       console.log('The Data Channel is Closed');
//     };
// }
//   init() {

//     // wait for local media to be ready
//     const attachMediaIfReady = () => {
//       this.dc = this.pc.createDataChannel('chat');
//       this.setupDataHandlers();
//       console.log('attachMediaIfReady')
//       this.pc.createOffer()
//         .then(this.setDescription)
//         .then(this.sendDescription)
//         .catch(this.handleError); // An error occurred, so handle the failure to connect
//     }
//     // set up the peer connection
//     // this is one of Google's public STUN servers
//     // make sure your offer/answer role does not change. If user A does a SLD
//     // with type=offer initially, it must do that during  the whole session
//     this.pc = new RTCPeerConnection({iceServers: [{url: 'stun:stun.l.google.com:19302'}]});
//     // when our browser gets a candidate, send it to the peer
//     this.pc.onicecandidate = e => {
//         console.log(e, 'onicecandidate');
//         if (e.candidate) {
//             this.props.socket.send({
//                 type: 'candidate',
//                 mlineindex: e.candidate.sdpMLineIndex,
//                 candidate: e.candidate.candidate
//             });
//         }
//     };
//     console.log('onaddstream')

//     this.pc.onaddstream = e => {
//         console.log('onaddstream', e)
//         this.remoteStream = e.stream;
//         this.remoteVideo.src = window.URL.createObjectURL(this.remoteStream);
//         this.setState({bridge: 'established'});
//     };
//     this.pc.ondatachannel = e => {
//         // data channel
//         this.dc = e.channel;
//         this.setupDataHandlers();
//         this.sendData({
//           peerMediaStream: {
//             video: this.localStream.getVideoTracks()[0].enabled
//           }
//         });
//         //sendData('hello');
//     };
//     // attach local media to the peer connection
//     this.pc.addStream(this.localStream);
//     // call if we were the last to connect (to increase
//     // chances that everything is set up properly at both ends)

//     navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true
//       }).then(attachMediaIfReady);

// }
//   render(){
//     return (
//       <div className={`media-bridge`}>
//               <button onClick={this.init.bind(this)} className="btn btn-primary">call</button>

//         <video className="remote-video" ref={(ref) => this.remoteVideo = ref} autoPlay></video>
//         <video className="local-video" ref={(ref) => this.localVideo = ref} autoPlay muted></video>
//       </div>
//     );
//   }
// }
// module.exports = MediaBridge
