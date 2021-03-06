import axios from 'axios';
import Schema from 'async-validator';
import _ from 'lodash';

const isDev = true;

if (!isDev) {
    Schema.warning = _.noop;
}

export default class Config {

    static isDev = isDev;

    static baseUrl = isDev ? `http://mq.kai-dian.com/api` : `https://api.iwanmeng.com/api`;

    static storagePrefix = '';

}

axios.defaults.baseURL = Config.baseUrl;
axios.defaults.headers.get['Accept'] = 'application/json';

// axios.defaults.timeout = 30 * 1000;   // timeout 30 秒
// axios.defaults.withCredentials = true;
