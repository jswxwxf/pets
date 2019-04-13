import React, { Component } from 'react';
import { Modal, List, Icon } from 'antd-mobile';

import styles from './SpecieField.module.scss';

export default class SpecieField extends Component {

  render() {
    return (
      <>
        <List.Item extra="请选择宝贝品种" arrow="horizontal">宝贝品种</List.Item>
        {/* <SpeciesPicker /> */}
      </>
    );
  }

}

class SpeciesPicker extends Component {
  render() {
    return (
      <Modal popup visible animationType="slide-up" className={styles['species-picker']}>
        <List renderHeader={() => (
          <div className={styles['header']}>
            <Icon type="cross" />
            <span className={styles['title']}>你的宝贝是？</span>
            <div></div>
          </div>
        )}>
          <List.Item arrow="horizontal">汪星人</List.Item>
          <List.Item arrow="horizontal">喵星人</List.Item>
          <List.Item>其他</List.Item>
        </List>
      </Modal>
    )
  }
}