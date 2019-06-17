import { Flex, Icon, NavBar } from 'antd-mobile';
import { inject } from 'config';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { Container } from 'templates';
import Cart from './Cart';
import styles from './Home.module.scss';



export default class Home extends Component {

    utilService = inject('utilService');
    creditCtrl = inject('creditController');
    bridgeService = inject('bridgeService');

    id = qs.parse(this.props.location.search).id;

    cart;

    state = {
        cart_items: [],
        items: [],
        ani: false,
        personal: {}
    }

    static propTypes = {
        id: PropTypes.string,
        onSubmit: PropTypes.func
    }

    static defaultProps = {
        onSubmit: _.noop
    }

    componentDidMount() {
        document.title = '积分商城'
        this.loadData();
    }

    async loadData() {
        var data = await this.creditCtrl.getCreditItems()
        var personal = await this.creditCtrl.getScore()
        var cart_items = JSON.parse(localStorage.getItem('cart'));
        if (!cart_items) {
            cart_items = []
        }
        this.setState({
            items: data.data.data,
            cart_items,
            personal: personal.data
        });
    }

    handleClick = async (e, item) => {
        e.stopPropagation()
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart || (cart.length == 0)) {
            cart = []
            item.amount = 1;
            cart.push(item)
        } else {
            if (!_.find(cart, { id: item.id })) {
                item.amount = 1;
                cart.push(item);
            } else {
                var item2 = _.find(cart, { id: item.id })
                item2.amount = item2.amount + 1;
                cart.splice(cart.indexOf(item2), 1, item2);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({
            cart_items: cart
        })
        this.setState({
            ani: true
        })
        setTimeout(() => {
            this.setState({
                ani: false
            })
        }, 400);
    }

    handleCart = async (e, item) => {
        e.stopPropagation()
        try {
            await this.cart.open()
        } catch (error) {
            this.loadData()
        }
    }

    handleClose = () => {
        this.bridgeService.closeWebView()
    }

    render() {
        var { items, cart_items, personal, ani } = this.state;
        if (!items) {
            items = []
        }
        var length = 0
        cart_items.forEach(i => {
            if (i.amount > 0) {
                length += i.amount
            }
        })
        var ani_class = ''
        if (ani) {
            ani_class = 'float-cart-bounce'
        } else {
            ani_class = 'float-cart'
        }

        return (
            <Container className={styles['home-page']}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.handleClose()}
                    rightContent={[
                        <p onClick={() => this.handleClose()}>商城订单</p>
                    ]}
                >积分商城</NavBar>
                <div className={styles['credit-header']} >
                    <h1><span>我的积分</span>{personal.credit}</h1>
                </div>

                <h3 className={styles['info-header-title']}>精选礼品</h3>
                <Flex wrap="wrap">
                    {
                        items.map((item) => {
                            return <ProductCard item={item} onClick={((e) => this.handleClick(e, item))} />
                        })
                    }
                </Flex>
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

class ProductCard extends Component {

    utilService = inject('utilService');

    handleClick = (item, e) => {
        this.utilService.goto('/store/product', { id: item.id });
    }

    render() {
        let { item } = this.props;
        return (
            <div className={styles['info-container']} onClick={(e) => { this.handleClick(item, e) }}>
                <div className={styles['inner']}>
                    <div className={styles['img-container']}><img src={item.image} alt="" /></div>
                    <span className={styles['name']}>{item.name}</span>
                    <span className={styles['price']}>
                        <span>{item.price | parseInt} 积分</span>
                        <span className={styles['add-cart']} onClick={this.props.onClick}><img src={require('assets/images/add-cart.png')} alt="add-cart" /></span>
                    </span>
                </div>
            </div>
        )
    }

}