import React, { Component } from 'react';
import { Flex } from 'antd-mobile';

import { inject } from '../../config';

import { Container } from 'templates';

import styles from './OrderDetail.module.scss';

export default class OrderDetail extends Component {

  utilService = inject('utilService');
  orderCtrl = inject('orderController');

  id = this.props.match.params.id;

  state = {
    order: null
  };

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (!this.id) return;
    let result = this.orderCtrl.getOrder(this.id);
    this.setState({
      order: result.data
    });
  }

  render() {
    return (
      <Container className={styles['order-detail-page']}>
        <div className={styles['order-detail-header']}>
          <span className={styles['order-detail-header-title']}>核验通过，待付款</span>
          <span className={styles['order-detail-header-subtitle']}>恭喜您，活动报名资料已核验通过！名额已为您锁定，请务必在规定时间内完成报名费支付！</span>
          <div>
            <span>剩余支付时间</span>
            <span className={styles['count-down']}>3:00:00</span>
          </div>
        </div>
        <div className={styles['info-container'] + ' ' + styles['info-header']}>
          <span className={styles['info-title']}>柯基线下同好聚会</span>
          <div className={styles['info-item'] + ' ' + styles['info-item-main']}>
            <span><img src={require('assets/images/icon-calendar.png')} alt="vip" /></span>
            <span>3月26日（周二）9:00-12:00</span>
            <span></span>
          </div>
          <div className={styles['info-item']}>
            <span><img src={require('assets/images/icon-location.png')} alt="vip" /></span>
            <span>浦东新区 浦明路898号海航大厦3号楼9层</span>
            <span></span>
          </div>
        </div>
        <div className={styles['info-container']}>
          <div className={styles['info-block-title']}> 价格明细 </div>
          <div className={styles['info-block-border-bottom']}>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>报名费</Flex.Item>
              <Flex.Item className={styles['info-right']}>￥10 × 2</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>保险费</Flex.Item>
            </Flex>
            <Flex className={styles['info-sub']}>
              <Flex.Item className={styles['info-left']}>人身保险</Flex.Item>
              <Flex.Item className={styles['info-right']}>￥10 × 2</Flex.Item>
            </Flex>
            <Flex className={styles['info-sub']}>
              <Flex.Item className={styles['info-left']}>宠物保险</Flex.Item>
              <Flex.Item className={styles['info-right']}>￥10 × 2</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>总计</Flex.Item>
              <Flex.Item className={styles['info-right'] + ' ' + styles['info-total']}>￥60</Flex.Item>
            </Flex>
          </div>
          <div className={styles['info-block-border-bottom']}>
            <div className={styles['info-block-title']}> 报名信息 </div>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>报名人</Flex.Item>
              <Flex.Item className={styles['info-right']}>方怡程</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>手机号</Flex.Item>
              <Flex.Item className={styles['info-right']}>13598745612</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>携带宠物</Flex.Item>
              <Flex.Item className={styles['info-right']}>
              </Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>报名人</Flex.Item>
              <Flex.Item className={styles['info-right']}>方怡程</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>手机号</Flex.Item>
              <Flex.Item className={styles['info-right']}>13598745612</Flex.Item>
            </Flex>
          </div>
          <div className={styles['info-block-title']}> 支付须知 </div>
          <div>
            <p>1. 活动结束后2个工作日内，将原路退回活动押金。</p>
            <p>2. 活动开始前48个小时内，可取消订单并无条件退回所有活动费用（包含押金及活动成本）。 </p>
            <p>3. 普通活动将在收到款项后，48小时内发布；若活动中添加投票、抽奖等插件内容，活动将在收到款项后72小时内发布。</p>
          </div>
          <div className={styles['info-block-title']}> 支付须知 </div>
          <div>
            <p>1. 活动结束后2个工作日内，将原路退回活动押金。</p>
            <p>2. 活动开始前48个小时内，可取消订单并无条件退回所有活动费用（包含押金及活动成本）。 </p>
            <p>3. 普通活动将在收到款项后，48小时内发布；若活动中添加投票、抽奖等插件内容，活动将在收到款项后72小时内发布。</p>
          </div>
        </div>
      </Container>
    );
  }
}
