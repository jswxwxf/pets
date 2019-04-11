import React, { Component } from 'react';
import { Button } from 'antd-mobile';

import styles from './GenderField.module.scss';

export default class GenderField extends Component {

  render() {
    return (
      <div className={styles['gender-field-container']}>
        <Button size="small" inline icon={<img src={require('assets/images/icon-male.png')} alt="male" />} className={styles['active']}>男生</Button>
        <span><Button size="small" inline icon={<img src={require('assets/images/icon-female-inactive.png')} alt="female" />}>女生</Button></span>
      </div>
    );
  }

}