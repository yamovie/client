/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class AccountSettings extends React.Component {

  render () {
    return (
      <div className='account-page'>
        <h1 className='account-title'>Account Settings</h1>
        <form className='account-settings-form'>
          <label>Email</label>
          <input type='text' name='email' placeholder='Type new email address'/>
          <label>New Password</label>
          <input name='newPassword' type='text' placeholder='Type new password' />
          <label>Password Confirmation</label>
          <input name='passwordConf' type='text' placeholder='Confirm password' />
          <button type='submit'>Submit changes</button>
        </form>
      </div>
    );
  }
}

export default AccountSettings;