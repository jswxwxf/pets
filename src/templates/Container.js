import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Container.scss';

export default class Container extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
  }

  constructor(props, context) {
    super(props, context);
    if (props.title) document.title = props.title;
  }

  render() {
    let { className, children } = this.props;
    return <div className={classnames("app-container", className)}>
      {children}
    </div>
  }

}