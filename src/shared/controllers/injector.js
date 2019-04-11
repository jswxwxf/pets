import axios from 'axios';
import _ from 'lodash';

let {
  AppController,
  ActivityController
} = require('./index');

let {
  UtilService,
  StoreService,
  ActivityService,
  // ProductService,
  // DealService,
  // TransactionService,
  // AddressService,
  // PayService,
  // CommonService
} = require('../services/index');

const container = {};

const config = (Config) => {

  const d = container;

  d.utilService = new UtilService();
  d.storeService = new StoreService();
  d.activityService = new ActivityService(d.storeService);

  d.appController = new AppController(d.utilService);
  d.activityController = new ActivityController(d.utilService, d.activityService);
  // d.productStore = new ProductStore(); d.productStore.utilService = d.utilService; d.productStore.productService = d.productService;
  // d.dealStore = new DealStore(); d.dealStore.utilService = d.utilService; d.dealStore.dealService = d.dealService;
  // d.transactionStore = new TransactionStore(); d.transactionStore.utilService = d.utilService; d.transactionStore.transactionService = d.transactionService;
  // d.addressStore = new AddressStore(); d.addressStore.utilService = d.utilService; d.addressStore.addressService = d.addressService;
  // d.payStore = new PayStore(); d.payStore.utilService = d.utilService; d.payStore.payService = d.payService;
  // d.commonStore = new CommonStore(); d.commonStore.utilService = d.utilService; d.commonStore.userService = d.userService; d.commonStore.commonService = d.commonService;

  // // 破例 service 依赖 store
  // d.userService.eventStore = d.eventStore;
  // d.utilService.tongjiStore = d.tongjiStore;

  if (Config.overrideDependency) {
    Config.overrideDependency(d);
  }

  // const info = wx.getSystemInfoSync();

  // // 安卓 https 白名单
  // function httpsWhitelistUrls(url) {
  //   if (_.endsWith(url, '/ipo-capigateway/mobile/common/v1/client/configuration')) return true;
  //   if (_.endsWith(url, '/ipo-capigateway/mobile/common/v1/banners')) return true;
  //   return false;
  // }

  // // Add a request interceptor
  // axios.interceptors.request.use(function (config) {
  //   // Do something before request is sent
  //   let mappedPath = Utils.mapTrackUrl(config);
  //   if (mappedPath) {
  //     d.tongjiStore.track(`api`, {
  //       data: mappedPath,
  //       detail: config.data
  //     });
  //   }
  //   return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

  // // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Do something with response data .
      if (d.utilService.spinnerAutoHide) d.utilService.hideSpinner();
      //     // d.appController.resultSucceed(response.data);
      //     if (!_.startsWith(info.system, 'Android') || httpsWhitelistUrls(response.config.url)) return response;
      //     // 由于 Android 机型对 https 支持得不好，所以替换所有的 https 为 http
      //     let data = _.replace(JSON.stringify(response.data), /https:\/\//g, 'http://');
      //     try { response.data = JSON.parse(data); } catch (e) { response.data = data; }
      return response;
    },
    async (error) => {

      // Do something with response error
      d.utilService.hideSpinner();

      const resp = error.response || {};

      // if (error.message === 'Network Error' || _.startsWith(resp.data, "Proxy error")) {
      //   appActions.networkError();
      //   return Promise.reject(error);
      // }

      // if (resp.status === 401) {
      //   // token 过期或者没有 token，尝试拿一个 token
      //   let loginFn = Config.isActivity ? 'loginActivity' : 'tryLogin';
      //   let result = await d.userStore[loginFn]();
      //   // 该用户已经绑定，拿到 token
      //   if (result.token) {
      //     resp.config.headers['x-auth-token'] = result.token;
      //     // 重新调用之前 token 过期的服务
      //     return axios(resp.config);
      //   }
      //   // 该用户没有绑定，跳到 绑定/注册 页
      //   d.appController.tokenExpired(resp.data, result);
      //   handleError(resp, 'config.tokenHandler');
      //   return Promise.reject(error);
      // }

      // 服务器升级中
      if (resp.status === 502) {
        d.appController.serviceUnavailable();
        return Promise.reject(error);
      }

      var handled = handleError(resp, 'config.errorHandler');
      if (handled) return Promise.reject(error);

      if (resp.config && resp.config.errorHandled) return Promise.reject(error);
      d.appController.resultFailed(resp.data || {});
      return Promise.reject(error);
    }

  )

  function handleError(resp, handlerConfig) {
    var errorHandler = _.get(resp, handlerConfig);
    if (errorHandler && _.isFunction(errorHandler)) {
      var handled = errorHandler(resp.data, resp);
      if (handled === true) return true;
    }
    return false;
  }

};

const inject = (type) => {
  return container[type];
};

export default {
  config,
  inject
}