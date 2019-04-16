// TODO: Remove this disable once Will's changes are merged in so the state is actually used
/* eslint-disable react/no-unused-state */
import React from 'react';
import Botui from 'botui-react';
import PropTypes from 'prop-types';
import '../css/ChatWindow.css';

class ChatWindow extends React.Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    resetMovieResults: PropTypes.func.isRequired,
    toggleChat: PropTypes.func.isRequired,
    genreIds: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataObj: {
        certification: 'R',
        minYear: 0,
        maxYear: 3000,
        foreign: true,
        indie: true,
        imdb: 0,
        rotten_tomatoes: 0,
      },
      endChat: false,
    };
    this.delays = {
      initial: 250,
      response: 500,
      nextQ: 1250,
      ansOptions: 1750,
    };
  }

  componentDidMount() {
    const { genreIds, getMovieResults } = this.props;
    this.greetingQuestion().then(async res => {
      if (res.value) {
        await this.moodQuestion(genreIds);
        await this.ageQuestion();
        if (this.state.endChat === true) {
          this.endChatFunc();
          return;
        }
        await this.eraQuestion();
        if (this.state.endChat === true) {
          this.endChatFunc();
          return;
        }
        await this.animatedQuestion(genreIds);
        if (this.state.endChat === true) {
          this.endChatFunc();
          return;
        }
        await this.foreignQuestion();
        if (this.state.endChat === true) {
          this.endChatFunc();
          return;
        }
        await this.indieQuestion();
        if (this.state.endChat === true) {
          this.endChatFunc();
          return;
        }
        await this.ratingsQuestion();
        if (this.state.endChat === true) {
          this.endChatFunc();
          return;
        }
        this.resultsMessage(getMovieResults);
      } else {
        this.botui.message.bot({
          content: 'Okay, goodbye! 👋',
          delay: this.delays.response,
        });
      }
    });
  }

  async endChatFunc() {
    const { getMovieResults, toggleChat, resetMovieResults } = this.props;
    await resetMovieResults();
    await this.resultsMessage(getMovieResults);
    await setTimeout(function() {
      toggleChat();
    }, 6000);
  }

  /**
   * Shows the initial greeting message, the question for if the user wants recs,
   * and then the answer option buttons
   * @returns {Promise} When fulfilled, promise will contain true or false if they want recs
   */
  greetingQuestion = () => {
    this.botui.message.bot({
      content: 'Hello! 👋 My name is Lloyd! 😁',
      delay: this.delays.initial,
    });
    this.botui.message.bot({
      content: 'Do you need help finding a movie? 🎬',
      delay: this.delays.nextQ,
    });
    return this.botui.action.button({
      action: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }],
      delay: this.delays.ansOptions,
    });
  };

  /**
   * Asks about the user's mood, displays button response options, then sets the state
   * and displays a response message when they have selected an option
   */
  moodQuestion = async genreIds => {
    this.botui.message.bot({
      content: 'Okay! What kind of movie are you in the mood for?',
      delay: this.delays.response,
    });
    await this.botui.action
      .button({
        action: [
          { value: [genreIds.Comedy], text: 'Funny 😆' },
          { value: [genreIds.War, genreIds.Western], text: 'Sad 😭' },
          { value: [genreIds.Crime, genreIds.Mystery], text: 'Mysterious 🤔' },
          { value: [genreIds.Drama], text: 'Dramatic 😮' },
          { value: [genreIds.Thriller], text: 'Thrilling 😲' },
          { value: [genreIds.Horror], text: 'Scary 😱' },
          {
            value: [genreIds.Action, genreIds.Adventure],
            text: 'Action Packed 🏃‍♀️💥',
          },
          { value: [genreIds.Romance], text: 'Romantic 😍' },
          {
            value: [genreIds.Fantasy, genreIds.ScienceFiction],
            text: 'Fantastical 👽🧝‍♀️',
          },
          {
            value: [genreIds.History, genreIds.Documentary],
            text: 'Informative 🌍',
          },
          { value: [genreIds.Family], text: 'Heartwarming 👨‍👩‍👧‍👦' },
          { value: [genreIds.Musical], text: 'Musical 🎶' },
        ],
        delay: this.delays.nextQ,
      })
      .then(moodRes => {
        this.setState(prevState => ({
          dataObj: { ...prevState.dataObj, genres: moodRes.value },
        }));
        this.botui.message.bot({
          content: 'Awesome!',
          delay: this.delays.response,
        });
      });
  };

  /**
   * Asks about the user's age, displays button response options, then sets the state
   * and displays a response message when they have selected an option
   */
  ageQuestion = async () => {
    this.botui.message.bot({
      content: 'What is your age range?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [
          { value: 'PG', text: '12 and Under' },
          { value: 'PG-13', text: '13 - 17' },
          { value: 'R', text: '18 +' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(ageRes => {
        if (ageRes.value === 'end') {
          this.setState({ endChat: true });
        } else {
          this.setState(prevState => ({
            dataObj: {
              ...prevState.dataObj,
              certification: ageRes.value,
            },
          }));
          this.botui.message.bot({
            content: 'Thanks!',
            delay: this.delays.response,
          });
        }
      });
  };

  /**
   * Asks about the user's movie era preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  eraQuestion = async () => {
    this.botui.message.bot({
      content: 'Do you want to watch a classic or modern movie?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [
          { value: 'classic', text: 'Classic (before 1980)' },
          { value: 'in-between', text: 'In Between (1980-2010)' },
          { value: 'modern', text: 'Modern (after 2010)' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(eraRes => {
        switch (eraRes.value) {
          case 'end':
            this.setState({ endChat: true });
            break;
          case 'classic':
            this.setState(prevState => ({
              dataObj: {
                ...prevState.dataObj,
                minYear: 0,
                maxYear: 1980,
              },
            }));
            break;
          case 'in-between':
            this.setState(prevState => ({
              dataObj: {
                ...prevState.dataObj,
                minYear: 1980,
                maxYear: 2010,
              },
            }));
            break;
          case 'modern':
            this.setState(prevState => ({
              dataObj: {
                ...prevState.dataObj,
                minYear: 2010,
                maxYear: 3000,
              },
            }));
            break;
          default:
            console.log('error');
        }
        this.botui.message.bot({
          content: 'Me too!',
          delay: this.delays.response,
        });
      });
  };

  /**
   * Asks about the user's animation preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  animatedQuestion = async genreIds => {
    this.botui.message.bot({
      content: 'Do you like animated films?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes 👍' },
          { value: false, text: 'No 👎' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(animRes => {
        if (animRes.value === 'end') {
          this.setState({ endChat: true });
        }
        if (animRes.value === true) {
          const array = [...this.state.dataObj.genres];
          array.push(genreIds.Animation);
          this.setState(prevState => ({
            dataObj: {
              ...prevState.dataObj,
              genres: array,
            },
          }));
        }
        this.botui.message.bot({
          content: 'Cool!',
          delay: this.delays.response,
        });
      });
  };

  /**
   * Asks about the user's foreign film preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  foreignQuestion = async () => {
    this.botui.message.bot({
      content: 'How about foreign films?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes 👍' },
          { value: false, text: 'No 👎' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(forRes => {
        if (forRes.value === 'end') {
          this.setState({ endChat: true });
        }
        this.setState(prevState => ({
          dataObj: {
            ...prevState.dataObj,
            foreign: forRes.value,
          },
        }));
        this.botui.message.bot({
          content: 'Great!',
          delay: this.delays.response,
        });
      });
  };

  /**
   * Asks about the user's indie preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  indieQuestion = async () => {
    this.botui.message.bot({
      content: 'Do you like independent films?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes 👍' },
          { value: false, text: 'No 👎' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(indieRes => {
        if (indieRes.value === 'end') {
          this.setState({ endChat: true });
        }
        this.setState(prevState => ({
          dataObj: {
            ...prevState.dataObj,
            indie: indieRes.value,
          },
        }));
        this.botui.message.bot({
          // TODO: Move this response to after a different question
          content: 'You have good taste!',
          delay: this.delays.response,
        });
      });
  };

  /**
   * Asks about the user's ratings preference, displays button response options, then
   * follows up based on their response. Calls the sub-functions to get actual rating info
   * for each Rotten Tomatoes and IMDB ratings.
   */
  ratingsQuestion = async () => {
    this.botui.message.bot({
      content: 'What ratings do you care about?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [
          { value: 'rotten-tomatoes', text: 'Rotten Tomatoes' },
          { value: 'imdb', text: 'IMDB' },
          { value: 'dont-care', text: 'I Dont Care' },
          { value: 'both', text: 'Both' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(async ratingsRes => {
        if (
          ratingsRes.value === 'both' ||
          ratingsRes.value === 'rotten-tomatoes'
        ) {
          await this.rtQuestion();
        }
        if (ratingsRes.value === 'both' || ratingsRes.value === 'imdb') {
          await this.imdbQuestion();
        }
        if (ratingsRes.value === 'dont-care') {
          this.setState({ endChat: true });
          this.setState(prevState => ({
            dataObj: {
              ...prevState.dataObj,
              rotten_tomatoes: 0,
              imdb: 0,
            },
          }));
        }
      });
  };

  /**
   * Sub-function for Rotten Tomatoes rating preferences --
   * Asks about the user's RT threshold preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  rtQuestion = async () => {
    this.botui.message.bot({
      content: 'Minimum Rotten Tomatoes rating?',
      delay: this.delays.response,
    });
    await this.botui.action
      .button({
        action: [
          { value: 60, text: '60%' },
          { value: 75, text: '75%' },
          { value: 0, text: 'No Minimum' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.nextQ,
      })
      .then(rtRes => {
        if (rtRes.value === 'end') {
          this.setState({ endChat: true });
        }
        this.setState(prevState => ({
          dataObj: {
            ...prevState.dataObj,
            rotten_tomatoes: rtRes.value,
          },
        }));
      });
  };

  /**
   * Sub-function for IMDB rating preferences --
   * Asks about the user's IMDB threshold preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  imdbQuestion = async () => {
    this.botui.message.bot({
      content: 'Minimum IMDB rating?',
      delay: this.delays.response,
    });
    await this.botui.action
      .button({
        action: [
          { value: 5, text: '5/10' },
          { value: 7, text: '7/10' },
          { value: 0, text: 'No Minimum' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.nextQ,
      })
      .then(imdbRes => {
        if (imdbRes.value === 'end') {
          this.setState({ endChat: true });
        }
        this.setState(prevState => ({
          dataObj: {
            ...prevState.dataObj,
            imdb: imdbRes.value,
          },
        }));
      });
  };

  /**
   * Displays the loading message that its getting results
   */
  resultsMessage = getMovieResults => {
    const { dataObj } = this.state;
    this.botui.message
      .bot({
        loading: true,
        content: 'Getting results now!',
        delay: this.delays.response,
      })
      .then(() => {
        getMovieResults(dataObj);
      });
  };

  render() {
    return (
      <div className="chat-window">
        {/* eslint-disable-next-line no-return-assign */}
        <Botui ref={cmp => (this.botui = cmp)} />
      </div>
    );
  }
}

export default ChatWindow;
