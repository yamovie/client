import React from 'react';

const ToggleSwitch = ({ labelName }) => (
  <>
    { labelName ?
      <span className="form-label switch-label">{labelName}</span>
      :
      ''
    }
    <label className="switch">
      <input type="checkbox" />
      <span className="slider" />
    </label>
  </>
 
);

export default ToggleSwitch;
