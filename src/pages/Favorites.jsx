import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCards from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favorite: [],
    };
    this.getFavorite = this.getFavorite.bind(this);
  }

  componentDidMount() {
    this.getFavorite();
  }

  async getFavorite() {
    this.setState({
      loading: true,
    }, async () => {
      const response = await getFavoriteSongs();
      this.setState({
        favorite: response,
        loading: false,
      });
    });
  }

  render() {
    const { favorite, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Página Favorites
        {loading && <Loading />}
        {favorite
          .map((music, i) => (
            i !== 0 && (
              <MusicCards
                key={ music.trackId }
                music={ music }
                getFavorite={ this.getFavorite }
              />)
          ))}
      </div>
    );
  }
}

export default Favorites;
