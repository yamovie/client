import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChatWindow } from '.';
import '../css/LloydChat.css';

class LloydChat extends Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    resetMovieResults: PropTypes.func.isRequired,
    genreIds: PropTypes.shape().isRequired,
  };

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
    const { getMovieResults, resetMovieResults, genreIds } = this.props;
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
            resetMovieResults={resetMovieResults}
            genreIds={genreIds}
          />
        )}
      </div>
    );
  }
}

export default LloydChat;
