import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2';

class FeedbackToast extends Component {
constructor(props) {
  super(props);

  this.state = {
    render: false,
  }
}

componentDidMount() {
  setTimeout(function() { 
      this.setState({render: true}) 
  }.bind(this), 180000)
}

showAlert = () => {
  Swal.fire({
    title: '<strong> What do you think of our site? </strong>',
    type: 'question',
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: '<a href="https://forms.gle/xJoQ54DaX4omm74Z7" style="text-decoration:none; color: white" target="blank">Give Feedback!</a>',
    confirmButtonAriaLabel: 'Give Feedback!',
  })
}

  render() {
    const { render } = this.state;
    //   const { show } = this.state;
    //   const handleHide = () => this.setState({ show: false });
    //   const handleShow = () => this.setState({ show: true });
    return(
      render && 
      <div className="toast-alert">
        { this.showAlert()
        }
      </div>
    )
  } 
}
      
export default FeedbackToast;

