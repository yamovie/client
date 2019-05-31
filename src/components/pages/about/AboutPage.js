/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { TeamMember } from '../..';
import '../../../css/pages/about/AboutPage.css';

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
          src="/images/shared-pics/warning-sign.png"
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
          src="/images/shared-pics/solution.png"
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
          src="/images/shared-pics/book.png"
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
              emojiValue: '🍿: '
            },
            {
              name: 'Favorite Show',
              value: 'Game of Thrones',
              emojiName: 'Television',
              emojiValue: '📺: '
            },
            {
              name: 'Favorite Genre: ',
              value: 'Sci-Fi',
              emojiName: 'Galaxy and Alien',
              emojiValue: '🌌👽'
            }
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
              emojiValue: '🍿: '
            },
            {
              name: 'Favorite Show',
              value: 'The Good Place',
              emojiName: 'Television',
              emojiValue: '📺: '
            },
            {
              name: 'Favorite Genre: ',
              value: 'Action Comedy',
              emojiName: 'Bomb and laughing face',
              emojiValue: '💣😂'
            }
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
              emojiValue: '🍿: '
            },
            {
              name: 'Favorite Show ',
              value: 'New Girl',
              emojiName: 'Television',
              emojiValue: '📺: '
            },
            {
              name: 'Favorite Genre: ',
              value: 'Sci-fi',
              emojiName: 'Comet and UFO',
              emojiValue: '🌠🛸'
            }
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
              emojiValue: '🍿: '
            },
            {
              name: 'Favorite Show ',
              value: 'Brooklyn Nine Nine',
              emojiName: 'Television',
              emojiValue: '📺: '
            },
            {
              name: 'Favorite Genre: ',
              value: 'Adventure',
              emojiName: 'Cowboy and cat riding a dinosaur',
              emojiValue: '🤠🐱‍🐉'
            }
          ]}
          imgUrl="/images/team/hans.png"
        />
        <TeamMember
          name="Will"
          titles={["'HR'", 'Software Engineer']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'The Producers',
              emojiName: 'Popcorn',
              emojiValue: '🍿: '
            },
            {
              name: 'Favorite Show ',
              value: 'The Wire',
              emojiName: 'Television',
              emojiValue: '📺: '
            },
            {
              name: 'Favorite Genre: ',
              value: 'Historical Drama',
              emojiName: 'King and theatre masks',
              emojiValue: '🤴🎭'
            }
          ]}
          imgUrl="/images/team/will.png"
        />
        <TeamMember
          name="Glen"
          titles={['Back-end Lead', 'Software Engineer']}
          info={[
            {
              name: 'Favorite Movie',
              value: 'Spider-man: Into the Spider-Verse',
              emojiName: 'Popcorn',
              emojiValue: '🍿: '
            },
            {
              name: 'Favorite Show ',
              value: 'The Office',
              emojiName: 'Television',
              emojiValue: '📺: '
            },
            {
              name: 'Favorite Genre: ',
              value: 'Action',
              emojiName: 'Explosion and a cool smiley',
              emojiValue: '💥😎'
            }
          ]}
          imgUrl="/images/team/glen.png"
        />
      </div>
    </div>
  </div>
);

export default AboutPage;
