import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, WhiteSpace, Button } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

import styles from './AddressPicker.module.scss';

export default class AddressPicker extends Component {

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

  open() {
    // this.forms = forms;
    return new Promise(async (resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.setState({
        visible: true
      });
    });
    // await this.loadData();
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
    this.reject();
  }

  handleAddress = async () => {
    this.utilService.hidePicker('.address-container');
    try {
      await this.petPicker.open();
      this.loadData();
    } finally {
      this.utilService.showPicker('.address-container');
    }
  }

  render() {
    var { onSubmit, detail } = this.props;
    if (typeof detail == 'undefined') {
      var detail = [{
        pets: []
      }]
    }
    let { visible } = this.state;

    return (
      <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent wrapClassName={'address-container'} className={styles['address-picker']}>
        <div className={styles['header']}>
          <Icon onClick={this.handleClose} type="cross" />
          <span className={styles['title']}>确认收货地址</span>
          <Button onClick={this.handleOk} type="ghost" inline size="small">确定</Button>
        </div>
        <div className={styles['list-container']}>
          <div className={styles['details']}>
            <div><span className={styles['name']}>方怡程</span><span>13829840942</span></div>
            <div className={styles['address']}><span>上海市 普陀区 武宁路1000号902室</span></div>
          </div>
          <div className={styles['actions']}>
            <img src={require('assets/images/icon-modify.png')} alt="modify" />
          </div>
        </div>
      </Modal>
    )
  }
}