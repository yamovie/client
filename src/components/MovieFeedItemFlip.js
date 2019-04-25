import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/MovieFeedItemFlip.css';

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
  };

  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
    };
  }

  toggleFlipped = () => {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  render() {
    const { movie } = this.props;
    const {
      // jw_url,
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
    const { isFlipped } = this.state;

    const genresArray = genres.map(genre => genre.translation);
    const directorList = credits.crew
      .filter(member => member.role === 'Director')
      .map(member => member.name);

    const titleLine = (
      <h2 className="title">
        {title}
        <span className="year"> ({release_year})</span>
        <span className="certification">{certification}</span>
      </h2>
    );

    const ratingsLine = (
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
    );

    return (
      <div
        className={`movie-feed-item ${isFlipped ? 'flip' : ''}`}
        onClick={this.toggleFlipped}
        onKeyPress={this.toggleFlipped}
        role="button"
        tabIndex={0}
      >
        <div className="item-front">
          <div className="info">
            <img className="poster" alt={title} src={images.poster} />
            {titleLine}
            {/* <p className="directors">{directorList.join(', ')}</p> */}
            <span className="numbers">{`${release_year}, ${runtime} min`}</span>
            {/* ratingsLine */}
            <p className="genres">{genresArray.join(', ')}</p>
            {/* <div className="streams">[Streams go here]</div> */}
            <StreamsView offers={offers} jw_image_url={jw_image_url} />
          </div>
          <div className="backdrop">
            {images.backdrops ? <img src={images.backdrops[0]} alt="" /> : ''}
          </div>
        </div>
        <div className="item-back">
          <iframe src={videos[0].url} title={videos[0].title} className="trailer" />
          {titleLine}
          <h4 className="directors">{directorList.join(', ')}</h4>
          {ratingsLine}
          <p className="plot">{overview}</p>
        </div>
      </div>
    );
  }
}

// ============================================================
// Stream Links

const StreamsView = ({ offers, jw_image_url }) => {
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
