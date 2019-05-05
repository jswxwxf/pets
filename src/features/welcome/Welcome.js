import React, { Component } from 'react';

import styles from './Welcome.scss';
import { inject } from '../../config';

import QRCode from 'qrcode.react';

import { Steps, WingBlank, WhiteSpace, List, Carousel } from 'antd-mobile';
const Item = List.Item;
const Step = Steps.Step;


const customIcon = () => (
  <span className={styles['circle']}>1</span>
);

export default class Welcome extends Component {

  customDesc() {
    return <div>
      <p>支付宝会在2018年12月24日前将2550元退款入账至您的支付宝账户，请注意查收。如逾期未收到，您可以凭交易号384849202084940482048204820致电支付宝客服查询到账情况</p>
      <span>2019-04-23 08:05:13</span>
    </div>
  }

  utilService = inject('utilService');

  handleClick = (link, params) => {
    this.utilService.goto(link, params);
  }

  render() {
    return (
      <>
        <List renderHeader={() => '欢迎'} className="my-list">
          <Item arrow="horizontal" onClick={() => { this.handleClick('/activity/detail', { id: 1 }) }}>
            活动
          </Item>
          <Item arrow="horizontal" onClick={() => { this.handleClick('/user/activities') }}>
            我的活动
          </Item>
          <Item arrow="horizontal" onClick={() => { this.handleClick('/user/orders') }}>
            我的订单
          </Item>
          <Item arrow="horizontal" onClick={() => { this.handleClick('/store/home') }}>
            积分商城
          </Item>
          <Item arrow="horizontal" onClick={() => { this.handleClick('/store/orders') }}>
            积分商城订单
          </Item>
          <Item arrow="horizontal" onClick={() => { this.handleClick('/invite') }}>
            分享
          </Item>
          <Item arrow="horizontal" onClick={() => { this.handleClick('/activity/upload') }}>
            上传
          </Item>
        </List>
        <Carousel className="my-carousel"
          dots={true}
          // swiping={false}
          dotStyle={{ borderRadius: 0, width: '15px', height: 2 }}
          dotActiveStyle={{ borderRadius: 0, width: '15px', height: 2, backgroundColor: '#FE5000' }}
          // autoplay
          infinite
        >
          <div className="qrcode">
            <QRCode value="http://facebook.github.io/react/" size={205} />
            <p>报名人：Omage</p>
            <p>携带宠物：2只</p>
          </div>
          <div className="qrcode">
            <QRCode value="http://facebook.github.io/react/" size={205} />
            <p>报名人：Omage</p>
            <p>携带宠物：2只</p>
          </div>
          <div className="qrcode">
            <QRCode value="http://facebook.github.io/react/" size={205} />
            <p>报名人：Omage</p>
            <p>携带宠物：2只</p>
          </div>
        </Carousel>

        <div id="welcome" className="app-margin stepsExample">
          <WingBlank size="lg">
            <WhiteSpace />
            <Steps size="small" current={1} className="timeline">
              <Step status="finish" title="提交退款申请" description="2019-04-22 10:05:13" />
              <Step title="退款审核通过" description="2019-04-22 10:05:13" />
              <Step title="退款成功" description={this.customDesc()} />
            </Steps>
          </WingBlank>
        </div>
      </>
    );
  }
}

