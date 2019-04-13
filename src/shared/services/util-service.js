import { Modal } from 'antd-mobile';
import qs from 'query-string';


import { Config } from 'config';

export default class UtilService {

  history;

  spinner;
  spinnerAutoHide = true;

  dialog;

  storeService;

  showSpinner(message) {
    if (!this.spinner) return;
    this.spinner.show(message);
  }

  hideSpinner() {
    if (!this.spinner) return;
    this.spinner.hide();
  }

  /**
   * 处理 登录 和 页面回转
   */

  rememberLocation(location) {
    if (Config.isPhantomLocation(location)) return;
    this.storeService.storeItem('backLocation', location);
    // console.log(`${location.pathname} remembered`);
  }

  returnBack(defaultPath = '/') {
    let targetLocation = this.storeService.getItem('backLocation');
    this.replace(!!targetLocation ? targetLocation.pathname + targetLocation.search : defaultPath);
    window.location.reload();
  }

  goto(pathname, query) {
    let querystr = qs.stringify(query);
    if (querystr) querystr = "?" + querystr;
    this.history.push({
      pathname,
      search: querystr
    });
  }

  replace(pathname, query) {
    let querystr = qs.stringify(query);
    if (querystr) querystr = "?" + querystr;
    this.history.replace({
      pathname,
      search: querystr
    })
  }

  goBack() {
    this.history.goBack();
  }

  handleLogin(userInfoRequired = false) {
    // WebView 下处理登录在 JsBridgeStore
    // 微信下处理登录
    // if (Config.inWechat()) {
    //   if (this['_handleLoginRedirected']) return;
    //   var redirectUri = '?#/token';
    //   // 转出转入的参数
    //   // if (this.$location.search().token) redirectUri += `?${$.param(this.$location.search())}`;
    //   var url = `${Config.wechatAuthUrl}?redirectUrl=${encodeURIComponent([Config.baseUrl, redirectUri].join(''))}`;
    //   window.location.replace(url);
    //   this['_handleLoginRedirected'] = true;
    // }
  }

  moveToTop() {
    window.scrollTo(0, 0);
  }

  alert(message, title) {
    if (!title) {
      title = message;
      message = undefined;
    }
    return new Promise(resolve => {
      Modal.alert(title, message, [
        { text: '确定', onPress: () => resolve() },
      ])
    });
  }

  confirm(message, title) {
    return new Promise((resolve, reject) => {
      this.dialog.show({
        title,
        content: message,
        buttons: [
          {
            type: 'default',
            label: '取消',
            onClick: () => {
              reject();
              this.dialog.hide();
            }
          },
          {
            type: 'primary',
            label: '确认',
            onClick: () => {
              resolve();
              this.dialog.hide();
            }
          }
        ]
      });
    });
  }

  prompt(title, size, control) {
    return this.promptDialog.show({ title, size, control });
  }

  toast(message, opts = {}) {
    // opts = {
    //   type: 'success',
    //   timeout: 1500,
    //   ...opts
    // }
    // notify.hide();
    // clearTimeout(this.toastTimeout);
    // notify.show(message, opts.type, -1, opts.color);
    // this.toastTimeout = setTimeout(() => notify.hide(), opts.timeout);
  }

}