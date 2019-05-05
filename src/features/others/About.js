import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Button, WhiteSpace, List, InputItem, Icon, Flex, Grid } from 'antd-mobile';
import _ from 'lodash';

import { inject } from 'config';

import { Container } from 'templates';
import styles from './About.module.scss';

export default class About extends Component {

  utilService = inject('utilService');
  activityCtrl = inject('activityController');

//   id = qs.parse(this.props.location.search).id;

  state = {
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container className={styles['home-page']}>

        <Flex wrap="wrap">
        </Flex>
      </Container>
    );
  }

}
