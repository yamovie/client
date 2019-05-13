import React from 'react';
import PropTypes from 'prop-types';
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
      }}
    >
      <div
        className="checkboxes"
        style={
          type === 'certifications'
            ? { gridTemplateColumns: 'repeat(5,1fr)', fontWeight: 'bold' }
            : {}
        }
      >
        {options.map(option => (
          <span
            className={`single-option ${option.checked ? 'checked' : ''}`}
            role="button"
            tabIndex={0}
            key={option.name}
            onClick={() => handleChange(type, option.id)}
            onKeyPress={e => (e.key === 'Enter' ? handleChange(type, option.id) : null)}
          >
            {type === 'providers' && (
              <img className="icon" src={option.icon} alt={option.name} />
            )}
            {type === 'genres' ? `${option.name} ${option.icon}` : option.name}
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
