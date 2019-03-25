/* eslint-disable react/no-unused-state */
import React from 'react';
import Botui from 'botui-react';
import '../css/ChatWindow.css';

class ChatWindow extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mood: 'funny',
  //     age: '12under',
  //     release: 'modern',
  //     ratings: 'dont-care',
  //     ratingsValue: {
  //      rottenTomato: 0,
  //      imdb: 0,
  //     },
  //     animated: true,
  //     foreign: true,
  //     indie: true
  //   } 
  // }

  componentDidMount() {
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
        this.botui.action.button({
          action: [
            { value: 'funny', text: 'Funny' },
            { value: 'sad', text: 'Sad' },
            { value: 'dramatic', text: 'Dramatic' },
            { value: 'scary', text: 'Scary' },
            { value: 'action-packed', text: 'Action Packed' },
            { value: 'romantic', text: 'Romantic' },
          ],
          delay: 3000,
        }).then(moodRes => {
          // this.setState({ mood: moodRes.value });
          if (moodRes.value) {
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
                { value: '12under', text: '12 and Under' },
                { value: '13to17', text: '13 - 17' },
                { value: '18to29', text: '18 - 29' },
                { value: '30to40', text: '30 - 40' },
                { value: '41to54', text: '41 - 54' },
                { value: '55plus', text: '55+' },
              ], 
              delay: 2000,
            }).then(ageRes => {
              // this.setState({ age: ageRes.value })
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
                  // this.setState({ release: 'releaseRes.value' })
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
                      // this.setState({ animated: animatedRes })
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
                          // this.setState({ foreign: foreignRes.value })
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
                              // this.setState({ indie: indieRes.value })
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
                                  // this.setState({ ratings: ratingRes.value })
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
                                      // this.setState({ ratingsValue: { rottenTomato: bothRes.value } })
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
                                        // this.setState({ ratingsValue: { imdb: bothResp.value } })
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
                                      this.setState({ 
                                        ratingsValue: { 
                                          rottenTomato: rottenTomatoRes.value,
                                        },
                                      });
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
                                      // this.setState({ ratingsValue: { imdb: imdbResp.value } })
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

  render() {
    return (
      // eslint-disable-next-line no-return-assign
      <Botui ref={cmp => this.botui = cmp} />
    );
  }
}

export default ChatWindow;

