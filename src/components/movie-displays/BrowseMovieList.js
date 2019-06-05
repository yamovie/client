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
            <div id="yamovie-movie-item" key={movie.title}>
              {/* TODO: Wrap this in a button for accessability and to make ESlint happy */}
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
                    onClick={() => toggleModal(movie)}
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
