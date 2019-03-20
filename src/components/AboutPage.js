import React from 'react';
import Navbar from './Navbar';
import LloydChat from './LloydChat';
import '../css/about.css';

const AboutPage = () => (
  <div>
    <Navbar />
    <header>
      <video
        src={`${process.env.PUBLIC_URL}/images/about-me-videooverlay.mp4`}
        muted
        autoPlay
        loop
      />
      <div className="mission">
        <h1>Our Mission</h1>
        <p>
          Our mission is to transform how consumers choose which movies to watch. Our
          technology intelligently curates a unique personal experience based on
          personality, viewing habits, and diverse interests to help ensure that every
          person loves the next movie more than the last.
        </p>
      </div>
    </header>
    <div className="info">
      <div className="info-panel">
        <img
          src={`${process.env.PUBLIC_URL}/images/warning-sign.png`}
          alt="warning"
          className="about-icon"
        />
        <div>
          <h3>The Problem</h3>
          <p>
            Over 500,000 movies available. It&apos;s hard to find a movie to watch with so
            many options across mutiple platforms.
            <br />
            <br />
            - 4,010 movies on Netflix 2018
            <br />
            - 18,405 movies on Amazon Prime 2016
            <br />- Over 2,500 movies on Hulu 2018
          </p>
        </div>
      </div>
      <div className="info-panel">
        <img
          src={`${process.env.PUBLIC_URL}/images/solution.png`}
          alt="solution"
          className="about-icon"
        />
        <div>
          <h3>Solution</h3>
          <p>
            YaMovie offers a way to recieve personally curated movies all in one place and
            provide info on where to watch them.
          </p>
        </div>
      </div>
      <div className="info-panel">
        <img
          src={`${process.env.PUBLIC_URL}/images/book.png`}
          alt="solution"
          className="about-icon"
        />
        <div>
          <h3>Story</h3>
          <p>
            Established in 2019 as part of the first Los Angeles cohort at TalentPath.
            YaMovie was created by a team of software engineers who are passionate about
            movies.
          </p>
        </div>
      </div>
    </div>
    {/* <div className="lloyd-image">
          <img src={`${process.env.PUBLIC_URL}/images/Lloyd.png`} />
        </div>
        <div className="lloyd">
          <h2>Lloyd</h2>
          <p>Chatbot, AI Assistant, the Mastermind Behind YaMovie.</p>
        </div> */}
    <div className="avatar-section">
      <h2 className="avatar-header">Meet The Team</h2>
      <div className="avatar-list">
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/ivy.png`}
              alt="Ivy Lim"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Ivy</h3>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/sam.png`}
              alt="Sam Saks-Fithian"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Sam</h3>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/kevin.png`}
              alt="Kevin Baktiar"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Kevin</h3>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/hans.png`}
              alt="Hans Hanken"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Hans</h3>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/will.png`}
              alt="Will Dale"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Will</h3>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/glen.png`}
              alt="Glen Paul Florendo"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Glen</h3>
        </div>
      </div>
    </div>
    <LloydChat />
  </div>
);

export default AboutPage;
