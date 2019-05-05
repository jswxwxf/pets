import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Button, WhiteSpace, Modal, List, Icon } from 'antd-mobile';
import Countdown from 'react-countdown-now';
import _ from 'lodash';
import qs from 'query-string';

import { inject } from '../../config';

import { Container } from 'templates';

import styles from './ActivitiesDetail.module.scss';

export default class ActivitiesDetail extends Component {

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

  approved() {
    return <span>
      <span className={styles['order-detail-header-title']}>核验通过，待付款</span>
      <span className={styles['order-detail-header-subtitle']}>恭喜您，活动报名资料已核验通过！名额已为您锁定，请务必在规定时间内完成报名费支付！</span>
      <div>
        <span>剩余支付时间</span>
        <span className={styles['count-down']}><Countdown date={Date.now() + 10800000} daysInHours={true} /></span>
      </div>
    </span>
  }

  pending() {
    return <span>
      <span className={styles['order-detail-header-title']}>核验中</span>
      <span className={styles['order-detail-header-subtitle']}>您的资料还在核验中，预计24小时内就能够完成啦！</span>
    </span>
  }

  denied() {
    return <span>
      <span className={styles['order-detail-header-title']}>核验未通过</span>
      <span className={styles['order-detail-header-subtitle']}>原因：提供的疫苗证信息已过期</span>
    </span>
  }

  payFooter() {
    return <div className={styles['footer-container']}>
      <Footer onPriceDetail={this.handlePriceDetail} onSubmit={this.handleSubmit} />
    </div>
  }

  notice() {
    return <>
      <div className={styles['info-block-title']}> 支付须知 </div>
      <div className={styles['info-block-border-bottom']}>
        <p>1. 活动结束后2个工作日内，将原路退回活动押金。</p>
        <p>2. 活动开始前48个小时内，可取消订单并无条件退回所有活动费用（包含押金及活动成本）。 </p>
        <p>3. 普通活动将在收到款项后，48小时内发布；若活动中添加投票、抽奖等插件内容，活动将在收到款项后72小时内发布。</p>
      </div>
    </>
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
          {order.approval_status == 'pending' ? this.pending() : ''}
          {order.approval_status == 'approved' ? this.approved() : ''}
          {order.approval_status == 'denied' ? this.denied() : ''}

          {/* <span className={styles['order-detail-header-title']}>审核中</span>
          <span className={styles['order-detail-header-subtitle']}>您的资料还在审核中，预计2个工作日就能够完成啦！</span>
          <span className={styles['order-detail-header-title']}>审核未通过</span>
          <span className={styles['order-detail-header-subtitle']}>原因：活动详情撰写不规范，活动详情内应包含有关活动的具体信息</span>
          <span className={styles['order-detail-header-title']}>审核通过，待支付押金</span>
          <span className={styles['order-detail-header-subtitle']}>恭喜您，活动发布申请审核通过！请务必在规定时间内支付押金，否则您本次的活动发布申请将被取消！</span>
          <div>
            <span>剩余支付时间</span>
            <span className={styles['count-down']}>72:00:00</span>
          </div> */}

        </div>
        <div className={styles['info-container'] + ' ' + styles['info-header']}>
          <span className={styles['info-title']}>{event.title}</span>
          <div className={styles['info-item'] + ' ' + styles['info-item-main']}>
            <span><img src={require('assets/images/icon-calendar.png')} alt="vip" /></span>
            <span>{event.start_at}</span>
            <span></span>
          </div>
          <div className={styles['info-item']}>
            <span><img src={require('assets/images/icon-location.png')} alt="vip" /></span>
            <span>{event.location}</span>
            <span></span>
          </div>
        </div>
        <div className={styles['info-container']}>
          <div className={styles['info-block-title']}> 价格明细 </div>
          <div className={styles['info-block-border-bottom']}>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>报名费</Flex.Item>
              <Flex.Item className={styles['info-right']}>￥10 × {applicants.length}</Flex.Item>
            </Flex>
            <Flex className={styles['info-block']}>
              <Flex.Item className={styles['info-left']}>保险费</Flex.Item>
            </Flex>
            <Flex className={styles['info-sub']}>
              <Flex.Item className={styles['info-left']}>人身保险</Flex.Item>
              <Flex.Item className={styles['info-right']}>￥10 × {applicants.length}</Flex.Item>
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
            {
              applicants.map(function (applicant, i) {
                return <div>
                  <Flex className={styles['info-block']}>
                    <Flex.Item className={styles['info-left']}>报名人</Flex.Item>
                    <Flex.Item className={styles['info-right']}>{applicant.name}</Flex.Item>
                  </Flex>
                  <Flex className={styles['info-block']}>
                    <Flex.Item className={styles['info-left']}>手机号</Flex.Item>
                    <Flex.Item className={styles['info-right']}>{applicant.mobile}</Flex.Item>
                  </Flex>
                  <Flex className={styles['info-block']}>
                    <Flex.Item className={styles['info-left']}>携带宠物</Flex.Item>
                    <Flex.Item className={styles['info-right']}>
                    </Flex.Item>
                  </Flex>
                </div>
              })
            }
          </div>
          {order.approval_status == 'approved' ? this.notice() : ''}
          <div className={styles['info-block-title']}> 订单信息 </div>
          <div className={styles['info-block-border']}>
            <Flex className={styles['info-sub']}>
              <Flex.Item className={styles['info-left']}>订单号</Flex.Item>
              <Flex.Item className={styles['info-right']}>{order.trade_no}</Flex.Item>
            </Flex>
            <Flex className={styles['info-sub']}>
              <Flex.Item className={styles['info-left']}>下单时间</Flex.Item>
              <Flex.Item className={styles['info-right']}>{order.created_at}</Flex.Item>
            </Flex>
          </div>
          <WhiteSpace size="lg"></WhiteSpace>
          <WhiteSpace size="lg"></WhiteSpace>
          <WhiteSpace size="lg"></WhiteSpace>
        </div>
        {order.approval_status == 'approved' ? this.payFooter() : ''}
      </Container>
    );
  }
}

export class Footer extends Component {

  static propTypes = {
    showDetail: PropTypes.bool,
    onSubmit: PropTypes.func,
    onPriceDetail: PropTypes.func
  }

  static defaultProps = {
    showDetail: true,
    onSubmit: _.noop,
    onPriceDetail: _.noop
  }

  render() {
    let { showDetail, onSubmit, onPriceDetail } = this.props;
    return (
      <div className={styles['footer']}>
        <div><span>实付：￥</span><span className={styles['price']}>10</span></div>
        <div>
          {showDetail && <span onClick={onPriceDetail}>联系平台</span>}
          <Button onClick={onSubmit} inline>确认支付</Button>
        </div>
      </div>
    )
  }
}
