import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem, Icon, Modal, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import qs from 'query-string';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import { Container } from 'templates';

import PricePicker from './PricePicker';
// import PayPicker from './PayPicker';
import AttendForm from './AttendForm';
import PetsField from 'shared/components/PetsField';
import IdCardField from 'shared/components/IdCardField';
import PetCertField from '../../shared/components/PetCertField';

import styles from './Attend.module.scss';

export default class Attend extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  id = qs.parse(this.props.location.search).id;

  pricePicker;

  state = {
    popup: 0,
    deleted: 0,
    activity: {},
    attendForms: []
  }

  componentDidMount() {
    document.title = '提交报名订单'
    this.loadData();
  }

  async loadData() {
    if (!this.id) return;
    let result = await this.activityCtrl.getActivity(this.id);
    this.setState({
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

  handleAddPets = (index, e) => {
    let { attendForms } = this.state;
    let form = attendForms[index];
    form.addPets();
    this.setState({
      attendForms
    });
  }

  handleRemoveForm = (_, index) => {
    this.setState({
      popup: 1,
      deleted: index
    })
  }

  handleClose = (e) => {
    if (e.currentTarget.innerText == "确 定") {
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
    this.utilService.replace(`/user/orders/${result.data.trade_no}`);
  }

  handleClosePop = (modal) => {
    this.setState({
      modal: false
    })
  }

  render() {
    let { activity, attendForms } = this.state;
    return (
      <Container className={styles['attend-page']}>

        <Modal
          visible={this.state.modal}
          transparent
          className={'detail-alert'}
          wrapClassName={styles['detail-alert-wrap']}
          // maskClosable={false}
          // onClose={this.onClose('modal')}
          footer={[]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <h5 className={styles['modal-header-title']}>报名须知</h5>
          <span className={styles['modal-title']}>1.每个订单至少添加一个宠物信息。若添加的用户与您共同携带同一宠物时，可不添加宠物信息。
          <br /><br /> 2.为了保证您与其他宠友的安全，请上传尚在有效期内的疫苗证明，上传时切勿涂改信息，我们保证您的隐私安全，您可放心上传。
          <br /><br />3.由于我们为每位活动报名者添购了活动保险，请报名人务必添加个人身份证信息，我们保证您的隐私安全，您可放心上传。</span>
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

        <div className={styles['info-container']}>
          <div>{activity.title}</div>
          <div className={styles['info-item']}>
            <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
            <span>{activity.start_at}</span>
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

        <WhiteSpace />

        <div className={styles['form-container']}>
          <div>
            <span>报名信息</span>
            <Button onClick={this.handleAddForm} type="ghost" inline size="small" icon={<img src={require('assets/images/icon-plus.png')} alt="plus" />}>添加报名人</Button>
          </div>
          <div>
            {attendForms.map((attendForm, i) => (<Form key={attendForm.id} index={i} length={attendForms.length} attendForm={attendForm} onRemove={this.handleRemoveForm} onAddPets={this.handleAddPets} />))}
          </div>
        </div>

        <div className={styles['footer-container']}>
          <Footer onPriceDetail={this.handlePriceDetail} onSubmit={this.handleSubmit} />
        </div>

        <PricePicker id={this.id} ref={el => this.pricePicker = el} detail={attendForms} onSubmit={this.handleSubmit} />
        {/* <PayPicker /> */}

      </Container>
    );
  }

}

export class Footer extends Component {

  static propTypes = {
    showDetail: PropTypes.bool,
    onSubmit: PropTypes.func,
    onPriceDetail: PropTypes.func
  }

  static defaultProps = {
    showDetail: true,
    onSubmit: _.noop,
    onPriceDetail: _.noop
  }

  render() {
    let { showDetail, onSubmit, onPriceDetail } = this.props;
    return (
      <div className={styles['footer']}>
        <div><span>实付：￥</span><span className={styles['price']}>10</span></div>
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
    attendForm: PropTypes.object,
    index: PropTypes.number,
    length: PropTypes.number,
    onRemove: PropTypes.func,
    onAddPets: PropTypes.func
  }

  static defaultProps = {
    onRemove: _.noop,
    onAddPets: _.noop
  }

  componentDidMount() {
    let { form, attendForm } = this.props;
    attendForm.form = form;
  }

  render() {
    let { index, length, form, attendForm, onRemove, onAddPets } = this.props;
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
            <InputItem placeholder="请填写手机号"><img src={require('assets/images/icon-phone2.png')} alt="phone" /> 手机号码</InputItem>
          )}
          {getFieldDecorator(...attendForm.license)(
            <IdCardField label='身份证信息' />
          )}
          {attendForm.petKeys.map(k => (
            getFieldDecorator(...attendForm.pets('pets-' + k))(
              <PetsFieldWrapper key={k} />
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
    onChange: PropTypes.func,
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
    // TODO: 把免疫证明信息回传回去
    debugger
    value[1] = e;
    onChange(value);
  }

  render() {
    let { value, onChange } = this.props;
    console.log(value);
    return (
      <>
        <PetsField value={value[0]} onChange={this.handlePetsChange} label='携带宠物' />
        <PetCertField value={value[1]} onChange={this.handleCertChange} label='宠物免疫证明' />
      </>
    );
  }

}

Form = createForm(AttendForm.options)(Form);