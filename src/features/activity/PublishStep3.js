import { Icon, InputItem, NavBar, TextareaItem } from 'antd-mobile';
import { inject } from 'config';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { Container } from 'templates';
import styles from './Publish.module.scss';
import PublishFormStep3 from './PublishFormStep3';
import { Utils } from 'shared/utility';

export default class PublishStep3 extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    state = {
        publishForm: new PublishFormStep3(),
        type: 1
    };

    componentDidMount() {
        if (this.form) {
            if (localStorage.getItem('publish.park') != null) {
                var type = parseInt(localStorage.getItem('publish.park'))
                this.setState({ type })
            }
            var park = localStorage.getItem('publish.park');
            var max_pets = localStorage.getItem('publish.max_pets');
            var forbiddens = localStorage.getItem('publish.forbiddens');
            var belongings = localStorage.getItem('publish.belongings');
            var remark = localStorage.getItem('publish.remark');

            this.form.setFieldsValue({
                park,
                max_pets,
                forbiddens,
                belongings,
                remark,
            })
        }
    }

    handleTypeChange = (type) => {
        this.setState({
            type
        })
    }

    handleSubmit = async () => {
        let { publishForm, type } = this.state
        publishForm.form = this.form
        try {
            var result = await PublishFormStep3.validateAll(publishForm);
            localStorage.setItem('publish.park', type);
            localStorage.setItem('publish.max_pets', result.max_pets);
            localStorage.setItem('publish.forbiddens', result.forbiddens);
            localStorage.setItem('publish.belongings', result.belongings);
            localStorage.setItem('publish.remark', result.remark);
            this.utilService.goto('/activity/publish-step4')
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }
    }

    render() {
        let { publishForm, type } = this.state
        return (
            <>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.utilService.goto('/activity/publish-step2')}
                    rightContent={[
                        <p onClick={() => { this.handleSubmit() }}>下一步</p>
                    ]}
                >完善活动须知</NavBar>
                <Container className={styles['publish-steps']}>
                    <h3>活动场地周边是否含停车场</h3>
                    <div className={styles['radio-group']}>
                        <div className={styles['radio-btn'] + ' ' + (type === 1 ? styles['active'] : '')} onClick={(e) => { this.handleTypeChange(1) }}>
                            <span className={styles['radio-btn-text']}>
                                是
                        </span>
                            <span className={styles['radio-btn-icon']}> </span>
                        </div>
                        <div className={styles['radio-btn'] + ' ' + (type === 0 ? styles['active'] : '')} onClick={(e) => { this.handleTypeChange(0) }}>
                            <span className={styles['radio-btn-text']}>
                                否
                        </span>
                            <span className={styles['radio-btn-icon']}> </span>
                        </div>
                    </div>
                    <p className={styles['notice']}>停车位信息将影响活动参与程度</p>
                    <Form ref={el => this.form = el} publishForm={publishForm} />
                </Container>
            </>
        );
    }

}



class Form extends Component {

    static propTypes = {
        form: PropTypes.object,
        publishForm: PropTypes.object,
    }

    static defaultProps = {
    }

    componentDidMount() {
        let { form, publishForm } = this.props;
        publishForm.form = form;
    }

    render() {
        let { form, publishForm } = this.props;
        let { getFieldDecorator } = form;
        if (!publishForm) return null;
        return (
            <div className={styles['activity-form']}>
                <h3>每人最多可携带宠物数量</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.max_pets)(
                        <InputItem rows="4" type="number" placeholder="最多可携带宠物数量"></InputItem>
                    )}
                </div>
                <h3>禁止携带物品</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.forbiddens)(
                        <TextareaItem rows="4" placeholder="由于宠物活动特殊，请谨慎填写禁止携带物品（不超过300字）"></TextareaItem>
                    )}
                </div>
                <h3>报名用户须携带物品</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.belongings)(
                        <TextareaItem rows="4" placeholder="由于宠物活动特殊，请谨慎填写报名用户须携带物品（不超过300字）"></TextareaItem>
                    )}
                </div>
                <h3>备注信息</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.remark)(
                        <TextareaItem rows="4" placeholder="请输入需要另行备注的事项（不超过300字）"></TextareaItem>
                    )}
                </div>
            </div>
        )
    }

}

Form = createForm(PublishFormStep3.options)(Form);