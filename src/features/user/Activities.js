import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

import { inject } from '../../config';

import { Container } from 'templates';

import styles from './Activities.module.scss';

const tabs = [
  { title: '全部活动', type: 'all' },
  { title: '待开始', type: 'await' },
  { title: '进行中', type: 'underway' },
  { title: '已结束', type: 'finish' },
];

export default class ActivitiesTabs extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  state = {
    all: [],
    wait: [],
    underway: [],
    finished: [],
  };

  componentDidMount() {
    document.title = '我的活动'
    this.loadData();
  }

  async loadData(tab, index) {
    if (typeof tab === 'undefined') {
      let result = await this.activityCtrl.getMyActivities('all');
      this.setState(Object.assign({}, this.state, {
        all: result.data
      }));
    } else {
      if (index === 1) {
        let result = await this.activityCtrl.getMyActivities(tab.type);
        this.setState(Object.assign({}, this.state, {
          wait: result.data
        }));
      } else if (index === 2) {
        let result = await this.activityCtrl.getMyActivities(tab.type);
        this.setState(Object.assign({}, this.state, {
          underway: result.data
        }));
      } else {
        let result = await this.activityCtrl.getMyActivities(tab.type);
        this.setState(Object.assign({}, this.state, {
          finished: result.data
        }));
      }
    }
  }

  render() {
    let { all, wait, underway, finished } = this.state
    return (
      <Container className={styles['activities-page']}>
        <Tabs tabs={tabs} onChange={(tab, index) => { this.loadData(tab, index) }}>
            <Activities index="1" activities={all} />
            <Activities index="2" activities={wait} />
            <Activities index="3" activities={underway} />
            <Activities index="4" activities={finished} />
        </Tabs>
      </Container>
    );
  }

}

class Activities extends Component {

  render() {
    let activities = this.props.activities
    if (activities.length == 0) {
      return <div className={styles['tab-content-none']}>
        <p>你还没有参加任何活动哦～</p>
      </div>
    }
    return (
      <div className={styles['tab-content']}>
        {activities.map((activity, i) => (<ActivityCard key={activity.id} index={i} length={activities.length} activity={activity} />))}
      </div>
    )
  }

}

class ActivityCard extends Component {

  utilService = inject('utilService');

  handleClick = () => {
    this.utilService.goto('/user/activity', { id: this.props.activity.id });
  }

  render() {
    let activity = this.props.activity
    return (
      <div className={styles['info-container']} onClick={this.handleClick}>
        <div>{activity.title}</div>
        <div className={styles['info-item']}>
          <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
          <span>{activity.deadline}</span>
          <span></span>
        </div>
        <div className={styles['info-item']}>
          <span><img src={require('assets/images/icon-location.png')} alt="location" /></span>
          <span>{activity.location}</span>
          <span></span>
        </div>
        <div className={styles['info-item']}>
          <span><img src={require('assets/images/icon-vip.png')} alt="vip" /></span>
          <span>已报名{activity.applicant_num}人</span>
          <span></span>
        </div>
        <div className={styles['info-type']}>活动类型</div>
        <div className={styles['info-status']}>{activity.activity_status}</div>
      </div>
    )
  }

}