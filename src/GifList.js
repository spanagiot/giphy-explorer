import React from 'react';
import GifElement from './GifElement';
import './GifList.css';

class GifList extends React.Component {
  render() {
    const deleteClicked = (key) => {
      this.props.onDeleteClicked(key);
    };
    if (!this.props.data) {
      return null;
    }
    const elementsToRender = this.props.data.map((x, i) => {
      return (
        <GifElement
          id={x.id}
          url={x.images.fixed_width_downsampled.url}
          width={x.images.fixed_width_downsampled.width}
          height={x.images.fixed_width_downsampled.height}
          title={x.title}
          key={x.id}
          onDeleteClicked={deleteClicked}
        ></GifElement>
      );
    });
    return <div className="gif-list">{elementsToRender}</div>;
  }
}

export default GifList;
