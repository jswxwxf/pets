import { Modal } from 'antd-mobile';
import qs from 'query-string';
import $ from 'jquery';

import { Config } from 'config';

import Utils from '../utility/Utils';

export default class UtilService {

  history;

  spinner;
  spinnerAutoHide = true;

  dialog;

  storeService;
  bridgeService;

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

  handleLogin = Utils.debounce(() => {
    this.bridgeService.openLogin();
  });

  moveToTop() {
    window.scrollTo(0, 0);
  }

  alert = Utils.debounce((message, title) => {
    if (!title) {
      title = message;
      message = undefined;
    }
    return new Promise(resolve => {
      Modal.alert(title, message, [
        { text: '确定', onPress: () => resolve() },
      ])
    });
  });

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

  hidePicker(containerClass) {
    $(containerClass).parent().fadeOut('fast');
  }

  showPicker(containerClass) {
    $(containerClass).parent().fadeIn('fast');
  }

}