import React, { Component } from 'react';
import { ChatWindow } from '.';
import '../css/LloydChat.css';

class LloydChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChatVisible: false,
    };
  }

  toggleChatWindow = () => {
    this.setState(prevState => ({ isChatVisible: !prevState.isChatVisible }));
  };

  componentDidMount = () => {
    const visited = localStorage.alreadyVisited;
    if (visited) {
      this.setState({ isChatVisible: false });
    } else {
      localStorage.alreadyVisited = true;
      setTimeout(() => {
        this.setState({ isChatVisible: true });
      }, 30000);
    }
  };

  render() {
    const { isChatVisible } = this.state;
    return (
      <div id="lloyd-outline">
        <button id="lloyd-button-wrapper" type="button" onClick={this.toggleChatWindow}>
          <img src="/images/Lloyd.png" alt="Talk to Lloyd!" id="chatbot-btn" />
        </button>
        {isChatVisible && (
        <div>  
          <ChatWindow toggleChat={this.toggleChatWindow} isChatVisible={isChatVisible} />
          <button type="button" className="close-chat" onClick={this.toggleChatWindow}>
            &times;
          </button>
          </div>
        )}
      </div>
       
    );
  }
}

export default LloydChat;
