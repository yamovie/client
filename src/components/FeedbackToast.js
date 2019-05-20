import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

class FeedbackToast extends Component {
  static propTypes = {
    storageType: PropTypes.shape(PropTypes.object),
  };

  static defaultProps = {
    storageType: sessionStorage,
  };

  constructor(props) {
    super(props);

    this.state = {
      render: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ render: true });
    }, 180000);
  }

  showAlert = () => {
    const { storageType } = this.props;
    const visited = storageType.alreadyVisited;
    if (!visited) {
      storageType.alreadyVisited = true;
      Swal.fire({
        position: 'bottom-end',
        title: '<strong> What do you think of our site? </strong>',
        type: 'question',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Give Feedback!',
        confirmButtonAriaLabel: 'Give Feedback!',
        width: 450,
      }).then(results => {
        if (results.value) {
          window.open('https://forms.gle/xJoQ54DaX4omm74Z7', '_blank');
        }
      });
    } else {
      this.setState({ render: false });
    }
  };

  render() {
    const { render } = this.state;
    //   const { show } = this.state;
    //   const handleHide = () => this.setState({ show: false });
    //   const handleShow = () => this.setState({ show: true });
    return render && <div className="toast-alert">{this.showAlert()}</div>;
  }
}

export default FeedbackToast;
