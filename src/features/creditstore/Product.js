import { Carousel, Stepper, Icon } from 'antd-mobile';
import { inject } from 'config';
import _ from 'lodash';
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import Cart from './Cart';
import styles from './Product.module.scss';

export default class Product extends Component {

    utilService = inject('utilService');
    creditCtrl = inject('creditController');

    state = {
        items: [],
        product: {},
        personal: {},
        ani: false
    };

    id = qs.parse(this.props.location.search).id;
    cart;

    componentDidMount() {
        this.loadData();
    }

    handleContact = () => {
        this.contactPicker.open();
    }

    handleCart = async (e) => {
        e.stopPropagation()
        this.cart.open()
    }

    async loadData() {
        if (!this.id) return;
        let result = await this.creditCtrl.getCreditItem(this.id);
        var personal = await this.creditCtrl.getScore()
        var items = localStorage.getItem('cart');
        if (items) {
            items = JSON.parse(items)
        } else {
            items = []
        }
        this.setState({
            items: items
        });

        this.setState({
            product: result.data,
            items,
            personal: personal.data
        });
    }


    handleChange = (item, i) => {
        let { items, product } = this.state
        var item2 = JSON.parse(JSON.stringify(item));
        if (items.indexOf(item) === -1) {
            item2 = JSON.parse(JSON.stringify(product));
            item2.amount = 1;
            items.push(item2)
        } else {
            item2.amount = i;
            if (i === 0) {
                items.splice(items.indexOf(item), 1)
            } else {
                items.splice(items.indexOf(item), 1, item2)
            }
        }
        localStorage.setItem('cart', JSON.stringify(items))
        this.setState({
            items,
            item: item2,
            ani: true
        })
        setTimeout(() => {
            this.setState({
                ani: false
            })
        }, 400);
    }

    handleBack() {
        this.utilService.goto('/store/home')
    }

    render() {
        let { product, items, personal, ani } = this.state;
        if (!product) return null;
        var item = _(items).find({ id: parseInt(this.id) })
        if (!item) {
            item = {
                amount: 0
            }
        }
        var ani_class = ''
        if (ani) {
            ani_class = 'float-cart-bounce'
        } else {
            ani_class = 'float-cart'
        }
        var length = 0
        items.forEach(i => {
            if (i.amount > 0) {
                length += i.amount
            }
        })
        return (
            <Container className={styles['detail-page']}>
                {/* <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.handleClose()}
                    rightContent={[
                        <p onClick={() => this.handleClose()}>商城订单</p>
                    ]}
                >积分商城</NavBar>
                <div className={styles['credit-header']} >
                    <h1><span>我的积分</span>{personal.credit}</h1>
                </div> */}

                <div className={styles['back']} onClick={e => { this.handleBack() }}>
                    <Icon type="left" />
                </div>
                <Carousel infinite fixedHeight={false} >
                    {
                        product.banners ? product.banners.map(banner => {
                            return <img src={banner} alt="" />
                        }) : <></>
                    }
                </Carousel>

                <div className={styles['title-container']}>
                    <div className={styles['title']}>{product.name}</div>
                    <div className={styles['counts']}>
                        <span className={styles['counts-title']}><span className={styles['amounts']}>{product.price | parseInt} 积分</span>  剩余{product.stock}件 </span>
                        <span className={styles['counts-stepper']}>
                            <Stepper
                                style={{ width: '60%' }}
                                showNumber={true}
                                max={100}
                                min={0}
                                value={item.amount}
                                onChange={i => { this.handleChange(item, i) }}
                            />
                        </span>
                    </div>
                </div>
                <div className={styles['detail-container']}>
                    <div>商品详情</div>
                    <div>
                        <p>
                            <span dangerouslySetInnerHTML={{ __html: product.desc }}></span>
                        </p>
                    </div>
                </div>

                <div className={styles['notice-container']}>
                    <div>兑换须知</div>
                    <ol>
                        <li>除商品本身不能正常兑换外，商品一经兑换，一律不退还积分，请用户兑换前仔细参照商品详情等重要信息； </li>
                        <li>通过非法途径获得积分后进行的正常兑换行为，或不按商品使用规则进行兑换，平台有权不提供服务； </li>
                        <li>凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</li>
                    </ol>
                </div>
                <div className={styles[ani_class]} onClick={this.handleCart}>
                    <span className={styles['float-badge']}>
                        {length}
                    </span>
                </div>
                <Cart credit={personal.credit} ref={el => this.cart = el} ></Cart>

            </Container>
        );
    }

}
