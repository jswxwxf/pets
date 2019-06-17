import { Button, Carousel, Flex, Steps, WhiteSpace } from 'antd-mobile';
import _ from 'lodash';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import qs from 'query-string';
import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import { Container } from 'templates';
import { inject } from '../../config';
import ContactOfficialPicker from './../activity/ContactOfficialPicker.js';
import PayPicker from './../activity/PayPicker.js';
import styles from './OrderDetail.module.scss';
import dayjs from 'dayjs'
import "dayjs/locale/zh-cn";

const Step = Steps.Step;

export default class OrderDetail extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');
    bridgeService = inject('bridgeService');

    id = this.props.match.params.id;
    id = qs.parse(this.props.location.search).id;

    state = {
        order: null,
        prices: []
    };

    contactOfficialPicker;

    async componentDidMount() {
        this.loadData();
        this.setRightButton();
    }

    async setRightButton() {
        // var res = await this.bridgeService.setRightButton('核销扫码')
        // if (res) {
        //     var scan = await this.bridgeService.openQrScan();
        //     if (scan) {
        //         this.utilService.alert(JSON.stringify(scan));
        //         this.setRightButton()
        //     }
        // }
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
                        <span>剩余支付时间</span>
                        <span className={styles['count-down']}><Countdown date={order.pay_end_at} daysInHours={true} /></span>
                    </div>
                </span>
            </div>
        }
        if (order.financial_status === 'expired') {
            return <div className={styles['order-detail-header']}>
                <span>
                    <span className={styles['order-detail-header-title']}>已关闭</span>
                    <span className={styles['order-detail-header-subtitle']}>订单已超过支付时限，请重新报名</span>
                </span>
            </div>
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
                <Flex.Item className={styles['info-right']}>￥{price.price} × {amount}</Flex.Item>
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
            return price.price * 100 * amount
        })
        return total / 100
    }

    renderTotalPrice = () => {
        let { order } = this.state
        if (order === null) {
            return
        }
        var total = 0;
        if (order.type === 0) {
            total = order.price
        } else {
            total = this.calculatePrice()
        }
        return <Flex className={styles['info-block']}>
            <Flex.Item className={styles['info-left']}>总计</Flex.Item>
            <Flex.Item className={styles['info-right'] + ' ' + styles['info-total']}>￥{total}</Flex.Item>
        </Flex>
    }

    renderQrCode = () => {
        let { order } = this.state
        if (order === null) {
            return
        }
        if (order.type !== 1) {
            return
        }
        if ((order.status === 'active') && (order.financial_status === 'expired')) {
            return
        }

        if ((order.status === 'active') && (order.financial_status === 'refund')) {
            return
        }

        if ((order.status === 'active') && (order.financial_status === 'paid')) {
            return <div className={styles['qr-container']}>
                <div className={styles['qr-header']}>凭订单二维码扫码入场</div>
                <div className={styles['qr-num']}>第 1/{order.applicants.length} 张</div>
                <Carousel className={styles['qr-carousel']}
                    dots={true}
                    dotStyle={{ borderRadius: 0, width: '15px', height: 2, position: 'absolute', top: '20px' }}
                    dotActiveStyle={{ borderRadius: 0, width: '15px', height: 2, backgroundColor: '#FE5000', position: 'absolute', marginTop: '20px' }}
                // autoplay
                >
                    {order.applicants.map((applicant) => {
                        return <div className={styles['qrcode']}>
                            <QRCode value="http://api.iwanmeng.com/" size={205} />
                            <p>报名人：{applicant.name}</p>
                            <p>携带宠物：{applicant.pets.length}只</p>
                        </div>
                    })}
                </Carousel>
            </div>
        }
    }

    customDesc() {
        let { order } = this.state
        if (order === null) {
            return
        }

        var time = ''

        if ((order.refund.financial_status === 'refund') || (order.refund.financial_status === 'refunded')) {
            return <div>
                <p>支付宝会在 {dayjs(order.refund.refunded_at).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss')} 前将 {order.refund.price} 元退款入账至您的支付宝账户，请注意查收。如逾期未收到，您可以凭交易号 {order.trade_no} 致电支付宝客服查询到账情况</p>
                <span>{order.refund.refunded_at}</span>
            </div>

        }
    }

    renderRefundProgress = () => {
        let { order } = this.state
        if (order == null) {
            return <></>
        }
        if (order.refund == null) {
            return <></>
        }
        var progress1 = order.refund.created_at
        var progress2 = order.refund.approved_at
        if (order.refund.progress) {
            progress1 = order.refund.progress[0] ? order.refund.progress[0].time : order.refund.created_at;
            progress2 = order.refund.progress[1] ? order.refund.progress[1].time : ''
        }
        var current = 0
        if (order.refund.approved_at != null) {
            current = 1
        }
        if (order.refund.financial_status === 'refunded') {
            current = 2
        }
        if ((order.status === 'active') && ((order.financial_status === 'refund') || (order.financial_status === 'refunded'))) {
            return <div className={styles['info-block-border-bottom']}>
                <div className={styles['info-block-title']}> 退款进度 </div>
                <WhiteSpace size="lg" />
                <Steps size="small" current={current} className={styles['timeline']}>
                    <Step title="提交退款申请" icon={<img src={require('./../../assets/images/dot-done.png')} style={{ width: '65%' }} alt="" />} description={progress1} />
                    <Step title="退款审核通过" icon={current >= 1 ? <img src={require('./../../assets/images/dot-done.png')} style={{ width: '65%' }} alt="" /> : <img src={require('./../../assets/images/dot.png')} style={{ width: '65%' }} alt="" />} description={progress2} />
                    <Step title="退款成功" icon={current >= 2 ? <img src={require('./../../assets/images/checked.png')} style={{ width: '120%' }} alt="" /> : <img src={require('./../../assets/images/check-disabled.png')} style={{ width: '120%' }} alt="" />} description={this.customDesc()} />
                </Steps>
            </div>
        }
    }

    renderRefundMethod = () => {
        let { order } = this.state
        if (order == null) {
            return <></>
        }
        var platform = ''
        if (order.refund) {
            if (order.refund.third_platform === 1) {
                platform = '支付宝'
            } else {
                platform = '微信支付'
            }

        }
        if ((order.status === 'active') && (order.financial_status === 'refund')) {
            return <div className={styles['info-block-border-bottom']}>
                <div className={styles['info-block-title']}> 退款方式 </div>
                <Flex className={styles['info-block']}>
                    <Flex.Item className={styles['info-left']}>退款至</Flex.Item>
                    <Flex.Item className={styles['info-right']}>{platform}</Flex.Item>
                </Flex>
            </div>
        }
    }

    renderApplicants = () => {
        let { order } = this.state
        if (order == null) {
            return <></>
        }
        if ((order.status === 'active') && (order.financial_status === 'pending')) {
            let applicants = []
            if (order.applicants) {
                applicants = order.applicants
            }
            return <div className={styles['info-block-border-bottom']}>
                <div className={styles['info-block-title']}> 报名信息 </div>
                {
                    applicants.map(function (applicant, i) {
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
                                    {
                                        applicant.pets.map(function (pet, i) {
                                            return <>
                                                <img src={pet.avatar !== '' ? pet.avatar : 'http://mq.kai-dian.com/storage/1559636852ZEOBgrEOTl.png'} className='app-circle' alt={pet.name} />
                                                <span>{pet.name}</span>
                                            </>
                                        })
                                    }
                                </Flex.Item>
                            </Flex>
                        </div>
                    })
                }
            </div>
        }
    }

    renderPriceBlock = () => {
        let { order } = this.state
        if ((order.status === 'active') && (order.financial_status === 'expired')) {
            return
        }
        var title = '价格明细'
        if ((order.status === 'active') && (order.financial_status === 'refund')) {
            title = '退款明细'
        }

        return <>
            <div className={styles['info-block-title']}> {title} </div>
            <div className={styles['info-block-border-bottom']}>
                {order.type !== 0 && this.renderPriceTable()}
                {this.renderTotalPrice()}
            </div>
        </>
    }

    renderNotice = () => {
        let { order } = this.state
        if ((order.status === 'active') && (order.financial_status === 'pending')) {
            return order.type == 0 ? <>
                <div className={styles['info-block-title']}> 支付须知 </div>
                <div className={styles['info-block-border-bottom']}>
                    <p>1. 活动结束后2个工作日内，将原路退回活动押金。</p>
                    <p>2. 活动开始前48个小时内，可取消订单并无条件退回所有活动费用（包含押金及活动成本）。 </p>
                    <p>3. 普通活动将在收到款项后，48小时内发布；若活动中添加投票、抽奖等插件内容，活动将在收到款项后72小时内发布。</p>
                </div>
            </> : <>
                    <div className={styles['info-block-title']}> 支付须知 </div>
                    <div className={styles['info-block-border-bottom']}>
                        <p>1. 平台支持支付宝和微信等方式进行付款，具体以支付页为准。</p>
                        <p>2. 若超过3小时支付时限，将被视为主动放弃名额。</p>
                        <p>3. {order.created_at} 前可免费取消活动</p>
                    </div>
                </>
        }
    }

    renderOrderDetail = () => {
        let { order } = this.state
        return <>
            <div className={styles['info-block-title']}> 订单信息 </div>
            <div className={styles['info-block-border-bottom']}>
                <Flex className={styles['info-block']}>
                    <Flex.Item className={styles['info-left']}>订单号</Flex.Item>
                    <Flex.Item className={styles['info-right']}>{order.trade_no}</Flex.Item>
                </Flex>
                <Flex className={styles['info-sub']}>
                    <Flex.Item className={styles['info-left']}>下单时间</Flex.Item>
                    <Flex.Item className={styles['info-right']}>{dayjs(order.created_at).locale("zh-cn").format('YYYY年M月D日 HH:mm:ss')}</Flex.Item>
                </Flex>
            </div>
        </>
    }

    renderAdmissionNotice = () => {
        let { order } = this.state
        let event = order.event
        if (!event) {
            return <></>
        }
        if (order.type !== 1) {
            return <></>
        }

        if ((order.status === 'active') && (order.financial_status === 'paid')) {
            return <>
                <div className={styles['info-block-title']}> 入场须知 </div>
                <div className={styles['info-block-border-bottom']}>
                    <span className={styles['info-block-subtitle']}>报名方式</span>
                    <p>仅限成人</p>
                    {
                        (event.forbiddens !== '') && (event.forbiddens !== null) ? <><span className={styles['info-block-subtitle']}>禁止携带物品</span><p>{event.forbiddens}</p></> : <></>
                    }
                    {
                        (event.belongings !== '') && (event.belongings !== null) ? <><span className={styles['info-block-subtitle']}>用户须携带物品</span><p>{event.belongings}</p></> : <></>
                    }
                    {
                        (event.remark !== '') && (event.remark !== null) ? <><span className={styles['info-block-subtitle']}>备注信息</span><p>{event.remark}</p></> : <></>
                    }
                </div>
            </>
        }
    }


    handleContact = () => {
        this.contactOfficialPicker.open()
    }

    render() {
        let { order } = this.state
        var event = {}
        if (order == null) {
            return <></>
        }
        if (order.event) {
            event = order.event
        }

        return (
            <Container className={styles['order-detail-page']}>
                {order.approval_status === 'pending' ? this.pending(order) : ''}
                {order.approval_status === 'approved' ? this.approved(order) : ''}
                {order.approval_status === 'denied' ? this.denied(order) : ''}

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

                {this.renderQrCode()}
                <div className={styles['info-container']}>
                    {this.renderRefundProgress()}
                    {this.renderRefundMethod()}
                    {this.renderPriceBlock()}
                    {this.renderApplicants()}
                    {this.renderNotice()}
                    {this.renderOrderDetail()}
                    {this.renderAdmissionNotice()}
                </div>
                <div className={styles['footer-container']}>
                    <ContactOfficialPicker ref={el => this.contactOfficialPicker = el} />
                    {order.approval_status === 'approved' ? <Footer order={order} price={order.type === 0 ? order.price : this.calculatePrice()} onContactDetail={this.handleContact} onSubmit={this.handleSubmit} /> : <></>}
                </div>
            </Container>
        );
    }
}


export class Footer extends Component {

    utilService = inject('utilService');

    static propTypes = {
        price: PropTypes.number,
        order: PropTypes.object
    }

    static defaultProps = {
        order: {},
        showDetail: true,
        onSubmit: _.noop,
        onContactDetail: _.noop,
        detail: []
    }

    payPicker;

    handleSubmit = () => {
        let { price } = this.props;
        this.payPicker.open(price)
    }

    handleRefund = () => {
        let { order } = this.props
        this.utilService.goto('/user/refund', { id: order.id })
    }

    handleWriteOff = () => {
        let { order } = this.props
        this.utilService.goto('/user/writeoff', { id: order.id })
    }

    render() {
        let { showDetail, order, onContactDetail, price } = this.props;

        if (order.status === 'started') {
            return (
                <div className={styles['footer-full']}>
                    <div className={styles['full']}>
                        <Button type="ghost" onClick={this.handleWriteOff} >核销活动订单</Button>
                    </div>
                </div>
            )
        }
        if ((order.financial_status === 'pending')) {
            return (
                <div className={styles['footer']}>
                    <div><span>实付：￥</span><span className={styles['price']}>{price}</span></div>
                    <div>
                        {showDetail && <span onClick={onContactDetail}>联系平台</span>}
                        <Button onClick={this.handleSubmit} inline>确认支付</Button>
                    </div>
                    <PayPicker ref={el => this.payPicker = el} order={order} price={price} />
                </div>
            )
        } else if (order.financial_status === 'paid') {
            return (
                <div className={styles['footer']}>
                    <div> </div>
                    <div>
                        {showDetail && <span onClick={onContactDetail}>联系平台</span>}
                        <Button type="ghost" onClick={this.handleRefund} inline>退款申请</Button>
                    </div>
                </div>
            )
        } else {
            return (<>
            </>)
        }

    }
}