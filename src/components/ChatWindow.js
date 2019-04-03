/* eslint-disable react/no-unused-state */
import React from 'react';
import Botui from 'botui-react';
import axios from 'axios';
import '../css/ChatWindow.css';


class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allGenres: [],
      genres: [''], // => genre
      maxAge: '', // => mpaaRating
      minYear: '', // => release date
      maxYear: '',
      rottenTomato: 0, // => ratings
      imdb: 0,
      animated: true, // => genre animation
      foreign: true, // => originalLanguage =/= English
      indie: true, // => productionCompany does not contain one of 
      // the top ten hollywood production companies :
      action: [],
      activateChat: false,
    };
  }

  /* eslint-disable */
  getMovieResults = () => {
    const {genres, minAge, maxAge, minYear, maxYear, rottenTomato, imdb, foreign, indie} = this.state
    axios
    .get('https://yamovie-server.herokuapp.com/api/genres')
    // axios.post('/api/movies/recommended', {
    //   genres,
    //   minAge,
    //   maxAge,
    //   minYear,
    //   maxYear,
    //   rottenTomato,
    //   imdb,
    //   foreign,
    //   indie,
    .then(response => {
      const genreArray = response.data
      let actionArray = new Array()
      for (let i=0; i < genreArray.length; i++) {
        actionArray.push({ value: genreArray[i]._id, text: genreArray[i].name })
      }
      this.setState({ action : actionArray })
    }).catch(error => {
      console.log(error)
    })
  }
  /* eslint-enable */

  async componentDidMount() {
    await this.getMovieResults();
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
          this.setState({ genres: genresRes.value });
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
                { value: 12, text: '12 and Under' },
                { value: 17, text: '13 - 17' },
                { value: 29, text: '18 - 29' },
                { value: 40, text: '30 - 40' },
                { value: 54, text: '41 - 54' },
                { value: 99, text: '55+' },
              ], 
              delay: 2000,
            }).then(ageRes => {
              this.setState({ maxAge: ageRes.value });
              if (ageRes.value) {
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
                      this.setState({ animated: animatedRes.value });
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
                                      });
                                    });
                                  } 
                                  if (ratingRes.value === 'dont-care') {
                                    this.botui.message.bot({
                                      loading: true,
                                      content: 'Getting results now!',
                                      delay: 1000,
                                    }).then(() => {
                                      // eslint-disable-next-line react/destructuring-assignment
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

