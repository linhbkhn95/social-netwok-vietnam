import React from 'react';
import {
  Player,BigPlayButton, VolumeMenuButton,ReplayControl, ControlBar, PlaybackRateMenuButton
} from 'video-react';
import ReactPlayer from 'react-player'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import DownloadButton from './DownloadButton';

export default (props) => {
  return (
    // <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
  <Player src={props.src} playsInline fluid={false} width={'100%'} height={'100%'}>
      <BigPlayButton position="center" />


    </Player>
  // <Player
  //     src="http://media.w3.org/2010/05/bunny/movie.mp4"
  //     autoPlay
  //   >
  //     <ControlBar autoHide={false}>
  //       <DownloadButton order={7} />
  //     </ControlBar>
  //   </Player>
  //   <div className='player-wrapper'>
  //   <ReactPlayer
  //     className='react-player'
  //     url={props.src}
  //     width='100%'
  //     height='100%'
  //     playing
  //   />
  // </div>  );
  )
};
