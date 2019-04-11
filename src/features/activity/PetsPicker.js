import React, { Component } from 'react';
import { Modal, Button, List, Icon, Checkbox, InputItem } from 'antd-mobile';

import GenderField from 'shared/components/GenderField';
import SpecieField from 'shared/components/SpecieField';

import styles from './PetsPicker.module.scss';

export default class PetsPicker extends Component {

  render() {
    return (
      <>
        <ListPicker />
        <AddPicker />
      </>
    );
  }

}

class ListPicker extends Component {

  render() {
    return (
      <Modal popup visible animationType="slide-up" className={styles['pets-picker']}>
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
    )
  }
}


class AddPicker extends Component {
  render() {
    return (
      <Modal popup visible animationType="slide-up" className={styles['pets-picker']}>
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