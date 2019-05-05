import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button, Modal, Flex, WhiteSpace } from 'antd-mobile';
import qs from 'query-string';

import { inject } from 'config';

import { Container } from 'templates';

import styles from './Upload.module.scss';

export default class Upload extends Component {

  utilService = inject('utilService');
  bridgeService = inject('bridgeService');

  state = {
    modal: true
  };

  componentDidMount() {
    document.title = '上传身份信息'
  }

  handleContact = () => {
    this.contactPicker.open();
  }

  render() {
    return (
      <Container className={styles['upload-page']}>
        <div className={styles['title']}>由于我们为每位活动报名者添购了活动保险，请报名人务必添加个人身份证信息，我们保证您的隐私安全，您可放心上传。</div>
        <div className={styles['upload-form']} onClick={this.handlePickLicense}>
          <img src={require('../../assets/images/id-card-bg.png')} />
          <p>身份证正面（头像面）</p>
        </div>
        <WhiteSpace size="lg"></WhiteSpace>
        <div className={styles['upload-form']} onClick={this.handlePickLicenseBack}>
          <img src={require('../../assets/images/id-card-bg.png')} />
          <p>身份证背面（国徽面）</p>
        </div>
        <Button className={styles['submit']}>确认提交</Button>
      </Container>
    );
  }

}
