import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const LloydChat = () => (
  <div id="lloyd-outline">
    <Link to="/questionform">
      <img
        src={`${process.env.PUBLIC_URL}/images/Lloyd.png`}
        alt="Talk to Lloyd!"
        id="chatbot-btn"
      />
    </Link>
  </div>
);

export default LloydChat;
