import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, WhiteSpace, Button, List, InputItem } from 'antd-mobile';
import _ from 'lodash';
import { inject } from 'config';
import styles from './AddressEditPicker.module.scss';
import { createForm } from 'rc-form';
import AddressPicker from './AddressPicker';
import AddressForm from './AddressForm';

export default class AddressEditPicker extends Component {

  activityCtrl = inject('activityController');
  utilService = inject('utilService');

  static propTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: _.noop
  }

  state = {
    visible: false,
  }

  addressPicker

  open() {
    return new Promise(async (resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.setState({
        visible: true
      });
      await this.loadData();
    });
  }

  loadData() {
    this.setState({
      addressForm: new AddressForm()
    });
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
    this.reject()
  }

  handleSubmit = async () => {
    this.utilService.hidePicker('.address-edit-container');
    try {
      await this.addressPicker.open()
    } finally {
      this.utilService.showPicker('.address-edit-container');
    }
  }

  render() {
    var { onSubmit, detail, addressForm } = this.props;
    if (typeof detail == 'undefined') {
      var detail = [{
      }]
    }
    let { visible } = this.state;

    return (
      <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent wrapClassName={'address-edit-container'} className={styles['address-edit-picker']}>
        <div className={styles['header']}>
          <Icon onClick={this.handleClose} type="cross" />
          <span className={styles['title']}>添加收货地址</span>
          <Button onClick={this.handleSubmit} type="ghost" inline size="small">确定</Button>
        </div>
        <div className={styles['list-container']}>
          <div>
            {/* <Form addressForm={addressForm} /> */}
          </div>
        </div>
        <AddressPicker ref={el => this.addressPicker = el}></AddressPicker>
      </Modal>
    )
  }
}

class Form extends Component {

  static propTypes = {
    form: PropTypes.object,
    addressForm: PropTypes.object,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    onRemove: _.noop
  }

  componentDidMount() {
    let { form, addressForm } = this.props;
    if (addressForm) {
      addressForm.form = form;
    }
  }

  render() {
    let { form, addressForm } = this.props;
    let { getFieldDecorator } = form;
    return (
      <div className={styles['form']}>
        <List>
          {getFieldDecorator(...addressForm.name)(
            <InputItem placeholder="请填写姓名"><img src={require('assets/images/icon-user.png')} alt="user" /> 联系人</InputItem>
          )}
          {getFieldDecorator(...addressForm.mobile)(
            <InputItem placeholder="请填写手机号"><img src={require('assets/images/icon-phone2.png')} alt="phone" /> 手机号码</InputItem>
          )}
        </List>
      </div>
    )
  }

}
Form = createForm(AddressForm.options)(Form);