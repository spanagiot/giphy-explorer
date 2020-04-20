import './Paginator.css';
import React from 'react';

class Paginator extends React.Component {
  render() {
    // if no elements we have no pages
    if (this.props.totalCount === 0) {
      return null;
    }
    // calculate the number of pages
    const totalPages = Math.ceil(
      this.props.totalCount / this.props.itemsPerPage
    );
    return (
      <>
        <div>
          {this.props.currentPage + 1} | {totalPages}
        </div>
        <div className="flex middle-flex paginator-margin">
          <button
            className="btn btn-paginator"
            disabled={this.props.currentPage + 1 === 1}
            onClick={this.props.onPreviousClicked}
          >
            {'<<'}
          </button>
          <button
            className="btn btn-paginator"
            disabled={this.props.currentPage + 1 === totalPages}
            onClick={this.props.onNextClicked}
          >
            {'>>'}
          </button>
        </div>
      </>
    );
  }
}

export default Paginator;
