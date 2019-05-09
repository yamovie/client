import React from 'react';
import Botui from 'botui-react';
import PropTypes from 'prop-types';
import '../../css/movieDisplays/ChatWindow.css';

class ChatWindow extends React.Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    resetMovieResults: PropTypes.func.isRequired,
    enableChatClose: PropTypes.func.isRequired,
    disableChatClose: PropTypes.func.isRequired,
    toggleChat: PropTypes.func.isRequired,
    genreIds: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataObj: {
        certification: 'R',
        min_year: 0,
        max_year: 3000,
        foreign: true,
        indie: false,
        imdb: 0,
        rotten_tomatoes: 0,
        genres: [''],
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

  async componentDidMount() {
    const { genreIds, enableChatClose, disableChatClose } = this.props;
    await disableChatClose();
    await this.greetingQuestion();
    await this.moodQuestion(genreIds, enableChatClose);
    await disableChatClose();
    await this.ageQuestion(enableChatClose);
    await disableChatClose();
    await this.eraQuestion(enableChatClose);
    await disableChatClose();
    await this.animatedQuestion(genreIds, enableChatClose);
    await disableChatClose();
    await this.foreignQuestion(enableChatClose);
    await disableChatClose();
    await this.indieQuestion(enableChatClose);
    await disableChatClose();
    await this.ratingsQuestion(enableChatClose);
    await disableChatClose();
    await this.endChatFunc(enableChatClose, disableChatClose);
  }

  /**
   * Creates a Lloyd chat message based on the inputs
   * @param {String} message - sets the value of the message
   * @param {Number} delay - sets the time delay for the response
   * @param {Boolean} loading - (OPTIONAL) sets loading equal to true
   * @param {String} cssClass - (OPTIONAL) sets a custom CSS class for message
   * @returns {Object} returns message object
   */
  lloydMessage = async (message, delay, loading, cssClass) => {
    if (loading) {
      return this.botui.message.bot({
        loading: true,
        content: message,
        delay: delay,
      });
    } else if (cssClass === 'HAL') {
      return this.botui.message.bot({
        cssClass: 'botui-HAL9000',
        content: message,
        delay: delay,
      });
    } else {
      return this.botui.message.bot({
        content: message,
        delay: delay,
      });
    }
  };

  /**
   * Checks whether the chat is ended and if the BotUi still exists and
   * other things to determine if a question should be skipped.
   * @returns {boolean} True if question should be skipped, false otherwise
   */
  skipQuestion = () => {
    const { endChat } = this.state;
    if (endChat) {
      return true;
    }
    // if (!this.botui) { return true; }
    return false;
  };

  /**
   * Shows the initial greeting message, the question for if the user wants recs,
   * and then the answer option buttons
   * @returns {Promise} When fulfilled, promise will contain true or false if they want recs
   */
  greetingQuestion = async () => {
    if (this.skipQuestion()) {
      return;
    }

    this.lloydMessage('Hello! 👋 My name is Lloyd! 😁', this.delays.initial);
    await this.botui.message.bot({
      content:
        "I'm going to ask you a few questions so I can help you find a movie! 🎬",
      delay: this.delays.nextQ,
    });
  };

  /**
   * Asks about the user's mood, displays button response options, then sets the state
   * and displays a response message when they have selected an option
   */
  moodQuestion = async (genreIds, enableChatClose) => {
    if (this.skipQuestion()) {
      return;
    }
    this.lloydMessage(
      'What kind of movie are you in the mood for?',
      this.delays.response,
    );
    enableChatClose();
    await this.botui.action
      .button({
        action: [
          { value: [genreIds.Comedy], text: 'Funny 😆' },
          {
            value: [genreIds['War & Military'], genreIds.Western],
            text: 'Sad 😭',
          },
          {
            value: [genreIds.Crime, genreIds['Mystery & Thriller']],
            text: 'Mysterious 🤔',
          },
          {
            value: [genreIds.Drama, genreIds['War & Military']],
            text: 'Dramatic 😮',
          },
          { value: [genreIds.Thriller, genreIds.Crime], text: 'Thrilling 😲' },
          { value: [genreIds.Horror], text: 'Scary 😱' },
          {
            value: [
              genreIds['Action & Adventure'],
              genreIds['Sport & Fitness'],
            ],
            text: 'Action Packed 🏃‍💥',
          },
          { value: [genreIds.Romance], text: 'Romantic 😍' },
          {
            value: [genreIds.Fantasy, genreIds['Science-Fiction']],
            text: 'Fantastical 👽🧝‍',
          },
          {
            value: [genreIds.History, genreIds.Documentary],
            text: 'Informative 🌍',
          },
          { value: [genreIds['Kids & Family']], text: 'Heartwarming 👨‍👩‍👧‍👦' },
          { value: [genreIds['Music & Musical']], text: 'Musical 🎶' },
        ],
        delay: this.delays.nextQ,
      })
      .then(moodRes => {
        this.setState(prevState => ({
          dataObj: { ...prevState.dataObj, genres: moodRes.value },
        }));
        switch (moodRes.text) {
          case 'Funny 😆':
            this.lloydMessage('Hilarious! 🤡', this.delays.response);
            break;
          case 'Sad 😭':
            this.lloydMessage('Tragic! 💔', this.delays.response);
            break;
          case 'Mysterious 🤔':
            this.lloydMessage('OK, Sherlock! 🕵️‍', this.delays.response);
            break;
          case 'Dramatic 😮':
            this.lloydMessage(
              "All the world's a stage! 🎭",
              this.delays.response,
            );
            break;
          case 'Thrilling 😲':
            this.lloydMessage('Thrills and chills! 👀', this.delays.response);
            break;
          case 'Scary 😱':
            this.lloydMessage('Spooky! 👻', this.delays.response);
            break;
          case 'Action Packed 🏃‍💥':
            this.lloydMessage('ACTION! 💥💣', this.delays.response);
            break;
          case 'Romantic 😍':
            this.lloydMessage('Lovely! 💖', this.delays.response);
            break;
          case 'Fantastical 👽🧝‍':
            this.lloydMessage(
              'I can do that Dave! 🔴 ',
              this.delays.response,
              false,
              'HAL',
            );
            break;
          case 'Informative 🌍':
            this.lloydMessage(
              'The joy of discovery! ✨💡✨',
              this.delays.response,
            );
            break;
          case 'Heartwarming 👨‍👩‍👧‍👦':
            this.lloydMessage(
              'Fun for the whole family! 😄😄😄',
              this.delays.response,
            );
            break;
          case 'Musical 🎶':
            this.lloydMessage('The sound of music! 🎼', this.delays.response);
            break;
          default:
            this.lloydMessage('Awesome!', this.delays.response);
            break;
        }
      });
  };

  /**
   * Asks about the user's age, displays button response options, then sets the state
   * and displays a response message when they have selected an option
   */
  ageQuestion = async enableChatClose => {
    if (this.skipQuestion()) {
      return;
    }

    this.lloydMessage(
      'What rated content should I be looking for?',
      this.delays.nextQ,
    );
    enableChatClose();
    await this.botui.action
      .button({
        action: [
          { value: 'PG', text: 'Family friendly 👼 (G & PG only)' },
          {
            value: 'PG-13',
            text: 'Some mature content is fine 👨‍🎤 (includes PG-13)',
          },
          { value: 'R', text: 'All content is fine 🧑 (includes R)' },
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
          if (ageRes.value !== 'end') {
            this.lloydMessage('Got it!', this.delays.response);
          }
        }
      });
  };

  /**
   * Asks about the user's movie era preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  eraQuestion = async enableChatClose => {
    if (this.skipQuestion()) {
      return;
    }

    this.botui.message.bot({
      content: 'Do you want to watch a classic or modern movie?',
      delay: this.delays.nextQ,
    });
    enableChatClose();
    await this.botui.action
      .button({
        action: [
          { value: 'classic', text: 'Classic (before 1980)' },
          { value: 'in-between', text: 'In Between (1980-2010)' },
          { value: 'modern', text: 'Modern (after 2010)' },
          { value: 'no-preference', text: 'No preference' },
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
                min_year: 0,
                max_year: 1980,
              },
            }));
            this.lloydMessage(
              'Back to the glory days! 🌟',
              this.delays.response,
            );
            break;
          case 'in-between':
            this.setState(prevState => ({
              dataObj: {
                ...prevState.dataObj,
                min_year: 1980,
                max_year: 2010,
              },
            }));
            this.lloydMessage('The middle way! 🧘‍', this.delays.response);
            break;
          case 'modern':
            this.setState(prevState => ({
              dataObj: {
                ...prevState.dataObj,
                min_year: 2010,
                max_year: 3000,
              },
            }));
            this.lloydMessage('New and improved! 🆕✨', this.delays.response);
            break;
          case 'no-preference':
            this.lloydMessage('Sure thing!', this.delays.response);
            break;
          default:
            console.error('error');
        }
      });
  };

  /**
   * Asks about the user's animation preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  animatedQuestion = async (genreIds, enableChatClose) => {
    if (this.skipQuestion()) {
      return;
    }
    this.lloydMessage(
      'Do you want me to include animated movies in your results?',
      this.delays.nextQ,
    );
    enableChatClose();
    await this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes, I love animated movies! 👍' },
          { value: false, text: 'No, do not recommend them to me 👎' },
          { value: 'end', text: 'Show YaMovie results! 🍿' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(animRes => {
        if (animRes.value === 'end') {
          this.setState({ endChat: true });
        }
        const array = [...this.state.dataObj.genres];
        array.push(genreIds.Animation);
        this.setState(prevState => ({
          dataObj: {
            ...prevState.dataObj,
            genres: array,
          },
        }));
        if (animRes.value === true) {
          this.lloydMessage('Me too! 👾', this.delays.response);
        } else if (animRes.value === false) {
          this.lloydMessage('Gotcha!', this.delays.response);
        }
      });
  };

  /**
   * Asks about the user's foreign film preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  foreignQuestion = async enableChatClose => {
    if (this.skipQuestion()) {
      return;
    }

    this.lloydMessage('How about foreign films?', this.delays.nextQ);
    enableChatClose();
    await this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes, include them with my results  👍' },
          { value: false, text: 'No, exclude them from my results 👎' },
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
        if (forRes.value === true) {
          this.lloydMessage('Très bien! 🔵⚪🔴', this.delays.response);
        } else {
          this.lloydMessage("They're not for everyone", this.delays.response);
        }
      });
  };

  /**
   * Asks about the user's indie preference, displays button response options, then
   * sets the state and displays a response message when they have selected an option
   */
  indieQuestion = async enableChatClose => {
    if (this.skipQuestion()) {
      return;
    }

    this.lloydMessage('Do you like independent films?', this.delays.nextQ);
    enableChatClose();
    await this.botui.action
      .button({
        // TODO: Make this answer have more options that are more clear
        action: [
          {
            value: true,
            text: 'Yes, you can add indie films to my results 👍',
          },
          { value: false, text: 'No, exclude them please 👎' },
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
        if (indieRes.value !== 'end' && indieRes.value !== false) {
          this.lloydMessage(
            'A true film connoisseur! 🧐',
            this.delays.response,
          );
        } else if (indieRes.value === false) {
          this.lloydMessage('No problem!', this.delays.response);
        }
      });
  };

  /**
   * Asks about the user's ratings preference, displays button response options, then
   * follows up based on their response. Calls the sub-functions to get actual rating info
   * for each Rotten Tomatoes and IMDB ratings.
   */
  ratingsQuestion = async enableChatClose => {
    if (this.skipQuestion()) {
      return;
    }

    this.lloydMessage('What ratings do you care about?', this.delays.nextQ);
    // this.botui.message.bot({
    //   content: 'What ratings do you care about?',
    //   delay: this.delays.nextQ,
    // });
    enableChatClose();
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
          await this.rtQuestion(enableChatClose);
        }
        if (ratingsRes.value === 'both' || ratingsRes.value === 'imdb') {
          await this.imdbQuestion(enableChatClose);
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
  rtQuestion = async enableChatClose => {
    this.lloydMessage('Minimum Rotten Tomatoes rating?', this.delays.response);
    // this.botui.message.bot({
    //   content: 'Minimum Rotten Tomatoes rating?',
    //   delay: this.delays.response,
    // });
    enableChatClose();
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
  imdbQuestion = async enableChatClose => {
    this.lloydMessage('Minimum IMDB rating?', this.delays.response);
    // this.botui.message.bot({
    //   content: 'Minimum IMDB rating?',
    //   delay: this.delays.response,
    // });
    enableChatClose();
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
  resultsMessage = async getMovieResults => {
    if (!this.botui) {
      return;
    }

    const { dataObj } = this.state;
    this.lloydMessage('Alright, now Let me find YaMovie... 🔍😃').then(
      this.lloydMessage('Getting results now!', 6000, true).then(() => {
        getMovieResults(dataObj);
      }),
    );
  };

  async endChatFunc(enableChatClose, disableChatClose) {
    const { getMovieResults, toggleChat, resetMovieResults } = this.props;
    await disableChatClose();
    await resetMovieResults();
    await this.resultsMessage(getMovieResults);
    await setTimeout(() => {
      toggleChat();
      enableChatClose();
    }, 6000);
  }

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
