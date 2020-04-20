import React from 'react';
import './App.css';
import GifList from './GifList';
import SearchBar from './SearchBar';
import Paginator from './Paginator';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifList: [],
      page: 0,
      search: false,
      trending: false,
      GIFtotalCount: 0,
      GIFperPage: 24,
      searchTerm: '',
    };
    this.apiKey = 'dc6zaTOxFJmzC'; // demo api key
  }

  fetch = () => {
    if (!this.state.trending && !this.state.search) {
      return;
    }
    let queryURL = `https://api.giphy.com/v1/gifs/trending?api_key=${
      this.apiKey
    }&limit=${this.state.GIFperPage}&offset=${
      Number(this.state.page) * Number(this.state.GIFperPage)
    }`;
    if (this.state.search) {
      queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${
        this.apiKey
      }&q=${this.state.searchTerm}&limit=${this.state.GIFperPage}&offset=${
        this.state.page * this.state.GIFperPage
      }`;
    }
    fetch(queryURL)
      .then((res) => res.json())
      .then((x) => {
        const currentList = [...this.state.gifList, ...x.data];
        this.setState({
          gifList: currentList,
          GIFtotalCount: x.pagination.total_count,
        });
      });
  };

  render() {
    const search = (searchValue) => {
      this.setState(
        {
          trending: false,
          search: true,
          searchTerm: searchValue,
          gifList: [],
          page: 0,
          GIFtotalCount: 0,
        },
        this.fetch
      );
    };

    const fetchTrending = () => {
      this.setState(
        {
          trending: true,
          search: false,
          gifList: [],
          page: 0,
          GIFtotalCount: 0,
        },
        this.fetch
      );
    };

    const clear = () => {
      this.setState(
        {
          gifList: [],
          page: 0,
          trending: false,
          search: false,
          GIFtotalCount: 0,
        },
        this.fetch
      );
    };

    const nextClicked = () => {
      const nextPage = this.state.page + 1;
      this.setState(
        {
          page: nextPage,
          gifList: [],
        },
        this.fetch
      );
    };

    const previousClicked = () => {
      const previousPage = this.state.page - 1;
      this.setState(
        {
          page: previousPage,
          gifList: [],
        },
        this.fetch
      );
    };
    return (
      <div className="App ">
        <div className="flex-container center">
          <SearchBar
            onSearch={search}
            onFetchTrending={fetchTrending}
            onClear={clear}
          ></SearchBar>
          <div style={{ marginTop: '10px' }}>Powered By GIPHY</div>
          <div className="flex-item">
            <GifList data={this.state.gifList}></GifList>
          </div>
          <div className="flex-item">
            <Paginator
              totalCount={this.state.GIFtotalCount}
              itemsPerPage={this.state.GIFperPage}
              currentPage={this.state.page}
              onNextClicked={nextClicked}
              onPreviousClicked={previousClicked}
            ></Paginator>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
