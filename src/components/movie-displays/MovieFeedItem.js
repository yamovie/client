import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RatingsView, StreamsView, PosterWTrailer } from '..';
import { FontAwesomeIcon } from '../../utils/fontAwesome';
import '../../css/movie-displays/MovieFeedItem.css';

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

    return (
      <div
        className="movie-feed-item movie-info"
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
          <PosterWTrailer images={images} videos={videos} toggleTrailer={toggleTrailer} />
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
            <StreamsView offers={offers} />
          </div>
        </div>
        <div
          className="bottom-container"
          style={isExpanded ? {} : { height: '0', padding: '0px 10px' }}
        >
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
