import React, { Component } from "react";

class Gif extends Component {
  //when our video has loaded we add a loaded classname
  // otherwise the video stays hidden
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  render() {
    const {images} = this.props
    const {loaded} = this.state
    return (
      <video
        //when we have the loaded state as true, we add a loaded class
        className={`grid-item video ${loaded && 'loaded'}`}
        autoPlay
        src={images.original.mp4}
        loop
        //when the video loads, we set the loaded state to be true
        onLoadedData={() => this.setState({loaded: true})}
      />
    );
  }
}

export default Gif;