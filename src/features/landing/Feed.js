import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button, NavBar, Modal, Flex } from 'antd-mobile';
import qs from 'query-string';
import { inject } from 'config';
import { Container } from 'templates';
import styles from './Feed.module.scss';
import Banner from "./../../shared/components/Banner";

export default class Feed extends Component {

    utilService = inject('utilService');
    landingController = inject('landingController');

    state = {
        feed: null
    };

    id = qs.parse(this.props.location.search).id;

    componentDidMount() {
        document.title = '推荐'
        this.setState({
            done: true
        })
        this.loadData();
    }

    async loadData() {
        let feed = await this.landingController.getFeed(this.id)
        this.setState({
            feed: feed.data
        })
    }

    render() {
        let { feed } = this.state
        if (!feed) {
            return <></>
        }
        return (
            <Container className={styles['feed-page']}>
                {/* <NavBar
                    mode="light"
                    className={styles['trans']}
                    rightContent={[
                        <p onClick={() => this.handleClose()}></p>
                    ]}
                >详情</NavBar> */}
                <Banner></Banner>
                <div className={styles['feed-details']}>
                    <h2>{feed.title} {feed.is_promoted ? <span>热门</span> : <></>}</h2>
                    <div className={styles['user-header']}>
                        <div className={styles['user-avatar']}>
                            <img src={feed.user.avatar} alt />
                        </div>
                        <div className={styles['user-name']}>
                            <p className={styles['name']}>{feed.user.name}</p>
                            <p className={styles['time']}>{feed.created}</p>
                        </div>
                        <div className={styles['user-follow']}>
                            <Button className={styles['action-btn']} inline>关注</Button>
                        </div>
                    </div>
                    <div className={styles['content-body']}>
                        {
                            feed.content.map((block) => {
                                var tmp = block.map(el => {
                                    if (el.type === 1) {
                                        return <span>{el.text}</span>
                                    }
                                    if (el.type === 2) {
                                        return <span className={styles['hashtag']}>#{el.title}#</span>
                                    }
                                    if (el.type === 3) {
                                        return <img src={el.thumbnail} alt="" />
                                    }
                                })
                                return <div>{tmp}</div>
                            })
                        }
                        <div className={styles['assets']}>
                            {
                                feed.assets ? feed.assets.map((el) => {
                                    if (el.type === 1) {
                                        return <img src={el.link} />
                                    }
                                    if (el.type === 2) {
                                        return <video >
                                            <source src="{el.link}" type="video/mp4" />
                                        </video>
                                    }
                                }) : <></>
                            }
                        </div>
                    </div>

                </div>
            </Container >
        );
    }

}
