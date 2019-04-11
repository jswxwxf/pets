import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

import { Container } from 'templates';

import styles from './Orders.module.scss';

const tabs = [
  { title: '全部订单' },
  { title: '待支付' },
  { title: '售后退款' }
];

export default class OrdersTabs extends Component {

  render() {
    return (
      <Container className={styles['orders-page']}>
        <Tabs tabs={tabs}>
          <Orders />
          <Orders />
          <Orders />
        </Tabs>
      </Container>
    );
  }

}

class Orders extends Component {

  render() {
    return (
      <div className={styles['tab-content']}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    )
  }

}

class OrderCard extends Component {

  render() {
    return (
      <div className={styles['info-container']}>
        <div>尤克里里制作手工优培班</div>
        <div className={styles['info-item']}>
          <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
          <span>3月26日（周二）9:00-12:00</span>
          <span></span>
        </div>
        <div className={styles['info-item']}>
          <span><img src={require('assets/images/icon-location.png')} alt="location" /></span>
          <span>浦东新区浦明路898号海航大厦3号楼25</span>
          <span></span>
        </div>
        <div className={styles['info-item']}>
          <span><img src={require('assets/images/icon-vip.png')} alt="vip" /></span>
          <span>已报名22人</span>
          <span></span>
        </div>
        <div className={styles['info-type']}>活动类型</div>
        <div className={styles['info-status']}>待支付</div>
      </div>
    )
  }

}