import _ from 'lodash';
// import { Utils } from '../utility';

export default class AppController {

  utilService;

  constructor(utilService) {
    this.utilService = utilService;
  }

  onNetworkError() {
    this.utilService.toast('您的网络可能出现了问题，\n请稍后再试。', {
      duration: null
    });
  }

  entityTooLarge() {
    this.utilService.alert('您上传的文件太大。');
  }

  requireAuth() {
    this.utilService.goto('/features/youyao/auth2');
  }

  tokenExpired() {
    // var message = '请登录或者创建帐号';
    // if (this.userService.isLoggedIn()) message = '登录过期，请重新登录';
    // this.utilService.alert(message);
    this.userService._deleteToken(); // 这里不能调 UserActions.logout()，因为 /logout api 也会检查 token，会死循环
    this.utilService.handleLogin();
  }

  serviceUnavailable() {
    setTimeout(() => this.utilService.alert('系统维护中，请稍候再试。'), 0);
  }

  resultSucceed(result) {
    let message = result.msg;
    if (!_.isEmpty(message)) {
      this.utilService.toast(message, { type: 'success' });
    }
  }

  resultFailed = result => {
    if (!result) return;
    let message = result.error || result.message || result.msg || result;
    if (_.isObject(message)) message = '出错了';
    this.utilService.alert(message);
  };

}
