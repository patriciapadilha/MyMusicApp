import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: [],
      loading: false,
    };

    this.AddFavotireSongs = this.AddFavotireSongs.bind(this);
  }

  componentDidMount() {
    this.AddFavotireSongs();
  }

  // componentDidUpdate(_prevProps, prevState) {
  //   getFavoriteSongs().then((result) => {
  //     if (prevState.favorite !== result) this.setState({ favorite: result });
  //   });
  // }

  async AddFavotireSongs() {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorite: response,
    });
  }

  render() {
    const { loading, favorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Pagina Favorites
        {loading ? <Loading />
          : (
            <div>
              {favorite.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  favorite={ favorite }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
