import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../css/movie-displays/AdvancedSearch.css';

// const OPTIONS = ['Title', 'Cast', 'Crew'];

export default class AdvancedSearch extends Component {
  static propTypes = {
    style: PropTypes.shape({ display: PropTypes.string }),
    handleSearchOptions: PropTypes.func.isRequired,
    toggleShowAdvancedSearch: PropTypes.func.isRequired,
    searchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);

    const { searchOptions } = this.props;

    this.state = {
      checkboxes: searchOptions.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {},
      ),
    };
  }

  selectAllCheckboxes = isSelected => {
    const { checkboxes } = this.state;
    Object.keys(checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected,
        },
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    const { checkboxes } = this.state;
    const { handleSearchOptions } = this.props;

    formSubmitEvent.preventDefault();

    handleSearchOptions(checkboxes);
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      // eslint-disable-next-line react/destructuring-assignment
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  // eslint-disable-next-line react/destructuring-assignment
  createCheckboxes = () => this.props.searchOptions.map(this.createCheckbox);

  render() {
    const { style, toggleShowAdvancedSearch } = this.props;

    return (
      <div className="advanced-search-container" style={style}>
        <form className="advanced-form" onSubmit={this.handleFormSubmit}>
          {this.createCheckboxes()}

          <button type="button" className="advanced-button" onClick={this.selectAll}>
            Select All
          </button>

          <button type="button" className="advanced-button" onClick={this.deselectAll}>
            Deselect All
          </button>

          <button
            type="submit"
            className="advanced-button"
            onClick={toggleShowAdvancedSearch}
          >
            Apply
          </button>
        </form>
      </div>
    );
  }
}

//= ===================================================================

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label className="container">
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
