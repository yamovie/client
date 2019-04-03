import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userServices from '../utils/userServices';

class Login extends Component {
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
  }

  handleSubmit = e => {
    e.preventDefault();
    userServices.login(this.state).then(() => {
      this.props.handleLogin();
      this.props.history.push('/');
    }).catch(err => this.setState({ message: err }));
  }

  render() {
    const { email, pw } = this.state;
    return (
      <div className="login">
        <header>Log In</header>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => this.handleChange('email', e)} />
          <br />
          <input type="password" placeholder="Password" value={pw} onChange={(e) => this.handleChange('pw', e)} />
          <div>
            <button> Log In </button>
            &nbsp; &nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
