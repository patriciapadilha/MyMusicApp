import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.validateSearch = this.validateSearch.bind(this);
    this.searchRequest = this.searchRequest.bind(this);

    this.state = {
      artist: '',
      searchArtist: '',
      searchIsDisabled: true,
      loading: false,
      apiRequest: false,
      albuns: [],
      isNotEmpty: false,
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

  async searchRequest() {
    const { artist } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(artist);
    console.log(response);
    this.setState({
      loading: false,
      apiRequest: true,
      albuns: response,
      searchArtist: artist,
      artist: '',
      isNotEmpty: response.length === 0,
    });
  }

  render() {
    const {
      artist,
      searchIsDisabled,
      loading,
      apiRequest,
      albuns,
      searchArtist,
      isNotEmpty,
    } = this.state;
    return (
      <section className="container-search" data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <div className='search'>
            {apiRequest && <p>{`Resultado de álbuns de: ${searchArtist}`}</p>}
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
              onClick={ this.searchRequest }
              className="btn-2"
            >
              Pesquisar
            </button>
            <div className="albuns-wrapper">
              <div className="albuns">
              {isNotEmpty ? <p>Nenhum álbum foi encontrado</p> : (
                albuns
                .map((album) => (
                  <div
                  className="album-list"
                  key={ album.collectionId }
                  >
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        className="album-card"
                        >
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        { album.collectionName }
                      </Link>
                    </div>
                  ))
                  )}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Search;
