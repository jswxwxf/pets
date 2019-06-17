import { inject } from 'config';
import React, { Component } from 'react';
import { Container } from 'templates';
import styles from './Done.module.scss';

export default class PaymentDone extends Component {

    utilService = inject('utilService');
    activityCtrl = inject('activityController');

    pricePicker;

    state = {

    }

    componentDidMount() {
        document.title = '支付成功'
    }

    render() {
        return (
            <Container className={styles['done-page']}>
                <div className={styles['header']}>
                    <img src={require('assets/images/success.png')} alt="success" />
                    <h4>支付成功</h4>
                </div>
            </Container>
        );
    }
}