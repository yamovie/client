import React from 'react';
import PropTypes from 'prop-types';
import '../../css/movie-displays/TrailerModal.css';

const TrailerModal = ({ trailerList, toggleTrailer }) => {
  if (!trailerList || trailerList.length < 1) {
    return <div className="empty-trailer-container" />;
  }

  return (
    <div className="trailer-container" role="button" tabIndex={0} onClick={toggleTrailer}>
      <iframe
        className="movie-trailer"
        title="trailer"
        src={`${trailerList[0].url}?autoplay=1`}
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      />
      {/* <button className="close-trailer-button" type="button" onClick={toggleTrailer}>Close</button> */}
    </div>
  );
};

TrailerModal.propTypes = {
  trailerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTrailer: PropTypes.func.isRequired,
};

export default TrailerModal;
