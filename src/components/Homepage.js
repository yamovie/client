import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import LloydChat from './LloydChat';
import '../css/Homepage.css';

const Homepage = () => (
  <div className="landing-body">
    <Navbar />
    <LloydChat />
    <section id="link-container">
      <div id="landing-quote">
        <h3>We find your movie,</h3>
        <h3>You bring the popcorn!</h3>
      </div>
      <div id="link-info">
        <Link to="/browse">Find YaMovie!</Link>
      </div>
    </section>

    <article id="overview">
      <img src={`${process.env.PUBLIC_URL}/images/logo-v3.png`} alt="YaMovie!" />
      <span id="movie-summary">
        Our technology intelligently takes your unique personality, viewing habits, and
        diverse interests to curate the right movies for you!
      </span>
    </article>

    <section id="info-container">
      <div className="info-card">
        <img src={`${process.env.PUBLIC_URL}/images/Lloyd.png`} alt="Browse" />
        <h2>Browse</h2>
        <p>
          Go through our collection of thousands of movies with up-to-date information,
          including critic ratings and links to streaming sources.
        </p>
      </div>
      <div className="info-card">
        <img src={`${process.env.PUBLIC_URL}/images/Lloyd.png`} alt="Chatbot" />
        <h2>Chatbot</h2>
        <p>
          On our site, you will meet Lloyd our chatbot! He will ask you a set of
          personalized questions to help you pinpoint the movie you are craving.
        </p>
      </div>
      <div className="info-card">
        <img src={`${process.env.PUBLIC_URL}/images/Lloyd.png`} alt="Benefits" />
        <h2>Account Benefits</h2>
        <p>
          By signing up with YaMovie, we can save what you enjoy so it will be easier for
          you and more accurate for us to curate movies for you in the future!
        </p>
      </div>
    </section>
  </div>
);

export default Homepage;
