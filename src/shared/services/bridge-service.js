import _ from 'lodash';

import BaseService from './base-service';

const bridge = window.MPBridge || {
  devinceInfo: {
    isNavHidden: false,
    statusBarHeight: 20,
    safeBottomHeight: 34
  },
  getUserInfo: _.noop,
  login: _.noop,
  activityComment: _.noop,
  pay: _.noop,
  openWebView: _.noop,
  share: _.noop,
  back: _.noop,
  close: _.noop
};

export default class BridgeService extends BaseService {

  getDevinceInfo() {
    return bridge.devinceInfo;
  }

  getUserInfo() {
    return new Promise((resolve) => {
      bridge.getUserInfo((result) => {
        resolve(result);
      });
    });
  }

  openLogin() {
    bridge.login();
  }

  getActivityComment() {
    return new Promise((resolve) => {
      bridge.activityComment((result) => {
        resolve(result);
      });
    });
  }

  pay() {
    bridge.pay();
  }

  openWebView(url) {
    bridge.openWebView(url);
  }

  share(config) {
    bridge.share(config);
  }

  goBack() {
    bridge.back();
  }

  closeWebView() {
    bridge.close();
  }

}
