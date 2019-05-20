import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../css/movie-displays/AdvancedSearch.css'

class AdvancedSearch extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    const { style, toggleShowAdvancedSearch } = this.props;

    return (
      <div id="advanced-search-container" style={style}>
        <form id="advanced-form">
          <label className="container">Title
            <input type="checkbox" />
            <span className="checkmark" />
          </label>

          <label className="container">Cast
            <input type="checkbox"/>
            <span className="checkmark" />
          </label>

          <label className="container">Crew
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
          <br />
          <button id="advanced-search-button" type="button" onClick={toggleShowAdvancedSearch}>Apply</button>
        </form>
      </div>
    );
  }
}

AdvancedSearch.propTypes = {

};

export default AdvancedSearch;