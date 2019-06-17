/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Button, Modal } from 'antd-mobile';
import { inject } from 'config';
import React, { Component } from 'react';
import styles from './PetCertPicker.module.scss';

export default class PetCertPicker extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    state = {
        visible: false,
        cert: '',
    }

    pick() {
        return new Promise(async (resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            await this.loadData();
            this.setState({
                visible: true,
            });
        })
    }

    async loadData() {

    }

    handleOk = () => {
        let { cert } = this.state;
        this.resolve(cert);
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
    }

    handlePickLicense = async () => {
        var tmp = await this.bridgeService.selectAndUploadImage()
        this.setState({
            cert: tmp["images"][0],
        })
    }

    render() {
        let { visible, cert } = this.state;
        return (
            <>
                <Modal popup visible={visible} onClose={this.handleClose} animationType="slide-up" className={styles['petcert-picker']} wrapClassName={'petcert-picker-container'}>
                    <div className={styles['title']}>为了保证您与其他宠友的安全，<span className={styles['highlight']}>请上传尚在有效期内的疫苗证明</span> ，上传时切勿涂改信息，我们保证您的隐私安全， 您可放心上传。如果您携带两只或两只以上的宠物参加活动，请添加所有参加活动的宠物疫苗证明，否则我们将无法通过您的活动报名申请。</div>
                    <div className={styles['upload-form']} onClick={this.handlePickLicense}>
                        {cert === '' ? <img src={require('../../../assets/images/pet-cert-bg.png')} /> : <img className={styles['uploaded-img']} src={cert} />}
                        {cert === '' ? <p>上传免疫证明</p> : ''}
                    </div>
                    <Button onClick={this.handleOk} className={styles['submit']}>确认提交</Button>
                    <Button onClick={this.handleClose} className={styles['cancel']}>返回</Button>
                </Modal>
            </>
        );
    }

}