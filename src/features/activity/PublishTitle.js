import { InputItem, NavBar, Icon, WhiteSpace } from 'antd-mobile';
import { inject } from 'config';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { Container } from 'templates';
import styles from './Publish.module.scss';
import PublishForm from './PublishForm';
import { Utils } from 'shared/utility';

export default class PublishTitle extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    state = {
        publishForm: new PublishForm()
    };

    form;

    componentDidMount() {
        this.form.setFieldsValue({
            title: localStorage.getItem('publish.title')
        })
    }

    goNext = () => {
        this.utilService.goto('/activity/publish-step1')
    }

    handleSubmit = async () => {
        let { publishForm } = this.state
        var title = this.form.getFieldValue('title');
        try {
            var result = await PublishForm.validateAll(publishForm);
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }
        localStorage.setItem('publish.title', title);
        this.utilService.gotoWithState('/activity/publish-step1', {}, {
            title
        })
    }

    render() {
        let { publishForm } = this.state
        return (
            <>
                <NavBar
                    className={"first-step"}
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.bridgeService.closeWebView()}
                    rightContent={[
                        <p onClick={() => this.handleSubmit()}>确定</p>
                    ]}
                ></NavBar>
                <Container className={styles['publish-page']}>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <div className={styles['header']}>
                        <h2>添加活动标题</h2>
                        <p>一个独一无二的标题，让活动瞬时吸睛！</p>
                    </div>
                    <div className={styles['activity-form']}>
                        <Form ref={el => this.form = el} publishForm={publishForm} />
                    </div>
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
            <div className={styles['input']}>
                {getFieldDecorator(...publishForm.title)(
                    <InputItem placeholder="请输入标题（5-20个字符）"></InputItem>
                )}
            </div>
        )
    }

}

Form = createForm(PublishForm.options)(Form);