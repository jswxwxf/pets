import BaseService from './base-service';

export default class OrderService extends BaseService {

  async getMyOrders(type) {
    const resp = await this._get(`/my/orders?type=${type}`);
    return resp.data;
  }

  async getOrder(id) {
    const resp = await this._get(`/my/orders/${id}`);
    return resp.data;
  }

}
