/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import TeamMember from './TeamMember';
import '../../../css/pages/AboutPage.css';

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
    <div className="avatar-section">
      <h2 className="avatar-header">Meet The Team</h2>
      <div className="avatar-list">
        <TeamMember
          name="Ivy"
          title="Product Manager"
          favMovie="Star Wars"
          favShow="Game of Thrones"
          favGenre="🌌👽 Sci-Fi"
          imgUrl="/images/team/ivy.png"
        />
        <TeamMember
          name="Sam"
          title="Github Manager"
          favMovie="MCU"
          favShow="The Good Place"
          favGenre="💣😂 Action Comedy"
          imgUrl="/images/team/sam.png"
        />
        <TeamMember
          name="Kevin"
          title="Designer"
          favMovie="The Matrix"
          favShow="New Girl"
          favGenre="🌠🛸Sci-Fi"
          imgUrl="/images/team/kevin.png"
        />
        <TeamMember
          name="Hans"
          title="Flex"
          favMovie="The Lord of the Rings"
          favShow="Brookyln Nine Nine"
          favGenre="🤠🐱‍🐉Adventure"
          imgUrl="/images/team/hans.png"
        />
        <TeamMember
          name="Will"
          title="'HR'"
          favMovie="The Producers"
          favShow="The Wire"
          favGenre="🤴🎭 Historical Drama"
          imgUrl="/images/team/will.png"
        />
        <TeamMember
          name="Glen"
          title="Back-end Lead"
          favMovie="Spiderman: Into the Spider-Verse"
          favShow="The Office"
          favGenre="💥😎 Action"
          imgUrl="/images/team/glen.png"
        />
      </div>
    </div>
  </div>
);

export default AboutPage;
