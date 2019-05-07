import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import userServices from '../../utils/userServices';
import Swal from 'sweetalert2';
import '../../css/login&Signup/login.css';

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
        Swal.fire({
          position: 'top-end',
          type: 'success',
          text: 'Successful Login',
          showConfirmButton: false,
          timer: 1000,
        });
        history.push('/');
      })
      .catch(err =>
        Swal.fire({
          position: 'top-end',
          type: 'error',
          text: err,
          showConfirmButton: false,
          timer: 1000,
        }),
      );
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
          <GoogleLogin />
        </div>
      </div>
    );
  }
}

export default Login;
