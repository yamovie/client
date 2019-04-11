// TODO: Remove this disable once Will's changes are merged in so the state is actually used
/* eslint-disable react/no-unused-state */
import React from 'react';
import Botui from 'botui-react';
import '../css/ChatWindow.css';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 'funny',
      age: '12under',
      era: 'modern',
      ratings: 'dont-care',
      ratingsValue: {
        rottenTomatoes: 0,
        imdb: 0,
      },
      animated: true,
      foreign: true,
      indie: true,
    };
    this.delays = {
      initial: 250,
      response: 500,
      nextQ: 1250,
      ansOptions: 1750,
    };
  }

  componentDidMount() {
    this.greetingQuestion().then(async res => {
      if (res.value) {
        await this.moodQuestion();
        await this.ageQuestion();
        await this.eraQuestion();
        await this.animatedQuestion();
        await this.foreignQuestion();
        await this.indieQuestion();
        await this.ratingsQuestion();
        this.resultsMessage();
      } else {
        this.botui.message.bot({
          content: 'Okay, goodbye! 👋',
          delay: this.delays.response,
        });
      }
    });
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
  moodQuestion = async () => {
    this.botui.message.bot({
      content: 'Okay! What kind of movie are you in the mood for?',
      delay: this.delays.response,
    });
    await this.botui.action
      .button({
        action: [
          { value: 'funny', text: 'Funny 😆' },
          { value: 'sad', text: 'Sad 😭' },
          { value: 'dramatic', text: 'Dramatic 😮' },
          { value: 'scary', text: 'Scary 😱' },
          { value: 'action-packed', text: 'Action Packed 🏃‍' },
          { value: 'romantic', text: 'Romantic 💘' },
          { value: 'silly', text: 'Silly 🤡' },
        ],
        delay: this.delays.nextQ,
      })
      .then(moodRes => {
        this.setState({ mood: moodRes.value });
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
          { value: '12under', text: '12 and Under' },
          { value: '13to17', text: '13 - 17' },
          { value: '18to29', text: '18 - 29' },
          { value: '30to40', text: '30 - 40' },
          { value: '41to54', text: '41 - 54' },
          { value: '55plus', text: '55+' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(ageRes => {
        this.setState({ age: ageRes.value });
        this.botui.message.bot({
          content: 'Thanks!',
          delay: this.delays.response,
        });
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
          { value: 'classic', text: 'Classic' },
          { value: 'modern', text: 'Modern' },
          { value: 'in-between', text: 'In Between' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(eraRes => {
        this.setState({ era: eraRes.value });
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
  animatedQuestion = async () => {
    this.botui.message.bot({
      content: 'Do you like animated films?',
      delay: this.delays.nextQ,
    });
    await this.botui.action
      .button({
        action: [{ value: true, text: 'Yes 👍' }, { value: false, text: 'No 👎' }],
        delay: this.delays.ansOptions,
      })
      .then(animRes => {
        this.setState({ animated: animRes.value });
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
        action: [{ value: true, text: 'Yes 👍' }, { value: false, text: 'No 👎' }],
        delay: this.delays.ansOptions,
      })
      .then(forRes => {
        this.setState({ foreign: forRes.value });
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
        action: [{ value: true, text: 'Yes 👍' }, { value: false, text: 'No 👎' }],
        delay: this.delays.ansOptions,
      })
      .then(indieRes => {
        this.setState({ indie: indieRes.value });
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
        if (ratingsRes.value === 'both' || ratingsRes.value === 'rotten-tomatoes') {
          await this.rtQuestion();
        }
        if (ratingsRes.value === 'both' || ratingsRes.value === 'imdb') {
          await this.imdbQuestion();
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
        ],
        delay: this.delays.nextQ,
      })
      .then(rtRes => {
        this.setState({ ratingsValue: { rottenTomatoes: rtRes.value } });
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
        ],
        delay: this.delays.nextQ,
      })
      .then(imdbRes => {
        this.setState({ ratingsValue: { imdb: imdbRes.value } });
      });
  };

  /**
   * Displays the loading message that its getting results
   */
  resultsMessage = () => {
    this.botui.message.bot({
      loading: true,
      content: 'Getting results now!',
      delay: this.delays.response,
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
