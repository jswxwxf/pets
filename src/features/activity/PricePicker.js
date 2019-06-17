import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, WhiteSpace } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

import { Footer } from './Attend';

import AttendForm from './AttendForm';

import styles from './PricePicker.module.scss';

export default class PricePicker extends Component {

    activityCtrl = inject('activityController');

    static propTypes = {
        id: PropTypes.string,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        onSubmit: _.noop
    }

    state = {
        visible: false,
        prices: null
    }

    async open(forms) {
        this.forms = forms;
        await this.loadData();
        this.setState({
            visible: true
        });
    }

    async loadData() {
        let { id } = this.props;
        let result = await this.activityCtrl.getActivityPrices(id);
        this.setState({
            prices: result.data
        });
    }

    getPetsCount() {
        return AttendForm.getPetsCount(this.forms);
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        var { onSubmit, detail } = this.props;
        if (typeof detail == 'undefined') {
            var detail = [{
                pets: []
            }]
        }
        let { visible, prices } = this.state;
        let petsCount = this.getPetsCount();
        if (prices == null) {
            return <></>
        }
        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" transparent className={styles['price-picker']}>
                <div className={styles['header']}>
                    <Icon onClick={this.handleClose} type="cross" />
                    <span className={styles['title']}>价格明细</span>
                    <div></div>
                </div>
                <div className={styles['list-container']}>
                    {
                        prices.map((price) => {
                            if (price.type === 1) {
                                return <div className={styles['small']}><span>{price.name}</span><span>￥{price.price} × 1</span></div>
                            }
                            if (price.type === 2) {
                                return <div className={styles['small']}><span>{price.name}</span><span>￥{price.price} × {detail.length}</span></div>
                            }
                            if (price.type === 3) {
                                return <div className={styles['small']}><span>{price.name}</span><span>￥{price.price} × {petsCount}</span></div>
                            }
                        })
                    }
                </div>
                <Footer prices={prices} detail={detail} onSubmit={onSubmit} showDetail={false} />
            </Modal>
        )
    }
}