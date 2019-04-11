import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';

import './Spinner.scss';

export default class Spinner extends Component {

  state = {
    spinning: false,
    message: null
  }

  show(message) {
    this.setState({
      spinning: true,
      message
    });
  }

  hide() {
    this.setState({
      spinning: false,
      message: null
    });
  }

  render() {
    let { spinning, message } = this.state;
    if (!spinning) return null;
    return (
      <div className="app-spinner">
        <ActivityIndicator size="large" text={message} />
      </div>
    );
  }
}


