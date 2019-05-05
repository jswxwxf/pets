import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { inject } from 'config';

import styles from './CommentPicker.module.scss';

export default class CommentPicker extends Component {

  bridgeService = inject('bridgeService');

  static propTypes = {
    activity: PropTypes.object,
  }

  static defaultProps = {
  }

  handleComment = () => {
    let { activity } = this.props;
    this.bridgeService.openActivityComment(activity.id);
  }

  render() {
    let { activity } = this.props;
    return (
      <div onClick={this.handleComment} className={styles['comment-picker']}>
        <div className={styles['bar']}></div>
        <div className={styles['comment-count']}>活动讨论 {activity.comments_count}</div>
      </div>
    )
  }
}