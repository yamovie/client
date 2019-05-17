import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../../utils/fontAwesome';

class PasswordInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    }
  }

  togglePasswordVisibility() {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));
  }

  render() {
    const { isHidden } = this.state;
    const { name } = this.props;
    return (
      <div className="password-field">
        <input name={name} type={isHidden ? 'password' : 'text'} placeholder='Confirm password' />
        <FontAwesomeIcon icon='eye' className="show-password-toggle" onClick={() => this.togglePasswordVisibility()}/>
      </div>
    )
  }
}

const AccountSettings = () => {

  return (
    <div className='account-pane'>
      <h1 className='account-title'>Account Settings</h1>
      <form className='account-settings-form'>
        <div className="form-input-group">
          <label>Old password</label>
          <PasswordInput name='oldPassword' />
        </div>
        <div className="form-input-group">
          <label>New Password</label>
          <PasswordInput name='newPassword' />
        </div>
        <div className="form-input-group">
          <label>Password Confirmation</label>
          <PasswordInput name='passwordConfirmation' />
        </div>
        <button type='submit'>Submit changes</button>
      </form>
    </div>
  );
}


export default AccountSettings;