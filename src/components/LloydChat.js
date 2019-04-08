import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import '../css/LloydChat.css';

class LloydChat extends Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    genreIds: PropTypes.shape().isRequired,
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

  componentDidMount = () => {
    const visited = localStorage.alreadyVisited;
    if (visited) {
      this.setState({ isChatVisible: false });
    } else {
      localStorage.alreadyVisited = true;
      setTimeout(() => {
        this.setState({ isChatVisible: true });
      }, 6000);
    }
  };

  // componentWillUnmount = () => {
  //   clearTimeout(myTimeout);
  // }

  render() {
    const { isChatVisible } = this.state;
    const { getMovieResults, genreIds } = this.props;
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
            genreIds={genreIds}
          />
        )}
      </div>
    );
  }
}

export default LloydChat;
