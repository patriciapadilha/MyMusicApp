import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../css/Album.css';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: [],
      loading: false,
      artistName: '',
      albumName: '',
      albumImg: '',
    };

    this.MusicRequest = this.MusicRequest.bind(this);
  }

  componentDidMount() {
    this.MusicRequest();
  }

  async MusicRequest() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loading: true });
    const response = await getMusics(id);
    this.setState({
      album: response,
      loading: false,
      artistName: response[0].artistName,
      albumName: response[0].collectionName,
      albumImg: response[0].artworkUrl100,
    });
  }

  render() {
    const { album, loading, artistName, albumName, albumImg } = this.state;
    return (
      <section data-testid="page-album">
        <Header />
        <div className="main-album">
          <p data-testid="artist-name">
            Artista:
            { artistName }
          </p>
          <p data-testid="album-name">
            Album:
            { albumName }
          </p>
          <img src={ albumImg } alt="Collection Name" />
            Músicas
          <div>
            {loading ? <Loading />
              : (
                album.map((music, i) => (
                  i !== 0 && (
                    <MusicCard
                      key={ music.trackId }
                      music={ music }
                    />)
                ))
              )}
          </div>
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
