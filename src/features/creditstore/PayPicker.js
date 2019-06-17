import React, { Component } from 'react';
import { Modal, Button, List, Icon, Checkbox } from 'antd-mobile';

import styles from './PayPicker.module.scss';

export default class PayPicker extends Component {

    render() {
        return (
            <Modal popup visible animationType="slide-up" className={styles['pay-picker']}>
                <List renderHeader={() => (
                    <div className={styles['header']}>
                        <Icon type="cross" />
                        <span className={styles['title']}>选择支付方式</span>
                        <div></div>
                    </div>
                )} renderFooter={() => (
                    <Button>确认支付</Button>
                )}>
                    <div className={styles['count']}><span>￥10.00</span><span>剩余支付时间：15:00:00</span></div>
                    <List.Item thumb={<img src={require('assets/images/icon-alipay.png')} alt="alipay" />}
                        extra={<div><Checkbox /></div>}>支付宝</List.Item>
                    <List.Item thumb={<img src={require('assets/images/icon-wepay.png')} alt="wepay" />}
                        extra={<div><Checkbox /></div>}>微信支付</List.Item>
                    <List.Item thumb={<img src={require('assets/images/icon-unipay.png')} alt="unipay" />}
                        extra={<div><Checkbox /></div>}>银联支付</List.Item>
                </List>
            </Modal>
        )
    }
}