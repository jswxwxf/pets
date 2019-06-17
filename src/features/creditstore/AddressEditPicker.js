import { Button, Icon, InputItem, List, Modal } from 'antd-mobile';
import { inject } from 'config';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { Utils } from 'shared/utility';
import styles from './AddressEditPicker.module.scss';
import AddressForm from './AddressForm';
import AddressPicker from './AddressPicker';

export default class AddressEditPicker extends Component {

    activityCtrl = inject('activityController');
    utilService = inject('utilService');

    static propTypes = {
        id: PropTypes.string,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        onSubmit: _.noop
    }

    state = {
        visible: false,
        addresses: [],
    }

    addressPicker;
    form;

    async open() {
        var self = this
        return new Promise(async (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            await self.loadData();
            self.setState({
                visible: true
            });
            // this.openPicker()
        });
    }

    openPicker = async () => {
        let { addressForm } = this.state
        addressForm.form = this.form
        this.utilService.hidePicker('.address-edit-container');
        try {
            await this.addressPicker.open(addressForm)
        } finally {
            this.utilService.showPicker('.address-edit-container');
        }
        // let { addresses } = this.state
        // if (addresses.length > 0) {
        // }

    }

    async loadData() {
        var res = await this.activityCtrl.getAddress()
        this.setState({
            addresses: res.data,
            addressForm: new AddressForm()
        });
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
        this.reject()
    }

    handleSubmit = async () => {
        let { addressForm } = this.state
        addressForm.form = this.form
        try {
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }

        this.utilService.hidePicker('.address-edit-container');
        try {
            await this.addressPicker.open(addressForm)
        } finally {
            this.utilService.showPicker('.address-edit-container');
        }
    }

    async componentDidMount() {
    }

    render() {
        let { visible, addressForm, addresses } = this.state;
        var address = null;
        if (addresses.length > 0) {
            address = addresses[0];
        }

        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent wrapClassName={'address-edit-container'} className={styles['address-edit-picker']}>
                <div className={styles['header']}>
                    <Icon onClick={this.handleClose} type="cross" />
                    <span className={styles['title']}>添加收货地址</span>
                    <Button onClick={this.handleSubmit} type="ghost" inline size="small">确定</Button>
                </div>
                <div className={styles['list-container']}>
                    <Form ref={el => this.form = el} address={address} addressForm={addressForm} />
                </div>
                <AddressPicker ref={el => this.addressPicker = el}></AddressPicker>
            </Modal>
        )
    }
}

class Form extends Component {

    static propTypes = {
        form: PropTypes.object,
        address: PropTypes.object,
        addressForm: PropTypes.object,
        onRemove: PropTypes.func
    }

    static defaultProps = {
        onRemove: _.noop
    }

    componentDidMount() {
        let { form, addressForm, address } = this.props;
        if (addressForm) {
            addressForm.form = form;
        }
        if (address) {
            form.setFieldsValue({
                'name': address.name,
                'mobile': address.phone,
                'region': address.address,
                'address': address.detail
            })
        }

    }

    render() {
        let { form, addressForm } = this.props;
        let { getFieldDecorator } = form;
        return (
            <div className={styles['form']}>
                <List>
                    {getFieldDecorator(...addressForm.name)(
                        <InputItem placeholder="请填写收货人信息"></InputItem>
                    )}
                    {getFieldDecorator(...addressForm.mobile)(
                        <InputItem placeholder="请填写收货人联系电话"></InputItem>
                    )}
                    {getFieldDecorator(...addressForm.region)(
                        <InputItem placeholder="请添加所在地区"></InputItem>
                    )}
                    {getFieldDecorator(...addressForm.address)(
                        <InputItem placeholder="请填写详细地址"></InputItem>
                    )}
                </List>
            </div>
        )
    }

}
Form = createForm(AddressForm.options)(Form);