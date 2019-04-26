import React from 'react';
import PropTypes from 'prop-types';
import '../css/TrailerModal.css';

const TrailerModal = ({ trailerList, toggleTrailer }) => {
  if (!trailerList || trailerList.length < 1) {
    return <div />;
  }

  return (
    <div className="trailer-container" role="button" tabIndex={0} onClick={toggleTrailer}>
      <iframe
        className="movie-trailer"
        title="trailer"
        src={trailerList[0].url}
        frameBorder="0"
      />
      {/* <button className="close-trailer-button" type="button" onClick={toggleTrailer}>Close</button> */}
    </div>
  );
};

TrailerModal.propTypes = {
  trailerList: PropTypes.shape(PropTypes.array).isRequired,
  toggleTrailer: PropTypes.func.isRequired,
};

export default TrailerModal;
