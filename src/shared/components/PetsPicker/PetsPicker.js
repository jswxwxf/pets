import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, List, Icon, Checkbox, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import GenderField from '../GenderField';
import SpecieField from '../SpecieField';

import PetForm from './PetForm';

import styles from './PetsPicker.module.scss';

export default class PetsPicker extends Component {

  petCtrl = inject('petController');

  state = {
    visible: false,
    pets: []
  }

  pick() {
    return new Promise(async (resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      await this.loadData();
      this.setState({
        visible: true
      });
    })
  }

  async loadData() {
    let result = await this.petCtrl.searchPets();
    this.setState({
      pets: result.data
    });
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  handleAdd = () => {
    this.addPicker.add();
  }

  render() {
    let { visible, pets } = this.state;
    return (
      <>
        <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['pets-picker']}>
          <List renderHeader={() => (
            <div className={styles['header']}>
              <Icon onClick={this.handleClose} type="cross" />
              <span className={styles['title']}>选择参加活动的宠物</span>
              <Button type="ghost" inline size="small">确定</Button>
            </div>
          )} renderFooter={() => (
            <Button onClick={this.handleAdd} type="ghost" size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加新宠物</Button>
          )}>
            {pets.map(pet => {
              let extra = <div><Checkbox /></div>;
              return (<List.Item key={pet.id} thumb={<img src={pet.avatar} alt="pet" />}
                extra={extra}>{pet.name}</List.Item>);
            })}
            {/* <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><img src={require('assets/images/icon-modify.png')} alt="modify" /><Checkbox /></div>}>咪咪</List.Item>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><Checkbox /></div>}>张小咪</List.Item>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><Checkbox /></div>}>张小闹</List.Item>
            <List.Item thumb={<img src={require('assets/images/sample-avatar.jpg')} alt="pet" />}
              extra={<div><Checkbox /></div>}>木木</List.Item> */}
          </List>
        </Modal>
        <AddPicker ref={el => this.addPicker = el} />
      </>
    );
  }

}

class AddPicker extends Component {

  state = {
    visible: false
  }

  add() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.setState({
        visible: true
      });
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
        <Form onClose={this.handleClose} />
      </Modal>
    )
  }
}

class Form extends Component {

  utilService = inject('utilService');
  petCtrl = inject('petController');

  static propTypes = {
    onClose: PropTypes.func
  }

  static defaultProps = {
    onClose: _.noop
  }

  state = {
    petForm: new PetForm(this.props.form)
  }

  handleSubmit = async () => {
    try {
      var result = await this.state.petForm.validate();
    } catch (err) {
      let first = Utils.first(err);
      return this.utilService.alert(first.errors[0].message);
    }
    console.log(result);
    debugger
    result = await this.petCtrl.addPet(result);
    debugger
  }

  render() {
    let { onClose } = this.props;
    let { petForm } = this.state;
    let form = petForm.form;
    let { getFieldDecorator } = form;
    return (
      <List renderHeader={() => (
        <div className={styles['header']}>
          <Icon onClick={onClose} type="cross" />
          <span className={styles['title']}>添加新宠物信息</span>
          <Button onClick={this.handleSubmit} type="ghost" inline size="small">确定</Button>
        </div>
      )}>
        {getFieldDecorator(...petForm.name)(
          <InputItem placeholder="请输入宝贝的大名（2-20个字符）" />
        )}
        {getFieldDecorator(...petForm.birthday)(
          <InputItem type="date" placeholder="请输入生日/到家日" />
        )}
        {/* <List.Item arrow="horizontal"><span className='text-placeholder'>生日/到家日</span></List.Item> */}
        <List.Item extra={getFieldDecorator(...petForm.gender)(<GenderField />)}>性别</List.Item>
        {getFieldDecorator(...petForm.type)(
          <SpecieField />
        )}
      </List>
    )
  }
}

Form = createForm(PetForm.options)(Form);