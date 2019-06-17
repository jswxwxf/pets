import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem, Icon, Flex, Grid } from 'antd-mobile';
import qs from 'query-string';
import _ from 'lodash';

import { inject } from 'config';

import { Container } from 'templates';

import styles from './Orders.module.scss';

export default class Orders extends Component {

    utilService = inject('utilService');
    creditCtrl = inject('creditController');

    id = qs.parse(this.props.location.search).id;

    state = {
        orders: [],
    }

    componentDidMount() {
        document.title = '商城订单'
        this.loadData();
    }

    async loadData() {
        var orders = await this.creditCtrl.getCreditOrders()
        orders = orders.data
        this.setState({
            orders
        })
    }

    render() {
        let { orders } = this.state;
        if (!orders) {
            return <></>
        }
        return (
            <Container className={styles['store-orders-page']}>
                {orders.length > 0 ? orders.map(order => {
                    return <OrderCard order={order} />
                }) : <div className={styles['tab-content-none']}>
                        <p>赶紧来为你的宝贝剁手吧～</p>
                    </div>}
            </Container>
        );
    }

}
class OrderCard extends Component {

    utilService = inject('utilService');

    handleClick = () => {
        let { order } = this.props
        this.utilService.goto('/store/order', { id: order.id });
    }

    renderItem = (item) => {
        item.item_title = item.item_title.substring(0, 20) + (item.item_title.length > 20 ? '...' : '')
        return <div className={styles['info-item']}>
            <div className={styles['info-img']}>
                <img src={item.credit_item.image} alt="" />
            </div>
            <div className={styles['info-detail']}>
                <div className={styles['info-title']}>
                    {item.item_title}
                </div>
                <div className={styles['info-amounts']}>
                    <span className={styles['price']}>{item.price}积分</span> <span className={styles['amount']}>x1</span>
                </div>
            </div>
        </div>
    }

    render() {
        let { order } = this.props
        if (!order) {
            return <></>
        }
        return (
            <div className={styles['info-container']} onClick={this.handleClick}>
                <div className={styles['info-time']}>{order.created_at}</div>
                {
                    order.items.map(item => {
                        return this.renderItem(item)
                    })
                }
                <div className={styles['info-type']}>{order.delivery_status === 'pending' ? '待发货' : '已发货'}</div>
            </div>
        )
    }

}