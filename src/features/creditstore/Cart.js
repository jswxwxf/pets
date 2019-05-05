import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, WhiteSpace, Button, Stepper } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

import styles from './Cart.module.scss';
import AddressEditPicker from './AddressEditPicker';

export default class Cart extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  static propTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: _.noop
  }

  addressEditPicker

  state = {
    visible: false,
    prices: null,
    val: 1
  }

  async open(forms) {
    // this.forms = forms;
    await this.loadData();
    this.setState({
      visible: true
    });
  }

  async loadData() {
    let { id } = this.props;
    // let result = await this.activityCtrl.getActivityPrices(id);
    this.setState({
      // prices: result.data
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

  handleSubmit = async () => {
    this.utilService.hidePicker('.cart-container');
    try {
      await this.addressEditPicker.open()
    } finally {
      this.utilService.showPicker('.cart-container');
    }
  }

  onChange = (val) => {
    this.setState({
      val: val
    })
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
      <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent wrapClassName={'cart-container'} className={styles['cart-picker']}>
        <div className={styles['header']}>
          <Icon onClick={this.handleClose} type="cross" />
          <span className={styles['title']}>已选商品</span>
          <div></div>
        </div>
        <div className={styles['list-container']}>
          <div className={styles['item']}>
            <span className={styles['name']}>毛绒玩具</span>
            <span className={styles['credits']}>300积分</span>
            <Stepper
              style={{ width: '30%'}}
              showNumber={true}
              max={10}
              min={1}
              value={this.state.val}
              onChange={this.onChange}
            />
          </div>
          <div className={styles['item']}>
            <span className={styles['name']}>毛绒玩具</span>
            <span className={styles['credits']}>300积分</span>
            <Stepper
              style={{ width: '30%'}}
              showNumber={true}
              max={10}
              min={1}
              value={this.state.val}
              onChange={this.onChange}
            />
          </div>
          <div className={styles['item']}>
            <span className={styles['name']}>毛绒玩具</span>
            <span className={styles['credits']}>300积分</span>
            <Stepper
              style={{ width: '30%'}}
              showNumber={true}
              max={10}
              min={1}
              value={this.state.val}
              onChange={this.onChange}
            />
          </div>
          {/* <div className={styles['item']}><span className={styles['name']}>名字显示不下就…</span><span>300积分</span></div> */}
        </div>
        <div className={styles['footer-container']}>
          <Footer onPriceDetail={this.handlePriceDetail} onSubmit={this.handleSubmit} />
        </div>
        <AddressEditPicker ref={el => this.addressEditPicker = el}></AddressEditPicker>

      </Modal>
    )
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
        <div><span>共：</span><span className={styles['price']}>10</span> 积分</div>
        <div>
          <Button onClick={onSubmit} inline>提交订单</Button>
        </div>
      </div>
    )
  }
}
