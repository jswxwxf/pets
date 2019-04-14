import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button } from 'antd-mobile';
import qs from 'query-string';

import { inject } from 'config';

import { Container } from 'templates';

import CommentPicker from './CommentPicker';
import ContactPicker from './ContactPicker';

import styles from './Detail.module.scss';

export default class Detail extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  state = {
    activity: null
  };

  id = qs.parse(this.props.location.search).id;

  componentDidMount() {
    this.loadData();
  }

  handleContact = () => {
    this.contactPicker.open();
  }

  async loadData() {
    if (!this.id) return;
    let result = await this.activityCtrl.getActivity(this.id);
    let avatars = await this.activityCtrl.getApplicantAvatars(this.id);
    this.setState({
      activity: result.data,
      avatars: avatars.data
    });
  }

  handleClick = () => {
    this.utilService.goto('/activity/Attend', { id: this.id });
  }

  render() {
    let { activity, avatars } = this.state;
    if (!activity) return null;
    return (
      <Container className={styles['detail-page']}> 

        {/* <div className={styles['nav-container']}>
          <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Button key="0" inline>报名</Button>,
              <Icon key="1" type="ellipsis" />]} >柯基线下同好聚会</NavBar>
          <div className={styles['tabs']}>
            <span>活动简介</span>
            <span className={styles['active']}>详情介绍</span>
            <span>报名须知</span>
          </div>
        </div> */}

        <Carousel infinite>
          <img src={require('assets/images/sample1.jpg')} alt="sample1" />
          <img src={require('assets/images/sample2.jpg')} alt="sample2" />
          <img src={require('assets/images/sample3.jpg')} alt="sample3" />
        </Carousel>

        <div className={styles['title-container']}>
          <img src={require('assets/images/icon-fav.png')} alt="fav" />
          <div className={styles['title']}>{activity.title}</div>
          <div className={styles['tags']}>
            <Tag>活动类型</Tag>
            <Tag>2天后截止报名</Tag>
          </div>
          <div className={styles['counts']}>
            <span>{activity.view_count}次浏览</span>
            <span>{activity.collect_num}人收藏</span>
          </div>
          <Button inline onClick={this.handleClick}>报名￥10</Button>
        </div>

        <div className={styles['info-container']}>
          <div className={styles['info-item']}>
            <span><img src={require('assets/images/icon-calendar.png')} alt="calendar" /></span>
            {/* <span>3月26日（周二）9:00-12:00</span> */}
            <span>{activity.start_at} - {activity.end_at}</span>
            <span></span>
          </div>
          <div className={styles['info-item']}>
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

        <div className={styles['attendee-container']}>
          <div>已报名<Icon type="right" /></div>
          <div>
            {
              avatars.map(function (avatar, i) {
                return <img key={i} src={avatar ? avatar.avatar : require('assets/images/sample-avatar.jpg')} alt="avatar" className='app-circle' />
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
            <img src={require('assets/images/sample1.jpg')} alt="sample1" />
            <p>
              <span>上海柯基聚会，不定期举行市内，江浙沪周边柯基小聚～有兴趣的来来！！！</span>
              <span>大家好，马上就到周末时间了</span>
              <span>不少人应该和我一样</span>
              <span>正在计划周未去哪儿俗话说得好</span>
              <span>周未不活动 脱单如做梦</span>
              <span>那么！！！来参加狼人杀吧</span>
            </p>
            <img src={require('assets/images/sample2.jpg')} alt="sample2" />
          </div>
        </div>

        <div className={styles['notice-container']}>
          <div>报名须知</div>
          <div className={styles['grid']}>
            <div><img src={require('assets/images/icon-adult.png')} alt="adult" />仅限成人</div>
            <div><img src={require('assets/images/icon-park.png')} alt="park" />有停车位</div>
            <div><img src={require('assets/images/icon-cancel.png')} alt="cancel" />报名可取消</div>
          </div>
          <dl>
            <dt>报名方式</dt>
            <dd>在线报名。报名截止时间：2019年1月20日0:00</dd>
          </dl>
          <dl>
            <dt>费用包含</dt>
            <dd>9元报名费+1元保险</dd>
          </dl>
          <dl>
            <dt>年龄限制</dt>
            <dd>仅限成人</dd>
          </dl>
          <dl>
            <dt>可携带宠物</dt>
            <dd>1位报名用户可携带1只宠物</dd>
          </dl>
          <dl>
            <dt>退换须知</dt>
            <dd>可在线取消报名，活动开始前48小时可无条件退款， 24小时前可退原报名费80%，12小时前可退50%。距离活动开始12小时内，报名费不可退。</dd>
          </dl>
          <dl>
            <dt>备注</dt>
            <dd>用户自定义备注信息。（费用内不包含的部分，需要自己携带的物品，等其它注意的事项）</dd>
          </dl>
        </div>

        <CommentPicker activity={activity} />
        <ContactPicker activity={activity} ref={el => this.contactPicker = el} />

      </Container>
    );
  }

}
