import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button, NavBar, Modal, Flex, Toast } from 'antd-mobile';
import qs from 'query-string';

import { inject } from 'config';

import { Container } from 'templates';

import CommentPicker from './CommentPicker';
import ContactPicker from './ContactPicker';

import styles from './Detail.module.scss';

export default class Detail extends Component {

    utilService = inject('utilService');
    activityCtrl = inject('activityController');
    bridgeService = inject('bridgeService');

    state = {
        activity: null,
        price: [],
        modal1: true,
        done: false
    };

    id = qs.parse(this.props.location.search).id;

    componentDidMount() {
        document.title = '提交报名订单'
        this.setState({
            done: true
        })
        this.loadData();
    }

    handleContact = () => {
        this.contactPicker.open();
    }

    handleAttends = () => {
        let { activity } = this.state;
        this.bridgeService.showActivityEnrolledUserList(activity.id)
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.activityCtrl.getActivity(this.id);
        let avatars = await this.activityCtrl.getApplicantAvatars(this.id);
        let my = await this.activityCtrl.getMyApplicants(this.id)
        let prices = await this.activityCtrl.getPrices(this.id);
        this.setState({
            activity: result.data,
            avatars: avatars.data,
            my: my.data,
            prices: prices.data
        });
    }

    handleClick = () => {
        let { activity } = this.state;
        this.bridgeService.openWebview('http://47.100.172.250:8018/#/activity/attend?id=' + activity.id);
    }

    handleMap = () => {
        let { activity } = this.state;
        if (activity.lat_lng) {
            let loc = activity.lat_lng.split(',');
            this.bridgeService.openMap(loc[0], loc[1]);
        } else {
            Toast.info("地址没有设定")
        }
    }

    handleFav = async () => {
        let { activity } = this.state;
        let result = await this.activityCtrl.eventAddFav(this.id);
        if (result) {
            Toast.info("活动已收藏")
            activity.is_favorite = true
        }
        this.setState({
            activity: activity
        })
    }

    handleUnFav = async () => {
        let { activity } = this.state;
        let result = await this.activityCtrl.eventRemoveFav(this.id);
        if (result) {
            Toast.info("活动已移除收藏")
            activity.is_favorite = false
        }
        this.setState({
            activity: activity
        })
    }

    handleMore = async () => {
        this.bridgeService.share({ "type": 1, "title": "分享", "desc": "邀请我的好友", "icon": "http://mq.kai-dian.com/storage/1558337676tim3onGI53.", "url": 'http://47.100.172.250:8018/#/activity/detail?id=' + this.id });
    }

    showOptions1 = (activity) => {
        if (activity.options.indexOf('adult') !== -1) {
            return <div><img src={require('assets/images/icon-adult.png')} alt="adult" />仅限成人</div>
        }
    }
    showOptions2 = (activity) => {
        if (activity.options.indexOf('park') !== -1) {
            return <div><img src={require('assets/images/icon-park.png')} alt="park" />有停车位</div>
        }
    }
    showOptions3 = (activity) => {
        if (activity.options.indexOf('cancelable') !== -1) {
            return <div><img src={require('assets/images/icon-cancel.png')} alt="cancel" />报名可取消</div>
        }
    }

    showRefund = (activity) => {
        if (activity.options.indexOf('cancelable') !== -1) {
            return <dl>
                <dt>退换须知</dt>
                <dd>可在线取消报名，活动开始前48小时可无条件退款， 24小时前可退原报名费80%，12小时前可退50%。距离活动开始12小时内，报名费不可退。</dd>
            </dl>
        }
    }

    createFavedButton = () => {
        let { activity } = this.state;
        if (activity.is_favorite) {
            return <img src={require('assets/images/star.png')} alt="fav" onClick={this.handleUnFav} />;
        } else {
            return <img src={require('assets/images/icon-fav.png')} alt="fav" onClick={this.handleFav} />;
        }
    }

    generateSlides = () => {
        let { activity } = this.state
        var assets = []
        if (activity.assets != null) {
            assets = activity.assets
        }
        return assets.map((asset) => {
            return <img src={asset} alt="sample1" />
        })
    }

    renderModal = () => {
        return <Modal
            visible={this.state.modal1}
            transparent
            className={'detail-alert'}
            wrapClassName={styles['detail-alert-wrap']}
            footer={[]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
            <h5 className={styles['modal-header-title']}>需要创建宠物信息卡吗？</h5>
            <span className={styles['modal-title']}>你可以为新宠物创建一个宠物信息卡哦，下次报名可以直接关联宠物信息～</span>
            <Flex>
                <Flex.Item>
                    <Button className={styles['cancel-btn']} type="ghost" onClick={this.handleClose}>暂不创建</Button>
                </Flex.Item>
                <Flex.Item>
                    <Button onClick={this.handleClose}>去创建</Button>
                </Flex.Item>
            </Flex>
        </Modal>
    }

    renderNavbar = () => {
        let { activity } = this.state;
        if (!activity) return null;
        return <div className={styles['nav-container']}>
            <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Button key="0" inline>报名</Button>,
                    <Icon key="1" type="ellipsis" />]} >{activity.name}</NavBar>
            <div className={styles['tabs']}>
                <span>活动简介</span>
                <span className={styles['active']}>详情介绍</span>
                <span>报名须知</span>
            </div>
        </div>
    }

    renderButton(activity, my) {
        let { prices } = this.state;
        var p = 0;
        prices.forEach(price => {
            if (price.type > 1) {
                p += parseFloat(price.price)
            }
        });
        p = Math.round(p * 100) / 100
        if (activity.quota <= 0) {
            return <Button inline disabled >报名名额已满</Button>
        }
        if (activity.remain_days <= 0) {
            return <Button inline disabled >活动已过期</Button>
        }
        if (my.length > 0) {
            return <Button inline onClick={this.handleClick}>已报名 ¥{p} 起</Button>
        } else {
            return <Button inline onClick={this.handleClick}>报名 ¥{p} 起</Button>
        }
    }

    render() {
        let { activity, avatars, my } = this.state;
        if (!activity) return null;
        return (
            <Container className={styles['detail-page']}>
                <NavBar
                    mode="dark"
                    className={styles['trans']}
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.bridgeService.closeWebView()}
                    rightContent={[
                        <p onClick={() => this.handleMore()}><img className={styles['more']} src={require('../../assets/images/dots.png')} alt="" /></p>
                    ]}
                ></NavBar>

                <Carousel infinite autoplay
                    style={{ height: (window.innerWidth * 2 / 3 - 30) + 'px' }}
                    slideWidth={1}
                    dotStyle={{ borderRadius: 0, width: '15px', height: 2 }}
                    dotActiveStyle={{ borderRadius: 0, width: '15px', height: 2, backgroundColor: '#FE5000' }}
                >
                    {this.generateSlides()}
                </Carousel>

                <div className={styles['title-container']}>
                    {this.createFavedButton()}
                    <div className={styles['title']}>{activity.title}</div>
                    <div className={styles['tags']}>
                        {/* <Tag>{activity.type === 1 ? '线上' : '线下'}活动</Tag> */}
                        {
                            (activity.remain_days > 0) ? <Tag>{activity.remain_days}天后截止报名</Tag> : <Tag>报名已截止</Tag>
                        }
                    </div>
                    <div className={styles['counts']}>
                        <span>{activity.view_count}次浏览</span>
                        <span>{activity.favorites_count}人收藏</span>
                    </div>
                    {
                        this.renderButton(activity, my)
                    }
                </div>

                <div className={styles['info-container']}>
                    <div className={styles['info-item']}>
                        <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
                        <span>{activity.start_at} - {activity.end_at}</span>
                        <span></span>
                    </div>
                    <div className={styles['info-item']} onClick={this.handleMap}>
                        <span><img src={require('assets/images/icon-location.png')} alt="location" /></span>
                        <span>{activity.location}</span>
                        <span><Icon type="right" /></span>
                    </div>
                    <div className={styles['info-item']}>
                        <span><img src={require('assets/images/icon-vip.png')} alt="vip" /></span>
                        <span>仅剩{activity.quota}个名额</span>
                        <span></span>
                    </div>
                    <div onClick={this.handleContact} className={styles['info-item']}>
                        <span><img src={activity.user.avatar ? activity.user.avatar : require('assets/images/sample-avatar.jpg')} alt="avatar" className='app-circle' /></span>
                        <span>{activity.user.name}发起</span>
                        <span><img src={require('assets/images/icon-phone.png')} alt="phone" /></span>
                    </div>
                </div>

                <div className={styles['attendee-container']} onClick={this.handleAttends} >
                    <div>已报名<Icon type="right" /></div>
                    <div>
                        {
                            avatars.map(function (avatar, i) {
                                if (avatar.avatar) {
                                    return <img key={i} src={avatar.avatar} alt="avatar" className='app-circle' />
                                } else {
                                    return <img key={i} src='http://mq.kai-dian.com/storage/1559636852ZEOBgrEOTl.png' alt='avatar' className='app-circle' />
                                }
                            })
                        }
                    </div>
                </div>

                <div className={styles['detail-container']}>
                    <div>详情介绍</div>
                    <div>
                        <p>
                            <span>{activity.content}</span>
                        </p>
                        {/* <img src={require('assets/images/sample1.jpg')} alt="sample1" /> */}
                        <p>
                            <span>{activity.background}</span>
                            <span>{activity.proccess}</span>
                        </p>
                        {/* <img src={require('assets/images/sample2.jpg')} alt="sample2" /> */}
                    </div>
                </div>

                <div className={styles['notice-container']}>
                    <div>报名须知</div>
                    <div className={styles['grid']}>
                        {this.showOptions1(activity)}
                        {this.showOptions2(activity)}
                        {this.showOptions3(activity)}
                    </div>
                    <dl>
                        <dt>报名方式</dt>
                        <dd>在线报名。报名截止时间：{activity.deadline}</dd>
                    </dl>
                    <dl>
                        <dt>费用包含</dt>
                        <dd>{activity.expense_desc}</dd>
                    </dl>
                    <dl>
                        <dt>年龄限制</dt>
                        <dd>{activity.options.indexOf('adult') ? '仅限成人' : '无限制'}</dd>
                    </dl>
                    <dl>
                        <dt>可携带宠物</dt>
                        <dd>1位报名用户可携带{activity.max_pets}只宠物</dd>
                    </dl>
                    {this.showRefund(activity)}
                    <dl>
                        <dt>备注</dt>
                        <dd>{activity.other}</dd>
                    </dl>
                </div>

                <CommentPicker activity={activity} />
                <ContactPicker activity={activity} ref={el => this.contactPicker = el} />

            </Container >
        );
    }

}
