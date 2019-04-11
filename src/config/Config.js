import axios from 'axios';

const isDev = true;

export default class Config {

  static isDev = isDev;

  static baseUrl = isDev ? `http://mq.kai-dian.com/api/public` : `http://mq.kai-dian.com/api`;

  static storagePrefix = '';

}

axios.defaults.baseURL = Config.baseUrl;
axios.defaults.headers.get['Accept'] = 'application/json';

// axios.defaults.timeout = 30 * 1000;   // timeout 30 秒
// axios.defaults.withCredentials = true;
