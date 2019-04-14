import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';
import _ from 'lodash';

import styles from './GenderField.module.scss';

export default class GenderField extends Component {

  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: _.noop
  }

  state = {
    gender: null
  }

  componentDidMount() {
    this.setGender(this.props.value || 1);
  }

  handleClick(_, gender) {
    this.setGender(gender);
  }

  setGender(gender) {
    this.setState({
      gender
    });
    this.props.onChange(gender);
  }

  render() {
    let { gender } = this.state;
    return (
      <div className={styles['gender-field-container']}>
        <Button onClick={e => this.handleClick(e, 1)} size="small" inline className={gender === 1 && styles['active']} icon={<img src={require('assets/images/icon-male.png')} alt="male" />}>男生</Button>
        <Button onClick={e => this.handleClick(e, 2)} size="small" inline className={gender === 2 && styles['active']} icon={<img src={require('assets/images/icon-female-inactive.png')} alt="female" />}>女生</Button>
      </div>
    );
  }

}