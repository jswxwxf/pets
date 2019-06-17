import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button, Stepper } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

import styles from './Cart.module.scss';
import AddressEditPicker from './AddressEditPicker';

export default class Cart extends Component {

    utilService = inject('utilService');
    activityCtrl = inject('activityController');

    static propTypes = {
        id: PropTypes.string,
        credit: PropTypes.number,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        items: [],
        onSubmit: _.noop,
        credit: 0
    }

    addressEditPicker

    state = {
        visible: false,
        prices: null,
        addresses: [],
        items: [],
        val: 1
    }

    async open() {
        return new Promise(async (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.setState({
                visible: true
            });
            await this.loadData();
        });
    }

    async loadData() {
        var items = localStorage.getItem('cart');
        if (items) {
            items = JSON.parse(items)
        } else {
            items = []
        }
        // var res = await this.activityCtrl.getAddress()
        this.setState({
            items: items,
            // addresses: res.data
        });
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
        this.reject()
    }

    handleSubmit = async () => {
        let { addresses } = this.state
        this.utilService.hidePicker('.cart-container');
        try {
            await this.addressEditPicker.open(addresses)
        } finally {
            this.utilService.showPicker('.cart-container');
        }
    }

    handleChange = (item, e) => {
        let { items } = this.state
        var item2 = JSON.parse(JSON.stringify(item));
        item2.amount = e;
        if (e == 0) {
            items.splice(items.indexOf(item), 1)
        } else {
            items.splice(items.indexOf(item), 1, item2)
        }
        if (items.length == 0) {
            this.handleClose()
        }
        localStorage.setItem('cart', JSON.stringify(items))
        this.setState({
            items: items
        })
    }

    renderItem = (item) => {
        return (<div className={styles['item']}>
            <span className={styles['name']}>{item.name}</span>
            <span className={styles['credits']}>{item.price | parseInt} 积分</span>
            <Stepper
                style={{ width: '30%' }}
                showNumber={true}
                max={100}
                min={0}
                value={item.amount}
                onChange={e => { this.handleChange(item, e) }}
            />
        </div>
        )
    }

    render() {
        var { credit } = this.props;
        let { visible, items } = this.state;

        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent wrapClassName={'cart-container'} className={styles['cart-picker']}>
                <div className={styles['header']}>
                    <Icon onClick={this.handleClose} type="cross" />
                    <span className={styles['title']}>已选商品</span>
                    <div></div>
                </div>
                <div className={styles['list-container']}>
                    {
                        items.length > 0 ?
                            (items.map((it) => {
                                return this.renderItem(it)
                            })) :
                            <div className={styles['item']}>
                                <p style={{ width: '100%', textAlign: 'center' }}>请选择商品</p>
                            </div>
                    }
                </div>
                <div className={styles['footer-container']}>
                    <Footer credit={credit} items={items} onPriceDetail={this.handlePriceDetail} onSubmit={this.handleSubmit} />
                </div>
                <AddressEditPicker ref={el => this.addressEditPicker = el}></AddressEditPicker>
            </Modal>
        )
    }
}

export class Footer extends Component {

    static propTypes = {
        items: PropTypes.array,
        showDetail: PropTypes.bool,
        onSubmit: PropTypes.func,
        onPriceDetail: PropTypes.func,
        credit: PropTypes.number,
    }

    static defaultProps = {
        items: [],
        credit: 0,
        showDetail: true,
        onSubmit: _.noop,
        onPriceDetail: _.noop
    }

    render() {
        let { items, onSubmit, credit } = this.props;
        var price = 0;
        var total = 0
        items.forEach(item => {
            price += item.amount * item.price
            total += item.amount
        });
        var remain
        var btn
        if ((credit - price) < 0) {
            remain = <span className={styles['credit-warning']}><br />积分不足，还差{price - credit | parseInt}</span>
            btn = <Button inline disabled>确认兑换</Button>
        } else {
            if (total > 0) {
                remain = <></>
                btn = <Button onClick={onSubmit} inline>确认兑换</Button>
            } else {
                btn = <Button onClick={onSubmit} inline disabled>确认兑换</Button>
            }
        }
        return (
            <div className={styles['footer']}>
                <div><span>共：</span><span className={styles['price']}>{price | parseInt}</span> 积分
                {remain}</div>
                <div>
                    {btn}
                </div>
            </div>
        )
    }
}
