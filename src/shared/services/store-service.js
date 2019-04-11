import store from 'store';

import Config from 'config/Config';

let storagePrefix = Config.storagePrefix || '';

const TOKEN_KEY = `${storagePrefix}token`;

export default class StoreService {

  _temp = {};

  storeTemp(k, val) {
    this._temp[k] = val;
  }

  getTemp(k) {
    return this._temp[k];
  }

  deleteTemp(k) {
    delete this._temp[k];
  }

  getToken() {
    return store.get(TOKEN_KEY);
  }

  setToken(token) {
    store.set(TOKEN_KEY, token);
  }

  deleteToken() {
    store.remove(TOKEN_KEY)
  }

  storeItem(k, val) {
    store.set(storagePrefix + k, val);
  }

  getItem(k) {
    return store.get(storagePrefix + k);
  }

  deleteItem(k) {
    store.remove(storagePrefix + k);
  }

}