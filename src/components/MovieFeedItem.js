import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../utils/fontAwesome';
import '../css/MovieFeedItem.css';

export default class MovieFeedItem extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.object),
      overview: PropTypes.string,
      ratings: PropTypes.shape({
        imdb: PropTypes.object,
        metacritic: PropTypes.object,
        rotten_tomatoes: PropTypes.object,
      }),
      release_year: PropTypes.number,
      runtime: PropTypes.number,
      title: PropTypes.string,
      credits: PropTypes.shape({
        cast: PropTypes.arrayOf(PropTypes.object),
        crew: PropTypes.arrayOf(PropTypes.object),
      }),
      images: PropTypes.shape({
        backdrops: PropTypes.arrayOf(PropTypes.string),
        poster: PropTypes.string,
      }),
      videos: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    toggleTrailer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      backdropNum: 0,
    };
    this.randBD = true;
  }

  componentDidMount() {
    this.randomizeBackdrop();
  }

  randomizeBackdrop = () => {
    if (this.randBD) {
      const { movie } = this.props;
      const { images } = movie;
      const backdropNum = Math.floor(Math.random() * images.backdrops.length);
      this.setState({ backdropNum });
    }
  };

  toggleExpanded = () => {
    this.randomizeBackdrop();
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  render() {
    const { movie, toggleTrailer } = this.props;
    const {
      jw_image_url,
      certification,
      genres,
      release_year,
      title,
      runtime,
      credits,
      images,
      overview,
      ratings,
      offers,
      videos,
    } = movie;
    const { isExpanded, backdropNum } = this.state;

    const genresArray = genres.map(genre => genre.translation);
    const directorList = credits.crew
      .filter(member => member.role === 'Director')
      .map(member => member.name);
    const backdropLink =
      images.backdrops && images.backdrops.length > 0
        ? images.backdrops[backdropNum]
        : '';
    const videoPlayIcon =
      videos && videos.length > 0 ? (
        <span
          className="trailer-icon"
          role="button"
          tabIndex={0}
          onClick={() => toggleTrailer(videos)}
        >
          <FontAwesomeIcon icon="play-circle" />
          <p className="trailer-icon-text">Play Trailer</p>
        </span>
      ) : (
        ''
      );

    return (
      <div
        className="movie-feed-item"
        style={{
          backgroundImage: `url(${backdropLink})`,
          backgroundPositionX: isExpanded
            ? 'var(--bg-shift-expanded)'
            : 'var(--bg-shift)',
        }}
      >
        <button
          type="button"
          className={`expand-indicator ${isExpanded ? 'close' : ''}`}
          onClick={this.toggleExpanded}
        >
          <FontAwesomeIcon icon="angle-down" />
        </button>
        <div className="top-container">
          <div className="poster-area">
            {videoPlayIcon}
            <img
              className="poster"
              alt={title}
              src={images.poster || './images/placeholder-poster.png'}
            />
          </div>
          <div className="info">
            <h2 className="title">
              {title}
              <span className="year"> ({release_year || 'No Year'})</span>
            </h2>
            <div className="cert-runtime-ratings">
              <span className="certification">{certification || 'No Data'}</span>
              <span className="runtime">{runtime ? `${runtime} min` : 'No Data'}</span>
              <RatingsView ratings={ratings} />
            </div>
            <p className="genres">
              {genresArray.length > 0 ? genresArray.join(', ') : 'No Genre Data'}
            </p>
            <StreamsView offers={offers} jw_image_url={jw_image_url} />
          </div>
        </div>
        <div
          className="bottom-container"
          style={isExpanded ? {} : { height: '0', padding: '0px 10px' }}
        >
          {/* <button
            type="button"
            className="trailer-button"
            onClick={() => toggleTrailer(videos)}
          >
            Watch Trailer
          </button> */}
          <h4 className="directors">
            Director(s):{' '}
            {directorList.length > 0 ? directorList.join(', ') : 'No Director Data'}
          </h4>
          <p className="plot">{overview || 'No plot summary available'}</p>
        </div>
      </div>
    );
  }
}

// ============================================================
// Stream Links

const StreamsView = ({ offers, jw_image_url }) => {
  // TODO: if more than 8 stream options, make offer height style smaller (currently 55%)

  if (!offers) {
    return (
      <div className="streams">
        <h3>Watch Links for this title Coming Soon!</h3>
      </div>
    );
  }

  return (
    <div className="streams">
      {offers.stream.length > 0 ? (
        offers.stream.map(strmSrc => {
          const sizedIcon = strmSrc.provider.icon_url.replace('{profile}', 's100');
          const imgLink = `${jw_image_url}${sizedIcon}`;

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
  jw_image_url: PropTypes.string.isRequired,
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

const RatingsView = ({ ratings }) => {
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
            src={`/images/icon-rottentomatoes-${
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
          <img src="/images/icon-IMDb.png" alt="IMDb" />
          {imdbData.rate}
        </a>
      ) : (
        ''
      )}
      {/* <li>
      <img src="/images/icon-star.png" alt="User Rating" />
      Users: 5/5
    </li> */}
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
