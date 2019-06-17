import { Button, Grid, Flex, WhiteSpace } from 'antd-mobile';
import { inject } from 'config';
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import Banner from "./../../shared/components/Banner";
import styles from './Baike.module.scss';

export default class Baike extends Component {

    utilService = inject('utilService');
    landingController = inject('landingController');

    state = {
        baike: null,
    };

    kind_id = qs.parse(this.props.location.search).kind_id;

    componentDidMount() {
        document.title = '百科'
        this.loadData();
    }

    async loadData() {
        let data = await this.landingController.getWiki(this.kind_id)
        var baike = data.data
        this.setState({
            baike
        })
    }

    render() {
        let { baike } = this.state
        if (!baike) {
            return <></>
        }
        return (
            <Container className={styles['baike-page']}>
                {/* <NavBar
                    mode="light"
                    className={styles['trans']}
                    rightContent={[
                        <p onClick={() => this.handleClose()}></p>
                    ]}
                >详情</NavBar> */}

                {/* <Banner></Banner> */}
                <div className={styles['baike-details']}>
                    <h2>{baike.name_cn}</h2>
                    <br />
                    <div className={styles['baike-header']}>
                        <Flex>
                            <Flex.Item>学名</Flex.Item>
                            <Flex.Item>{baike.name_cn}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>别名</Flex.Item>
                            <Flex.Item>{baike.name_other}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>原产地</Flex.Item>
                            <Flex.Item>{baike.origin}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>身高</Flex.Item>
                            <Flex.Item>{baike.height}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>寿命</Flex.Item>
                            <Flex.Item>{baike.life}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>分布区域</Flex.Item>
                            <Flex.Item>{baike.distribution}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>体重</Flex.Item>
                            <Flex.Item>{baike.weight}</Flex.Item>
                        </Flex>
                        {
                            (baike.habbit != '') ?
                                <div>                        <h4>特点/习性</h4>
                                    <p>{baike.habbit}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.intro != '') ?
                                <div>                        <h4>品种介绍</h4>
                                    <p>{baike.intro}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.appearance != '') ?
                                <div>                        <h4>外形特征</h4>
                                    <p>{baike.appearance}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.development != '') ?
                                <div>                        <h4>发展起源</h4>
                                    <p>{baike.development}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.personality != '') ?
                                <div>                        <h4>性格特征</h4>
                                    <p>{baike.personality}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.feed != '') ?
                                <div>                        <h4>饲养方法（喂养，护理，训练，）</h4>
                                    <p>{baike.feed}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.disease != '') ?
                                <div>                        <h4>常见病防治</h4>
                                    <p>{baike.disease}</p>
                                </div>
                                : <></>
                        }
                        {
                            (baike.breeding != '') ?
                                <div>                        <h4>繁殖与配种</h4>
                                    <p>{baike.breeding}</p>
                                </div>
                                : <></>
                        }

                        <WhiteSpace size="lg" />
                    </div>
                </div>
            </Container >
        );
    }

}
