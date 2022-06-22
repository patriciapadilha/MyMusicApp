import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isChecked: false,
      favorite: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getAddRemoveSong = this.getAddRemoveSong.bind(this);
    this.getFavoriteCheckbox = this.getFavoriteCheckbox.bind(this);
  }

  componentDidMount() {
    this.getFavoriteCheckbox();
  }

  onInputChange({ target: { checked } }) {
    this.setState({ isChecked: checked }, () => this.getAddRemoveSong());
  }

  async getAddRemoveSong() {
    const { music, getFavorite } = this.props;
    const { isChecked } = this.state;
    this.setState({
      loading: true,
    });
    if (isChecked) {
      await addSong(music);
    } else {
      await removeSong(music);
      getFavorite();
    }
    this.setState({
      loading: false,
    });
  }

  async getFavoriteCheckbox() {
    const { music } = this.props;
    const response = await getFavoriteSongs();
    this.setState({
      favorite: response,
    }, () => {
      const { favorite } = this.state;
      const isFavorite = favorite.some((e) => music.trackId === e.trackId);
      this.setState({ isChecked: isFavorite });
    });
  }

  render() {
    const { music } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div 
        className="music-play"
        key={ music.trackName }
      >
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            data-testid={ `checkbox-music-${music.trackId}` }
            checked={ isChecked }
            onChange={ this.onInputChange }
          />
        </label>
      </div>
    );
  }
}

MusicCards.propTypes = {
  music: PropTypes.shape(),
  getFavorite: PropTypes.func,
}.isRequired;

MusicCards.defaultProps = {
  getFavorite: () => {},
};

export default MusicCards;
