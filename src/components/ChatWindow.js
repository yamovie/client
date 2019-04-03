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
    const delayPart1 = 500;
    const delayPart2 = 1250;
    const delayPart3 = 1750;

    this.botui.message.bot({
      content: 'Hello! 👋 My name is Lloyd! 😁',
      delay: 250,
    });
    this.botui.message.bot({
      content: 'Do you need help finding a movie? 🎬',
      delay: delayPart2,
    });
    this.botui.action.button({
      action: [
        { value: true, text: 'Yes' },
        { value: false, text: 'No' },
      ],
      delay: delayPart3,
    }).then(res => {
      if (res.value) {
        this.botui.message.bot({
          content: 'Okay! What kind of movie are you in the mood for?',
          delay: delayPart1,
        });
        this.botui.action.button({
          action: [
            { value: 'funny', text: 'Funny 😆' },
            { value: 'sad', text: 'Sad 😭' },
            { value: 'dramatic', text: 'Dramatic 😮' },
            { value: 'scary', text: 'Scary 😱' },
            { value: 'action-packed', text: 'Action Packed 🏃‍♂️' },
            { value: 'romantic', text: 'Romantic 💘' },
          ],
          delay: delayPart2,
        }).then(moodRes => {
          this.setState({ mood: moodRes.value });
          if (moodRes.value) {
            this.botui.message.bot({
              content: 'Awesome!',
              delay: delayPart1,
            });
            this.botui.message.bot({
              content: 'What is your age range?',
              delay: delayPart2,
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
              delay: delayPart3,
            }).then(ageRes => {
              this.setState({ age: ageRes.value });
              if (ageRes.value) {
                this.botui.message.bot({
                  content: 'Thanks!',
                  delay: delayPart1,
                });
                this.botui.message.bot({
                  content: 'Do you want to watch a classic or modern movie?',
                  delay: delayPart2,
                });
                this.botui.action.button({
                  action: [
                    { value: 'classic', text: 'Classic' },
                    { value: 'modern', text: 'Modern' },
                    { value: 'in-between', text: 'In Between' },
                  ],
                  delay: delayPart3,
                }).then(releaseRes => {
                  // this.setState({ release: 'releaseRes.value' })
                  if (releaseRes.value) {
                    this.botui.message.bot({
                      content: 'Me too!',
                      delay: delayPart1,
                    });
                    this.botui.message.bot({
                      content: 'Do you like animated films?',
                      delay: delayPart2,
                    });
                    this.botui.action.button({
                      action: [
                        { value: true, text: 'Yes 👍' },
                        { value: false, text: 'No 👎' },
                      ],
                      delay: delayPart3,
                    }).then(animatedRes => {
                      this.setState({ animated: animatedRes.value });
                      if (animatedRes) {
                        this.botui.message.bot({
                          content: 'How about foreign films?',
                          delay: delayPart1,
                        });
                        this.botui.action.button({
                          action: [
                            { value: true, text: 'Yes 👍' },
                            { value: false, text: 'No 👎' },
                          ],
                          delay: delayPart2,
                        }).then(foreignRes => {
                          this.setState({ foreign: foreignRes.value });
                          if (foreignRes) {
                            this.botui.message.bot({
                              content: 'Great!',
                              delay: delayPart1,
                            });
                            this.botui.message.bot({
                              content: 'Do you like independent films?',
                              delay: delayPart2,
                            });
                            this.botui.action.button({
                              action: [
                                { value: true, text: 'Yes 👍' },
                                { value: false, text: 'No 👎' },
                              ],
                              delay: delayPart3,
                            }).then(indieRes => {
                              this.setState({ indie: indieRes.value });
                              if (indieRes) {
                                this.botui.message.bot({
                                  // TODO: Move this response to after a different question
                                  content: 'You have good taste!',
                                  delay: delayPart1,
                                });
                                this.botui.message.bot({
                                  content: 'What ratings do you care about?',
                                  delay: delayPart2,
                                });
                                this.botui.action.button({
                                  action: [
                                    { value: 'rotten-tomato', text: 'Rotten Tomatoes' },
                                    { value: 'imdb', text: 'IMDB' },
                                    { value: 'dont-care', text: 'I Dont Care' },
                                    { value: 'both', text: 'Both' },
                                  ],
                                  delay: delayPart3,
                                }).then(ratingRes => {
                                  this.setState({ ratings: ratingRes.value });
                                  if (ratingRes.value === 'both') {
                                    this.botui.message.bot({
                                      content: 'Minimum Rotten Tomatoes rating?',
                                      delay: delayPart1,
                                    });
                                    this.botui.action.button({
                                      action: [
                                        { value: 60, text: '60%' },
                                        { value: 75, text: '75%' },
                                        { value: 0, text: 'No Minimum' },
                                      ],
                                      delay: delayPart2,
                                    }).then(bothRes => {
                                      this.setState({
                                        ratingsValue: {
                                          rottenTomato: bothRes.value,
                                        },
                                      });
                                      this.botui.message.bot({
                                        content: 'Minimum IMDB rating?',
                                        delay: delayPart1,
                                      });
                                      this.botui.action.button({
                                        action: [
                                          { value: 5, text: '5/10' },
                                          { value: 7, text: '7/10' },
                                          { value: 0, text: 'No Minimum' },
                                        ],
                                        delay: delayPart2,
                                      }).then(bothResp => {
                                        this.setState({ ratingsValue: { imdb: bothResp.value } });
                                        this.botui.message.bot({
                                          loading: true,
                                          content: 'Getting results now!',
                                          delay: delayPart1,
                                        });
                                      });
                                    });
                                  }
                                  if (ratingRes.value === 'rotten-tomato') {
                                    this.botui.message.bot({
                                      content: 'Minimum Rotten Tomatoes rating?',
                                      delay: delayPart1,
                                    });
                                    this.botui.action.button({
                                      action: [
                                        { value: 60, text: '60%' },
                                        { value: 75, text: '75%' },
                                        { value: 0, text: 'No Minimum' },
                                      ],
                                      delay: delayPart2,
                                    }).then(rottenTomatoRes => {
                                      this.setState({
                                        ratingsValue: {
                                          rottenTomato: rottenTomatoRes.value,
                                        },
                                      });
                                      this.botui.message.bot({
                                        loading: true,
                                        content: 'Getting results now!',
                                        delay: delayPart1,
                                      });
                                    });
                                  }
                                  if (ratingRes.value === 'imdb') {
                                    this.botui.message.bot({
                                      content: 'Minimum IMDB rating?',
                                      delay: delayPart1,
                                    });
                                    this.botui.action.button({
                                      action: [
                                        { value: 5, text: '5/10' },
                                        { value: 7, text: '7/10' },
                                        { value: 0, text: 'No Minimum' },
                                      ],
                                      delay: delayPart2,
                                    }).then(imdbResp => {
                                      this.setState({ ratingsValue: { imdb: imdbResp.value } });
                                      this.botui.message.bot({
                                        loading: true,
                                        content: 'Getting results now!',
                                        delay: delayPart1,
                                      });
                                    });
                                  }
                                  if (ratingRes.value === 'dont-care') {
                                    this.botui.message.bot({
                                      loading: true,
                                      content: 'Getting results now!',
                                      delay: delayPart1,
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
          content: 'Okay, goodbye! 👋',
          delay: delayPart1,
        });
      }
    });
    // .then...
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <div className="chat-window">
        {/* <Navbar /> */}
        <Botui ref={cmp => this.botui = cmp} />
      </div>
    );
  }
}

export default ChatWindow;

