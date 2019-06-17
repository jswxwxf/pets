import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import _ from 'lodash';

import { inject } from '../../../config';
import IdCardPicker from '../IdCardPicker';

import styles from './IdCardField.module.scss';

export default class IdCardField extends Component {

  bridgeService = inject('bridgeService');

  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  idCardPicker;

  static defaultProps = {
    onChange: _.noop,
    label: '身份证信息'
  }

  state = {
    _value: this.props.value
  }

  handleClick = async () => {
    let { value, onChange } = this.props;
    let newValue = await this.idCardPicker.pick(value);
    this.setState({ _value: newValue });
    onChange(newValue);
  }

  getDisplayValue() {
    let { _value } = this.state;
    if (!_value) return null;
    if (_value[0] === '' && _value[1] === '') {
      return null
    }
    return <>已上传</>
  }

  render() {
    let { label } = this.props;
    return (
      <>
        <List.Item className={styles['id-card-field']} onClick={this.handleClick} arrow="horizontal" extra={this.getDisplayValue()} thumb={<img src={require('assets/images/id-card.png')} alt="pet" />}>{label}</List.Item>
        <IdCardPicker ref={el => this.idCardPicker = el} />
      </>
    );
  }

}