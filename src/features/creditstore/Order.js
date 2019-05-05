import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import qs from 'query-string';
import Countdown from 'react-countdown-now';

import { inject } from '../../config';

import { Container } from 'templates';

import styles from './Order.module.scss';

export default class Order extends Component {

  utilService = inject('utilService');
  orderCtrl = inject('orderController');

  id = this.props.match.params.id;
  id = qs.parse(this.props.location.search).id;

  state = {
    order: {}
  };

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (!this.id) return;
    let result = await this.orderCtrl.getOrder(this.id);
    this.setState({
      order: result.data
    });
  }

  approved(order) {
    return <div className={styles['order-detail-box']}>

      <span className={styles['order-detail-header-title']}>待发货</span>
      <span className={styles['order-detail-header-subtitle']}>正在为您备货中，请耐心等待</span>
    </div>
  }

  waiting(order) {
    return <span>
      <span className={styles['order-detail-header-title']}>核验中</span>
      <span className={styles['order-detail-header-subtitle']}>您的资料还在核验中，预计24小时内就能够完成啦！</span>
    </span>
  }

  denied(order) {
    return <span>
      <span className={styles['order-detail-header-title']}>核验未通过</span>
      <span className={styles['order-detail-header-subtitle']}>原因：{order.denied_reason}</span>
    </span>
  }

  render() {
    let { order } = this.state
    var event = {}
    if (order.event) {
      event = order.event
    }
    let applicants = []
    if (order.applicants) {
      applicants = order.applicants
      // applicants.map((app) => {
      //   debugger
      //   // app.pets
      // })
    }
    return (
      <Container className={styles['order-detail-page']}>
        <div className={styles['order-detail-header']}>
          {this.approved(order)}
        </div>
        <div className={styles['info-container']}>
          <div className={styles['info-item']}>
            <div className={styles['info-img']}>
              <img src={'https://loremflickr.com/162/162/cat'} />
            </div>
            <div className={styles['info-detail']}>
              <div className={styles['info-title']}>
                产品名称默认保留两行，空间很大，如果两行显示不了…
            </div>
              <div className={styles['info-amounts']}>
                <span className={styles['price']}>300积分</span> <span className={styles['amount']}>x1</span>
              </div>
            </div>
          </div>
          <div className={styles['info-item']}>
            <div className={styles['info-img']}>
              <img src={'https://loremflickr.com/162/162/cat'} />
            </div>
            <div className={styles['info-detail']}>
              <div className={styles['info-title']}>
                毛绒玩具
            </div>
              <div className={styles['info-amounts']}>
                <span className={styles['price']}>90积分</span> <span className={styles['amount']}>x2</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['info-container']}>
          <div className={styles['info-block-title']}> 收货人信息 </div>
          <div className={styles['info-block-border-bottom']}>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>联系人</Flex.Item>
              <Flex.Item className={styles['info-right']}>方怡程</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>手机号</Flex.Item>
              <Flex.Item className={styles['info-right']}>13598745612</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>收货地址</Flex.Item>
              <Flex.Item className={styles['info-right']}>上海市 普陀区 武宁路1000号902室</Flex.Item>
            </Flex>
          </div>
          <div className={styles['info-block-title']}> 订单信息 </div>
          <div className={styles['info-block-border-bottom']}>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>订单号</Flex.Item>
              <Flex.Item className={styles['info-right']}>102937478437373</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>下单时间</Flex.Item>
              <Flex.Item className={styles['info-right']}>2019年3月30日 12:34</Flex.Item>
            </Flex>
          </div>

        </div>
      </Container>
    );
  }
}
