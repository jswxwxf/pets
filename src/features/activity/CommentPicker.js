import React, { Component } from 'react';

import styles from './CommentPicker.module.scss';

export default class CommentPicker extends Component {

  render() {
    return (
      <div className={styles['comment-picker']}>
        <div className={styles['bar']}></div>
        <div className={styles['comment-count']}>活动讨论 135</div>
      </div>
    )
  }
}