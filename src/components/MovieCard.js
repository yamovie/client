import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { TrailerModal } from '.';
import { FontAwesomeIcon, userServices, tokenServices } from '../utils';
import '../css/MovieCard.css';

class MovieCard extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.object),
      overview: PropTypes.string,
      ratings: PropTypes.shape({
        internet_movie_database: PropTypes.object,
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
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
    // toggleTrailer: PropTypes.func.isRequired,
  };

  /**
   * Creates a new movie card element using a movie data object
   * @param {object} [movie] the movie data to use to fill this card
   */
  constructor(props) {
    super(props);
    this.state = {
      overview: '',
      ratings: {
        imdb: {},
        metacritic: {},
        rotten_tomatoes: {},
      },
      offers: { buy: [], rent: [], stream: [] },
      release: 0,
      runtime: 0,
      title: '',
      credits: { cast: [], crew: [] },
      images: { backdrops: [], posters: [] },
      loading: true,
      trailerVisible: false,
      selectedTrailerList: [],
    };
  }

  componentDidMount() {
    // TODO: clean up this code to fully transition from TMDB data to JW data
    const { movie, genreProps } = this.props;
    const {
      jw_url,
      jw_image_url,
      certification,
      certifications,
      genre_ids,
      genres,
      overview,
      ratings,
      release_year,
      runtime,
      title,
      credits,
      images,
      offers,
    } = movie;

    let modRatings = ratings;
    let genresArray = [];
    let cert = '';

    if (jw_url) {
      // data handling stuff for jw data
      genresArray = genres.map(genre => genre.translation);
      cert = certification;
    } else {
      // data handling stuff for tmdb data
      if (genreProps) {
        genre_ids.forEach(id => {
          const genreName = genreProps.find(genre => genre._id === id).name;
          if (genreName) {
            genresArray.push(genreName);
          }
        });
      }
      if (ratings) {
        modRatings = {
          imdb: { ...ratings.internet_movie_database, url: `http://www.imdb.com/` },
          metacritic: ratings.metacritic,
          rotten_tomatoes: {
            ...ratings.rotten_tomatoes,
            url: 'http://www.rottentomatoes.com',
          },
        };
      }
      if (certifications) {
        [cert] = certifications;
      }
    }

    this.setState({
      jw_url: jw_url || '',
      jw_image_url: jw_image_url || '',
      certification: cert,
      genres: genresArray,
      release: release_year || 'No Year',
      title,
      runtime,
      credits,
      images,
      overview,
      offers,
      ratings: modRatings,
      loading: false,
    });
  }

  handleAddToWatchlist = movieId => {
    // TODO: remove if already on watchlist and styling
    userServices.addToUserWatchlist(movieId);
  };

  toggleTrailer = selectedTrailerList => {
    const { trailerVisible } = this.state;
    if (trailerVisible) {
      this.setState({ trailerVisible: false, selectedTrailerList: [] });
    } else {
      this.setState({ trailerVisible: true, selectedTrailerList });
    }
  };

  /**
   * Renders the movie card in HTML on the page. Uses CSS grid to display information
   * in three segments: trailer, descriptive info, and stream links.
   */
  render() {
    const {
      jw_url,
      jw_image_url,
      certification,
      loading,
      genres,
      release,
      title,
      runtime,
      credits,
      images,
      overview,
      ratings,
      offers,
      videos,
    } = this.state;
    const { toggleModal, movie } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    let directorList = [];
    let backdropLink = '';
    let posterLink = '';
    const backdropNum = Math.floor(Math.random() * images.backdrops.length);

    if (jw_url !== '') {
      // data from JW
      backdropLink = images.backdrops[backdropNum];
      posterLink = images.poster;
      directorList = credits.crew
        .filter(member => member.role === 'Director')
        .map(member => member.name);
    } else {
      // data from tmdb
      directorList = credits.crew.filter(member => member.job === 'Director');
      backdropLink = images.backdrops[backdropNum].backdrop_url;
      const posterNum = Math.floor(Math.random() * images.posters.length);
      posterLink = images.posters[posterNum].poster_url;
    }

    //  Grabs the token thats assigned to the user
    const user = tokenServices.getUserFromToken();

    // Play trailer button
    const videoPlayIcon =
      videos && videos.length > 0 ? (
        <span
          className="trailer-icon"
          role="button"
          tabIndex={0}
          onClick={() => this.toggleTrailer(videos)}
        >
          <FontAwesomeIcon icon="play-circle" />
          <p className="trailer-icon-text">Play Trailer</p>
        </span>
      ) : (
        ''
      );

    return (
      <div className="movie-card">
        <div
          className="backdrop"
          style={{
            backgroundImage: `url(${backdropLink})`,
          }}
        />
        {/* <TrailerModal
          trailerList={this.selectedTrailerList}
          toggleTrailer={this.toggleTrailer}
        /> */}
        <div className="info">
          <button type="button" className="close-modal" onClick={toggleModal}>
            <FontAwesomeIcon icon="plus" />
          </button>
          <div className="heading">
            {videoPlayIcon}
            {posterLink ? <img className="poster" alt={title} src={posterLink} /> : ''}
            <div id="line1">
              <h1>{title}</h1>
              <p>({release})</p>
              {/* TODO: make sure the style reflects if this is already on watchlist */}
              {user && (
                <div
                  className="watchlist"
                  role="button"
                  tabIndex={0}
                  onClick={() => this.handleAddToWatchlist(movie._id)}
                >
                  <FontAwesomeIcon className="watchlist-star" icon="star" />
                </div>
              )}
            </div>
            <div id="line2">
              <span className="certification">{certification}</span>
              {runtime ? <span className="runtime">{runtime} min</span> : ''}
              <RatingsView ratings={ratings} />
            </div>
            <p className="genres">{genres.join(', ')}</p>
            <StreamsView offers={offers} jw_image_url={jw_image_url} />
          </div>
          <div className="description">
            <h4 className="directors">
              Director(s):{' '}
              {directorList.length > 0 ? directorList.join(', ') : 'No Director Data'}
            </h4>
            <p>{overview || 'No plot summary available'}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;

// ============================================================
// ============================================================
// Sub-components

// ============================================================
// Stream Links

const StreamsView = ({ offers, jw_image_url }) => {
  if (!offers) {
    return (
      <div id="streams">
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
    return <div id="ratings" />;
  }
  const rtData = ratings.rotten_tomatoes;
  const imdbData = ratings.internet_movie_database || ratings.imdb;

  return (
    <div id="ratings">
      {rtData ? (
        <li>
          <a href={rtData.url} target="_blank" rel="noopener noreferrer">
            <img
              src={`/images/icon-rottentomatoes-${
                rtData.value >= 60 ? 'fresh' : 'rotten'
              }.png`}
              alt="Rotten Tomatoes"
            />
            {`${rtData.rate}`}
          </a>
        </li>
      ) : (
        ''
      )}
      {imdbData ? (
        <li>
          <a href={imdbData.url} target="_blank" rel="noopener noreferrer">
            <img src="/images/icon-IMDb.png" alt="IMDb" />
            {imdbData.rate}
          </a>
        </li>
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

// ============================================================
