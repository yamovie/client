import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '../../utils/fontAwesome';

export default class WatchlistItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      set: false,
    }
  }

  componentDidMount() {
    const { speed, multiplier } = this.props;
    setTimeout(() => {
      this.setState({render: true})
    }, speed * multiplier)
  }
  
  render() {
    const { movie, update, toggleModal} = this.props;
    console.log(movie);
    const { render } = this.state;
    const style = {
      WebkitAnimation: 'fadeIn 2s',
      animation: 'fadeIn 2s',
    }

    return  (
      render && (
        <CSSTransition
        // in={showMessage}
          // timeout={300}
          // classNames="collapse-left"
          // unmountOnExit
          // onEnter={() => setShowButton(false)}
        >
          <div className="watchlist-movie" style={style}>
            <div className="poster-container">
              <img src={movie.movieId.images.poster} className="img-fluid" alt="movie" onClick={() => toggleModal(movie.movieId._id)} tabIndex={0} />
              <div className="watchlist-buttons ">
                <div className="watchlist-bookmark">
                  <button type="button" className={`watchlist-button favorite-button ${movie.favorite && 'favorite'}`} onClick={() => update(movie._id, { favorite: !movie.favorite , watched: movie.watched })}>
                    <FontAwesomeIcon icon="star" />
                  </button>
                </div>
                <div className="watchlist-bookmark">
                  <button type="button" className={`watchlist-button watched-button ${movie.watched && 'watched'}`} onClick={() => update(movie._id, { watched: !movie.watched, favorite: movie.favorite })}>
                    <FontAwesomeIcon icon="eye" />
                  </button>
                </div>
              </div>
             
            </div>
            {/* <button type="button" className="watchlist-remove-btn">
              Watch now
            </button> */}
          </div>
        </CSSTransition>
      )
    )
    
  }
}