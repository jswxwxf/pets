import { DatePicker, Icon, InputItem, List, NavBar, TextareaItem } from 'antd-mobile';
import { inject } from 'config';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { Utils } from 'shared/utility';
import { Container } from 'templates';
import styles from './Publish.module.scss';
import PublishFormStep1 from './PublishFormStep1';

export default class PublishStep1 extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    state = {
        publishForm: new PublishFormStep1()
    };

    form;

    componentDidMount() {
        if (this.form) {
            var title = localStorage.getItem('publish.title')
            var content = localStorage.getItem('publish.content')
            var start_at = localStorage.getItem('publish.start_at')
            if (start_at) {
                start_at = new Date(start_at)
            }
            var end_at = localStorage.getItem('publish.end_at')
            if (end_at) {
                end_at = new Date(end_at)
            }
            var region = localStorage.getItem('publish.region')
            var location = localStorage.getItem('publish.location')
            var quota = localStorage.getItem('publish.quota')
            var price = localStorage.getItem('publish.price')
            var pet_price = localStorage.getItem('publish.pet_price')
            var price_desc = localStorage.getItem('publish.price_desc')
            this.form.setFieldsValue({
                title: this.props.location.state ? this.props.location.state.title : title,
                content,
                start_at,
                end_at,
                region,
                location,
                quota,
                price,
                pet_price,
                price_desc
            })
        }
    }

    handleSubmit = async () => {
        let { publishForm } = this.state
        publishForm.form = this.form
        try {
            var result = await PublishFormStep1.validateAll(publishForm);
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }
        localStorage.setItem('publish.title', result.title)
        localStorage.setItem('publish.content', result.content)
        localStorage.setItem('publish.start_at', result.start_at)
        localStorage.setItem('publish.end_at', result.end_at)
        localStorage.setItem('publish.region', result.region)
        localStorage.setItem('publish.location', result.location)
        localStorage.setItem('publish.quota', result.quota)
        localStorage.setItem('publish.price', result.price)
        localStorage.setItem('publish.pet_price', result.pet_price)
        localStorage.setItem('publish.price_desc', result.price_desc)
        this.utilService.goto('/activity/publish-step2')
    }

    render() {
        let { publishForm } = this.state

        return (
            <>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.utilService.goto('/activity/publish')}
                    rightContent={[
                        <p onClick={() => this.handleSubmit()}>下一步</p>
                    ]}
                >完善活动简介</NavBar>
                <Container className={styles['publish-steps']}>
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

    render() {
        let { form, publishForm } = this.props;
        let { getFieldDecorator } = form;
        if (!publishForm) return null;
        let numbers = Array.from(Array(100).keys())
        var tmp = []
        numbers.forEach(number => {
            tmp.push({
                label: String(number),
                value: String(number)
            })
        });
        return (
            <div className={styles['activity-form']}>
                <h3>活动标题</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.title)(
                        <InputItem placeholder="请输入标题（5-20个字符）"></InputItem>
                    )}
                </div>
                <h3>活动概要</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.content)(
                        <InputItem placeholder="用6-30个字介绍该活动的目的"></InputItem>
                    )}
                </div>
                <h3>活动起止时间</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.start_at)(
                        <DatePicker mode="date" format="YYYY-MM-DD">
                            <List.Item arrow="horizontal">开始时间</List.Item>
                        </DatePicker>
                    )}
                    {getFieldDecorator(...publishForm.end_at)(
                        <DatePicker mode="date" format="YYYY-MM-DD">
                            <List.Item arrow="horizontal">结束时间</List.Item>
                        </DatePicker>
                    )}
                </div>
                <h3>选择活动地点</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.region)(
                        <InputItem placeholder="请选择真实有效的活动地点"></InputItem>
                    )}
                    {getFieldDecorator(...publishForm.location)(
                        <TextareaItem rows="2" placeholder="填写详细地址：如楼栋号、单位号"></TextareaItem>
                    )}
                </div>
                <h3>活动名额限制</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.quota)(
                        <InputItem placeholder="请设定最多可报名数" style={{ textAlign: 'right' }}></InputItem>
                    )}
                </div>
                <h3>设定报名费用</h3>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.price)(
                        <InputItem type="digit" style={{ textAlign: 'right' }} placeholder="若无请填0" extra="元">单人活动费</InputItem>
                    )}
                </div>
                <div className={styles['input']}>
                    {getFieldDecorator(...publishForm.pet_price)(
                        <InputItem type="digit" style={{ textAlign: 'right' }} placeholder="若无请填0" extra="元">单宠物活动费</InputItem>
                    )}
                </div>
                <h3>费用介绍</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.price_desc)(
                        <TextareaItem rows="4" placeholder=""></TextareaItem>
                    )}
                </div>

            </div>
        )
    }

}

Form = createForm(PublishFormStep1.options)(Form);