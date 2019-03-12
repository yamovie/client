import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import LloydChat from './LloydChat';
import '../css/index.css';

class Homepage extends Component {
  render() {
    return (
      <div className="landing-body">
        <section id="link-container">
          <div id="landing-quote">
            <h3>We find your movie,</h3>
            <h3>You bring the popcorn!</h3>
          </div>
          <div id="link-info">
            <Link className="landing-link landing-color find" to="/browse">Find YaMovie!</Link>
            <Link className="landing-link landing-color signup" to="/">Sign Up!</Link>
          </div>
        </section>

        <article id="overview">
          <img src="./images/logo-v3.png" alt="" />
          <span id="movie-summary">
            Our technology intelligently takes your unique personality, viewing habits, and
            diverse interests to curate the right movies for you!
          </span>
        </article>

        <section id="card-container">
          <div id="full-screen">
            <div className="row">
            <article className="col-xs-4">
              <div className="cards">
                <span className="glyphicon glyphicon-flash icon"></span>
                <hr className="divider" />
                <h2 className="title">Browse</h2>
                <div className="info">
                  <hr className="divider" />
                  <br />
                  <p className="lead">
                    Go through our collection of thousands of movies with up-to-date
                    information, including critic ratings and links to streaming sources.
                  </p>
                </div>
              </div>
            </article>
            <article className="col-xs-4">
              <div className="cards">
                <span className="glyphicon glyphicon-bookmark icon"></span>
                <hr className="divider" />
                <h2 className="title">Chatbot</h2>
                <div className="info">
                  <hr className="divider" />
                  <br />
                  <p className="lead">
                    On our site, you will meet Lloyd our chatbot! He will ask you a set of
                    personalized questions to help you pinpoint the movie you are craving.
                  </p>
                </div>
              </div>
            </article>
            <article className="col-xs-4">
              <div className="cards">
                <span className="glyphicon glyphicon-ice-lolly-tasted icon"></span>
                <hr className="divider" />
                <h2 className="title">Benefits</h2>
                <div className="info">
                  <hr className="divider" />
                  <br />
                  <p className="lead">
                    By signing up with YaMovie, we are able to take what you enjoy and
                    curate recommendations
                  </p>
                </div>
              </div>
            </article>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Homepage;