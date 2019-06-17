import { Button, Flex, Icon, InputItem, List, Modal, Tag } from 'antd-mobile';
import { inject } from 'config';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import IdCardField from 'shared/components/IdCardField';
import PetsField from 'shared/components/PetsField';
import { Utils } from 'shared/utility';
import { Container } from 'templates';
import PetCertField from '../../shared/components/PetCertField';
import styles from './Attend.module.scss';
import AttendForm from './AttendForm';
import PricePicker from './PricePicker';
import dayjs from 'dayjs'
import "dayjs/locale/zh-cn";

export default class Attend extends Component {

    utilService = inject('utilService');
    activityCtrl = inject('activityController');

    id = qs.parse(this.props.location.search).id;

    pricePicker;

    state = {
        popup: 0,
        popup_pet: 0,
        total: 0,
        prices: [],
        deleted: 0,
        deleted_pet: 0,
        activity: {},
        attendForms: [],
        modal: false
    }

    componentDidMount() {
        document.title = '提交报名订单'
        this.loadData();
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.activityCtrl.getActivity(this.id);
        let prices = await this.activityCtrl.getActivityPrices(this.id);
        let popped = localStorage.getItem('popped')
        if (!popped) {
            this.setState({
                modal: true
            })
        }
        localStorage.setItem('popped', 1)
        this.setState({
            prices: prices.data,
            activity: result.data,
            attendForms: [new AttendForm()]
        });
    }

    handleAddForm = () => {
        let { attendForms } = this.state;
        this.setState({
            attendForms: [new AttendForm(), ...attendForms]
        });
    }

    handleRemoveForm = (_, index) => {
        this.setState({
            popup: 1,
            deleted: index
        })
    }

    handleRemovePetForm = (pindex, index) => {
        this.setState({
            popup_pet: 1,
            deleted_pet: [pindex, index]
        })
    }

    handleAddPets = (index) => {
        let { attendForms } = this.state;
        let form = attendForms[index];
        form.addPets();
        this.setState({
            attendForms
        });
    }

    handleRemovePet = (pindex, index) => {
        let { attendForms } = this.state;
        let form = attendForms[index];
        form.removePet(pindex);
        this.setState({
            attendForms
        });
    }

    handleClose = (e) => {
        if (e.currentTarget.innerText === "确 定") {
            let { attendForms, deleted } = this.state;
            this.setState({
                attendForms: Utils.arrayRemove(attendForms, deleted)
            });
        }
        this.setState({
            popup: 0,
            delete: 0
        })
    }

    handleClosePet = (e) => {
        if (e.currentTarget.innerText === "确 定") {
            let { deleted_pet } = this.state;
            this.handleRemovePet(deleted_pet[0], deleted_pet[1])
            // this.setState({
            //     attendForms: Utils.arrayRemove(attendForms, deleted_pet)
            // });
        }
        this.setState({
            popup_pet: 0,
            deleted_pet: []
        })
    }

    handlePriceDetail = () => {
        let { attendForms } = this.state;
        this.pricePicker.open(attendForms);
    }

    handleSubmit = async () => {
        let { attendForms } = this.state;
        try {
            var result = await AttendForm.validateAll(attendForms);
            if (_.isEmpty(result)) {
                return this.utilService.alert('请提供报名人信息');
            }
        } catch (err) {
            let first = Utils.first(err);
            return this.utilService.alert(first.errors[0].message);
        }
        result = await this.activityCtrl.apply(this.id, AttendForm.toJson(result));
        this.utilService.goto(`/activity/done`);
    }

    handleClosePop = () => {
        this.setState({
            modal: false
        })
    }


    handlePetChanged = () => {
        this.calculatePrice()
    }

    handleShowPop = () => {
        this.setState({
            modal: true
        })
    }

    calculatePrice = async () => {
        let { total } = this.state
        this.setState({
            total: total + 1
        })
    }

    render() {
        let { prices, activity, attendForms, total } = this.state;
        return (
            <Container className={styles['attend-page']}>
                <Modal
                    visible={this.state.modal}
                    transparent
                    className={'detail-alert'}
                    wrapClassName={styles['detail-alert-wrap']}
                    footer={[]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <h5 className={styles['modal-header-title']}>报名须知</h5>
                    <span className={styles['modal-title']}>1.每个订单至少添加一个宠物信息。若添加的用户与您共同携带同一宠物时，可不添加宠物信息。
          <br /><br /> 2.为了保证您与其他宠友的安全，请上传尚在有效期内的疫苗证明，上传时切勿涂改信息，我们保证您的隐私安全，您可放心上传。
          <br /><br />3.由于我们为每位活动报名者赠送了活动保险，请报名人务必添加个人身份证信息，我们保证您的隐私安全，您可放心上传。</span>
                    <Button onClick={this.handleClosePop}>我了解了</Button>
                </Modal>

                <Modal
                    visible={this.state.popup}
                    transparent
                    className={'detail-alert'}
                    wrapClassName={styles['detail-alert-wrap']}
                    // maskClosable={false}'
                    transitionName={'bounce'}
                    onClose={this.handleClose}
                    footer={[]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <h5 className={styles['modal-header-title']}>确认删除该报名人吗？</h5>
                    <Flex>
                        <Flex.Item>
                            <Button className={styles['cancel-btn']} type="ghost" onClick={this.handleClose}>取消</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button onClick={this.handleClose}>确定</Button>
                        </Flex.Item>
                    </Flex>
                </Modal>


                <Modal
                    visible={this.state.popup_pet}
                    transparent
                    className={'detail-alert'}
                    wrapClassName={styles['detail-alert-wrap']}
                    transitionName={'bounce'}
                    onClose={this.handleClosePet}
                    footer={[]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <h5 className={styles['modal-header-title']}>确认删除该宠物吗？</h5>
                    <Flex>
                        <Flex.Item>
                            <Button className={styles['cancel-btn']} type="ghost" onClick={this.handleClosePet}>取消</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button onClick={this.handleClosePet}>确定</Button>
                        </Flex.Item>
                    </Flex>
                </Modal>

                <div className={styles['info-container']}>
                    <div>{activity.title}</div>
                    <div className={styles['info-item']}>
                        <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
                        <span>{dayjs(activity.start_at).locale("zh-cn").format('M月D日\（ddd\）HH:mm')}</span>
                        <span></span>
                    </div>
                    <div className={styles['info-item']}>
                        <span><img src={require('assets/images/icon-location.png')} alt="location" /></span>
                        <span>{activity.location}</span>
                        <span></span>
                    </div>
                    <div className={styles['tags']}>
                        <Tag>支持有条件退款</Tag>
                    </div>
                </div>

                <div className={styles['form-container']}>
                    <div>
                        <span>报名信息 <img src={require('../../assets/images/questions.png')} className={styles['question-icon']} alt="" onClick={this.handleShowPop} /></span>
                        <Button onClick={this.handleAddForm} type="ghost" inline size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加报名人</Button>
                    </div>
                    <div>
                        {attendForms.map((attendForm, i) => (<Form key={attendForm.id} index={i} length={attendForms.length} attendForm={attendForm} forms={attendForms} onRemove={this.handleRemoveForm} onRemovePetForm={this.handleRemovePetForm} onAddPets={this.handleAddPets} onRemovePet={this.handleRemovePet} onPetChange={this.handlePetChanged} />))}
                    </div>
                </div>

                <div className={styles['footer-container']}>
                    <Footer total={total} prices={prices} detail={attendForms} onPriceDetail={this.handlePriceDetail} onSubmit={this.handleSubmit} />
                </div>

                <PricePicker id={this.id} ref={el => this.pricePicker = el} detail={attendForms} onSubmit={this.handleSubmit} />

            </Container>
        );
    }

}

export class Footer extends Component {

    static propTypes = {
        showDetail: PropTypes.bool,
        onSubmit: PropTypes.func,
        onPriceDetail: PropTypes.func,
        prices: PropTypes.array,
        detail: PropTypes.array
    }

    static defaultProps = {
        showDetail: true,
        onSubmit: _.noop,
        onPriceDetail: _.noop,
        prices: [],
        detail: []
    }

    render() {
        let { showDetail, onSubmit, onPriceDetail, detail, prices } = this.props;

        var tmp = 0;
        if (detail.length > 0) {
            prices.forEach(price => {
                if (price.type === 1) {
                    tmp += parseFloat(price.price)
                }
                if (price.type === 2) {
                    tmp += parseFloat(price.price) * detail.length
                }
                if (price.type === 3) {
                    var hasform = true;
                    detail.forEach(form => {
                        if (!form.form) {
                            hasform = false;
                        }
                    })
                    if (hasform) {
                        var count = AttendForm.getPetsCount(detail)
                        tmp += parseFloat(price.price) * count
                    }
                }
                tmp = Math.round(tmp * 100) / 100;
            });
        }

        return (
            <div className={styles['footer']}>
                <div><span>实付：￥</span><span className={styles['price']}>{tmp}</span></div>
                <div>
                    {showDetail && <span onClick={onPriceDetail}>价格明细</span>}
                    <Button onClick={onSubmit} inline>提交报名</Button>
                </div>
            </div>
        )
    }
}

class Form extends Component {

    static propTypes = {
        form: PropTypes.object,
        forms: PropTypes.array,
        attendForm: PropTypes.object,
        index: PropTypes.number,
        length: PropTypes.number,
        onRemove: PropTypes.func,
        onRemovePetForm: PropTypes.func,
        onRemovePet: PropTypes.func,
        onAddPets: PropTypes.func,
        onPetChange: PropTypes.func,
    }

    static defaultProps = {
        onRemove: _.noop,
        onAddPets: _.noop
    }

    componentDidMount() {
        let { form, attendForm } = this.props;
        attendForm.form = form;
    }


    handleIdCardChange = (val) => {
        let { form } = this.props;
        form.setFieldsValue({
            idcard: val
        })
    }

    render() {
        let { index, length, form, forms, attendForm, onRemove, onAddPets, onRemovePetForm, onPetChange } = this.props;
        let { getFieldDecorator } = form;
        if (!attendForm) return null;
        return (
            <div className={styles['form']}>
                <List renderHeader={() => (
                    <div className={styles['header']}>
                        <span className={styles['title']}>报名人{length - index}</span>
                        {length > 1 && <Icon onClick={e => onRemove(e, index)} type="cross" />}
                    </div>
                )}>
                    {getFieldDecorator(...attendForm.name)(
                        <InputItem placeholder="请填写姓名"><img src={require('assets/images/icon-user.png')} alt="user" /> 联系人</InputItem>
                    )}
                    {getFieldDecorator(...attendForm.mobile)(
                        <InputItem placeholder="请填写手机号" maxLength="11"><img src={require('assets/images/icon-phone2.png')} alt="phone" /> 手机号码</InputItem>
                    )}
                    {getFieldDecorator(...attendForm.idcard)(
                        <IdCardField label='身份证信息' onChange={this.handleIdCardChange} />
                    )}
                    {attendForm.petKeys.map((k, i) => (
                        getFieldDecorator(...attendForm.pets('pets-' + k))(
                            <PetsFieldWrapper key={k} findex={index} pindex={i} forms={forms} form={form} onRemove={(e => { onRemovePetForm(i, index, e) })} onChange={(val) => { onPetChange(k, val) }} />
                        )))}
                    <div className={styles['footer']}>
                        <span className={styles['add-pet']} onClick={e => onAddPets(index, e)}>添加携带宠物</span>
                    </div>
                </List>
            </div>
        )
    }

}

class PetsFieldWrapper extends Component {

    static propTypes = {
        value: PropTypes.array,
        forms: PropTypes.array,
        findex: PropTypes.number,
        pindex: PropTypes.number,
        onChange: PropTypes.func,
        onRemove: PropTypes.func
    }

    static defaultProps = {
        onChange: _.noop,
    }

    handlePetsChange = (e) => {
        let { value, onChange } = this.props;
        value[0] = e;
        onChange(value);
    }

    handleCertChange = (e) => {
        let { value, onChange } = this.props;
        value[1] = e;
        onChange(value);
    }

    render() {
        let { value, forms, form, findex, pindex, onRemove } = this.props;
        var ids = [];
        forms.forEach(form => {
            form.petKeys.forEach(key => {
                if (form.form) {
                    if (form.form.getFieldValue(`pets-` + key) && (form.form.getFieldValue(`pets-` + key).length > 0) && form.form.getFieldValue(`pets-` + key)[0]) {
                        ids.push(form.form.getFieldValue(`pets-` + key)[0].id);
                    }
                } else {
                    // console.log(form)
                }
            })
        });

        var length = 0
        if (forms[findex]) {
            length = forms[findex].petKeys.length
        }

        return (
            <div className={styles['pet-containers']}>
                <List renderHeader={() => (
                    <div className={styles['header']}>
                        <span className={styles['title']}>宠物 {pindex + 1}</span>
                        {length > 1 && <Icon onClick={e => onRemove(e, pindex, findex)} type="cross" />}
                    </div>
                )}>
                    <PetsField ids={ids} value={value[0]} onChange={this.handlePetsChange} label='携带宠物' />
                    <PetCertField value={value[1]} onChange={this.handleCertChange} label='宠物免疫证明' />
                </List>
            </div>
        );
    }

}

Form = createForm(AttendForm.options)(Form);