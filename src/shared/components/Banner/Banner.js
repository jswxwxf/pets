import React, { Component } from 'react';
import { Button } from "antd-mobile";

import styles from './Banner.module.scss';

export default class Banner extends Component {

    static propTypes = {
    }

    static defaultProps = {
    }

    render() {
        return (
            <div className={styles['banner']}>
                <div className={styles['app-logo']}>
                    <img src={require('../../../assets/images/logo.png')} />
                </div>
                <div className={styles['app-name']}>
                    <p>顽萌App</p>
                    <p className={styles['sub-name']}>为顽而生，因你而萌</p>
                </div>
                <div className={styles['download-btn']}>
                    <Button className={styles['download']}>下载</Button>
                </div>
            </div>
        );

    }

}