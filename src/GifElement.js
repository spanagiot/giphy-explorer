import React from 'react';
import './GifElement.css';

class GifElement extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  render() {
    return (
      <>
        <img
          src={this.props.url}
          frameBorder="0"
          className="giphy-embed responsive-image"
          allowFullScreen
          alt={this.props.title}
          height={this.props.height}
          width={this.props.width}
          ref={this.imgRef}
          loading="lazy"
        ></img>
      </>
    );
  }
}

export default GifElement;
