import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

import '../css/FeedbackToast.css'

export default class FeedbackToast extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props);

    this.state = { show: true };
  }

  render() {
    const { show } = this.state;
    const handleHide = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
      <div className="toast-alert">
        {/* <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        /> */}
        <Alert show={show} variant="success">
          <Alert.Heading>Hello!</Alert.Heading>
          <p>
          What do you think of our site?
          Visit our menu to be able to leave feedback!
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-success">
            Close me!
            </Button>
          </div>
        </Alert>

        {!show && <Button onClick={handleShow}>Show Alert</Button>}
      </div>
    );
  }
}
