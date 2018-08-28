import React, { Component } from 'react';
import './Background.css';
//kns97fe2HOA
class Background extends Component {
  render() {
    return (
      <div className="video-foreground">
        <iframe
          src="https://www.youtube.com/embed/bZCW9u2Ff2k?autoplay=1&loop=1&playlist=bZCW9u2Ff2k&mute=1&showinfo=0&controls=0&disablekb=1&modestbranding=1&iv_load_policy=3"
          allow="autoplay"
          allow="encrypted-media"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
        ></iframe>
      </div>
    );
  }
}

export default Background;
