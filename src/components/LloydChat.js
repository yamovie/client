import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWindow from './ChatWindow';
import '../css/LloydChat.css';

class LloydChat extends Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    action: PropTypes.arrayOf(PropTypes.string).isRequired,
    animationId: PropTypes.string.isRequired,
  };

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
  };

  render() {
    const { isChatVisible } = this.state;
    const { getMovieResults, action, animationId } = this.props;
    return (
      <div id="lloyd-outline">
        <button
          id="lloyd-button-wrapper"
          type="button"
          onClick={this.toggleChatWindow}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/Lloyd.png`}
            alt="Talk to Lloyd!"
            id="chatbot-btn"
          />
        </button>
        {isChatVisible && (
          <ChatWindow
            toggleChat={this.toggleChatWindow}
            isChatVisible={isChatVisible}
            getMovieResults={getMovieResults}
            action={action}
            animationId={animationId}
          />
        )}
      </div>
    );
  }
}

export default LloydChat;
