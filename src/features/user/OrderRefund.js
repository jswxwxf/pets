import { Button, Flex } from 'antd-mobile';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { Container } from 'templates';
import { inject } from '../../config';
import styles from './OrderRefund.module.scss';
import dayjs from 'dayjs'
import "dayjs/locale/zh-cn";

export default class OrderRefund extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');

    id = this.props.match.params.id;
    id = qs.parse(this.props.location.search).id;

    state = {
        order: null,
        prices: [],
        checked_order: [],
    };

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.orderCtrl.getOrder(this.id);
        let prices = await this.orderCtrl.getPrices(result.data.event_id);
        this.setState({
            order: result.data,
            prices: prices.data
        });
    }

    approved(order) {
        if (order.financial_status === 'pending') {
            return <div className={styles['order-detail-header']}>
                <span>
                    <span className={styles['order-detail-header-title']}>核验通过，待付款</span>
                    <span className={styles['order-detail-header-subtitle']}>恭喜您，活动报名资料已核验通过！名额已为您锁定，请务必在规定时间内完成报名费支付！</span>
                    <div>
                        <span>剩余支付时间1</span>
                        <span className={styles['count-down']}><Countdown date={order.pay_end_at} daysInHours={true} /></span>
                    </div>
                </span>
            </div>
        } else {
            return <></>
        }
    }

    pending(order) {
        return <div className={styles['order-detail-header']}>
            <span>
                <span className={styles['order-detail-header-title']}>核验中</span>
                <span className={styles['order-detail-header-subtitle']}>您的资料还在核验中，预计24小时内就能够完成啦！</span>
            </span>
        </div>
    }

    denied(order) {
        return <div className={styles['order-detail-header']}>
            <span>
                <span className={styles['order-detail-header-title']}>核验未通过</span>
                <span className={styles['order-detail-header-subtitle']}>原因：{order.denied_reason}</span>
            </span>
        </div>
    }

    renderPriceTable = () => {
        let { order, prices } = this.state
        var res = prices.map((price) => {
            var amount = 0
            if (price.type === 1) {
                amount = 1
            } else if (price.type === 2) {
                amount = order.applicants.length
            } else {
                var applicants = order.applicants
                amount = _.sumBy(applicants, (applicant) => {
                    return applicant.pets.length
                })
            }
            return <Flex className={styles['info-block']}>
                <Flex.Item className={styles['info-left']}>{price.name}</Flex.Item>
                <Flex.Item className={styles['info-right']}>￥{price.price | parseInt} × {amount}</Flex.Item>
            </Flex>
        })

        return res
    }

    calculatePrice = () => {
        let { order, prices } = this.state
        var total = _.sumBy(prices, (price) => {
            var amount = 0
            if (price.type === 1) {
                amount = 1
            } else if (price.type === 2) {
                amount = order.applicants.length
            } else {
                var applicants = order.applicants
                amount = _.sumBy(applicants, (applicant) => {
                    return applicant.pets.length
                })
            }
            return price.price * amount
        })
        return total
    }

    renderTotalPrice = () => {
        var total = this.calculatePrice()
        return <Flex className={styles['info-block']}>
            <Flex.Item className={styles['info-left']}>总计</Flex.Item>
            <Flex.Item className={styles['info-right'] + ' ' + styles['info-total']}>￥{total}</Flex.Item>
        </Flex>
    }

    handleChecked = (i) => {
        var { checked_order } = this.state
        if (checked_order.indexOf(i) === -1) {
            checked_order.push(i)
        } else {
            checked_order.splice(checked_order.indexOf(i), 1)
        }
        this.setState({
            checked_order: checked_order
        })
    }

    render() {
        let { order, checked_order } = this.state
        var event = {}
        if (order == null) {
            return <></>
        }
        if (order.event) {
            event = order.event
        }
        let applicants = []
        if (order.applicants) {
            applicants = order.applicants
        }
        var self = this;
        return (
            <Container className={styles['order-detail-page']}>
                <div className={styles['order-detail-header']}>
                    <span>
                        <span className={styles['order-detail-header-title']}>活动开始前48小时可无条件取消报名并退款</span>
                    </span>
                </div>

                <div className={styles['info-container'] + ' ' + styles['info-header']}>
                    <span className={styles['info-title']}>{event.title}</span>
                    <div className={styles['info-item'] + ' ' + styles['info-item-main']}>
                        <span><img src={require('assets/images/icon-calendar.png')} alt="vip" /></span>
                        <span>{dayjs(event.start_at).locale("zh-cn").format('M月D日（ddd）HH:mm')}</span>
                        <span></span>
                    </div>
                    <div className={styles['info-item']}>
                        <span><img src={require('assets/images/icon-location.png')} alt="vip" /></span>
                        <span>{event.location}</span>
                        <span></span>
                    </div>
                </div>

                <div className={styles['info-container']}>
                    <div className={styles['info-block-border-bottom']}>
                        <div className={styles['info-block-title']}> 请选择需要退款的报名人 </div>
                        {
                            applicants.map(function (applicant, i) {
                                return <div className={styles['refund-block'] + " " + ((checked_order.indexOf(applicant.id) !== -1) ? styles['selected'] : '')} onClick={(e) => { self.handleChecked(applicant.id) }}>
                                    <div className={styles['selection']} >
                                        {
                                            (checked_order.indexOf(applicant.id) !== -1) ?
                                                <img src={require('./../../assets/images/checked.png')} alt="" />
                                                : <img src={require('./../../assets/images/unchecked.png')} alt="" />
                                        }
                                    </div>
                                    <div className={styles['info-blocks']}>
                                        <Flex className={styles['info-block']}>
                                            <Flex.Item className={styles['info-left']}>报名人</Flex.Item>
                                            <Flex.Item className={styles['info-right']}>{applicant.name}</Flex.Item>
                                        </Flex>
                                        <Flex className={styles['info-block']}>
                                            <Flex.Item className={styles['info-left']}>手机号</Flex.Item>
                                            <Flex.Item className={styles['info-right']}>{applicant.mobile}</Flex.Item>
                                        </Flex>
                                        <Flex className={styles['info-block']}>
                                            <Flex.Item className={styles['info-left']}>携带宠物</Flex.Item>
                                            <Flex.Item className={styles['info-right']}>
                                                {
                                                    applicant.pets.map(function (pet, i) {
                                                        return <>
                                                            <img src={pet.avatar} className='app-circle' alt={pet.name} />
                                                            <span>{pet.name}</span>
                                                        </>
                                                    })
                                                }
                                            </Flex.Item>
                                        </Flex>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className={styles['footer-container']}>
                    <Footer order={order} checked={checked_order} onSubmit={this.handleSubmit} />
                </div>
            </Container>
        );
    }
}


export class Footer extends Component {
    utilService = inject('utilService');

    static propTypes = {
        price: PropTypes.number,
        order: PropTypes.object,
        checked: PropTypes.array
    }

    static defaultProps = {
        order: {},
        showDetail: true,
        onSubmit: _.noop,
        onPriceDetail: _.noop,
        checked: []
    }

    handleSubmit = () => {
        let { order, checked } = this.props;
        this.utilService.gotoWithState('/user/refundconfirm', { id: order.id }, {
            checked
        })
    }

    render() {
        let { checked } = this.props;

        if (checked.length > 0) {
            return (
                <div className={styles['footer']}>
                    <div>
                        <Button onClick={this.handleSubmit}>下一步</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles['footer']}>
                    <div>
                        <Button disabled>下一步</Button>
                    </div>
                </div>
            )
        }

    }
}