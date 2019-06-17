import { List, Modal, Flex, Button } from 'antd-mobile';
import dayjs from 'dayjs';
import "dayjs/locale/zh-cn";
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import { inject } from '../../config';
import styles from './WriteOff.module.scss';

const Item = List.Item;

export default class WriteOff extends Component {

    utilService = inject('utilService');
    orderCtrl = inject('orderController');
    bridgeService = inject('bridgeService');

    id = this.props.match.params.id;
    id = qs.parse(this.props.location.search).id;

    state = {
        order: null,
        prices: [],
        trades: [],
        trade: null,
        popup: false
    };

    contactOfficialPicker;

    async componentDidMount() {
        this.loadData();
        // this.setRightButton();
    }

    async setRightButton() {
        var res = await this.bridgeService.setRightButton('核销扫码')
        if (res) {
            var scan = await this.bridgeService.openQrScan();
            if (scan) {
                this.utilService.alert(JSON.stringify(scan));
                this.setRightButton()
            }
        }
    }

    handleClose = () => {
        let popup = false;
        this.setState({
            popup
        })
    }

    async handleWriteOff(trade) {
        let popup = true
        let res = await this.orderCtrl.writeOffTrade(trade.event_id, trade.trade_no)
        var trade = res.data
        this.setState({
            popup,
            trade
        })
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.orderCtrl.getOrder(this.id);
        let trades = await this.orderCtrl.getTrades(this.id);
        this.setState({
            order: result.data,
            trades: trades.data
        });
    }

    render() {
        let { order, trades, trade } = this.state
        var event = {}
        if (order == null) {
            return <></>
        }
        if (order.event) {
            event = order.event
        }

        return (
            <Container className={styles['writeoff-page']}>
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
                    <List>
                        {trades.map(trade => {
                            return <Item onClick={(e) => { this.handleWriteOff(trade, e) }} extra={trade.writeoff_at == null ? <span className={styles['pending']}>未核销</span> : <span className={styles['done']}>已核销</span>}>订单号：{trade.trade_no}</Item>
                        })}

                    </List>
                </div>
                <Modal
                    visible={this.state.popup}
                    transparent
                    className={'detail-alert'}
                    wrapClassName={styles['detail-alert-wrap']}
                    transitionName={'bounce'}
                    onClose={this.handleClose}
                    footer={[]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <h5 className={styles['modal-header-title']}>核销成功！</h5>
                    {trade ? trade.applicants.map(applicant => {
                        return <p>
                            报名人：{applicant.name} <br />
                            携带宠物：{applicant.pets.length}只
                        </p>
                    }) : ''}
                    <Flex>
                        <Flex.Item>
                            <Button className={styles['cancel-btn']} type="ghost" onClick={this.handleClose}>取消</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button onClick={this.handleClose}>确定</Button>
                        </Flex.Item>
                    </Flex>
                </Modal>
            </Container>
        );
    }
}
