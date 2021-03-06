import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, List, Icon, Radio, InputItem, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import GenderField from '../GenderField';
import SpecieField from '../SpecieField';
import Avatar from '../Avatar';

import PetForm from './PetForm';

import styles from './PetsPicker.module.scss';

const RadioItem = Radio.RadioItem;

export default class PetsPicker extends Component {

    utilService = inject('utilService');
    petCtrl = inject('petController');

    state = {
        visible: false,
        pets: [],
        pet: {}
    }

    pick() {
        return new Promise(async (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            await this.loadData();
            this.setState({
                visible: true,
            });
        })
    }

    async loadData() {
        let result = await this.petCtrl.searchPets();
        var pets = result.data
        var pet = null;
        if (pets.length > 0) {
            pet = pets[0];
        }
        this.setState({
            pets,
            pet
        });
    }

    handleOk = () => {
        let { pet } = this.state;
        // pet = _.omitBy(pet, val => val === false);
        // this.resolve(_.values(pet));
        this.resolve(pet)
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
    }

    handleAdd = async () => {
        this.utilService.hidePicker('.pets-picker-container');
        try {
            await this.petPicker.open();
            this.loadData();
        } finally {
            this.utilService.showPicker('.pets-picker-container');
        }
    }

    handleModify = async (_, pet) => {
        this.utilService.hidePicker('.pets-picker-container');
        try {
            await this.petPicker.open(pet);
            this.loadData();
        } finally {
            this.utilService.showPicker('.pets-picker-container');
        }
    }

    handleCheck(e, pet) {
        this.setState({ pet });
    }

    render() {
        let { visible, pets, pet } = this.state;
        let { ids } = this.props;
        // debugger
        var tmp = pet
        return (
            <>
                <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['pets-picker']} wrapClassName={'pets-picker-container'}>
                    <List renderHeader={() => (
                        <div className={styles['header']}>
                            <Icon onClick={this.handleClose} type="cross" />
                            <span className={styles['title']}>选择参加活动的宠物</span>
                            <Button onClick={this.handleOk} type="ghost" inline size="small">确定</Button>
                        </div>
                    )} renderFooter={() => (
                        <Button onClick={this.handleAdd} type="ghost" size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加新宠物</Button>
                    )}>
                        {pets.map(pet => {
                            if (ids.indexOf(pet.id) === -1) {
                                let extra = <div>
                                    <RadioItem className={styles['checked']} checked={tmp === pet} onChange={e => this.handleCheck(e, pet)} ></RadioItem>
                                </div>;
                                if (pet.is_tmp === 1) {
                                    extra = (<div> <img onClick={e => this.handleModify(e, pet)} src={require('assets/images/icon-modify.png')} alt="modify" /> + {extra} + </div>);
                                }
                                return (<List.Item key={pet.id} thumb={<Avatar subject={pet} />} extra={extra}>{pet.name}</List.Item>);
                            }
                            return <></>
                        })}
                    </List>
                </Modal>
                <PetPicker ref={el => this.petPicker = el} />
            </>
        );
    }

}

class PetPicker extends Component {

    state = {
        visible: false,
        pet: null
    }

    open(pet) {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.setState({
                visible: true,
                pet
            });
        });
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
        this.reject();
    }

    handleSaved = () => {
        this.resolve();
        this.handleClose();
    }

    render() {
        let { visible, pet } = this.state;
        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['pets-picker']}>
                <Form pet={pet} onClose={this.handleClose} onSaved={this.handleSaved} />
            </Modal>
        )
    }
}

class Form extends Component {

    utilService = inject('utilService');
    petCtrl = inject('petController');

    static propTypes = {
        pet: PropTypes.object,
        onClose: PropTypes.func,
        onSaved: PropTypes.func
    }

    static defaultProps = {
        onClose: _.noop,
        onSaved: _.noop
    }

    state = {
        petForm: new PetForm(this.props.form, this.props.pet)
    }

    handleSubmit = async () => {
        let { onSaved } = this.props;
        try {
            var result = await this.state.petForm.validate();
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }
        if (this.props.pet) {
            result = await this.petCtrl.updatePet(this.props.pet.id, PetForm.toJson(result));
        } else {
            result = await this.petCtrl.addPet(PetForm.toJson(result));
        }
        onSaved(result);
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
                    <DatePicker mode="date" extra=' '>
                        <List.Item arrow="horizontal">生日/到家日</List.Item>
                    </DatePicker>
                )}
                <List.Item extra={getFieldDecorator(...petForm.gender)(<GenderField />)}>性别</List.Item>
                {getFieldDecorator(...petForm.type)(
                    <SpecieField />
                )}
            </List>
        )
    }
}

Form = createForm(PetForm.options)(Form);