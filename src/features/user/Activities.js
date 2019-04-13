import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

import { inject } from '../../config';

import { Container } from 'templates';

import styles from './Activities.module.scss';

const tabs = [
  { title: '全部活动' },
  { title: '待开始' },
  { title: '进行中' },
  { title: '已结束' },
];

export default class ActivitiesTabs extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  state = {
    activities: null
  };

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    let result = this.activityCtrl.getActivities();
    this.setState({
      activities: result.data
    });
  }

  render() {
    return (
      <Container className={styles['activities-page']}>
        <Tabs tabs={tabs}>
          <Activities />
          <Activities />
          <Activities />
          <Activities />
        </Tabs>
      </Container>
    );
  }

}

class Activities extends Component {

  render() {
    return (
      <div className={styles['tab-content']}>
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
        <ActivityCard />
      </div>
    )
  }

}

class ActivityCard extends Component {

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
        <div className={styles['info-status']}>进行中</div>
      </div>
    )
  }

}