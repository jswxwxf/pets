import { InputItem, Button } from 'antd-mobile';
import { inject } from 'config';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import styles from './Register.module.scss';
import RegisterForm from './RegisterForm';
import { Utils } from 'shared/utility';

// import Banner from "./../../shared/components/Banner";

export default class Register extends Component {

    utilService = inject('utilService');
    landingController = inject('landingController');

    state = {
        registerForm: new RegisterForm()
    };

    id = qs.parse(this.props.location.search).id;
    user_id = qs.parse(this.props.location.search).user_id;
    form;

    componentDidMount() {
        document.title = '邀请注册'
        this.loadData();
    }

    async loadData() {
    }

    handleSubmit = async () => {
        let { registerForm } = this.state
        registerForm.form = this.form
        try {
            var result = await RegisterForm.validateAll(registerForm);
            result['user_id'] = this.user_id
            await this.landingController.createLead(result)
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }

    }

    render() {
        let { registerForm } = this.state
        return (
            <div className={styles['reg']}>
                <div className={styles['logo']}>
                    <img src={require('assets/images/slogan.png')} alt="" />
                </div>
                <div className={styles['container']}>
                    <img className={styles['card']} src={require('assets/images/card.png')} alt="" />
                    <img className={styles['head']} src={require('assets/images/head.png')} alt="" />
                    <div className={styles['invite']}>
                        <h2>注册</h2>
                        <Form ref={el => this.form = el} registerForm={registerForm} onSubmit={this.handleSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

class Form extends Component {

    static propTypes = {
        form: PropTypes.object,
        registerForm: PropTypes.object,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
    }

    render() {
        let { form, registerForm, onSubmit } = this.props;
        let { getFieldDecorator } = form;
        if (!registerForm) return null;
        return (
            <div className={styles['register-form']}>
                <h3>手机号</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...registerForm.mobile)(
                        <InputItem maxLength="11" placeholder="输入手机号" ></InputItem>
                    )}
                    <Button onClick={onSubmit}>注册下载APP</Button>
                </div>
            </div >
        )
    }

}

Form = createForm(RegisterForm.options)(Form);