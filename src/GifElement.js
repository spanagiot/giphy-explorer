import React from 'react';
import './GifElement.css';

class GifElement extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
    this.copyButtonRef = React.createRef();
  }

  render() {
    const deleteClicked = () => {
      this.props.onDeleteClicked(this.props.id);
    };
    const copyToClipboard = () => {
      navigator.clipboard.writeText(this.props.url);
      this.copyButtonRef.current.innerText = 'Link copied!';
      setTimeout(() => {
        this.copyButtonRef.current.innerText = 'Copy';
      }, 1000);
    };
    return (
      <div className="list-element flex">
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
        <div className="element-buttons flex">
          <button className="btn" onClick={deleteClicked}>
            Delete
          </button>
          <button
            className="btn"
            onClick={copyToClipboard}
            ref={this.copyButtonRef}
          >
            Copy
          </button>
        </div>
      </div>
    );
  }
}

export default GifElement;
