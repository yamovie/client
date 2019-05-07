import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userServices from '../utils/userServices';
import { GoogleLogin } from '.';
import Swal from 'sweetalert2';
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
        })
      )
  };

  isFormInvalid(e) {
    const { email, fullName, pw, pwConfirm } = this.state;
    let emailValid;
    let passwordValid;
    let formValid = false;
    if (fullName && email && pw === pwConfirm) {
      // regex
      emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      emailValid ? checkPw(e)
      : Swal.fire({
        position: 'top-end',
        type: 'error',
        text: 'Invalid Email!',
        showConfirmButton: false,
        timer: 1200,
      });
      
      function checkPw(e) {
        passwordValid = pw.length >= 6;
        passwordValid ? formValid = true
        : Swal.fire({
          position: 'top-end',
          type: 'error',
          text: 'Password is too short!',
          showConfirmButton: false,
          timer: 1200,
        });
      }

      if (formValid) this.handleSubmit(e);
    }
  }

  render() {
    const { email, fullName, pw, pwConfirm } = this.state;
    return (
      <div className="signup-page">
        <div className="signup">
          <div className="form-container">
            <form onSubmit={e => this.isFormInvalid(e)}>
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
                  name="email"
                  onChange={e => this.handleChange('email', e)}
                />
                <input
                  className="signup-input"
                  type="name"
                  placeholder="First and Last Name"
                  value={fullName}
                  name="fullName"
                  onChange={e => this.handleChange('fullName', e)}
                />
                <input
                  className="signup-input"
                  type="password"
                  placeholder="Password"
                  value={pw}
                  name="pw"
                  onChange={e => this.handleChange('pw', e)}
                />
                <input
                  className="signup-input"
                  type="password"
                  placeholder="Password Confirmation"
                  value={pwConfirm}
                  name="pwConfirm"
                  onChange={e => this.handleChange('pwConfirm', e)}
                />
              </div>
              <div className="button-container">
                <button
                  className="signup-submit"
                  type="button"
                  onClick={e => this.isFormInvalid(e)}
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
