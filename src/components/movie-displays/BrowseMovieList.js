/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { Spring } from 'react-spring/renderprops';
import '../../css/movie-displays/BrowseMovieList.css';

export default class BrowseMovieList extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleModal: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    loadMoreMovies: PropTypes.func.isRequired,
  };

  // ===============================================================
  // Render

  render() {
    const { movies, hasNextPage, toggleModal, loadMoreMovies } = this.props;

    return (
      <InfiniteScroll
        id="yamovie-movie-list"
        pageStart={0}
        loadMore={loadMoreMovies}
        hasMore={hasNextPage}
        loader={
          <div className="loader" key="loader">
            <img
              style={{ height: 200 }}
              src="./images/popcorn-loader/popcorn-loading.gif"
              alt="Loading ..."
            />
          </div>
        }
      >
        <div id="list-all-movies">
          {movies.map(movie => (
            <div
              id="yamovie-movie-item"
              key={movie.title}
              role="button"
              tabIndex={0}
              onClick={() => toggleModal(movie)}
              onKeyPress={e => {
                if (e.key === 'Enter') toggleModal(movie);
              }}
            >
              <Spring
                config={{ mass: 50, tension: 280, friction: 120 }}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
              >
                {props => (
                  <img
                    style={props}
                    src={movie.images.poster}
                    alt={movie.title}
                    className="img-fluid"
                  />
                )}
              </Spring>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}
