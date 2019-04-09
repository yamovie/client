import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/MovieCard.css';

class MovieCard extends Component {
  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    movie: PropTypes.shape({
      genre_ids: PropTypes.array,
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
        backdrops: PropTypes.arrayOf(PropTypes.object),
        posters: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
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
      release: 0,
      runtime: 0,
      title: '',
      credits: { cast: [], crew: [] },
      images: { backdrops: [], posters: [] },
      loading: true,
    };
  }

  componentDidMount() {
    const { movie, genres } = this.props;
    const {
      genre_ids,
      overview,
      ratings,
      release_year,
      runtime,
      title,
      credits,
      images,
      external_ids,
    } = movie;

    const genresArray = [];
    genre_ids.forEach(id => {
      const genreName = genres.find(genre => genre._id === id).name;
      if (genreName) {
        genresArray.push(genreName);
      }
    });

    // prettier-ignore
    const modRatings = ratings
      ? {
        imdb: {
          ...ratings.internet_movie_database,
          url: `http://www.imdb.com/title/${external_ids.imdb_id}`,
        },
        metacritic: ratings.metacritic,
        rotten_tomatoes: ratings.rotten_tomatoes,
      }
      : {};

    this.setState({
      genres: genresArray,
      release: release_year,
      title,
      runtime,
      credits,
      images,
      overview,
      ratings: modRatings,
      loading: false,
    });
  }

  /**
   * Renders the movie card in HTML on the page. Uses CSS grid to display information
   * in three segments: trailer, descriptive info, and stream links.
   */
  render() {
    const {
      loading,
      genres,
      release,
      title,
      runtime,
      credits,
      images,
      overview,
      ratings,
    } = this.state;
    const { toggleModal } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    const directorList = credits.crew.filter(member => member.job === 'Director');
    const directors =
      directorList.length <= 0
        ? ', No Director'
        : directorList.reduce((dirs, member) => `${dirs}, ${member.name}`, '');

    const backdropNum = Math.floor(Math.random() * images.backdrops.length);
    const backdrop = images.backdrops[backdropNum];

    const posterNum = Math.floor(Math.random() * images.posters.length);
    const poster = images.posters[posterNum];

    return (
      <div className="movie-card">
        <div className="backdrop">
          {/* <div className="overlay" /> */}
          {backdrop ? <img src={backdrop.backdrop_url} alt="" /> : ''}
        </div>
        <div className="info">
          <button type="button" className="close-modal" onClick={toggleModal()}>
            &times;
          </button>
          <div className="heading">
            {poster ? <img className="poster" alt={title} src={poster.poster_url} /> : ''}
            <h1>{title}</h1>
            <div id="line2">
              <h4>{`${release}${directors}`}</h4>
              <RatingsView ratings={ratings} />
            </div>
            {runtime ? <span className="runtime">{runtime} min</span> : ''}
            <p className="genres">{genres.join(', ')}</p>
          </div>
          <div className="description">
            <p>{overview || 'No plot summary available'}</p>
          </div>
          <StreamsView title={title} />
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

// TODO: remove this when this section is working again
// eslint-disable-next-line react/prop-types
const StreamsView = ({ title }) => (
  // const streamOptions = streams;
  // const streamKeys = Object.keys(streamOptions);
  <div id="streams">
    <h3>{`Watch Links for '${title}' Coming Soon!`}</h3>
    {/* <ul>
      {streamKeys.map(streamName => (
        <li>
          <a href={streamOptions[streamName]} target="_blank" rel="noopener noreferrer">
            <img
              src=`/images/icon-${streamName}.png`
              alt={`${streamName.charAt(0).toUpperCase()}${streamName.slice(1)}`}
            />
          </a>
        </li>
      ))}
    </ul> */}
  </div>
);

// ============================================================
// Ratings
const RatingsView = ({ ratings }) => {
  if (!ratings) {
    return <div id="ratings" />;
  }
  return (
    <div id="ratings">
      {ratings.rotten_tomatoes ? (
        <li>
          <a
            href="http://www.rottentomatoes.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon-rottentomatoes-${
                ratings.rotten_tomatoes.value >= 60 ? 'fresh' : 'rotten'
              }.png`}
              alt="Rotten Tomatoes"
            />
            {`${ratings.rotten_tomatoes.rate}`}
          </a>
        </li>
      ) : (
        ''
      )}
      {ratings.imdb ? (
        <li>
          <a href={ratings.imdb.url} target="_blank" rel="noopener noreferrer">
            <img src={`${process.env.PUBLIC_URL}/images/icon-IMDb.png`} alt="IMDb" />
            {ratings.imdb.rate}
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
    internet_movie_database: PropTypes.object,
    metacritic: PropTypes.object,
    rotten_tomatoes: PropTypes.object,
  }).isRequired,
};

// ============================================================
