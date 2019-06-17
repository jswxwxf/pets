import React, { Component } from 'react';
import { Carousel, Tag, Icon, Button, NavBar, Modal, Flex, Grid } from 'antd-mobile';
import qs from 'query-string';
import { inject } from 'config';
import { Container } from 'templates';
import styles from './Pet.module.scss';
import Banner from "./../../shared/components/Banner";

export default class User extends Component {

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
        let pet = await this.landingController.getPet(this.id)
        let moments = await this.landingController.getPetMoments(this.id)
        this.setState({
            pet: pet.data,
            moments: moments.data.data
        })
    }

    render() {
        let { pet, moments } = this.state
        if (!pet) {
            return <></>
        }
        return (
            <Container className={styles['pet-page']}>
                {/* <NavBar
                    mode="light"
                    className={styles['trans']}
                    rightContent={[
                        <p onClick={() => this.handleClose()}></p>
                    ]}
                >详情</NavBar> */}

                <Banner></Banner>

                <div className={styles['pet-details']}>

                    <div className={styles['pet-header']}>
                        <div className={styles['pet-avatar']}>
                            <img src={pet.avatar} alt />
                        </div>
                        <div className={styles['pet-detail']}>
                            <h4>{pet.name}</h4>
                            <p> <img src={pet.gender == 1 ? require('../../assets/images/male.png') : require('../../assets/images/female.png')} className={styles['gender']} /> {pet.is_sterilization ? '已绝育' : '未绝育'} | 苏格兰折耳猫</p>
                            <p> <img src={require('../../assets/images/birthday.png')} className={styles['gender']} /> {pet.birthday}</p>
                        </div>
                    </div>
                    <div className={styles['pet-impressions']}>
                        <h5>宝贝印象</h5>
                        {
                            pet.impressions.map((impression) => {
                                return <span>{impression.title}</span>
                            })
                        }
                    </div>
                    <div className={styles['pet-moments']}>
                        <h4>萌宠日记</h4>
                        {
                            moments.length == 0 ? <div className={styles['no-message']}>
                                <img src={require('../../assets/images/no-message.png')} />
                                <p>没有日记</p>
                            </div> : <></>
                        }
                        {
                            moments.map((moment) => {
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
                    </div>

                    {/* <div className={styles['pet-impressions']}>
                        {
                            pet.content.map((block) => {
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
                    */}
                </div>
            </Container>
        );
    }

}
