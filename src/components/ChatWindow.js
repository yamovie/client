import React from 'react';
import Botui from 'botui-react';

class ChatWindow extends React.Component {
  
  componentDidMount() {
    this.botui.message.bot({
      content: 'Hello, My name is Lloyd',
      delay: 1000,
    });
    this.botui.message.bot({
      content: 'How can I help?',
      delay: 2000,
    });
    this.botui.action.text({
      action: { placeholder: 'Enter your response here' }
    });
    // .then...
  }

  render() {
    return (
      <Botui ref={ cmp => this.botui = cmp } />
    )
  }
}

export default ChatWindow;
