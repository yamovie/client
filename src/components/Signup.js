import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userServices from '../utils/userServices';

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
  }

  /**
  * submit user information to signup
  * if successful redirect to homepage
  */
  handleSubmit = e => {
    e.preventDefault();
    userServices.signup(this.state).then(() => {
      this.props.handleSignup();
      this.props.history.push('/');
    }).catch(err => this.setState({ message: "Invalid Information." }));
  }

  isFormInvalid() {
    const { email, fullName, pw, pwConfirm } = this.state;
    return !(fullName && email && pw === pwConfirm);
  }

  render() {
    const { email, fullName, pw, pwConfirm, message } = this.state;
    return (
      <div className="signup">
        <header>Signup</header>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => this.handleChange('email', e)} />
          <br />
          <input type="name" placeholder="First and Last Name" value={fullName} onChange={(e) => this.handleChange('fullName', e)} />
          <br />
          <input type="password" placeholder="Password" value={pw} onChange={(e) => this.handleChange('pw', e)} />
          <br />
          <input type="password" placeholder="Password Confirmation" value={pwConfirm} onChange={(e) => this.handleChange('pwConfirm', e)} />
          <div>
            <button type="button" onClick={this.handleSubmit}> Signup </button>
            &nbsp; &nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </form>
        { message && <span>{message}</span> }
      </div>
    );
  }
}

export default Signup;
