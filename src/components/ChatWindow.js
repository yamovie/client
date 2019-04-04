/* eslint-disable react/no-unused-state */
import React from 'react';
import Botui from 'botui-react';
import PropTypes from 'prop-types';
import '../css/ChatWindow.css';

class ChatWindow extends React.Component {
  static propTypes = {
    getMovieResults: PropTypes.func.isRequired,
    action: PropTypes.arrayOf(PropTypes.string).isRequired,
    animationId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { action, animationId } = this.props;
    this.state = {
      allGenres: [],
      genres: [''], // => genre
      mpaa: 'R', // => mpaaRating
      minYear: 0, // => release date
      maxYear: 0,
      rottenTomato: 0, // => ratings
      imdb: 0,
      animated: true, // => genre animation
      foreign: true, // => originalLanguage =/= English
      indie: true, // => productionCompany does not contain one of 
      // the top ten hollywood production companies :
      action,
      animationId,
      dataObj: {},
    };
  }

  componentDidMount() {
    const { getMovieResults } = this.props;
    this.botui.message.bot({
      content: 'Hello, My name is Lloyd!',
      delay: 1000,
    });
    this.botui.message.bot({
      content: 'Do you need help finding a movie?',
      delay: 2000,
    });
    this.botui.action.button({
      action: [
        { value: true, text: 'Yes' },
        { value: false, text: 'No' },
      ],
      delay: 3000,
    }).then(res => {
      if (res.value) {
        this.botui.message.bot({
          content: 'Okay, What kind of movie are you in the mood for?',
          delay: 1000,
        });
        const { action } = this.state;
        this.botui.action.button({
          action,
          delay: 3000,
        }).then(genresRes => {
          this.setState({ genres: [genresRes.value] });
          if (genresRes.value) {
            this.botui.message.bot({
              content: 'Awesome!',
              delay: 1000,
            });
            this.botui.message.bot({
              content: 'What is your age range?',
              delay: 2000,
            });
            this.botui.action.button({
              action: [
                { value: 'PG', text: '12 and Under' },
                { value: 'PG-13', text: '13 - 17' },
                { value: 'R', text: '18 and over' },
              ],
              delay: 2000,
            }).then(mpaaRes => {
              this.setState({ mpaa: mpaaRes.value });
              if (mpaaRes.value) {
                this.botui.message.bot({
                  content: 'Thanks!',
                  delay: 1000,
                });
                this.botui.message.bot({
                  content: 'Do you want to watch a classic or modern movie?',
                  delay: 2000,
                });
                this.botui.action.button({
                  action: [
                    { value: 'classic', text: 'Classic' },
                    { value: 'modern', text: 'Modern' },
                    { value: 'in-between', text: 'In Between' },
                  ],
                  delay: 3000,
                }).then(releaseRes => {
                  if (releaseRes.value === 'classic') {
                    this.setState({
                      minYear: 0,
                      maxYear: 1980,
                    });
                  } else if (releaseRes.value === 'in-between') {
                    this.setState({
                      minYear: 1980,
                      maxYear: 2010,
                    });
                  } else if (releaseRes.value === 'modern') {
                    this.setState({
                      minYear: 2010,
                      maxYear: 3000,
                    });
                  }
                  if (releaseRes.value) {
                    this.botui.message.bot({
                      content: 'Me too!',
                      delay: 1000,
                    });
                    this.botui.message.bot({
                      content: 'Do you like animated films?',
                      delay: 2000,
                    });
                    this.botui.action.button({
                      action: [
                        { value: true, text: 'Yes' },
                        { value: false, text: 'No' },
                      ],
                      delay: 3000,
                    }).then(animatedRes => {
                      if (animatedRes.value === true) {
                        const { animationId } = this.state;
                        this.setState(prevState => ({
                          genres: [...prevState.genres, animationId],
                        }));
                      }
                      if (animatedRes) {
                        this.botui.message.bot({
                          content: 'How about foreign films?',
                          delay: 1000,
                        });
                        this.botui.action.button({
                          action: [
                            { value: true, text: 'Yes' },
                            { value: false, text: 'No' },
                          ],
                          delay: 2000,
                        }).then(foreignRes => {
                          this.setState({ foreign: foreignRes.value });
                          if (foreignRes) {
                            this.botui.message.bot({
                              content: 'Great!',
                              delay: 1000,
                            });
                            this.botui.message.bot({
                              content: 'Do you like independent films?',
                              delay: 2000,
                            });
                            this.botui.action.button({
                              action: [
                                { value: true, text: 'Yes' },
                                { value: false, text: 'No' },
                              ],
                              delay: 3000,
                            }).then(indieRes => {
                              this.setState({ indie: indieRes.value });
                              if (indieRes) {
                                this.botui.message.bot({
                                  content: 'You have good taste!',
                                  delay: 1000,
                                });
                                this.botui.message.bot({
                                  content: 'What ratings do you care about?',
                                  delay: 2000,
                                });
                                this.botui.action.button({
                                  action: [
                                    { value: 'rotten-tomato', text: 'Rotten Tomato' },
                                    { value: 'imdb', text: 'IMDB' },
                                    { value: 'dont-care', text: 'I Dont Care' },
                                    { value: 'both', text: 'Both' },
                                  ],
                                  delay: 3000,
                                }).then(ratingRes => {
                                  if (ratingRes.value === 'both') {
                                    this.botui.message.bot({
                                      content: 'Minimum Rotten Tomato rating?',
                                      delay: 1000,
                                    });
                                    this.botui.action.button({
                                      action: [
                                        { value: 60, text: '60%' },
                                        { value: 75, text: '75%' },
                                        { value: 0, text: 'No Minimum' },
                                      ],
                                      delay: 2000,
                                    }).then(bothRes => {
                                      this.setState({ rottenTomato: bothRes.value });
                                      this.botui.message.bot({
                                        content: 'Minimum IMDB rating?',
                                        delay: 1000,
                                      });
                                      this.botui.action.button({
                                        action: [
                                          { value: 5, text: '5/10' },
                                          { value: 7, text: '7/10' },
                                          { value: 0, text: 'No Minimum' },
                                        ],
                                        delay: 2000,
                                      }).then(bothResp => {
                                        this.setState({ imdb: bothResp.value });
                                        this.botui.message.bot({
                                          loading: true,
                                          content: 'Getting results now!',
                                          delay: 1000,
                                        }).then(() => {
                                          const {
                                            genres,
                                            mpaa,
                                            minYear,
                                            maxYear,
                                            rottenTomato,
                                            imdb,
                                            foreign,
                                            indie,
                                          } = this.state;
                                          getMovieResults(genres,
                                            mpaa,
                                            minYear,
                                            maxYear,
                                            rottenTomato,
                                            imdb,
                                            foreign,
                                            indie);
                                        });
                                      });
                                    });
                                  }
                                  if (ratingRes.value === 'rotten-tomato') {
                                    this.botui.message.bot({
                                      content: 'Minimum Rotten Tomato rating?',
                                      delay: 1000,
                                    });
                                    this.botui.action.button({
                                      action: [
                                        { value: 60, text: '60%' },
                                        { value: 75, text: '75%' },
                                        { value: 0, text: 'No Minimum' },
                                      ],
                                      delay: 2000,
                                    }).then(rottenTomatoRes => {
                                      this.setState({ rottenTomato: rottenTomatoRes.value });
                                      this.botui.message.bot({
                                        loading: true,
                                        content: 'Getting results now!',
                                        delay: 1000,
                                      }).then(() => {
                                        const {
                                          genres,
                                          mpaa,
                                          minYear,
                                          maxYear,
                                          rottenTomato,
                                          imdb,
                                          foreign,
                                          indie,
                                        } = this.state;
                                        getMovieResults(genres,
                                          mpaa,
                                          minYear,
                                          maxYear,
                                          rottenTomato,
                                          imdb,
                                          foreign,
                                          indie);
                                      });
                                    });
                                  }
                                  if (ratingRes.value === 'imdb') {
                                    this.botui.message.bot({
                                      content: 'Minimum IMDB rating?',
                                      delay: 1000,
                                    });
                                    this.botui.action.button({
                                      action: [
                                        { value: 5, text: '5/10' },
                                        { value: 7, text: '7/10' },
                                        { value: 0, text: 'No Minimum' },
                                      ],
                                      delay: 2000,
                                    }).then(imdbResp => {
                                      this.setState({ imdb: imdbResp.value });
                                      this.botui.message.bot({
                                        loading: true,
                                        content: 'Getting results now!',
                                        delay: 1000,
                                      }).then(() => {
                                        const {
                                          genres,
                                          mpaa,
                                          minYear,
                                          maxYear,
                                          rottenTomato,
                                          imdb,
                                          foreign,
                                          indie,
                                        } = this.state;
                                        getMovieResults(genres,
                                          mpaa,
                                          minYear,
                                          maxYear,
                                          rottenTomato,
                                          imdb,
                                          foreign,
                                          indie);
                                      });
                                    });
                                  }
                                  if (ratingRes.value === 'dont-care') {
                                    this.botui.message.bot({
                                      loading: true,
                                      content: 'Getting results now!',
                                      delay: 1000,
                                    }).then(() => {
                                      const {
                                        genres,
                                        mpaa,
                                        minYear,
                                        maxYear,
                                        rottenTomato,
                                        imdb,
                                        foreign,
                                        indie,
                                      } = this.state;
                                      getMovieResults(genres,
                                        mpaa,
                                        minYear,
                                        maxYear,
                                        rottenTomato,
                                        imdb,
                                        foreign,
                                        indie);
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        this.botui.message.bot({
          content: 'Okay, goodbye',
          delay: 1000,
        });
      }
    });
    // .then...
  }
  /* eslint-disable */
  render() {
    return (
        <div>
        <div className="chat-window">
          <Botui ref={cmp => this.botui = cmp} />
        </div>
        <button onClick={this.getMovieResults}>Testing</button>
        </div>);
    /* eslint-enable */
  }
}

export default ChatWindow;

