import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

import { inject } from '../../config';

import { Container } from 'templates';

import styles from './Orders.module.scss';

const tabs = [
    { title: '全部订单', type: 'all' },
    { title: '待支付', type: 'pending' },
    { title: '售后退款', type: 'refund' }
];

export default class OrdersTabs extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');

    state = {
        all: [],
        wait: [],
        refund: []
    };

    componentDidMount() {
        document.title = "我的订单";
        // this.loadData();
    }

    async loadData(tab, index) {
        if (typeof tab === 'undefined') {
            let result = await this.orderCtrl.getMyOrders('all');
            this.setState(Object.assign({}, this.state, {
                all: result.data
            }));
        } else {
            if (index === 1) {
                let result = await this.orderCtrl.getMyOrders(tab.type);
                this.setState(Object.assign({}, this.state, {
                    wait: result.data
                }));
            } else {
                let result = await this.orderCtrl.getMyOrders(tab.type);
                this.setState(Object.assign({}, this.state, {
                    refund: result.data
                }));
            }
        }
    }

    render() {
        let { all, wait, refund } = this.state
        return (
            <Container className={styles['orders-page']}>
                <Tabs tabs={tabs} onChange={(tab, index) => { this.loadData(tab, index) }}>
                    <Orders index="1" orders={all} />
                    <Orders index="2" orders={wait} />
                    <Orders index="3" orders={refund} />
                </Tabs>
            </Container>
        );
    }

}

class Orders extends Component {

    render() {
        let orders = this.props.orders
        if (orders.length === 0) {
            return <div className={styles['tab-content-none']}>
                <p>赶紧来为你的宝贝剁手吧～</p>
            </div>
        }
        return (
            <div className={styles['tab-content']}>
                {orders.map((order, i) => (<OrderCard key={order.id} index={i} length={orders.length} order={order} />))}
            </div>
        )
    }

}

class OrderCard extends Component {

    utilService = inject('utilService');

    handleClick = () => {
        this.utilService.goto('/user/order', { id: this.props.order.id });
    }

    render() {
        let order = this.props.order
        let event = this.props.order.event ? this.props.order.event : {}
        return (
            <div className={styles['info-container']} onClick={this.handleClick}>
                <div>{event.title}</div>
                <div className={styles['info-item']}>
                    <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
                    <span>{event.deadline_date}</span>
                    <span></span>
                </div>
                <div className={styles['info-item']}>
                    <span><img src={require('assets/images/icon-location.png')} alt="location" /></span>
                    <span>{event.location}</span>
                    <span></span>
                </div>
                <div className={styles['info-item']}>
                    <span><img src={require('assets/images/icon-vip.png')} alt="vip" /></span>
                    <span>已报名{event.applicant_num}人</span>
                    <span></span>
                </div>
                {/* <div className={styles['info-type']}>{order.type === 1 ? '线下活动' : '线上活动'}</div> */}
                <div className={styles['info-status']}>{order.order_status}</div>
            </div>
        )
    }

}