import React from 'react';

class GiphysSearch extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      body: "",
      giphy_url: "",
      author_id: this.props.currentUser.id,
      chat_id: this.props.match.params.chatId,
      limit: 3,
      offset: 0,
      searchTerm: "",
      loadMore: false,
    };

    this.size = 100;
    this.prevSearch = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearGiphys();
  }

  handleClick(e) {
    e.preventDefault();

    this.setState({
      giphy_url: e.currentTarget.dataset.giphyUrl,
    }, () => {
      App.chat.speak(this.state);
      this.props.clearGiphys();
      this.setState({ giphy_url: "", loadMore: false });
    });
  }

  updateSearchTerm() {
    return e => {
      this.setState({
        searchTerm: e.target.value,
        loadMore: false,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.searchTerm !== this.prevSearch) {
      this.prevSearch = this.state.searchTerm;
      this.props.clearGiphys();
      this.setState({
        offset: 0,
        loadMore: true,
      }, () => this.props.fetchSearchGiphys(this.state));
    } else {
      this.setState({
        offset: this.state.offset + this.state.limit,
        loadMore: true,
      }, () => this.props.fetchSearchGiphys(this.state));
    }

    
  }

  render() {
    const { giphys } = this.props;

    const giphyList = giphys.map((giphy) => (
      <li
        onClick={this.handleClick}
        data-giphy-url={giphy.images.fixed_height.url}
        key={`giphy-${giphy.id}`}
      >
        <img src={giphy.images.fixed_height.url} height={this.size} width={this.size}/>
      </li>
    )); 

    return (
      <div className="giphys-search">
        { giphyList.length > 0 &&
          <ul className="giphy-search-list">
            {giphyList}
          </ul>
        }
        <form className="giphy-search-form" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            onChange={this.updateSearchTerm()}
            value={this.state.searchTerm}
            placeholder={"Search for a GIF..."}
          /> 
          { this.state.loadMore && this.state.searchTerm.length > 0 &&
            <button className="giphy-load-more">Load More!</button>
          }
        </form>
        <div className="giphy-attr">
          <p> Powered by Giphy </p>
        </div>
      </div>
    );
  }
}

export default GiphysSearch;