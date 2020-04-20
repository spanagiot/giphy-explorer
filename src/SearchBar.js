import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
  render() {
    const searchClicked = (value) => {
      this.props.onSearch(this.searchBarValue.value);
    };

    const fetchTrending = () => {
      this.props.onFetchTrending();
    };

    const clearClicked = () => {
      this.searchBarValue.value = '';
      this.props.onClear();
    };

    return (
      <>
        <div className="search-bar-flex middle-flex pt-10">
          <button
            onClick={searchClicked}
            type="submit"
            className="btn searchButton"
          >
            Search
          </button>
          <input
            type="text"
            id="searchBar"
            ref={(input) => (this.searchBarValue = input)}
            className="searchInput"
            placeholder="Search for GIFs"
          />
          <button className="btn clearButton" onClick={clearClicked}>
            Clear
          </button>
        </div>
        <div className="search-bar-flex middle-flex pt-10">
          <button className="btn trendingButton" onClick={fetchTrending}>
            Trending
          </button>
        </div>
      </>
    );
  }
}

export default SearchBar;
