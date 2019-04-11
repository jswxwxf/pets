// import qs from 'querystring';
import _ from 'lodash';

import { Utils } from '../utility';

export default class UtilService {

  userStore;

  spinnerAutoHide = true;

  showSpinner(message = "", silent = false, autoHide = true) {
  }

  hideSpinner(autoHide) {
  }

  handleLogin = _.debounce((tryLoginResult) => {
    this.goto(`/features/user/auth/index`, tryLoginResult);
  }, 1500, { leading: true, trailing: false });

  goto = _.debounce((pathname, query, isTab = false) => {
  }, 200);

  replace(pathname, query, reset = false) {
  }

  goBack(delta = 1) {
  }

  alert = Utils.debounce((message = "", opts = {}) => {
    alert(message);
  })

  confirm(message = "", opts = {}) {
  }

  toast(message = '', opts = {}) {
  }

  toptips(message, type = 'info', duration = 1500) {
  }

}
