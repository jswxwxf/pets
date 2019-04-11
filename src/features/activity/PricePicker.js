import React, { Component } from 'react';
import { Modal, Icon, WhiteSpace } from 'antd-mobile';

import { Footer } from './Attend';

import styles from './PricePicker.module.scss';

export default class PricePicker extends Component {

  render() {
    return (
      <Modal popup visible animationType="slide-up" transparent className={styles['price-picker']}>
        <div className={styles['header']}>
          <Icon type="cross" />
          <span className={styles['title']}>价格明细</span>
          <div></div>
        </div>
        <div className={styles['list-container']}>
          <div><span>报名费</span><span>￥10 × 2</span></div>
          <WhiteSpace />
          <div><span>保险费</span><span></span></div>
          <div className={styles['small']}><span>人身保险</span><span>￥10 × 2</span></div>
          <div className={styles['small']}><span>宠物保险</span><span>￥10 × 2</span></div>
        </div>
        <Footer showDetail={false} />
      </Modal>
    )
  }
}