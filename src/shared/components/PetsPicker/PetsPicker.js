import React, { Component } from 'react';
import { Modal, Button, List, Icon, Checkbox, InputItem } from 'antd-mobile';

import { inject } from 'config';

import GenderField from '../GenderField';
import SpecieField from '../SpecieField';

import styles from './PetsPicker.module.scss';

export default class PetsPicker extends Component {

  petCtrl = inject('petController');

  state = {
    visible: false,
    pets: []
  }

  pick() {
    this.setState({
      visible: true
    });
    this.loadData();
  }

  async loadData() {
    let result = await this.petCtrl.searchPets();
    debugger
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    let { visible } = this.state;
    return (
      <>
        <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['pets-picker']}>
          <List renderHeader={() => (
            <div className={styles['header']}>
              <Icon type="cross" />
              <span className={styles['title']}>选择参加活动的宠物</span>
              <Button type="ghost" inline size="small">确定</Button>
            </div>
          )} renderFooter={() => (
            <Button type="ghost" size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加新宠物</Button>
          )}>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><img src={require('assets/images/icon-modify.png')} alt="modify" /><Checkbox /></div>}>咪咪</List.Item>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><Checkbox /></div>}>张小咪</List.Item>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><Checkbox /></div>}>张小闹</List.Item>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><Checkbox /></div>}>木木</List.Item>
          </List>
        </Modal>
        <AddPicker />
      </>
    );
  }

}

class AddPicker extends Component {

  state = {
    visible: false
  }

  add() {
    this.setState({
      visible: true
    });
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    let { visible } = this.state;
    return (
      <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['pets-picker']}>
        <List renderHeader={() => (
          <div className={styles['header']}>
            <Icon type="cross" />
            <span className={styles['title']}>添加新宠物信息</span>
            <Button type="ghost" inline size="small">确定</Button>
          </div>
        )}>
          <InputItem placeholder="请输入宝贝的大名（2-20个字符）" />
          <List.Item arrow="horizontal"><span className='text-placeholder'>生日/到家日</span></List.Item>
          <List.Item extra={<GenderField />}>性别</List.Item>
          <SpecieField />
        </List>
      </Modal >
    )
  }
}