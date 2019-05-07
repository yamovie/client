import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ labelName, handleChange, name, selectedValue }) => (
  <>
    {labelName ? (
      <span className="form-label switch-label">{labelName}</span>
    ) : (
      ''
    )}
    <label className="switch">
      <input
        name={name}
        type="checkbox"
        onChange={handleChange}
        checked={selectedValue}
      />
      <span className="slider" />
    </label>
  </>
);

ToggleSwitch.propTypes = {
  handleChange: PropTypes.func,
  labelName: PropTypes.string,
  name: PropTypes.string,
  selectedValue: PropTypes.bool,
};

export default ToggleSwitch;
