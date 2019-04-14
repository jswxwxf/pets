import axios from 'axios';
import _ from 'lodash';

import {
  AppController,
  UserController,
  PetController,
  ActivityController,
  OrderController
} from './index';

import {
  UtilService,
  eventService,
  StoreService,
  BridgeService,
  UserService,
  PetService,
  ActivityService,
  OrderService
} from '../services';

const container = {};

const config = (Config) => {

  const d = container;

  d.utilService = new UtilService();
  d.eventService = eventService;
  d.storeService = new StoreService();
  d.bridgeService = new BridgeService();
  d.userService = new UserService(d.storeService);
  d.petService = new PetService(d.storeService);
  d.activityService = new ActivityService(d.storeService);
  d.orderService = new OrderService(d.storeService);

  d.appController = new AppController(d.utilService);
  d.userController = new UserController(d.utilService, d.userService);
  d.petController = new PetController(d.utilService, d.petService);
  d.activityController = new ActivityController(d.utilService, d.activityService);
  d.orderController = new OrderController(d.utilService, d.orderService);

  // // 破例 service 依赖 service
  d.userService.bridgeService = d.bridgeService;
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

      if (resp.status === 401) {
        // token 过期或者没有 token，尝试拿一个 token
        let result = await d.userController.login();
        // 该用户已经绑定，拿到 token
        if (result.token) {
          resp.config.headers['Authorization'] = `Bearer ${result.token}`;
          // 重新调用之前 token 过期的服务
          return axios(resp.config);
        }
        // 该用户没有绑定，跳到 绑定/注册 页
        d.appController.tokenExpired(resp.data, result);
        handleError(resp, 'config.tokenHandler');
        return Promise.reject(error);
      }

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