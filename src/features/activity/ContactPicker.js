import React, { Component } from 'react';
import { Modal, List, Icon } from 'antd-mobile';

import styles from './ContactPicker.module.scss';

export default class ContactPicker extends Component {

  state = {
    visible: false
  }

  open() {
    this.setState({
      visible: true
    });
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    let { visible } = this.state;
    return (
      <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['contact-picker']}>
        <List renderHeader={() => (
          <div className={styles['header']}>
            <Icon onClick={this.handleClose} type="cross" />
            <span className={styles['title']}>联系活动发起人</span>
            <div></div>
          </div>
        )}>
          <List.Item thumb={<img src={require('assets/images/icon-user.png')} alt="user" />}><a href="tel://10085">拔打电话</a></List.Item>
          <List.Item thumb={<img src={require('assets/images/icon-mail.png')} alt="chat" />}>发送私信</List.Item>
        </List>
      </Modal>
    )
  }
}