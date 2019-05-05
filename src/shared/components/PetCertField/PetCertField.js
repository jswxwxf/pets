import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import _ from 'lodash';

import { inject } from '../../../config';

import styles from './PetCertField.module.scss';
import PetCertPicker from '../PetCertPicker';

export default class PetCertField extends Component {

  bridgeService = inject('bridgeService');

  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  static defaultProps = {
    onChange: _.noop,
    label: '携带宠物'
  }

  petCertPicker;

  state = {
    _value: this.props.value
  }

  handleClick = async () => {
    let { value, onChange } = this.props;
    let newValue = await this.petCertPicker.pick(value);
    this.setState({ _value: newValue });
    onChange(newValue);
  }

  getDisplayValue() {
    let { _value } = this.state;
    if (!_value) return null;
    return <></>
    // return _value.map(pet => (<Avatar key={pet.id} subject={pet} size="small" alt="pet" customClass={styles['avatar']} />));
  }

  render() {
    let { label } = this.props;
    return (
      <>
        <List.Item className={styles['id-card-field']} onClick={this.handleClick} arrow="horizontal" extra={this.getDisplayValue()} thumb={<img src={require('assets/images/pet-cert.png')} alt="pet" />}>{label}</List.Item>
        <PetCertPicker ref={el => this.petCertPicker = el} />
      </>
    );
  }

}