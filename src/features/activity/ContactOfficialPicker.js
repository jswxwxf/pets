import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, List, Icon } from 'antd-mobile';

import styles from './ContactPicker.module.scss';

export default class ContactOfficialPicker extends Component {

    static propTypes = {
        activity: PropTypes.object,
    }

    static defaultProps = {
    }

    state = {
        visible: false
    }

    open() {
        this.setState({
            visible: true
        });
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        let { visible } = this.state;
        return (
            <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['contact-picker']}>
                <List renderHeader={() => (
                    <div className={styles['header']}>
                        <Icon onClick={this.handleClose} type="cross" />
                        <span className={styles['title']}>联系平台</span>
                        <div></div>
                    </div>
                )}>
                    <List.Item thumb={<img src={require('assets/images/icon-phone2.png')} alt="user" />}><a href={`tel://88888888`}>拔打电话</a></List.Item>
                </List>
            </Modal>
        )
    }
}