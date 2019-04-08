/* eslint-disable react/no-unused-state */
import React from 'react';
import Botui from 'botui-react';
import PropTypes from 'prop-types';
import '../css/ChatWindow.css';

class ChatWindow extends React.Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    genreIds: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataObj: {},
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
        await this.eraQuestion();
        await this.animatedQuestion(genreIds);
        await this.foreignQuestion();
        await this.indieQuestion();
        await this.ratingsQuestion();
        this.resultsMessage(getMovieResults);
      } else {
        this.botui.message.bot({
          content: 'Okay, goodbye! 👋',
          delay: this.delays.response,
        });
      }
    });
  }

  // TODO: JDoc comment
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

  // TODO: JDoc comment
  moodQuestion = genreIds => {
    this.botui.message.bot({
      content: 'Okay! What kind of movie are you in the mood for?',
      delay: this.delays.response,
    });
    return this.botui.action
      .button({
        action: [
          { value: [genreIds.Comedy], text: 'Funny 😆' },
          { value: [genreIds.War, genreIds.Western], text: 'Sad 😭' },
          { value: [genreIds.Crime, genreIds.Mystery], text: 'Mysterious 🤔' },
          { value: [genreIds.Drama, genreIds.Thriller], text: 'Dramatic 😮' },
          { value: [genreIds.Horror, genreIds.Thriller], text: 'Scary 😱' },
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

  // TODO: JDoc comment
  ageQuestion = () => {
    this.botui.message.bot({
      content: 'What is your age range?',
      delay: this.delays.nextQ,
    });
    return this.botui.action
      .button({
        action: [
          { value: 'PG', text: '12 and Under' },
          { value: 'PG-13', text: '13 - 17' },
          { value: 'R', text: '18 +' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(ageRes => {
        this.setState({
          dataObj: {
            ...this.state.dataObj,
            mpaa: ageRes.value,
          },
        });
        this.botui.message.bot({
          content: 'Thanks!',
          delay: this.delays.response,
        });
      });
  };

  // TODO: JDoc comment
  eraQuestion = () => {
    this.botui.message.bot({
      content: 'Do you want to watch a classic or modern movie?',
      delay: this.delays.nextQ,
    });
    return this.botui.action
      .button({
        action: [
          { value: 'classic', text: 'Classic (before 1980)' },
          { value: 'in-between', text: 'In Between (1980-2010)' },
          { value: 'modern', text: 'Modern (after 2010)' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(eraRes => {
        switch (eraRes.value) {
        case 'classic':
          this.setState({
            dataObj: {
              ...this.state.dataObj,
              minYear: 0,
              maxYear: 1980,
            },
          });
          break;
        case 'in-between':
          this.setState({
            dataObj: {
              ...this.state.dataObj,
              minYear: 1980,
              maxYear: 2010,
            },
          });
          break;
        case 'modern':
          this.setState({
            dataObj: {
              ...this.state.dataObj,
              minYear: 2010,
              maxYear: 3000,
            },
          });
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

  // TODO: JDoc comment
  animatedQuestion = genreIds => {
    this.botui.message.bot({
      content: 'Do you like animated films?',
      delay: this.delays.nextQ,
    });
    return this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes 👍' },
          { value: false, text: 'No 👎' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(animRes => {
        if (animRes.value === true) {
          const array = [...this.state.dataObj.genres];
          array.push(genreIds.Animation);
          this.setState({
            dataObj: {
              ...this.state.dataObj,
              genres: array,
            },
          });
        }
        this.botui.message.bot({
          content: 'Cool!',
          delay: this.delays.response,
        });
      });
  };

  // TODO: JDoc comment
  foreignQuestion = () => {
    this.botui.message.bot({
      content: 'How about foreign films?',
      delay: this.delays.nextQ,
    });
    return this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes 👍' },
          { value: false, text: 'No 👎' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(forRes => {
        this.setState({
          dataObj: {
            ...this.state.dataObj,
            foreign: forRes.value,
          },
        });
        this.botui.message.bot({
          content: 'Great!',
          delay: this.delays.response,
        });
      });
  };

  // TODO: JDoc comment
  indieQuestion = () => {
    this.botui.message.bot({
      content: 'Do you like independent films?',
      delay: this.delays.nextQ,
    });
    return this.botui.action
      .button({
        action: [
          { value: true, text: 'Yes 👍' },
          { value: false, text: 'No 👎' },
        ],
        delay: this.delays.ansOptions,
      })
      .then(indieRes => {
        this.setState({
          dataObj: {
            ...this.state.dataObj,
            indie: indieRes.value,
          },
        });
        this.botui.message.bot({
          // TODO: Move this response to after a different question
          content: 'You have good taste!',
          delay: this.delays.response,
        });
      });
  };

  // TODO: JDoc comment
  ratingsQuestion = () => {
    this.botui.message.bot({
      content: 'What ratings do you care about?',
      delay: this.delays.nextQ,
    });
    return this.botui.action
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
      });
  };

  // TODO: JDoc comment
  rtQuestion = () => {
    this.botui.message.bot({
      content: 'Minimum Rotten Tomatoes rating?',
      delay: this.delays.response,
    });
    return this.botui.action
      .button({
        action: [
          { value: 60, text: '60%' },
          { value: 75, text: '75%' },
          { value: 0, text: 'No Minimum' },
        ],
        delay: this.delays.nextQ,
      })
      .then(rtRes => {
        this.setState({
          dataObj: {
            ...this.state.dataObj,
            rottenTomato: rtRes.value,
          },
        });
      });
  };

  // TODO: JDoc comment
  imdbQuestion = () => {
    this.botui.message.bot({
      content: 'Minimum IMDB rating?',
      delay: this.delays.response,
    });
    return this.botui.action
      .button({
        action: [
          { value: 5, text: '5/10' },
          { value: 7, text: '7/10' },
          { value: 0, text: 'No Minimum' },
        ],
        delay: this.delays.nextQ,
      })
      .then(imdbRes => {
        this.setState({
          dataObj: {
            ...this.state.dataObj,
            imdb: imdbRes.value,
          },
        });
      });
  };

  // TODO: JDoc comment
  resultsMessage = getMovieResults => {
    const { dataObj } = this.state;
    this.botui.message
      .bot({
        loading: true,
        content: 'Getting results now!',
        delay: this.delays.response,
      })
      .then(getMovieResults(dataObj));
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
