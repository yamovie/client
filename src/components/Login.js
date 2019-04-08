import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import userServices from '../utils/userServices';
import '../css/Login.css';

class Login extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: '',
      message: '',
    };
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  handleSubmit = e => {
    const { handleLogin, history } = this.props;
    e.preventDefault();
    userServices
      .login(this.state)
      .then(() => {
        handleLogin();
        history.push('/');
      })
      .catch(err => this.setState({ message: `${err}: Invalid Credentials!` }));
  };

  render() {
    const { email, pw, message } = this.state;
    return (
      <div className="login-page">
        <div className="login">
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <img
                className="popcorn-logo"
                src="/images/popcornKernal.png"
                alt="YaMovie Popcorn"
              />
              <header>Log In To YaMovie!</header>
              <div className="input-container">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => this.handleChange('email', e)}
                />
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  value={pw}
                  onChange={e => this.handleChange('pw', e)}
                />
              </div>
              <div className="button-container">
                <button
                  className="login-submit"
                  type="button"
                  onClick={this.handleSubmit}
                >
                  {' '}
                  Log In{' '}
                </button>
                <Link className="login-cancel" to="/">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          {message && <span>{message}</span>}
          <GoogleLogin />
        </div>
      </div>
    );
  }
}

export default Login;
