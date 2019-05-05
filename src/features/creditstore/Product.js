import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button, Modal, Flex } from 'antd-mobile';
import qs from 'query-string';

import { inject } from 'config';

import { Container } from 'templates';

import CommentPicker from './CommentPicker';
import ContactPicker from './ContactPicker';

import styles from './Product.module.scss';

export default class Product extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  state = {
    activity: null,
    modal1: true
  };

  id = qs.parse(this.props.location.search).id;

  componentDidMount() {
    this.loadData();
  }

  handleContact = () => {
    this.contactPicker.open();
  }

  async loadData() {
    if (!this.id) return;
    let result = await this.activityCtrl.getActivity(this.id);
    let avatars = await this.activityCtrl.getApplicantAvatars(this.id);
    this.setState({
      activity: result.data,
      avatars: avatars.data
    });
  }

  handleClick = () => {
    this.utilService.goto('/activity/Attend', { id: this.id });
  }

  render() {
    let { activity, avatars, modal1 } = this.state;
    if (!activity) return null;
    return (
      <Container className={styles['detail-page']}> 

        <Carousel infinite>
          <img src={require('assets/images/sample1.jpg')} alt="sample1" />
          <img src={require('assets/images/sample2.jpg')} alt="sample2" />
          <img src={require('assets/images/sample3.jpg')} alt="sample3" />
        </Carousel>

        <div className={styles['title-container']}>
          <div className={styles['title']}>产品名称这里全部显示，碰到多行就换行显示</div>
          <div className={styles['counts']}>
            <span><span className={styles['amounts']}>999积分</span>  剩余13件 </span>
          </div>
        </div>
        <div className={styles['detail-container']}>
          <div>商品详情</div>
          <div>
            <p>
              <span>{activity.content}</span>
            </p>
            <img src={require('assets/images/sample1.jpg')} alt="sample1" />
            <p>
              <span>商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情</span>
            </p>
            <img src={require('assets/images/sample2.jpg')} alt="sample2" />
          </div>
        </div>

        <div className={styles['notice-container']}>
          <div>兑换须知</div>
          <ol>
            <li>除商品本身不能正常兑换外，商品一经兑换，一律不退还积分，请用户兑换前仔细参照商品详情等重要信息； </li>
            <li>通过非法途径获得积分后进行的正常兑换行为，或不按商品使用规则进行兑换，平台有权不提供服务； </li>
            <li>凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</li>
          </ol>
        </div>

      </Container>
    );
  }

}
