import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Picker } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

// import styles from './SpecieField.module.scss';

export default class SpecieField extends Component {

  petCtrl = inject('petController');

  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: _.noop
  }

  state = {
    types: [],
    _value: []
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    let { value } = this.props;
    let result = await this.petCtrl.getAllKinds();
    this.setState({
      types: result.data,
      _value: value
    });
  }

  handleOk = (value) => {
    let { onChange } = this.props;
    this.setState({
      _value: value
    });
    onChange(value);
  }

  formatDisplayValue = (labels) => {
    return _.last(labels);
  }

  render() {
    let { types, _value } = this.state;
    return (
      <Picker data={types} title="你的宝贝是？" extra='选择宝贝品种' format={this.formatDisplayValue} value={_value} cols={2} cascade onOk={this.handleOk}>
        <List.Item onClick={this.handleClick} arrow="horizontal">宝贝品种</List.Item>
      </Picker>
    );
  }

}

// class SpeciesPicker extends Component {

//   state = {
//     visible: false,
//   }

//   pick() {
//     return new Promise(async (resolve, reject) => {
//       this.resolve = resolve;
//       this.reject = reject;
//       this.setState({
//         visible: true
//       });
//     })
//   }

//   handleClose = () => {
//     this.setState({
//       visible: false
//     });
//   }

//   render() {
//     let { visible } = this.state;
//     return (
//       <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['species-picker']}>
//         <List renderHeader={() => (
//           <div className={styles['header']}>
//             <Icon type="cross" />
//             <span className={styles['title']}>你的宝贝是？</span>
//             <div></div>
//           </div>
//         )}>
//           <List.Item arrow="horizontal">汪星人</List.Item>
//           <List.Item arrow="horizontal">喵星人</List.Item>
//           <List.Item>其他</List.Item>
//         </List>
//       </Modal>
//     )
//   }
// }