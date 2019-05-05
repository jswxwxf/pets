import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import _ from 'lodash';

import { inject } from '../../../config';

import PetsPicker from '../PetsPicker';
import Avatar from '../Avatar';

import styles from './PetsField.module.scss';

export default class PetsField extends Component {

  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  static defaultProps = {
    onChange: _.noop,
    label: '携带宠物'
  }

  state = {
    _value: this.props.value
  }

  petsPicker;

  handleClick = async () => {
    let { value, onChange } = this.props;
    let newValue = await this.petsPicker.pick(value);
    this.setState({ _value: newValue });
    onChange(newValue);
  }

  getDisplayValue() {
    let { _value } = this.state;
    if (!_value) return null;
    return _value.map(pet => (<Avatar key={pet.id} subject={pet} size="small" alt="pet" customClass={styles['avatar']} />));
  }

  render() {
    let { label } = this.props;
    return (
      <>
        <List.Item className={styles['pets-field']} onClick={this.handleClick} arrow="horizontal" extra={this.getDisplayValue()} thumb={<img src={require('assets/images/icon-pet.png')} alt="pet" />}>{label}</List.Item>
        <PetsPicker ref={el => this.petsPicker = el} />
      </>
    );
  }

}