import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import userServices from '../utils/userServices';

import '../css/Signup.css';

// mport GoogleSvg from './GoogleSvg';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullName: '',
      pw: '',
      pwConfirm: '',
      message: '',
    };
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  /**
   * submit user information to signup
   * if successful redirect to homepage
   */
  handleSubmit = e => {
    const { handleSignup, history } = this.props;
    e.preventDefault();
    userServices
      .signup(this.state)
      .then(() => {
        handleSignup();
        history.push('/');
      })
      .catch(err => this.setState({ message: 'Invalid Information!' }));
  };

  isFormInvalid() {
    const { email, fullName, pw, pwConfirm } = this.state;
    return !(fullName && email && pw === pwConfirm);
  }

  render() {
    const { email, fullName, pw, pwConfirm, message } = this.state;
    return (
      <div className="signup-page">
        <div className="signup">
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <img
                className="popcorn-logo"
                src="/images/popcornKernal.png"
                alt="Broken"
              />
              <header>Signup with YaMovie!</header>
              <div className="input-container">
                <input
                  className="signup-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => this.handleChange('email', e)}
                />
                <input
                  className="signup-input"
                  type="name"
                  placeholder="First and Last Name"
                  value={fullName}
                  onChange={e => this.handleChange('fullName', e)}
                />
                <input
                  className="signup-input"
                  type="password"
                  placeholder="Password"
                  value={pw}
                  onChange={e => this.handleChange('pw', e)}
                />
                <input
                  className="signup-input"
                  type="password"
                  placeholder="Password Confirmation"
                  value={pwConfirm}
                  onChange={e => this.handleChange('pwConfirm', e)}
                />
              </div>
              <div className="button-container">
                <button
                  className="signup-submit"
                  type="button"
                  onClick={this.handleSubmit}
                >
                  {' '}
                  Signup{' '}
                </button>
                <Link className="signup-cancel" to="/">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          {message && <span>{message}</span>}
          <a href="https://yamovie-server.herokuapp.com/auth/google" className="button">
            <div className="google-link">
              <span className="svgIcon t-popup-svg">
                <svg className="svgIcon-use" width="25" height="37" viewBox="0 0 25 25">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                      fill="#34A853"
                    />
                    <path
                      d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
              </span>
              <span className="button-label">Signup with Google </span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSignup: Proptypes.func.isRequired,
};

export default Signup;
