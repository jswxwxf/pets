import { Button, InputItem, NavBar, Icon, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createForm } from 'rc-form';
import { inject } from 'config';
import React, { Component } from 'react';
import { Container } from 'templates';
import styles from './Publish.module.scss';
import PublishFormStep4 from './PublishFormStep4';
import { Utils } from 'shared/utility';

export default class PublishStep4 extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');
    activityCtrl = inject('activityController');

    state = {
        publishForm: new PublishFormStep4(),
        type: 1,
        idcard_b: null,
        idcard_f: null,
        company_license: null,
    };

    form;

    componentDidMount() {
        let { publishForm } = this.state
        publishForm.form = this.form

        this.form.setFieldsValue({
            'name': localStorage.getItem('publish.name'),
            'idcard': localStorage.getItem('publish.idcard'),
            'company_name': localStorage.getItem('publish.company_name')
        })
    }

    handleTypeChange = (type) => {
        this.setState({
            type
        })
    }

    handlePickPicture = async (e, img) => {
        e.preventDefault();
        var tmp = await this.bridgeService.selectAndUploadImage()
        if (img === 'company_license') {
            this.setState({
                company_license: tmp["images"][0],
            })
        } else if (img === 'idcard_f') {
            this.setState({
                idcard_f: tmp["images"][0],
            })
        } else {
            this.setState({
                idcard_b: tmp["images"][0],
            })
        }
    };


    handleSubmit = async () => {
        let { publishForm, idcard_b, idcard_f, company_license } = this.state
        publishForm.form = this.form
        var can_submit = false
        try {
            var result = await PublishFormStep4.validateAll(publishForm);
            localStorage.setItem('publish.name', this.form.getFieldValue('name'))
            localStorage.setItem('publish.idcard', this.form.getFieldValue('idcard'))
            localStorage.setItem('publish.idcard_f', idcard_f)
            localStorage.setItem('publish.idcard_b', idcard_b)
            localStorage.setItem('publish.company_name', this.form.getFieldValue('company_name'))
            localStorage.setItem('publish.company_license', company_license)
            var tmp = {};
            _.forIn(localStorage, (value, objKey) => {
                if (true === _.startsWith(objKey, 'publish.')) {
                    tmp[objKey.replace('publish.', '')] = value
                }
            });
            can_submit = true
        } catch (err) {
            let first = Utils.first(err);
            can_submit = false
            return this.utilService.alert(first.errors[0].message);
        }

        if (can_submit) {
            debugger
            try {
                var res = await this.activityCtrl.publish(tmp)
                this.utilService.goto('/activity/publish-done')
            } catch (error) {

            }
        }
    }

    render() {
        let { publishForm, type } = this.state

        return (
            <>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.utilService.goto('/activity/publish-step3')}
                    rightContent={[
                        <p onClick={() => { this.handleSubmit() }}>下一步</p>
                    ]}
                >发布者资质审核</NavBar>
                <Container className={styles['publish-steps']}>
                    <p className={styles['desc2']}>根据相关要求，任何个人或组织机构若需在平台上发布活动，平台需对活动发起者或活动发起组织机构进行身份验证。若以机构组织身份发起活动，您将作为该组织机构的活动经办人。</p>
                    <div className={styles['radio-group']}>
                        <div className={styles['radio-btn'] + ' ' + (type === 1 ? styles['active'] : '')} onClick={(e) => { this.handleTypeChange(1) }}>
                            <span className={styles['radio-btn-text']}>
                                个人
                        </span>
                            <span className={styles['radio-btn-icon']}> </span>
                        </div>
                        <div className={styles['radio-btn'] + ' ' + (type === 2 ? styles['active'] : '')} onClick={(e) => { this.handleTypeChange(2) }}>
                            <span className={styles['radio-btn-text']}>
                                机构组织
                        </span>
                            <span className={styles['radio-btn-icon']}> </span>
                        </div>
                    </div>
                    <Form ref={el => this.form = el} publishForm={publishForm} type={type} handlePickPicture={this.handlePickPicture} />
                </Container>
            </>
        );
    }

}


class Form extends Component {
    bridgeService = inject('bridgeService');

    static propTypes = {
        form: PropTypes.object,
        type: PropTypes.number,
        handlePickPicture: PropTypes.func,
        publishForm: PropTypes.object,
    }

    static defaultProps = {
    }

    state = {
        idcard_f: '',
        idcard_b: '',
        company_license: '',
    }

    componentDidMount() {
        let { form, publishForm } = this.props;
        publishForm.form = form;
    }

    handlePick = async (e, img) => {
        e.preventDefault();
        var tmp = await this.bridgeService.selectAndUploadImage()
        if (img === 'company_license') {
            this.setState({
                company_license: tmp["images"][0],
            })
        } else if (img === 'idcard_f') {
            this.setState({
                idcard_f: tmp["images"][0],
            })
        } else {
            this.setState({
                idcard_b: tmp["images"][0],
            })
        }
    };

    renderCompanyUpload = () => {
        let { form, publishForm, type, handlePickPicture } = this.props;
        let { getFieldDecorator } = form;
        let { company_license } = this.state
        if (type === 2) {
            return <>
                <h3>机构名称</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.company_name)(
                        <InputItem placeholder="请填写机构全称"></InputItem>
                    )}
                </div>
                <h3>营业执照</h3>
                <p className={styles['tips']}>请附上组织机构的营业执照</p>
                <div className={styles['upload-form']} onClick={(e) => { this.handlePick(e, 'company_license'); handlePickPicture(e, 'company_license') }}>
                    {getFieldDecorator(...publishForm.company_license)(
                        company_license === '' ? <img src={require('../../assets/images/id-card-bg.png')} /> : <img className={styles['uploaded-img']} src={company_license} />
                    )}
                </div>
            </>
        }
    }

    render() {
        let { form, publishForm, handlePickPicture } = this.props;
        let { getFieldDecorator } = form;
        if (!publishForm) return null;
        let { idcard_f, idcard_b } = this.state
        return (
            <div className={styles['activity-form']}>
                <h3>发布人</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.name)(
                        <InputItem placeholder="请填写发布人真实姓名"></InputItem>
                    )}
                </div>
                <h3>发布人身份证号码</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.idcard)(
                        <InputItem placeholder="由于宠物活动特殊，请谨慎填写报名用户须携带物品（不超过300字）"></InputItem>
                    )}
                </div>
                <h3>身份证照片</h3>
                <p className={styles['tips']}>请上传您的身份证照片，以便于我们进行实名认证</p>
                <div className={styles['upload-form']} onClick={(e) => { this.handlePick(e, 'idcard_f'); handlePickPicture(e, 'idcard_f') }}>
                    {idcard_f === '' ? <img src={require('../../assets/images/id-card-bg.png')} /> : <img className={styles['uploaded-img']} src={idcard_f} />}
                    {idcard_f === '' ? <p>身份证正面（头像面）</p> : ''}
                </div>
                <WhiteSpace size="lg" />
                <div className={styles['upload-form']} onClick={(e) => { this.handlePick(e, 'idcard_b'); handlePickPicture(e, 'idcard_b') }}>
                    {idcard_b === '' ? <img src={require('../../assets/images/id-card-bg.png')} /> : <img className={styles['uploaded-img']} src={idcard_b} />}
                    {idcard_b === '' ? <p>身份证背面（国徽面）</p> : ''}
                </div>
                {this.renderCompanyUpload()}
            </div>
        )
    }

}

Form = createForm(PublishFormStep4.options)(Form);