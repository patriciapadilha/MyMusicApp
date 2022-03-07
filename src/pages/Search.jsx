import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.validateSearch = this.validateSearch.bind(this);
    this.state = {
      artist: '',
      searchIsDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateSearch());
  }

  validateSearch() {
    const { artist } = this.state;
    const minCharacters = 2;
    if (artist.length >= minCharacters) {
      this.setState({ searchIsDisabled: false });
    } else {
      this.setState({ searchIsDisabled: true });
    }
  }

  render() {
    const { artist, searchIsDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Pagina Search
        <label htmlFor="search-artist">
          <input
            type="text"
            placeholder="Buscar artista"
            id="search-artist"
            name="artist"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
            value={ artist }
          />
        </label>
        <button
          disabled={ searchIsDisabled }
          type="button"
          data-testid="search-artist-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Search;
