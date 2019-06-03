/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { TeamMember } from '../..';
import '../../../css/pages/about/AboutPage.css';

const AboutPage = () => (
  <div className="about-page">
    <header>
      <div className="overlay" />
      <video src="/images/backgrounds/about-me-videooverlay.mp4" muted autoPlay loop />
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
          src="/images/shared-pics/warning-sign.png"
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
          src="/images/shared-pics/solution.png"
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
        <img src="/images/shared-pics/book.png" alt="solution" className="about-icon" />
        <div>
          <h3>Story</h3>
          <p>
            Established in 2019 as part of the first Los Angeles cohort at{' '}
            <a href="https://talentpath.com" target="_blank" rel="noopener noreferrer">
              Talent Path
            </a>
            . YaMovie was created by a team of software engineers who are passionate about
            movies.
          </p>
        </div>
      </div>
    </div>
    <div className="team-section">
      <h2 className="team-header">Meet The Team</h2>
      <div className="team-list">
        <TeamMember
          name="Ivy"
          titles={['Product Manager', 'Software Engineer']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'Star Wars',
              emojiName: 'Popcorn',
              emojiValue: '🍿: ',
            },
            {
              name: 'Favorite Show',
              value: 'Game of Thrones',
              emojiName: 'Television',
              emojiValue: '📺: ',
            },
            {
              name: 'Favorite Genre: ',
              value: 'Science Fiction',
              emojiName: 'Galaxy and Alien',
              emojiValue: '🌌👽',
            },
          ]}
          imgUrl="/images/team/ivy.png"
        />
        <TeamMember
          name="Sam"
          titles={['Github Manager', 'Software Engineer']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'MCU',
              emojiName: 'Popcorn',
              emojiValue: '🍿: ',
            },
            {
              name: 'Favorite Show',
              value: 'The Good Place',
              emojiName: 'Television',
              emojiValue: '📺: ',
            },
            {
              name: 'Favorite Genre: ',
              value: 'Action Comedy',
              emojiName: 'Bomb and laughing face',
              emojiValue: '💣😂',
            },
          ]}
          imgUrl="/images/team/sam.png"
        />
        <TeamMember
          name="Kevin"
          titles={['Designer', 'Software Engineer']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'The Matrix',
              emojiName: 'Popcorn',
              emojiValue: '🍿: ',
            },
            {
              name: 'Favorite Show ',
              value: 'New Girl',
              emojiName: 'Television',
              emojiValue: '📺: ',
            },
            {
              name: 'Favorite Genre: ',
              value: 'Science Fiction',
              emojiName: 'Comet and UFO',
              emojiValue: '🌠🛸',
            },
          ]}
          imgUrl="/images/team/kevin.png"
        />
        <TeamMember
          name="Hans"
          titles={['Flex', 'Software Engineer']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'The Lord of the Rings',
              emojiName: 'Popcorn',
              emojiValue: '🍿: ',
            },
            {
              name: 'Favorite Show ',
              value: 'Brooklyn Nine Nine',
              emojiName: 'Television',
              emojiValue: '📺: ',
            },
            {
              name: 'Favorite Genre: ',
              value: 'Adventure',
              emojiName: 'Cowboy and cat riding a dinosaur',
              emojiValue: '🤠🐱‍🐉',
            },
          ]}
          imgUrl="/images/team/hans2.png"
        />
        <TeamMember
          name="Will"
          titles={["Former 'HR'", 'Software Engineer', 'Now working at Disney']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'The Producers',
              emojiName: 'Popcorn',
              emojiValue: '🍿: ',
            },
            {
              name: 'Favorite Show ',
              value: 'The Wire',
              emojiName: 'Television',
              emojiValue: '📺: ',
            },
            {
              name: 'Favorite Genre: ',
              value: 'Historical Drama',
              emojiName: 'King and theatre masks',
              emojiValue: '🤴🎭',
            },
          ]}
          imgUrl="/images/team/will.png"
        />
        <TeamMember
          name="Glen"
          titles={['Former Back-End Lead', 'Software Engineer', 'Now working at Disney']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'Spider-Man: Into the Spider-Verse',
              emojiName: 'Popcorn',
              emojiValue: '🍿: ',
            },
            {
              name: 'Favorite Show ',
              value: 'The Office',
              emojiName: 'Television',
              emojiValue: '📺: ',
            },
            {
              name: 'Favorite Genre: ',
              value: 'Action',
              emojiName: 'Explosion and a cool smiley',
              emojiValue: '💥😎',
            },
          ]}
          imgUrl="/images/team/glen.png"
        />
        <div className="team-member" style={{ cursor: 'auto' }}>
          <img
            src="/images/yamovie/yamovie_bucket_black.png"
            alt="YaMovie Team"
            className="member-image"
          />
          <h3 className="member-name">YaMovie Team</h3>
          <h5 className="member-role">General Info</h5>
          <div className="member-info">
            <a
              href="mailto:yamovie.tp@gmail.com?Subject=YaMovie%20Contact"
              target="_top"
              rel="noopener noreferrer"
              className="contact"
            >
              Send Mail{' '}
              <span role="img" aria-label="mail">
                📧
              </span>
            </a>
            <br />
            <a
              href="https://forms.gle/xJoQ54DaX4omm74Z7"
              target="_blank"
              rel="noopener noreferrer"
              className="contact"
            >
              Submit Feedback
            </a>
            <br />
            <a
              href="https://github.com/yamovie"
              target="_blank"
              rel="noopener noreferrer"
              className="contact"
            >
              Fork Us On GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
