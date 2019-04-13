import BaseService from './base-service';

export default class OrderService extends BaseService {

  async getMyOrders() {
    const resp = await this._get(`/my/orders`);
    return resp.data;
  }

}
