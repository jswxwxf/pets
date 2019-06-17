export default class OrderController {

    utilService;
    orderService;

    constructor(utilService, orderService) {
        this.utilService = utilService;
        this.orderService = orderService;
    }

    async getMyOrders(type, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.getMyOrders(type);
    }

    async getMyPublishOrders(type, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.getMyPublishOrders(type);
    }

    async getOrder(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.getOrder(id);
    }

    async getTrades(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.getTrades(id);
    }

    async writeOffTrade(event_id, trade_no, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.writeOffTrade(event_id, trade_no);
    }

    async getPrices(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.getPrices(id);
    }

    async getPayment(trade_no, type, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.getPayment(trade_no, type);
    }

    async refund(trade_no, applicants, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.orderService.refund(trade_no, applicants);
    }

}
