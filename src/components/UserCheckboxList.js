/* TODO: remove this later */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../utils';
import '../css/UserCheckboxList.css';

export default class UserCheckboxList extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { options } = this.props;

    return (
      <form className="checkbox-form">
        <div className="checkboxes">
          {options.map(option => (
            <span className="single-option" key={option}>
              <input className="checkbox" type="checkbox" id={option} value={option} />
              <label className="option-label" htmlFor={option}>
                {option}
              </label>
              <label className="check-tick" htmlFor={option}>
                <FontAwesomeIcon icon="check" />
              </label>
            </span>
          ))}
        </div>
        <input type="reset" className="reset" value="Reset" />
      </form>
    );
  }
}
