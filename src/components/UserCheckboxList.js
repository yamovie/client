import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../utils';
import '../css/UserCheckboxList.css';

const UserCheckboxList = ({
  options,
  type,
  handleChange,
  handleReset,
  handleSelectAll,
}) => {
  return (
    <form
      className="checkbox-form"
      onSubmit={event => {
        event.preventDefault();
        handleSelectAll(type);
      }}
      onReset={() => {
        handleReset(type);
        // HACK: this shouldn't be necessary
        // handleChange(type, options[0].id);
        // handleChange(type, options[0].id);
      }}
    >
      <div className="checkboxes">
        {options.map(option => (
          <span className="single-option" key={option.name}>
            <button
              className={`checkbox ${option.checked ? 'checked' : ''}`}
              type="button"
              id={option.name}
              name={option.name}
              onClick={() => handleChange(type, option.id)}
            />
            {/* {React.createElement('input', {
              className: 'checkbox',
              type: 'checkbox',
              id: option.name,
              name: option.name,
              onChange: () => handleChange(type, option.id),
              checked: !!option.checked,
            })} */}
            <label className="option-label" htmlFor={option.name}>
              {option.name}
            </label>
            <label className="check-tick" htmlFor={option.name}>
              <FontAwesomeIcon icon="check" />
            </label>
          </span>
        ))}
      </div>
      <div className="buttons">
        <input type="submit" className="select-all" value="Select All" />
        <input type="reset" className="reset" value="Select None" />
      </div>
    </form>
  );
};

UserCheckboxList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
};

export default UserCheckboxList;