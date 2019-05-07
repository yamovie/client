import React from 'react';
import '../css/cssPages/AboutPage.css';

const AboutPage = () => (
  <div className="about-page">
    <header>
      <div className="overlay" />
      <video
        src="/images/backgrounds/about-me-videooverlay.mp4"
        muted
        autoPlay
        loop
      />
      <div className="mission">
        <h1>Our Mission</h1>
        <p>
          Our mission is to transform how consumers choose which movies to
          watch. Our technology intelligently curates a unique personal
          experience based on personality, viewing habits, and diverse interests
          to help ensure that every person loves the next movie more than the
          last.
        </p>
      </div>
    </header>
    <div className="info">
      <div className="info-panel">
        <img
          src="/images/sharedPics/warning-sign.png"
          alt="warning"
          className="about-icon"
        />
        <div>
          <h3>The Problem</h3>
          <p>
            Over 500,000 movies available. It&apos;s hard to find a movie to
            watch with so many options across mutiple platforms.
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
          src="/images/sharedPics/solution.png"
          alt="solution"
          className="about-icon"
        />
        <div>
          <h3>Solution</h3>
          <p>
            YaMovie offers a way to recieve personally curated movies all in one
            place and provide info on where to watch them.
          </p>
        </div>
      </div>
      <div className="info-panel">
        <img
          src="/images/sharedPics/book.png"
          alt="solution"
          className="about-icon"
        />
        <div>
          <h3>Story</h3>
          <p>
            Established in 2019 as part of the first Los Angeles cohort at
            TalentPath. YaMovie was created by a team of software engineers who
            are passionate about movies.
          </p>
        </div>
      </div>
    </div>
    <div className="avatar-section">
      <h2 className="avatar-header">Meet The Team</h2>
      <div className="avatar-list">
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src="/images/team/ivy.png"
              alt="Ivy Lim"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Ivy</h3>
          <h5 className="avatar-role">Project Manager / Software Engineer</h5>
          <p className="avatar-movie">Favorite Movies: Star Wars</p>
          <p className="avatar-show">Favorite Show: Game of Thrones</p>
          <p className="avatar-genre"> Favorite Genre: Sci-Fi</p>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src="/images/team/sam.png"
              alt="Sam Saks-Fithian"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Sam</h3>
          <h5 className="avatar-role">GitHub Manager / Software Engineer</h5>
          <p className="avatar-movie">Favorite Movies: MCU</p>
          <p className="avatar-show">Favorite Show: The Good Place</p>
          <p className="avatar-genre"> Favorite Genre: Action Comedy</p>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src="/images/team/kevin.png"
              alt="Kevin Baktiar"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Kevin</h3>
          <h5 className="avatar-role">Designer / Software Engineer</h5>
          <p className="avatar-movie">Favorite Movie: The Matrix</p>
          <p className="avatar-show">Favorite Show: New Girl</p>
          <p className="avatar-genre"> Favorite Genre: Sci-Fi</p>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src="/images/team/hans.png"
              alt="Hans Hanken"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Hans</h3>
          <h5 className="avatar-role">Flex / Software Engineer</h5>
          <p className="avatar-movie">Favorite Movies: The Lord of the Rings</p>
          <p className="avatar-show">Favorite Show: Brooklyn Nine Nine</p>
          <p className="avatar-genre"> Favorite Genre: Adventure</p>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src="/images/team/will.png"
              alt="Will Dale"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Will</h3>
          <h5 className="avatar-role">&lsquo;HR&rsquo; / Software Engineer</h5>
          <p className="avatar-movie">Favorite Movie: The Producers</p>
          <p className="avatar-show">Favorite Show: The Wire</p>
          <p className="avatar-genre"> Favorite Genre: Historical Drama</p>
        </div>
        <div className="avatar-container">
          <div className="avatar-item">
            <img
              src="/images/team/glen.png"
              alt="Glen Paul Florendo"
              className="avatar-image"
            />
          </div>
          <h3 className="avatar-name">Glen</h3>
          <h5 className="avatar-role">Back-End Lead / Software Engineer</h5>
          <p className="avatar-movie">
            Favorite Movie: Spider-Man: Into the Spider-Verse
          </p>
          <p className="avatar-show">Favorite Show: The Office</p>
          <p className="avatar-genre"> Favorite Genre: Action</p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
