import React from 'react';
import PropTypes from 'prop-types';

class MusicCards extends React.Component {
  render() {
    const { music } = this.props;
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
        </div>
      </div>
    );
  }
}

MusicCards.propTypes = {
  music: PropTypes.shape(),
}.isRequired;

export default MusicCards;
