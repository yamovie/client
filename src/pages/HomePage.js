import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const background = {
  backgroundImage: "url('/images/landing-bg-v1.jpg')",
};

const HomePage = () => (
  <div className="landing-body">
    <section id="link-container" style={background}>
      <div id="landing-quote">
        <h3>We find your movie,</h3>
        <h3>You bring the popcorn!</h3>
      </div>
      <div id="link-info">
        <Link to="/recommendations">Find YaMovie!</Link>
      </div>
    </section>

    <article id="overview">
      <img src="/images/logo-v3.png" alt="YaMovie!" />
      <span id="movie-summary">
        Our technology intelligently takes your unique personality, viewing habits, and
        diverse interests to curate the right movies for you!
      </span>
    </article>

    <section id="info-container">
      <div className="info-card">
        <img src="/images/browsing-white.png" alt="Browse" />
        <h2>Browse</h2>
        <p>
          Go through our collection of thousands of movies with up-to-date information,
          including critic ratings and links to streaming sources.
        </p>
      </div>
      <div className="info-card">
        <img src="/images/lloyd-white.png" alt="Chatbot" />
        <h2>Chatbot</h2>
        <p>
          On our site, you will meet Lloyd our chatbot! He will ask you a set of
          personalized questions to help you pinpoint the movie you are craving.
        </p>
      </div>
      <div className="info-card">
        <img src="/images/account-white.png" alt="Benefits" />
        <h2>Account Benefits</h2>
        <p>
          By signing up with YaMovie, we can save what you enjoy so it will be easier for
          you and more accurate for us to curate movies for you in the future!
        </p>
      </div>
    </section>
  </div>
);

export default HomePage;
