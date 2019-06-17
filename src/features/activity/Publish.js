import { Icon, NavBar, WhiteSpace } from 'antd-mobile';
import { inject } from 'config';
import React, { Component } from 'react';
import { Container } from 'templates';
import styles from './Publish.module.scss';

export default class Publish extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    state = {
    };

    componentDidMount() {
        // this.utilService.goto(`/activity/publish-title`)
    }

    render() {
        return (
            <>
                <NavBar
                    className={"first-step"}
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.bridgeService.closeWebView()}
                    rightContent={[
                    ]}
                ></NavBar>
                <Container className={styles['publish-page']}>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <div className={styles['header']}>
                        <h2>发布活动</h2>
                        <p>请先选择活动类型</p>
                    </div>
                    <div className={styles['activity-type']} onClick={(e) => { this.handleGo(1) }}>
                        <div className={styles['icon']}>
                            <img src={require('assets/images/online.png')} />
                        </div>
                        <div className={styles['label']}>
                            <h4>线下活动</h4>
                            <p>Activity</p>
                        </div>
                    </div>
                    <div className={styles['activity-type']} onClick={(e) => { this.handleGo(2) }}>
                        <div className={styles['icon']}>
                            <img src={require('assets/images/activity.png')} />
                        </div>
                        <div className={styles['label']}>
                            <h4>线上活动</h4>
                            <p>Online</p>
                        </div>
                    </div>
                </Container>
            </>
        );
    }

}
