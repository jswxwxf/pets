import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem, Icon, Flex, Grid } from 'antd-mobile';
import { createForm } from 'rc-form';
import qs from 'query-string';
import _ from 'lodash';

import { inject } from 'config';
import { Utils } from 'shared/utility';

import { Container } from 'templates';
import Cart from './Cart';
import styles from './Home.module.scss';


const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

export default class Home extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

  id = qs.parse(this.props.location.search).id;

  cart;

  state = {
    activity: {},
    attendForms: []
  }

  componentDidMount() {
    document.title = '积分商城'
    this.loadData();
  }

  async loadData() {
  }

  handleClick = async (e) => {
    e.stopPropagation()
    this.cart.open()
  }

  render() {
    let { activity } = this.state;
    return (
      <Container className={styles['home-page']}>
        <h3 className={styles['info-header-title']}>精选礼品</h3>
        <Cart ref={el => this.cart = el} ></Cart>

        <Flex wrap="wrap">
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
          <ProductCard activity={activity} onClick={this.handleClick}/>
        </Flex>
      </Container>
    );
  }

}


class ProductCard extends Component {

  utilService = inject('utilService');

  handleClick = (e) => {
    this.utilService.goto('/store/product', { id: 1 });
  }

  render() {
    return (
      // <div className={styles['info-container']} onClick={this.handleClick}>
      <div className={styles['info-container']}>
        <div className={styles['inner']}>
          <img src={'https://loremflickr.com/162/162/cat'} alt="calendar"/>
          <span className={styles['name']}>产品名称默认保留两行超过两行…</span>
          <span className={styles['price']}>
            <span>300积分</span>
            <span className={styles['add-cart']} onClick={this.props.onClick}><img  src={require('assets/images/add-cart.png')} alt="add-cart" /></span>
          </span>
        </div>
      </div>
    )
  }

}