import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import qs from 'query-string';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import { Container } from 'templates';

import PetsField from 'shared/components/PetsField';

import PricePicker from './PricePicker';
// import PayPicker from './PayPicker';

import styles from './Attend.module.scss';

import AttendForm from './AttendForm';

export default class Attend extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  id = qs.parse(this.props.location.search).id;

  pricePicker;

  state = {
    activity: null,
    attendForms: []
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (!this.id) return;
    let result = await this.activityCtrl.getActivity(this.id);
    this.setState({
      activity: result.data,
      attendForms: [new AttendForm()]
    });
  }

  handleAddForm = () => {
    let { attendForms } = this.state;
    this.setState({
      attendForms: [new AttendForm(), ...attendForms]
    });
  }

  handlePriceDetail = () => {
    this.pricePicker.open();
  }

  handleSubmit = async () => {
    let { attendForms } = this.state;
    try {
      var result = await AttendForm.validateAll(attendForms);
      if (_.isEmpty(result)) {
        return this.utilService.alert('请提供报名人信息');
      }
    } catch (err) {
      let first = Utils.first(err);
      return this.utilService.alert(first.errors[0].message);
    }
    result = await this.activityCtrl.apply(this.id, AttendForm.toJson(result));
    this.utilService.replace(`/user/orders/${result.data.trade_no}`);
  }

  render() {
    let { attendForms } = this.state;
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
            <Button onClick={this.handleAddForm} type="ghost" inline size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加报名人</Button>
          </div>
          <div>
            {attendForms.map((attendForm) => (<Form key={attendForm.id} attendForm={attendForm} />))}
          </div>
        </div>

        <div className={styles['footer-container']}>
          <Footer onPriceDetail={this.handlePriceDetail} onSubmit={this.handleSubmit} />
        </div>

        <PricePicker id={this.id} ref={el => this.pricePicker = el} onSubmit={this.handleSubmit} />
        {/* <PayPicker /> */}

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
          {showDetail && <span onClick={onPriceDetail}>价格明细</span>}
          <Button onClick={onSubmit} inline>提交订单</Button>
        </div>
      </div>
    )
  }
}

class Form extends Component {

  static propTypes = {
    attendForm: PropTypes.object
  }

  componentDidMount() {
    let { form, attendForm } = this.props;
    attendForm.form = form;
  }

  render() {
    let { form, attendForm } = this.props;
    let { getFieldDecorator } = form;
    if (!attendForm) return null;
    return (
      <div className={styles['form']}>
        <List>
          {getFieldDecorator(...attendForm.name)(
            <InputItem placeholder="请填写姓名"><img src={require('assets/images/icon-user.png')} alt="user" /> 联系人</InputItem>
          )}
          {getFieldDecorator(...attendForm.mobile)(
            <InputItem placeholder="请填写手机号"><img src={require('assets/images/icon-user.png')} alt="phone" /> 手机号码</InputItem>
          )}
          {getFieldDecorator(...attendForm.pets)(
            <PetsField label='携带宠物' />
          )}
        </List>
      </div>
    )
  }

}

Form = createForm(AttendForm.options)(Form);