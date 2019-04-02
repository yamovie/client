import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LloydChat.css';

const LloydChat = () => (
  <div id="lloyd-outline">
    <Link to="/chat">
      <img
        src="/images/Lloyd.png"
        alt="Talk to Lloyd!"
        id="chatbot-btn"
      />
    </Link>
  </div>
);

export default LloydChat;
