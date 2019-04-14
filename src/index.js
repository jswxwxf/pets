import React from 'react';
import ReactDOM from 'react-dom';

// vendors
// import 'babel-polyfill';
import 'axios';
import 'store';
import 'classnames';
import 'validatorjs';
import 'lodash';
import 'moment';
// import 'dva';
import $ from 'jquery';

// styles
// import 'react-weui/build/packages/react-weui.css';
// import 'zent/css/index.css';
// import 'swiper/dist/css/swiper.min.css';
import './styles/global.scss';

import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.$ = window.jQuery = $;

Promise.all([
  import('./App'),
  import('./vendor/Vendor')
]).then((modules) => {
  let App = modules[0].default;
  // App.start('#root');
  ReactDOM.render(<App />, document.getElementById('root'));
});