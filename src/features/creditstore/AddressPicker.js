import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, WhiteSpace, Button } from 'antd-mobile';
import { Utils } from 'shared/utility';
import _ from 'lodash';

import { inject } from 'config';

import styles from './AddressPicker.module.scss';
import AddressForm from './AddressForm';

export default class AddressPicker extends Component {

    activityCtrl = inject('activityController');
    creditCtrl = inject('creditController');
    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    static propTypes = {
        id: PropTypes.string,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        onSubmit: _.noop
    }

    state = {
        addressForm: new AddressForm(),
        visible: false,
        form: null,
        prices: null
    }

    open(form, addresses) {
        return new Promise(async (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;

            this.setState({
                visible: true,
                form: form.form
            });
        });
    }

    async loadData() {
        let { id } = this.props;
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
        this.reject();
    }

    handleAddress = async () => {
        this.utilService.hidePicker('.address-container');
        try {
            await this.petPicker.open();
            this.loadData();
        } finally {
            this.utilService.showPicker('.address-container');
        }
    }


    handleOk = async () => {
        var { form } = this.state
        if (!form) {
            var name = ''
            var mobile = ''
            var region = ''
            var address = ''
        } else {
            var name = form.getFieldValue('name')
            var mobile = form.getFieldValue('mobile')
            var region = form.getFieldValue('region')
            var address = form.getFieldValue('address')
        }

        var cart = localStorage.getItem('cart')
        try {
            var resp = await this.creditCtrl.buy({
                products: JSON.parse(cart),
                address: {
                    name,
                    phone: mobile,
                    address: region,
                    detail: address
                }
            })
            this.bridgeService.openWebview('http://47.100.172.250:8018/#/store/orders');
        } catch (error) {
            this.bridgeService.openWebview('http://47.100.172.250:8018/#/store/orders');
        }
    }

    render() {
        var { onSubmit, detail } = this.props;
        var { form } = this.state
        if (typeof detail == 'undefined') {
            var detail = [{
                pets: []
            }]
        }
        let { visible } = this.state;
        if (!form) {
            var name = ''
            var mobile = ''
            var region = ''
            var address = ''
        } else {
            var name = form.getFieldValue('name')
            var mobile = form.getFieldValue('mobile')
            var region = form.getFieldValue('region')
            var address = form.getFieldValue('address')
        }

        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent wrapClassName={'address-container'} className={styles['address-picker']}>
                <div className={styles['header']}>
                    <Icon onClick={this.handleClose} type="cross" />
                    <span className={styles['title']}>确认收货地址</span>
                    <Button onClick={this.handleOk} type="ghost" inline size="small">确定</Button>
                </div>
                <div className={styles['list-container']}>
                    <div className={styles['details']}>
                        <div><span className={styles['name']}>{name}</span><span>{mobile}</span></div>
                        <div className={styles['address']}><span>{region} {address}</span></div>
                    </div>
                    <div className={styles['actions']}>
                        <img src={require('assets/images/icon-modify.png')} alt="modify" onClick={this.handleClose} />
                    </div>
                </div>
            </Modal>
        )
    }
}