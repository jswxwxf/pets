import BaseService from './base-service';

export default class UserService extends BaseService {

  bridgeService;

  constructor(storeService, bridgeService) {
    super(storeService);
    this.bridgeService = bridgeService;
  }

  async login() {
    let user = await this.bridgeService.getUserInfo();
    user.token = `Bearer ${user.token}`;
    this.setUser(user);
    this._setToken(user.token);
    return user;
  }

  getUser() {
    return this.storeService.getItem('user');
  }

  setUser(user) {
    this.storeService.storeItem('user', user);
  }

  _setToken(token) {
    this.storeService.setToken(token);
  }

  _deleteToken() {
    this.storeService.deleteToken();
  }

}
