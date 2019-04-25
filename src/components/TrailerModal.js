import React  from 'react'
import PropTypes from 'prop-types'

const TrailerModal = ({ trailer, toggleTrailer }) => {
  return (
    <div className="trailer-container" onClick={toggleTrailer}>
      <iframe className="movie-trailer" title="trailer" src={trailer[0].url} frameBorder="0" />
      {/* <button className="close-trailer-button" type="button" onClick={toggleTrailer}>Close</button> */}
    </div>
  )
}

TrailerModal.propTypes = {
  trailer: PropTypes.shape(PropTypes.array).isRequired,
  toggleTrailer: PropTypes.func.isRequired,
}

export default TrailerModal;
