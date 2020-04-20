import React from 'react';
import GifElement from './GifElement';
import './GifList.css';

class GifList extends React.Component {
  render() {
    const elementsToRender = this.props.data.map((x, i) => {
      return (
        <div className="list-element" key={x.id}>
          <GifElement
            url={x.images.fixed_width_downsampled.url}
            width={x.images.fixed_width_downsampled.width}
            height={x.images.fixed_width_downsampled.height}
            title={x.title}
          ></GifElement>
        </div>
      );
    });
    return <div className="gif-list">{elementsToRender}</div>;
  }
}

export default GifList;
