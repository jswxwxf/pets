import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import _ from 'lodash';

import PetsPicker from '../PetsPicker';

// import styles from './PetsField.module.scss';

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

  petsPicker;

  handleClick = () => {
    this.petsPicker.pick();
  }

  render() {
    let { label } = this.props;
    return (
      <>
        <List.Item onClick={this.handleClick} arrow="horizontal" thumb={<img src={require('assets/images/icon-pet.png')} alt="pet" />}>{label}</List.Item>
        <PetsPicker ref={el => this.petsPicker = el} />
      </>
    );
  }

}