import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import classnames from 'classnames';

import './Container.scss';

class Container extends Component {

  static propTypes = {
    title: PropTypes.string,
    checkPath: PropTypes.string
  }

  static defaultProps = {
  }

  constructor(props, context) {
    super(props, context);
    if (props.title) document.title = props.title;
  }

  isShow() {
    let { checkPath, location } = this.props;
    if (!checkPath) return 'block';
    return location.pathname === checkPath ? 'block' : 'none';
  }

  render() {
    let { className, children } = this.props;
    return <div className={classnames("app-container", className)} style={{ display: this.isShow() }}>
      {children}
    </div>
  }

}

export default withRouter(Container);