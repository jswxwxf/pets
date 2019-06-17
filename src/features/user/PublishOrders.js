import React, { Component } from 'react';
import { inject } from '../../config';
import { Container } from 'templates';
import styles from './Orders.module.scss';

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
        this.loadData();
    }

    async loadData(tab, index) {
        if (typeof tab === 'undefined') {
            let result = await this.orderCtrl.getMyPublishOrders('all');
            this.setState(Object.assign({}, this.state, {
                all: result.data
            }));
        } else {
            if (index === 1) {
                let result = await this.orderCtrl.getMyPublishOrders(tab.type);
                this.setState(Object.assign({}, this.state, {
                    wait: result.data
                }));
            } else {
                let result = await this.orderCtrl.getMyPublishOrders(tab.type);
                this.setState(Object.assign({}, this.state, {
                    refund: result.data
                }));
            }
        }
    }

    render() {
        let { all } = this.state
        return (
            <Container className={styles['orders-page']}>
                <Orders orders={all} />
            </Container>
        );
    }

}

class Orders extends Component {

    render() {
        let orders = this.props.orders
        if (orders.length == 0) {
            return <div className={styles['tab-content-none']}>
                <p>你还没有任何订单哦～</p>
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
                    <span>{event.start_at}</span>
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
                <div className={styles['info-status']}>{order.order_status}</div>
            </div>
        )
    }

}