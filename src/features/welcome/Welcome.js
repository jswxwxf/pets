import { List } from 'antd-mobile';
import React, { Component } from 'react';
import { Container } from 'templates';
import { inject } from '../../config';
import styles from './Welcome.scss';

const Item = List.Item;

export default class Welcome extends Component {

    utilService = inject('utilService');

    handleClick = (link, params) => {
        this.utilService.goto(link, params);
    }

    render() {
        return (
            <Container className="main-home">
                <List renderHeader={() => '欢迎'} className={styles['my-list']}>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/activity/detail', { id: 1 }) }}> 活动 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/activity/publish') }}> 发布活动 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/user/activities') }}> 我的活动 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/user/orders') }}> 我的订单 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/store/home') }}> 积分商城 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/store/orders') }}> 积分商城订单 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/invite') }}> 分享 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/landing/feed', { id: 3 }) }}> 分享页：推荐 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/landing/moment', { id: 200 }) }}> 分享页：宠友 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/landing/hashtag', { id: 3 }) }}> 分享页：话题 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/landing/pet', { id: 3 }) }}> 分享页：宠物 </Item>
                    <Item arrow="horizontal" onClick={() => { this.handleClick('/landing/baike', { id: 3 }) }}> 分享页：百科 </Item>
                </List>
            </Container>
        );
    }
}

