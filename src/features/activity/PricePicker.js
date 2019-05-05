import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, WhiteSpace } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

import { Footer } from './Attend';

import AttendForm from './AttendForm';

import styles from './PricePicker.module.scss';

export default class PricePicker extends Component {

  activityCtrl = inject('activityController');

  static propTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: _.noop
  }

  state = {
    visible: false,
    prices: null
  }

  async open(forms) {
    this.forms = forms;
    await this.loadData();
    this.setState({
      visible: true
    });
  }

  async loadData() {
    let { id } = this.props;
    let result = await this.activityCtrl.getActivityPrices(id);
    console.log(result.data);
    this.setState({
      prices: result.data
    });
  }

  getPetsCount() {
    return _(this.forms)
      .map(form => form.form.getFieldValue('pets'))
      .flatten()
      .value()
      .length;
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    var { onSubmit, detail } = this.props;
    if (typeof detail == 'undefined') {
      var detail = [{
        pets: []
      }]
    }
    let { visible } = this.state;
    let petsCount = AttendForm.getPets(this.forms).length;
    return (
      <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent className={styles['price-picker']}>
        <div className={styles['header']}>
          <Icon onClick={this.handleClose} type="cross" />
          <span className={styles['title']}>价格明细</span>
          <div></div>
        </div>
        <div className={styles['list-container']}>
          <div><span>报名费</span><span>￥10 × {detail.length}</span></div>
          <WhiteSpace />
          <div><span>保险费</span><span></span></div>
          <div className={styles['small']}><span>人身保险</span><span>￥10 × {detail.length}</span></div>
          <div className={styles['small']}><span>宠物保险</span><span>￥10 × {petsCount}</span></div>
        </div>
        <Footer onSubmit={onSubmit} showDetail={false} />
      </Modal>
    )
  }
}