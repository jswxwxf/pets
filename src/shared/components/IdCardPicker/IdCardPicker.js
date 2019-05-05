/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, WhiteSpace, List, Icon, Checkbox, InputItem, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import GenderField from '../GenderField';
import SpecieField from '../SpecieField';

// import PetForm from './PetForm';

import styles from './IdCardPicker.module.scss';

export default class IdCardPicker extends Component {

  utilService = inject('utilService');
  bridgeService = inject('bridgeService');
  // petCtrl = inject('petController');

  state = {
    visible: false,
    image1: '',
    image2: '',
    // pets: [],
    // checkedPets: {}
  }

  pick() {
    return new Promise(async (resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      await this.loadData();
      this.setState({
        visible: true,
      });
    })
  }

  async loadData() {

  }

  handleOk = () => {
    let { image1, image2 } = this.state;
    // checkedPets = _.omitBy(checkedPets, val => val === false);
    this.resolve([image1, image2]);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  handlePickLicense = async () => {
    var tmp = await this.bridgeService.selectAndUploadImage()
    this.setState({
      image1: tmp["images"][0],
    })
  }

  handlePickLicenseBack = async () => {
    var tmp = await this.bridgeService.selectAndUploadImage()
    // this.utilService.alert(JSON.stringify(tmp));
    this.setState({
      image2: tmp["images"][0],
    })
  }

  render() {
    let { visible, image1, image2 } = this.state;
    return (
      <>
        <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['idcard-picker']} wrapClassName={'idcard-picker-container'}>
          <div className={styles['title']}>由于我们为每位活动报名者添购了活动保险，请报名人务必添加个人身份证信息，我们保证您的隐私安全，您可放心上传。</div>
          <div className={styles['upload-form']} onClick={this.handlePickLicense}>
            {image1 === '' ? <img src={require('../../../assets/images/id-card-bg.png')} /> : <img className={styles['uploaded-img']} src={image1} />}
            {image1 === '' ? <p>身份证正面（头像面）</p> : ''}
          </div>
          <WhiteSpace size="lg"></WhiteSpace>
          <div className={styles['upload-form']} onClick={this.handlePickLicenseBack}>
            {image2 == '' ? <img src={require('../../../assets/images/id-card-bg.png')} /> : <img className={styles['uploaded-img']} src={image2} />}
            {image2 == '' ? <p>身份证背面（国徽面）</p> : ''}
          </div>
          <Button onClick={this.handleOk} className={styles['submit']}>确认提交</Button>
          <Button onClick={this.handleClose} className={styles['cancel']}>返回</Button>
        </Modal>
      </>
    );
  }

}