import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Avatar.module.scss';

export default class Avatar extends Component {

  static propTypes = {
    subject: PropTypes.object,
    size: PropTypes.oneOf(['small', 'normal']),
    customClass: PropTypes.string
  }

  static defaultProps = {
    size: 'normal',
    customClass: ''
  }

  render() {
    let { subject, size, customClass } = this.props;
    if (!subject) return;
    let className = classnames(styles[`avatar`], styles[`avatar-${size}`], customClass);
    if (subject.avatar) {
      return (
        <div className={className}>
          <img src={subject.avatar} alt="pet" />
        </div>
      );
    }
    var name = subject.name;
    if (name) {
      return (
        <div className={className}>
          <div>{name.substr(0, 1)}</div>
        </div>
      );
    }
  }

}