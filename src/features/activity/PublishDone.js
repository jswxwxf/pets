import { NavBar, WhiteSpace } from 'antd-mobile';
import { inject } from 'config';
import _ from "lodash";
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import styles from './Done.module.scss';

export default class Done extends Component {

    utilService = inject('utilService');
    activityCtrl = inject('activityController');
    bridgeService = inject('bridgeService');

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
        _.forIn(localStorage, (value, objKey) => {
            if (true === _.startsWith(objKey, 'publish.')) {
                localStorage.removeItem(objKey)
            }
        });
        // let result = await this.activityCtrl.getActivity(this.id);
        // this.setState({
        //     activity: result.data,
        // });
    }

    handleClose = () => {
        this.bridgeService.closeWebView()
    }

    render() {
        return (
            <>
                <NavBar
                    mode="light"
                    rightContent={[
                        <p onClick={() => this.handleClose()}>关闭</p>
                    ]}

                >活动申请</NavBar>

                <Container className={styles['done-page']}>
                    <div className={styles['header']}>
                        <img src={require('assets/images/success.png')} alt="success" />
                        <h4>活动发布申请已提交</h4>
                    </div>
                    <WhiteSpace />
                    <h2>申请了以后，接下去我还应该了解什么？</h2>
                    <ol>
                        <li> 活动发布申请提交后，我们的工作人员将在工作后台核对活动的有效性与可行性，并在1-3个工作日内，对你的申请通过系统消息的形式进行回复。如果审核通过则可支付活动押金，并发布活动。 </li>
                        <li> 若活动审核失败，则请您修改订单后重新提交审核。 </li>
                    </ol>
                </Container>
            </>
        );
    }
}