import { Icon, ImagePicker, NavBar, TextareaItem } from 'antd-mobile';
import { inject } from 'config';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { Utils } from 'shared/utility';
import { Container } from 'templates';
import styles from './Publish.module.scss';
import PublishFormStep2 from './PublishFormStep2';

export default class PublishStep2 extends Component {

    utilService = inject('utilService');
    bridgeService = inject('bridgeService');

    state = {
        publishForm: new PublishFormStep2(),
        background_img: [],
        proccess_img: null
    };

    form;

    componentDidMount() {
        var background = localStorage.getItem('publish.background');
        var background_img = localStorage.getItem('publish.background_img');
        var other = localStorage.getItem('publish.other');
        var proccess = localStorage.getItem('publish.proccess');
        var proccess_img = localStorage.getItem('publish.proccess_img');
        this.form.setFieldsValue({
            background,
            background_img,
            other,
            proccess,
            proccess_img,
        })
    }

    handleSubmit = () => {
        this.utilService.goto('/activity/publish-step3')
    }

    handleImageChange = (type, img) => {
        if (type == 'proccess_img') {
            this.setState({
                proccess_img: img
            })
        } else {
            this.setState({
                background_img: img
            })
        }
    }

    handleSubmit = async () => {
        let { publishForm, background_img, proccess_img } = this.state
        publishForm.form = this.form

        try {
            debugger
            var result = await PublishFormStep2.validateAll(publishForm);
            localStorage.setItem('publish.background', result.background);
            localStorage.setItem('publish.background_img', background_img);
            localStorage.setItem('publish.proccess_img', proccess_img);
            localStorage.setItem('publish.other', result.other);
            this.utilService.goto('/activity/publish-step3')
        } catch (err) {
            console.log(err)
            let first = Utils.first(err);
            this.utilService.alert(first.errors[0].message);
        }
    }

    render() {
        let { publishForm } = this.state

        return (
            <>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.utilService.goto('/activity/publish-step1')}
                    rightContent={[
                        <p onClick={() => { this.handleSubmit() }}>下一步</p>
                    ]}
                >完善活动详情</NavBar>
                <Container className={styles['publish-steps']}>
                    <p className={styles['desc']}>请至少上传一段活动详情以及一张活动图片</p>
                    <Form ref={el => this.form = el} publishForm={publishForm} handleImageChange={this.handleImageChange} />
                </Container>
            </>
        );
    }

}

class Form extends Component {

    bridgeService = inject('bridgeService');

    static propTypes = {
        form: PropTypes.object,
        publishForm: PropTypes.object,
        handleImageChange: PropTypes.func,
    }

    static defaultProps = {
    }

    state = {
        background_img: [],
        proccess_img: [],
        files: [],
    };

    componentDidMount() {
        let { form, publishForm } = this.props;
        publishForm.form = form;
    }

    onChange = (src, files, type, index) => {
        let { background_img, proccess_img } = this.state
        if (src == 'background_img') {
            if (type === 'remove') {
                background_img.splice(index, 1)
                this.setState({
                    background_img
                });
            }
        }
        if (src == 'proccess_img') {
            if (type === 'remove') {
                proccess_img.splice(index, 1)
                this.setState({
                    proccess_img
                });
            }
        }
    }

    onChangeBackgroundImage = (files, type, index) => {
        this.onChange('background_img', files, type, index)
    }

    onChangeProccessImage = (files, type, index) => {
        this.onChange('proccess_img', files, type, index)
    }

    onAddImageClick = async (e, img) => {
        e.preventDefault();
        let { background_img, proccess_img } = this.state;
        let { handleImageChange } = this.props
        var tmp = await this.bridgeService.selectAndUploadImage()
        if (img === 'background_img') {
            handleImageChange('background_img', tmp['images'][0])
            background_img.push({ url: tmp['images'][0] })
            this.setState({
                background_img
            })
        } else {
            handleImageChange('proccess_img', tmp['images'][0])
            proccess_img.push({ url: tmp['images'][0] })
            this.setState({
                proccess_img
            })
        }
    };

    render() {
        let { form, publishForm } = this.props;
        let { getFieldDecorator } = form;
        if (!publishForm) return null;
        let { background_img, proccess_img } = this.state
        return (
            <div className={styles['activity-form']}>
                <h3>添加活动背景介绍</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.background)(
                        <TextareaItem rows="4" placeholder="请输入标题（5-20个字符）"></TextareaItem>
                    )}
                    {getFieldDecorator(...publishForm.background_img)(
                        <ImagePicker
                            length="3"
                            files={background_img}
                            onChange={this.onChangeBackgroundImage}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={background_img.length < 9}
                            onAddImageClick={(e) => { this.onAddImageClick(e, 'background_img') }}
                        />
                    )}
                </div>
                <h3>添加活动流程介绍</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.proccess)(
                        <TextareaItem rows="4" placeholder="用6-30个字介绍该活动的目的"></TextareaItem>
                    )}
                    {getFieldDecorator(...publishForm.proccess_img)(
                        <ImagePicker
                            length="3"
                            files={proccess_img}
                            onChange={this.onChangeProccessImage}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={proccess_img.length < 9}
                            onAddImageClick={(e) => { this.onAddImageClick(e, 'proccess_img') }}
                        />
                    )}
                </div>
                <h3>其他信息</h3>
                <div className={styles['input-with-img']}>
                    {getFieldDecorator(...publishForm.other)(
                        <TextareaItem rows="4" placeholder="用6-30个字介绍该活动的目的"></TextareaItem>
                    )}
                </div>
            </div>
        )
    }

}

Form = createForm(PublishFormStep2.options)(Form);