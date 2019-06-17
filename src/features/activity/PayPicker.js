import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, List, Icon, Checkbox } from 'antd-mobile';
import Countdown from 'react-countdown-now';
import { inject } from 'config';
import styles from './PayPicker.module.scss';

export default class PayPicker extends Component {

    bridgeService = inject('bridgeService');
    orderCtrl = inject('orderController');
    utilService = inject('utilService');

    state = {
        price: 0,
        type: 'alipay',
        visible: false,
        trade_no: null
    }

    static propTypes = {
        order: PropTypes.object
    }

    async open(price) {
        this.setState({
            visible: true,
            price
        });
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
    }

    handlePay = async () => {
        let { order } = this.props;
        let { type } = this.state
        let result = await this.orderCtrl.getPayment(order.trade_no, type);

        let pay_result = await this.bridgeService.pay({
            trade: result.data,
            type
        })

        if (pay_result.result) {
            window.location.reload()
            // this.utilService.goto(`/payment/done`);
        } else {

        }
    }

    handleChange = (type) => {
        this.setState({
            type
        })
    }

    render() {
        let { visible } = this.state;
        let { order, price } = this.props;

        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent className={styles['pay-picker']}>
                <List renderHeader={() => (
                    <div className={styles['header']}>
                        <Icon type="cross" onClick={this.handleClose} />
                        <span className={styles['title']}>选择支付方式</span>
                        <div></div>
                    </div>
                )} renderFooter={() => (
                    <Button onClick={this.handlePay}>确认支付</Button>
                )}>
                    <div className={styles['count']}><span>￥{price}</span><span>剩余支付时间 <Countdown date={order.pay_end_at} daysInHours={true} /></span></div>
                    <List.Item thumb={<img src={require('assets/images/icon-alipay.png')} alt="alipay" />}
                        extra={<div><Checkbox checked={this.state.type === 'alipay'} onChange={() => { this.handleChange('alipay') }} /></div>}>支付宝</List.Item>
                    <List.Item thumb={<img src={require('assets/images/icon-wepay.png')} alt="wepay" />}
                        extra={<div><Checkbox checked={this.state.type === 'wechat'} onChange={() => { this.handleChange('wechat') }} /></div>}>微信支付</List.Item>
                </List>
            </Modal>
        )
    }
}