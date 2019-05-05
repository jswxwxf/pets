import React, { Component } from 'react';

import styles from './Welcome.scss';
import { inject } from '../../config';

import { Steps, WingBlank, WhiteSpace, List, Carousel } from 'antd-mobile';
const Item = List.Item;
const Step = Steps.Step;


const customIcon = () => (
  <span className={styles['circle']}>1</span>
);

export default class Welcome extends Component {

  utilService = inject('utilService');
  bridgeService = inject('bridgeService');

  componentDidMount() {
    document.title = '我的邀请码'
  }

  handleShare = (link, params) => {
    this.bridgeService.share();
    // this.utilService.goto(link, params);
  }

  handleClick = (link, params) => {
    this.bridgeService.showInviteCode();
    // this.utilService.goto(link, params);
  }

  render() {
    return (
      <div className="home">
        <div className="logo">
          <img src={require('assets/images/slogan.png')} />
        </div>
        <div className="container">
          <img className="card" src={require('assets/images/card.png')} />
          <img className="head" src={require('assets/images/head.png')} />
          <div className="invite">
            <h3>邀请方式</h3>
            <div className="icons">
              <div className="icon" onClick={this.handleShare}>
                <img src={require('assets/images/wechat.png')} />
                <p>微信好友</p>
              </div>
              <div className="icon" onClick={this.handleShare}>
                <img src={require('assets/images/qq.png')} />
                <p>QQ好友</p>
              </div>
              <div className="icon" onClick={this.handleClick}>
                <img src={require('assets/images/qr.png')} />
                <p>扫码邀请</p>
              </div>
            </div>
          </div>
          <h2>邀请记录</h2>
          <div className="invite">
            <div className="headers">
              <div className="header">
                <p className="title">已邀请好友</p>
                <p className="value">1位</p>
              </div>
              <div className="header">
                <p className="title">已获取积分</p>
                <p className="value">1000</p>
              </div>
            </div>
            <div className="list">
              <div className="row">
                <div className="col">
                  <p>13000891322</p>
                  <span>2019-10-25</span>
                </div>
                <div className="col score">
                  <p>+1000积分</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

