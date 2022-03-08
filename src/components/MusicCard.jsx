import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: props.music,
      loading: false,
      isChecked: false,
      favorite: props.favorite,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getAddRemoveSong = this.getAddRemoveSong.bind(this);
  }

  componentDidMount() {
    const { music, favorite } = this.state;
    const isFavorite = favorite
      .some(({ trackId }) => trackId === music.trackId);
    this.setState({ isChecked: isFavorite });
  }

  onInputChange({ target: { checked } }) {
    this.setState({ isChecked: checked }, () => this.getAddRemoveSong());
  }

  async getAddRemoveSong() {
    const { music } = this.props;
    const { isChecked } = this.state;
    this.setState({
      loading: true,
    });
    if (isChecked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { music } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div
        key={ music.trackName }
      >
        <p>{ music.trackName }</p>
        <div>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          {loading ? <Loading />
            : (
              <label htmlFor={ music.trackId }>
                Favorita
                <input
                  type="checkbox"
                  id={ music.trackId }
                  name="favorite"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  checked={ isChecked }
                  onChange={ this.onInputChange }
                />
              </label>
            )}
        </div>
      </div>
    );
  }
}

MusicCards.propTypes = {
  music: PropTypes.shape(),
}.isRequired;

export default MusicCards;
