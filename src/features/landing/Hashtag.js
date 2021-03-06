import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button, NavBar, Modal, Flex, Grid } from 'antd-mobile';
import qs from 'query-string';
import { inject } from 'config';
import { Container } from 'templates';
import styles from './Hashtag.module.scss';
import Banner from "./../../shared/components/Banner";

export default class Hashtag extends Component {

    utilService = inject('utilService');
    landingController = inject('landingController');

    state = {
        hashtag: null,
        moments: []
    };

    id = qs.parse(this.props.location.search).id;

    componentDidMount() {
        document.title = '推荐'
        this.loadData();
    }

    async loadData() {
        let hashtag = await this.landingController.getHashtag(this.id)
        let moments = await this.landingController.getHashtagMoments(this.id)
        this.setState({
            hashtag: hashtag.data,
            moments: moments.data.data
        })
    }

    renderMoments() {
        let { moments } = this.state

        return moments.map(moment => {
            return <div className={styles['moment-details']}>
                <div className={styles['user-header']}>
                    <div className={styles['user-avatar']}>
                        <img src={moment.user.avatar} alt={moment.user.name} />
                    </div>
                    <div className={styles['user-name']}>
                        <p className={styles['name']}>{moment.user.name}</p>
                        <p className={styles['time']}>{moment.created}</p>
                    </div>
                    <div className={styles['user-follow']}>
                        <Button className={styles['action-btn']} inline>关注</Button>
                    </div>
                </div>
                <div className={styles['content-body']}>
                    {
                        moment.body.map((el) => {
                            if (el.type === 1) {
                                return <span>{el.text}</span>
                            }
                            if (el.type === 2) {
                                return <span className={styles['hashtag']}>#{el.title}#</span>
                            }
                            if (el.type === 3) {
                                return <span className={styles['tagged-user']}>@{el.name}</span>
                            }
                        })
                    }
                    <div className={styles['assets']}>
                        {
                            (moment.assets && (moment.assets.length == 1) && (moment.assets[0].type == 2)) ?
                                <div className={styles['ok']}><video controls><source src={moment.assets[0].link} type="video/mp4" /></video></div> :

                                <Grid data={moment.assets} itemStyle={{ 'padding-right': '10px' }} columnNum={3} hasLine={false} renderItem={(el, index) => {
                                    if (index % 3 === 0) {
                                        return <div className={styles['grid-item-left']}><img src={el.link} /></div>
                                    }
                                    if (index % 3 === 1) {
                                        return <div className={styles['grid-item-center']}><img src={el.link} /></div>
                                    }
                                    if (index % 3 === 2) {
                                        return <div className={styles['grid-item-right']}><img src={el.link} /></div>
                                    }
                                }} />
                        }


                        {/* {
                                moment.assets ? moment.assets.map((el) => {
                                    if (el.type === 1) {
                                        return <img src={el.link} />
                                    }
                                    if (el.type === 2) {
                                        return <video >
                                            <source src="{el.link}" type="video/mp4" />
                                        </video>
                                    }
                                }) : <></>
                            } */}
                    </div>
                </div>
                <div className={styles['status-bar']}>
                    <div className={styles['like']}>{moment.likes_count}</div>
                    <div className={styles['comment']}>{moment.comments_count}</div>
                    <div className={styles['share']}>{moment.shares_count}</div>
                    <div></div>
                </div>
                {moment.comments.length > 0 ? <div className={styles['comments']}>
                    {moment.comments.map(com => {
                        return <p><span className={styles['name']}>{com.user.name}:</span> <span>{
                            com.content.map(c => {
                                if (c.type == 1) {
                                    return c.text
                                }
                            })
                        }</span></p>
                    })}
                </div> : <></>}
            </div>

        })
    }

    render() {
        let { hashtag } = this.state
        if (!hashtag) {
            return <></>
        }
        return (
            <Container className={styles['hashtag-page']}>
                {/* <NavBar
                    mode="light"
                    className={styles['trans']}
                    rightContent={[
                        <p onClick={() => this.handleClose()}></p>
                    ]}
                >详情</NavBar> */}

                <Banner></Banner>

                <div className={styles['hashtag-details']}>
                    <h2>{hashtag.title}</h2>
                    <div className={styles['hashtag-header']}>
                        <p className={styles['name']}>{hashtag.view_count} 次浏览 {hashtag.favorites_count} 人已关注</p>
                    </div>
                    {this.renderMoments()}
                </div>
            </Container >
        );
    }

}
