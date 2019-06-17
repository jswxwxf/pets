import BaseService from './base-service';

export default class OrderService extends BaseService {

    async getMyOrders(type) {
        const resp = await this._get(`/my/orders?type=${type}`);
        return resp.data;
    }

    async getMyPublishOrders(type) {
        const resp = await this._get(`/my/publish/orders?type=${type}`);
        return resp.data;
    }

    async getOrder(id) {
        const resp = await this._get(`/my/orders/${id}`);
        return resp.data;
    }

    async getPrices(id) {
        const resp = await this._get(`/events/${id}/prices`);
        return resp.data;
    }

    async getTrades(id) {
        const resp = await this._get(`/events/${id}/trades`);
        return resp.data;
    }

    async writeOffTrade(event_id, trade_no) {
        const resp = await this._put(`/events/${event_id}/trades/${trade_no}`);
        return resp.data;
    }

    async getPayment(trade_no, type) {
        const resp = await this._post(`/trade/pay`, {
            trade_no,
            pay_type: type
        });
        return resp.data;
    }

    async refund(trade_no, applicants) {
        const resp = await this._post(`/trade/${trade_no}/refund`, {
            applicants
        });
        return resp.data;
    }

}
