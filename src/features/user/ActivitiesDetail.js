import { Button, Flex, WhiteSpace } from 'antd-mobile';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { Container } from 'templates';
import { inject } from '../../config';
import ContactPicker from './../activity/ContactPicker.js';
import ContactOfficialPicker from './../activity/ContactOfficialPicker.js';
import PayPicker from './../activity/PayPicker.js';
import styles from './ActivitiesDetail.module.scss';
import dayjs from 'dayjs'
import "dayjs/locale/zh-cn";

export default class ActivitiesDetail extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');

    id = this.props.match.params.id;
    id = qs.parse(this.props.location.search).id;

    payPicker;

    state = {
        visible: false,
        order: {}
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

    approved() {
        let { order } = this.state
        return <span>
            <span className={styles['order-detail-header-title']}>核验通过，待付款</span>
            <span className={styles['order-detail-header-subtitle']}>恭喜您，活动报名资料已核验通过！名额已为您锁定，请务必在规定时间内完成报名费支付！</span>
            <div>
                <span>剩余支付时间</span>
                <span className={styles['count-down']}><Countdown date={order.pay_end_at} daysInHours={true} /></span>
            </div>
        </span>
    }

    pending() {
        return <span>
            <span className={styles['order-detail-header-title']}>核验中</span>
            <span className={styles['order-detail-header-subtitle']}>您的资料还在核验中，预计24小时内就能够完成啦！</span>
        </span>
    }

    denied() {
        let { order } = this.state
        return <span>
            <span className={styles['order-detail-header-title']}>核验未通过</span>
            <span className={styles['order-detail-header-subtitle']}>原因：{order.denied_reason}</span>
        </span>
    }

    pay_expired() {
        return <span>
            <span className={styles['order-detail-header-title']}>已关闭</span>
            <span className={styles['order-detail-header-subtitle']}>订单已超过支付时限，请重新报名</span>
        </span>
    }

    handleContact = () => {
        this.contactPicker.open()
    }

    payFooter() {
        let { order, prices } = this.state
        return <div className={styles['footer-container']}>
            <ContactPicker ref={el => this.contactPicker = el} />
            <Footer order={order} prices={prices} onPriceDetail={this.handleContact} onSubmit={this.handleSubmit} />
        </div>
    }

    renderHeader = () => {
        let { order } = this.state
        if (order.approval_status === 'pending') {
            return <div className={styles['order-detail-header']}>
                {this.pending()}
            </div>
        }
        if (order.approval_status === 'approved') {
            if (order.financial_status === 'paid') {
                return <></>
            } else if (order.financial_status === 'expired') {
                return <div className={styles['order-detail-header']}>
                    {this.pay_expired()}
                </div>
            } else {
                return <div className={styles['order-detail-header']}>
                    {this.approved()}
                </div>
            }
        }
        if (order.approval_status === 'denied') {
            return <div className={styles['order-detail-header']}>
                {this.denied()}
            </div>
        }
    }

    renderPayFooter = () => {
        let { order } = this.state
        if (order.approval_status === 'approved') {
            if ((order.financial_status !== 'paid') && (order.financial_status !== 'expired')) {
                return this.payFooter()
            }
        }
    }

    renderPriceTable = () => {
        let { order, prices } = this.state
        if (prices == null)
            return <></>
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
        let { order } = this.state
        if (order === null) {
            return
        }

        var total = this.calculatePrice()
        return <Flex className={styles['info-block']}>
            <Flex.Item className={styles['info-left']}>总计</Flex.Item>
            <Flex.Item className={styles['info-right'] + ' ' + styles['info-total']}>￥{total}</Flex.Item>
        </Flex>
    }

    notice() {
        return <>
            <div className={styles['info-block-title']}> 支付须知 </div>
            <div className={styles['info-block-border-bottom']}>
                <p>1. 活动结束后2个工作日内，将原路退回活动押金。</p>
                <p>2. 活动开始前48个小时内，可取消订单并无条件退回所有活动费用（包含押金及活动成本）。 </p>
                <p>3. 普通活动将在收到款项后，48小时内发布；若活动中添加投票、抽奖等插件内容，活动将在收到款项后72小时内发布。</p>
            </div>
        </>
    }

    render() {
        let { order } = this.state
        var event = {}
        if (order.event) {
            event = order.event
        }
        let applicants = []
        if (order.applicants) {
            applicants = order.applicants
        }
        return (
            <Container className={styles['order-detail-page']}>

                {this.renderHeader()}

                {/* <span className={styles['order-detail-header-title']}>审核中</span>
          <span className={styles['order-detail-header-subtitle']}>您的资料还在审核中，预计2个工作日就能够完成啦！</span>
          <span className={styles['order-detail-header-title']}>审核未通过</span>
          <span className={styles['order-detail-header-subtitle']}>原因：活动详情撰写不规范，活动详情内应包含有关活动的具体信息</span>
          <span className={styles['order-detail-header-title']}>审核通过，待支付押金</span>
          <span className={styles['order-detail-header-subtitle']}>恭喜您，活动发布申请审核通过！请务必在规定时间内支付押金，否则您本次的活动发布申请将被取消！</span>
          <div>
            <span>剩余支付时间</span>
            <span className={styles['count-down']}>72:00:00</span>
          </div> */}

                <div className={styles['info-container'] + ' ' + styles['info-header']}>
                    <span className={styles['info-title']}>{event.title}</span>
                    <div className={styles['info-item'] + ' ' + styles['info-item-main']}>
                        <span><img src={require('assets/images/icon-calendar.png')} alt="vip" /></span>
                        <span>{dayjs(event.start_at).locale("zh-cn").format('M月D日\（ddd\）HH:mm')}</span>
                        <span></span>
                    </div>
                    <div className={styles['info-item']}>
                        <span><img src={require('assets/images/icon-location.png')} alt="vip" /></span>
                        <span>{event.location}</span>
                        <span></span>
                    </div>
                </div>
                <div className={styles['info-container']}>
                    <div className={styles['info-block-title']}> 价格明细 </div>
                    <div className={styles['info-block-border-bottom']}>
                        {this.renderPriceTable()}
                        {this.renderTotalPrice()}
                    </div>
                    <div className={styles['info-block-border-bottom']}>
                        <div className={styles['info-block-title']}> 报名信息 </div>
                        {
                            applicants.map(function (applicant) {
                                return <div>
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
                                            {applicant.pets.map(pet => {
                                                return <img className={styles['info-avatar']} src={pet.avatar} alt="" />
                                            })}
                                        </Flex.Item>
                                    </Flex>
                                </div>
                            })
                        }
                    </div>
                    {order.approval_status === 'approved' ? this.notice() : ''}
                    <div className={styles['info-block-title']}> 订单信息 </div>
                    <div className={styles['info-block-border']}>
                        <Flex className={styles['info-sub']}>
                            <Flex.Item className={styles['info-left']}>订单号</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.trade_no}</Flex.Item>
                        </Flex>
                        <Flex className={styles['info-sub']}>
                            <Flex.Item className={styles['info-left']}>下单时间</Flex.Item>
                            <Flex.Item className={styles['info-right']}>{order.created_at}</Flex.Item>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <WhiteSpace size="lg"></WhiteSpace>
                </div>
                {this.renderPayFooter()}
            </Container>
        );
    }
}

export class Footer extends Component {

    static propTypes = {
        showDetail: PropTypes.bool,
        onPriceDetail: PropTypes.func
    }

    static defaultProps = {
        showDetail: true,
        onPriceDetail: _.noop
    }

    payPicker;
    contactOfficialPicker;

    handleSubmit = () => {
        this.payPicker.open()
    }

    handleContact = () => {
        this.contactOfficialPicker.open()
    }

    render() {
        let { showDetail, onPriceDetail, order } = this.props;

        return (
            <div className={styles['footer']}>
                <div><span>实付：￥</span><span className={styles['price']}>{order.price}</span></div>
                <div>
                    {showDetail && <span onClick={this.handleContact}>联系平台</span>}
                    <Button onClick={this.handleSubmit} inline>确认支付</Button>
                </div>
                <ContactOfficialPicker ref={el => this.contactOfficialPicker = el} />
                <PayPicker ref={el => this.payPicker = el} order={order} price={order.price} />
            </div>
        )
    }
}
