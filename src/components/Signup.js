import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import userServices from '../utils/userServices';
import { GoogleLogin } from '.';
import '../css/Signup.css';

class Signup extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullName: '',
      pw: '',
      pwConfirm: '',
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
        Swal.fire({
          position: 'top-end',
          type: 'success',
          text: 'Successful signup',
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

  isFormInvalid() {
    const { email, fullName, pw, pwConfirm } = this.state;
    return !(fullName && email && pw === pwConfirm);
  }

  render() {
    const { email, fullName, pw, pwConfirm } = this.state;
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
          <GoogleLogin />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
};

export default Signup;
