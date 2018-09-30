import React from 'react';
import {
  Player,BigPlayButton, ControlBar, PlaybackRateMenuButton
} from 'video-react';
import ReactPlayer from 'react-player'

export default (props) => {
  return (
    <Player
      autoPlay
      // playsInline
      // poster="/assets/poster.png"
      src="http://media.w3.org/2010/05/bunny/movie.mp4"
    >
          <BigPlayButton position="center" />

    </Player>
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
