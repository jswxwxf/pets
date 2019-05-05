import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem, Icon, Flex, Grid } from 'antd-mobile';
import qs from 'query-string';
import _ from 'lodash';

import { inject } from 'config';

import { Container } from 'templates';

import styles from './Orders.module.scss';

export default class Orders extends Component {

  utilService = inject('utilService');
  // activityCtrl = inject('activityController');

  id = qs.parse(this.props.location.search).id;

  state = {
    order: {},
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
  }

  render() {
    let { order } = this.state;
    return (
      <Container className={styles['store-orders-page']}>
        <OrderCard order={order} />
      </Container>
    );
  }

}
class OrderCard extends Component {

  utilService = inject('utilService');

  handleClick = () => {
    this.utilService.goto('/store/order', { id: this.props.order.id });
  }

  render() {
    let order = this.props.order
    return (
      <div className={styles['info-container']} onClick={this.handleClick}>
        <div className={styles['info-time']}>2019年3月30日 12:34</div>
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
        <div className={styles['info-type']}>待发货</div>
      </div>
    )
  }

}