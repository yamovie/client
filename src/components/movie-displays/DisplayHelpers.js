import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../../utils';
import { TrailerModal } from '..';
import '../../css/movie-displays/DisplayHelpers.css';

// ============================================================
// Stream Links

/**
 * Displays a set of stream options
 * @param {Object} offers an object with the data for stream, buy, and rent offers
 * @returns a JSX React component
 */
export const StreamsView = ({ offers }) => {
  // TODO: if more than 8 stream options, make offer height style smaller (currently 55%)

  if (!offers) {
    return (
      <div className="streams">
        <h3>Watch Links for this title Coming Soon!</h3>
      </div>
    );
  }

  /*
  stream: [
    {
      provider: { clear_name: string, icon_url: string },
      hd: { price: number, url: string }
      sd: { price: number, url: string }
      fourk: { price: number, url: string }
    }
  ]
  */
  // https://images.justwatch.com/icon/430993/s100/
  // icon_url: /icon/430993/{profile}

  return (
    <div className="streams">
      {offers.stream.length > 0 ? (
        offers.stream.map(strmSrc => {
          const sizedIcon = strmSrc.provider.icon_url.replace('{profile}', 's100');
          const imgLink = `https://images.justwatch.com${sizedIcon}`;

          let streamLink = '';
          if (strmSrc.hd) {
            streamLink = strmSrc.hd.url;
          } else if (strmSrc.sd) {
            streamLink = strmSrc.sd.url;
          } else if (strmSrc.fourk) {
            streamLink = strmSrc.fourk.url;
          }

          return (
            <span className="offer" key={strmSrc.provider.clear_name}>
              <a href={streamLink} target="_blank" rel="noopener noreferrer">
                <img src={imgLink} alt={strmSrc.provider.clear_name} />
              </a>
            </span>
          );
        })
      ) : (
        <h3>No free streams currently available for this title</h3>
      )}
    </div>
  );
};

StreamsView.propTypes = {
  offers: PropTypes.shape({
    buy: PropTypes.arrayOf(
      PropTypes.shape({
        provider_id: PropTypes.number,
        hd: PropTypes.object,
        sd: PropTypes.object,
        fourk: PropTypes.object,
      }),
    ),
    rent: PropTypes.arrayOf(PropTypes.object),
    stream: PropTypes.arrayOf(PropTypes.object),
  }),
};

StreamsView.defaultProps = {
  offers: null,
};

// ============================================================
// Ratings

/**
 * Displays a set of ratings
 * @param {Object} ratings an object with the data for Rotten Tomatoes, IMDB, and
 * Metacritic ratings info
 * @returns a JSX React component
 */
export const RatingsView = ({ ratings }) => {
  if (!ratings) {
    return <div className="ratings" />;
  }
  const rtData = ratings.rotten_tomatoes;
  const imdbData = ratings.imdb;

  return (
    <div className="ratings">
      {rtData ? (
        <a href={rtData.url} target="_blank" rel="noopener noreferrer">
          <img
            src={`/images/movie-card/icon-rottentomatoes-${
              rtData.value >= 60 ? 'fresh' : 'rotten'
            }.png`}
            alt="Rotten Tomatoes"
          />
          {rtData.rate}
        </a>
      ) : (
        ''
      )}
      {imdbData ? (
        <a href={imdbData.url} target="_blank" rel="noopener noreferrer">
          <img src="/images/movie-card/icon-IMDb.png" alt="IMDb" />
          {imdbData.rate}
        </a>
      ) : (
        ''
      )}
    </div>
  );
};

RatingsView.propTypes = {
  ratings: PropTypes.shape({
    imdb: PropTypes.object,
    metacritic: PropTypes.object,
    rotten_tomatoes: PropTypes.object,
  }).isRequired,
};

// ============================================================
// Poster trailer overlay

/**
 * Displays poster with a trailer opening overlay
 * @param {Object} images an object containing image data and links for a movie
 * @param {Array<Object>} videos an array of objects containing video data and links for a movie
 * @returns a JSX React component
 */
export class PosterWTrailer extends Component {
  static propTypes = {
    images: PropTypes.shape({
      backdrops: PropTypes.arrayOf(PropTypes.string),
      poster: PropTypes.string,
    }).isRequired,
    videos: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    videos: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      trailerVisible: false,
    };
  }

  toggleTrailer = () => {
    this.setState(prevState => ({ trailerVisible: !prevState.trailerVisible }));
  };

  render() {
    const { videos, images } = this.props;
    const { trailerVisible } = this.state;
    return (
      <div className="poster-area">
        {videos && videos.length > 0 ? (
          <span
            className="trailer-icon"
            role="button"
            tabIndex={0}
            onClick={this.toggleTrailer}
          >
            <FontAwesomeIcon icon="play-circle" />
            <p className="trailer-icon-text">Play Trailer</p>
          </span>
        ) : (
          ''
        )}
        {trailerVisible && (
          <TrailerModal trailerList={videos} toggleTrailer={this.toggleTrailer} />
        )}
        <img
          className="poster"
          alt="Movie Poster"
          src={images.poster || './images/placeholders/placeholder-poster.png'}
        />
      </div>
    );
  }
}
