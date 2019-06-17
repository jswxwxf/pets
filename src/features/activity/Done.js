import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem, Icon, Modal, Flex } from 'antd-mobile';
import qs from 'query-string';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import { Container } from 'templates';

import styles from './Done.module.scss';

export default class Done extends Component {

    utilService = inject('utilService');
    activityCtrl = inject('activityController');

    id = qs.parse(this.props.location.search).id;

    pricePicker;

    state = {
        activity: {},
    }

    componentDidMount() {
        document.title = '报名资料验证'
        this.loadData();
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.activityCtrl.getActivity(this.id);
        this.setState({
            activity: result.data,
        });
    }

    handleClose = (e) => {
        if (e.currentTarget.innerText === "确 定") {
            let { attendForms, deleted } = this.state;
            this.setState({
                attendForms: Utils.arrayRemove(attendForms, deleted)
            });
        }
        this.setState({
            popup: 0,
            delete: 0
        })
    }

    render() {
        return (
            <Container className={styles['done-page']}>
                <div className={styles['header']}>
                    <img src={require('assets/images/success.png')} alt="success" />
                    <h4>报名资料已提交</h4>
                </div>
                <WhiteSpace />
                <h2>提交了以后，接下去我还应该了解什么？</h2>
                <ol>
                    <li> 报名资料提交后，我们的工作人员将在工作后台核对证件的有效性，并在24小时内对你的验证结果以系统消息的形式进行回复。如果核验通过后，可下单支付报名费用。 </li>
                    <li> 若活动审核失败，则请您修改订单资料后重新提交审核。 </li>
                </ol>
            </Container>
        );
    }
}