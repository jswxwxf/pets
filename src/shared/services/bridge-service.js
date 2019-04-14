import _ from 'lodash';

const mockBridge = {
  deviceInfo: {
    isNavHidden: false,
    statusBarHeight: 20,
    safeBottomHeight: 34
  },
  getUserInfo(cb) {
    cb({ token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tcS5rYWktZGlhbi5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE1NTUyMzI3MTIsImV4cCI6MTU4Njc2ODcxMiwibmJmIjoxNTU1MjMyNzEyLCJqdGkiOiJZNUhKYXQ5S3A2R2FJQjY5Iiwic3ViIjo1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.4FHV2d5QJDQytvSlD0qK0lyU_D1_231qhGb58idqzvE' });
  },
  login: _.noop,
  activityComment: _.noop,
  pay: _.noop,
  openWebView: _.noop,
  share: _.noop,
  back: _.noop,
  close: _.noop
};

window.getUserInfoCb = function (result) {
  window.getUserInfoResolve(result);
};

export default class BridgeService {

  utilService;
  bridge;

  getBridge() {
    return new Promise((resolve) => {
      if (this.bridge) return resolve(this.bridge);
      setTimeout(() => {
        this.bridge = window.MPBridge || mockBridge;
        resolve(this.bridge);
      }, 1000);
    });
  }

  getDeviceInfo() {
    this.utilService.alert(this.getBridge().deviceInfo);
    return this.getBridge().deviceInfo;
  }

  async getUserInfo() {
    let bridge = await this.getBridge();
    return new Promise((resolve) => {
      window.getUserInfoResolve = resolve;
      bridge.getUserInfo(JSON.stringify({ callback: 'getUserInfoCb' }));
    });
  }

  openLogin() {
    this.getBridge().login();
  }

  async openActivityComment(id) {
    let bridge = await this.getBridge();
    debugger
    bridge.activityComment(JSON.stringify({ id }));
  }

  pay() {
    this.getBridge().pay();
  }

  openWebView(url) {
    this.getBridge().openWebView(url);
  }

  share(config) {
    this.getBridge().share(config);
  }

  goBack() {
    this.getBridge().back();
  }

  closeWebView() {
    this.getBridge().close();
  }

}
