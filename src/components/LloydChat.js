import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import '../css/LloydChat.css';

class LloydChat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChatVisible: false,
    };
  }

  toggleChatWindow = () => {
    const { isChatVisible } = this.state;
    if (isChatVisible) {
      this.setState({ isChatVisible: false });
    } else {
      this.setState({ isChatVisible: true });
    }
  }

  render() {
    const { isChatVisible } = this.state;
    return (
      <div id="lloyd-outline">
        <button id="lloyd-button-wrapper" type="button" onClick={this.toggleChatWindow}>
          <img
            src={`${process.env.PUBLIC_URL}/images/Lloyd.png`}
            alt="Talk to Lloyd!"
            id="chatbot-btn"
          />
        </button>
        {isChatVisible &&
        <ChatWindow toggleChat={this.toggleChatWindow} isChatVisible={isChatVisible} />}
      </div>
    );
  }
}

export default LloydChat;
