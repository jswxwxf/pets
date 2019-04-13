import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem } from 'antd-mobile';
import qs from 'query-string';

import { inject } from '../../config';

import { Container } from 'templates';

// import PetsPicker from './PetsPicker';
// import PricePicker from './PricePicker';
// import PayPicker from './PayPicker';

import styles from './Attend.module.scss';

export default class Detail extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  id = qs.parse(this.props.location.search).id;

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (!this.id) return;
    let result = await this.activityCtrl.getActivity(this.id);
    this.setState({
      activity: result.data
    });
  }

  render() {
    return (
      <Container className={styles['attend-page']}>

        <div className={styles['info-container']}>
          <div>柯基线下同好聚会</div>
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
          <div className={styles['tags']}>
            <Tag>支持有条件退款</Tag>
          </div>
        </div>

        <WhiteSpace />

        <div className={styles['form-container']}>
          <div>
            <span>报名信息</span>
            <Button type="ghost" inline size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加报名人</Button>
          </div>
          <div>
            <Form />
          </div>
        </div>

        <div className={styles['footer-container']}>
          <Footer />
        </div>

        {/* <PetsPicker /> */}
        {/* <PricePicker /> */}
        {/* <PayPicker /> */}

      </Container>
    );
  }

}

export class Footer extends Component {

  static propTypes = {
    showDetail: PropTypes.bool
  }

  static defaultProps = {
    showDetail: true
  }

  render() {
    let { showDetail } = this.props;
    return (
      <div className={styles['footer']}>
        <div><span>实付：￥</span><span className={styles['price']}>10</span></div>
        <div>
          {showDetail && <span>价格明细</span>}
          <Button inline>提交订单</Button>
        </div>
      </div>
    )
  }
}

class Form extends Component {
  render() {
    return (
      <List>
        <InputItem placeholder="请填写姓名"><img src={require('assets/images/icon-user.png')} alt="user" /> 联系人</InputItem>
        <InputItem placeholder="请填写手机号"><img src={require('assets/images/icon-user.png')} alt="phone" /> 手机号码</InputItem>
        <List.Item arrow="horizontal" thumb={<img src={require('assets/images/icon-pet.png')} alt="pet" />}>携带宠物</List.Item>
      </List>
    )
  }
}
