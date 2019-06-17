import { Flex } from 'antd-mobile';
import "dayjs/locale/zh-cn";
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import { inject } from '../../config';
import styles from './Order.module.scss';


export default class Order extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');

    id = this.props.match.params.id;
    id = qs.parse(this.props.location.search).id;

    state = {
        order: null
    };

    componentDidMount() {
        document.title = '商城订单'
        this.loadData();
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.orderCtrl.getOrder(this.id);
        this.setState({
            order: result.data
        });
    }

    pending(order) {
        return <div className={styles['order-detail-box']}>
            <span className={styles['order-detail-header-title']}>待发货</span>
            <span className={styles['order-detail-header-subtitle']}>正在为您备货中，请耐心等待</span>
        </div>
    }

    sent(order) {
        return <div className={styles['order-detail-box']}>
            <span className={styles['order-detail-header-title']}>已发货</span>
            <span className={styles['order-detail-header-subtitle']}>请耐心等待配送，如有疑问可联系平台</span>
        </div>
    }



    renderItem = (order) => {
        if (order.items == null) {
            return <></>
        }
        if (order.items.length === 0) {
            return <></>
        }

        return order.items.map(item => {
            // debugger
            // var desc = item.credit_item.desc.substring(0, 20) + '...'
            return <div className={styles['info-item']}>
                <div className={styles['info-img']}>
                    <img src={item.credit_item.image} alt="" />
                </div>
                <div className={styles['info-detail']}>
                    <div className={styles['info-title']}>
                        {item.credit_item.name}
                    </div>
                    <div className={styles['info-amounts']}>
                        <span className={styles['price']}>{item.credit_item.price}积分</span> <span className={styles['amount']}>x1</span>
                    </div>
                </div>
            </div>
        })
    }

    renderHeader = () => {
        let { order } = this.state
        if (order.delivery_status === 'pending') {
            return <div className={styles['order-detail-header']}>
                {this.pending()}
            </div>
        } else {
            return <div className={styles['order-detail-header']}>
                {this.sent()}
            </div>
        }
    }

    render() {
        let { order } = this.state
        if (!order) {
            return <></>
        }

        return (
            <Container className={styles['order-detail-page']}>
                {this.renderHeader(order)}
                <div className={styles['info-container']}>
                    {this.renderItem(order)}
                </div>
                <div className={styles['info-container']}>
                    <div className={styles['info-block-title']}> 收货人信息 </div>
                    <div className={styles['info-block-border-bottom']}>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>联系人</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.address.name}</Flex.Item>
                        </Flex>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>手机号</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.address.phone}</Flex.Item>
                        </Flex>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>收货地址</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.address.address} {order.address.detail}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={styles['info-block-title']}> 订单信息 </div>
                    <div className={styles['info-block-border-bottom']}>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>订单号</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.trade_no}</Flex.Item>
                        </Flex>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>下单时间</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.created_at}</Flex.Item>
                        </Flex>
                    </div>

                </div>
            </Container>
        );
    }
}
