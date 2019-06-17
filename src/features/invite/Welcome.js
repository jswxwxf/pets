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
    landingController = inject('landingController');

    state = {
        leads: [],
        profile: null,
    }

    componentDidMount() {
        document.title = '我的邀请码'
        this.loadData()
    }

    loadData = async () => {
        var data = await this.landingController.getLeads()
        var leads = data.data
        var tmp = await this.landingController.getProfile()
        var profile = tmp.data
        this.setState({
            leads,
            profile
        })
    }

    handleShareWechat = (link, params) => {
        let { profile } = this.state;
        if (profile) {
            this.bridgeService.share({ "type": 1, "title": "分享", "desc": "邀请我的好友", "icon": "http://mq.kai-dian.com/storage/1558337676tim3onGI53.", "url": "http://47.100.172.250:8018/#/landing/register?user_id=" + profile.id });
        }
    }

    handleShareQQ = (link, params) => {
        let { profile } = this.state;
        if (profile) {
            this.bridgeService.share({ "type": 3, "title": "分享", "desc": "邀请我的好友", "icon": "http://mq.kai-dian.com/storage/1558337676tim3onGI53.", "url": "http://47.100.172.250:8018/#/landing/register?user_id=" + profile.id });
        }
    }

    handleClick = (link, params) => {
        let { profile } = this.state;
        if (profile) {
            var url = 'http://47.100.172.250:8018/#/landing/register?user_id=' + profile.id
            this.bridgeService.showInviteCode(url);
            // this.utilService.goto(link, params);
        }
    }

    render() {
        let { leads } = this.state;
        return (
            <div className="home">
                <div className="logo">
                    <img src={require('assets/images/slogan.png')} alt="" />
                </div>
                <div className="container">
                    <img className="card" src={require('assets/images/card.png')} alt="" />
                    <img className="head" src={require('assets/images/head.png')} alt="" />
                    <div className="invite">
                        <h3>邀请方式</h3>
                        <div className="icons">
                            <div className="icon" onClick={this.handleShareWechat}>
                                <img src={require('assets/images/wechat.png')} alt="" />
                                <p>微信好友</p>
                            </div>
                            <div className="icon" onClick={this.handleShareQQ}>
                                <img src={require('assets/images/qq.png')} alt="" />
                                <p>QQ好友</p>
                            </div>
                            <div className="icon" onClick={this.handleClick}>
                                <img src={require('assets/images/qr.png')} alt="" />
                                <p>扫码邀请</p>
                            </div>
                        </div>
                    </div>
                    <h2>邀请记录</h2>
                    <div className="invite">
                        <div className="headers">
                            <div className="header">
                                <p className="title">已邀请好友</p>
                                <p className="value">{leads.length}位</p>
                            </div>
                            <div className="header">
                                <p className="title">已获取积分</p>
                                <p className="value">{leads.length * 1000}</p>
                            </div>
                        </div>
                        <div className="list">
                            {leads.map(lead => {
                                return <div className="row">
                                    <div className="col">
                                        <p>{lead.mobile}</p>
                                        <span>{leads.created_at}</span>
                                    </div>
                                    <div className="col score">
                                        <p>+1000积分</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

