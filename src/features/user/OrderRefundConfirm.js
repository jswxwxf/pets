import { Button, Flex } from 'antd-mobile';
import _ from 'lodash';
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import { inject } from '../../config';
import ContactOfficialPicker from '../../features/activity/ContactOfficialPicker'
import styles from './OrderRefundConfirm.module.scss';
import dayjs from 'dayjs'
import "dayjs/locale/zh-cn";

export default class OrderRefundConfirm extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');
    activityCtrl = inject('activityController');

    id = this.props.match.params.id;
    id = qs.parse(this.props.location.search).id;

    state = {
        order: null,
        prices: [],
        applicants: [],
        checked_order: [],
    };

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.orderCtrl.getOrder(this.id);
        let applicants = await this.activityCtrl.getMyApplicants(result.data.event_id)
        let checked_order = this.props.location.state ? this.props.location.state.checked : [];
        let prices = await this.orderCtrl.getPrices(result.data.event_id);
        this.setState({
            order: result.data,
            prices: prices.data,
            checked_order,
            applicants
        });
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
        let { order, checked_order, prices } = this.state
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
            // applicants.map((app) => {
            //   debugger
            //   // app.pets
            // })
        }
        var total = 0
        prices.forEach(price => {
            var pets_count = 0
            applicants.forEach((applicant) => {
                if (checked_order.indexOf(applicant.id) !== -1) {
                    pets_count += applicant.pets.length
                }
            })
            var nums = 0
            switch (price.type) {
                case 1:
                    nums = 1
                    total += price.price * 1
                    break;
                case 2:
                    nums = checked_order.length
                    total += price.price * nums
                    break;
                case 3:
                    nums = pets_count
                    total += price.price * nums
                    break;
                default:
                    break;
            }
        })
        // this.utilService.alert(order.price - total)
        return (
            <Container className={styles['order-detail-page']}>

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
                        <div className={styles['info-block-title']}> 退款人 </div>
                        {
                            applicants.map((applicant) => {
                                if (checked_order.indexOf(applicant.id) !== -1) {
                                    return <>
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
                                                    applicant.pets.map(function (pet) {
                                                        return <>
                                                            <img src={pet.avatar} className='app-circle' alt={pet.name} />
                                                            <span>{pet.name}</span>
                                                        </>
                                                    })
                                                }
                                            </Flex.Item>
                                        </Flex>
                                    </>
                                }
                            })
                        }
                    </div>
                    <div className={styles['info-block-border-bottom']}>
                        <div className={styles['info-block-title']}> 退款明细 </div>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>已付款</Flex.Item>
                            <Flex.Item className={styles['info-right']}>¥ {order.price}</Flex.Item>
                        </Flex>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}><strong>扣除费用</strong></Flex.Item>
                            <Flex.Item className={styles['info-right']}></Flex.Item>
                        </Flex>
                        {
                            prices.map((price) => {
                                var pets_count = 0
                                applicants.map((applicant) => {
                                    if (checked_order.indexOf(applicant.id) !== -1) {
                                        pets_count += applicant.pets.length
                                    }
                                })
                                var nums = 0
                                switch (price.type) {
                                    case 1:
                                        nums = 1
                                        break;
                                    case 2:
                                        nums = checked_order.length
                                        break;
                                    case 3:
                                        nums = pets_count
                                        break;
                                    default:
                                        break;
                                }
                                return <Flex className={styles['info-block']}>
                                    <Flex.Item className={styles['info-left']}>{price.name} </Flex.Item>
                                    <Flex.Item className={styles['info-right']}>¥ {price.price} x {nums}</Flex.Item>
                                </Flex>
                            })
                        }
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-left']}>总计</Flex.Item>
                            <Flex.Item className={styles['info-right'] + ' ' + styles['info-total']}>￥ {order.price - total}</Flex.Item>
                        </Flex>
                    </div>
                    <div className={styles['info-block-border-bottom']}>
                        <div className={styles['info-block-title']}> 退款须知 </div>
                        <Flex className={styles['info-block']}>
                            <Flex.Item className={styles['info-detail']}>提交退款审核流程后，平台将于1-7个工作日内对退款申请进行审核。审核通过后，退款金额将打款至您本订单支付所用的支付方。</Flex.Item>
                        </Flex>
                    </div>
                    <div className={styles['info-block-border-bottom']}>
                        <div className={styles['info-block-title']}> 订单信息 </div>
                        <div className={styles['info-block-border']}>
                            <Flex className={styles['info-sub']}>
                                <Flex.Item className={styles['info-left']}>订单号</Flex.Item>
                                <Flex.Item className={styles['info-right']}>{order.trade_no}</Flex.Item>
                            </Flex>
                            <Flex className={styles['info-sub']}>
                                <Flex.Item className={styles['info-left']}>下单时间</Flex.Item>
                                <Flex.Item className={styles['info-right']}>{dayjs(order.created_at).locale("zh-cn").format('YYYY年M月D日 HH:mm:ss')}</Flex.Item>
                            </Flex>
                        </div>
                    </div>
                </div>
                <div className={styles['footer-container']}>
                    <Footer order={order} applicants={applicants} price={this.calculatePrice()} onSubmit={this.handleSubmit} />
                </div>
            </Container>
        );
    }
}

export class Footer extends Component {
    orderCtrl = inject('orderController');
    utilService = inject('utilService')

    static propTypes = {
    }

    static defaultProps = {
    }

    handleContact = () => {
        this.contactPicker.open()
    }

    handleSubmit = async () => {
        let { order, applicants } = this.props;
        if (order) {
            try {
                await this.orderCtrl.refund(order.trade_no, applicants)
                this.utilService.alert('退款提交成功')
                this.utilService.goto('/user/activities')
            } catch (error) {

            }
        }
    }

    render() {
        let { order } = this.props;
        return (
            <div className={styles['footer']}>
                <div><span>实退金额：￥</span><span className={styles['price']}>{order.price}</span></div>
                <div>
                    <span onClick={this.handleContact}>联系平台</span>
                    <ContactOfficialPicker ref={el => this.contactPicker = el} />
                    <Button onClick={this.handleSubmit} inline>确认退款</Button>
                </div>
            </div>
        )
    }
}
