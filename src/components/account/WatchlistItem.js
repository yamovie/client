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
              <img src={movie.images.poster} className="img-fluid" alt="movie" onClick={() => toggleModal(movie._id)} tabIndex={0} />
              <div className="watchlist-buttons ">
                <button type="button" className="watchlist-button favorite-button" onClick={() => update(movie._id, { favorite: !movie.favorite , watched: movie.watched })}>
                  <FontAwesomeIcon icon="star" />
                </button>
                <button type="button" className="watchlist-button watched-button" onClick={() => update(movie._id, { watched: !movie.watched, favorite: movie.favorite })}>
                  <FontAwesomeIcon icon="eye" />
                </button>
              </div>
             
            </div>
            <button type="button" className="watchlist-remove-btn">
              Watch now
            </button>
          </div>
        </CSSTransition>
      )
    )
    
  }
}