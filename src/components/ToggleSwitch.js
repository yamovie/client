import React from 'react';
import PropTypes from 'prop-types';


const ToggleSwitch = ({ labelName, handleChange }) => (
  <>
    { labelName ?
      <span className="form-label switch-label">{labelName}</span>
      :
      ''
    }
    <label className="switch">
      <input type="checkbox" onChange={handleChange} />
      <span className="slider" />
    </label>
  </>
 
);

ToggleSwitch.propTypes = {
  handleChange: PropTypes.func,
  labelName: PropTypes.string,
};


export default ToggleSwitch;
