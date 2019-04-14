import _ from 'lodash';

const mockBridge = {
  deviceInfo: {
    isNavHidden: false,
    statusBarHeight: 20,
    safeBottomHeight: 34
  },
  getUserInfo(cb) {
    cb({ token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tcS5rYWktZGlhbi5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE1NTUyMzI3MTIsImV4cCI6MTU4Njc2ODcxMiwibmJmIjoxNTU1MjMyNzEyLCJqdGkiOiJZNUhKYXQ5S3A2R2FJQjY5Iiwic3ViIjo1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.4FHV2d5QJDQytvSlD0qK0lyU_D1_231qhGb58idqzvE' });
  },
  login: _.noop,
  activityComment: _.noop,
  pay: _.noop,
  openWebView: _.noop,
  share: _.noop,
  back: _.noop,
  close: _.noop
};

export default class BridgeService {

  utilService;

  getBridge() {
    if (window.MPBridge) return window.MPBridge;
    return mockBridge;
  }

  getDeviceInfo() {
    this.utilService.alert(this.getBridge().deviceInfo);
    return this.getBridge().deviceInfo;
  }

  getUserInfo() {
    return new Promise((resolve) => {
      this.getBridge().getUserInfo((result) => {
        this.utilService.alert(result, '登录成功');
        resolve(result);
      });
    });
  }

  openLogin() {
    this.getBridge().login();
  }

  openActivityComment(id) {
    this.utilService.alert(JSON.stringify({ id }), '打开讨论栏');
    this.getBridge().activityComment(JSON.stringify({ id }));
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
