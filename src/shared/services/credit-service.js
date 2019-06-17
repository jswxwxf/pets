import BaseService from './base-service';

export default class CreditService extends BaseService {

    async getCreditItems() {
        const resp = await this._get(`/credit/items`);
        return resp.data;
    }

    async getCreditItem(id) {
        const resp = await this._get(`/credit/items/${id}`);
        return resp.data;
    }

    async addItemToCart(item) {
        const resp = await this._post(`/credit/cart`, item);
        return resp.data;
    }

    async getCreditOrders() {
        const resp = await this._get('/credit/orders');
        return resp.data;
    }

    async getCreditOrder(id) {
        const resp = await this._get(`/credit/orders/${id}`);
        return resp.data;
    }

    async getScore() {
        const resp = await this._get(`/personal/index`)
        return resp.data;
    }

    async buy(cart) {
        const resp = await this._post(`/credit/buy`, cart);
        return resp.data
    }
}
