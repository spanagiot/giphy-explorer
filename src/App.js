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
        this.setState(
          {
            gifList: currentList,
            GIFtotalCount: x.pagination.total_count,
          },
          this.storeStateInSessionStorage
        );
      })
      .catch((x) => {
        alert('Error occured');
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
        this.storeStateInSessionStorage
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
        this.fetch()
      );
    };

    const deleteClicked = (key) => {
      // Create new list reference
      const newGIFList = [...this.state.gifList];

      // Remove element according to id
      newGIFList.splice(
        this.state.gifList.findIndex((x) => x.id === key),
        1
      );

      // Feed the new list to state
      this.setState({ gifList: newGIFList });
    };
    return (
      <div className="App ">
        <div className="flex-container center">
          <SearchBar
            onSearch={search}
            onFetchTrending={fetchTrending}
            onClear={clear}
            searchTerm={this.state.searchTerm}
          ></SearchBar>
          <div className="mt-10">Powered By GIPHY</div>
          <div className="flex-item">
            <GifList
              data={this.state.gifList}
              onDeleteClicked={deleteClicked}
            ></GifList>
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

  storeStateInSessionStorage() {
    for (let stateKey in this.state) {
      sessionStorage.setItem(stateKey, JSON.stringify(this.state[stateKey]));
    }
  }

  loadStateFromSessionStorage() {
    const savedState = this.state;
    for (let stateKey in this.state) {
      if (sessionStorage.getItem(stateKey) !== null) {
        savedState[stateKey] = JSON.parse(sessionStorage.getItem(stateKey));
      }
    }
    this.setState({ ...savedState });
  }

  componentDidMount() {
    this.loadStateFromSessionStorage();
  }
}

export default App;
