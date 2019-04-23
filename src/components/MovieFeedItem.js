import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
    };
  }

  render() {
    const { movie } = this.props;
    const {
      // jw_url,
      // jw_image_url,
      certification,
      genres,
      release_year,
      title,
      runtime,
      credits,
      images,
      // overview,
      ratings,
      // offers,
    } = movie;

    const genresArray = genres.map(genre => genre.translation);
    const directorList = credits.crew
      .filter(member => member.role === 'Director')
      .map(member => member.name);

    return (
      <div className="movie-feed-item">
        <div className="info">
          <img className="poster" alt={title} src={images.poster} />
          <div className="titleLine">
            <h2 className="title">{title}</h2>
            <span className="certification">{certification}</span>
          </div>
          <p className="directors">{directorList.join(', ')}</p>
          <span className="numbers">{`${release_year}, ${runtime} min`}</span>
          <div className="ratings">
            <span>
              <img src="/images/icon-rottentomatoes-fresh.png" alt="Rotten Tomatoes" />
              {`${ratings.rotten_tomatoes.rate}`}
            </span>
            <span>
              <img src="/images/icon-IMDb.png" alt="IMDb" />
              {ratings.imdb.rate}
            </span>
          </div>
          <p className="genres">{genresArray.join(', ')}</p>
          <div className="streams">[Streams go here]</div>
        </div>
        <div className="backdrop">
          {images.backdrops ? <img src={images.backdrops[0]} alt="" /> : ''}
        </div>

        {/* <div className="info">
          <div className="heading">
            {images.poster ? (
              <img className="poster" alt={title} src={images.poster} />
            ) : (
              ''
            )}
            <div id="line1">
              <h1>{title}</h1>
              <span className="certification">{certification}</span>
            </div>
            <div id="line2">
              <h4>{`${release_year}, [Directors]`}</h4>
            </div>
            {runtime ? <span className="runtime">{runtime} min</span> : ''}
            <p className="genres">{genresArray.join(', ')}</p>
          </div>
          <div className="description">
            <p>{overview || 'No plot summary available'}</p>
          </div>
        </div> */}
      </div>
    );
  }
}
