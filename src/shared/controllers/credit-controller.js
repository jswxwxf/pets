export default class CreditController {

    utilService;
    creditService;

    constructor(utilService, creditService) {
        this.utilService = utilService;
        this.creditService = creditService;
    }

    async getCreditItems(silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.creditService.getCreditItems();
    }

    async getCreditItem(id, silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.creditService.getCreditItem(id);
    }

    async getCreditOrders(silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.creditService.getCreditOrders();
    }

    async getCreditOrder(id, silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.creditService.getCreditOrder(id);
    }

    async getScore(silent = false) {
        return await this.creditService.getScore();
    }

    async buy(cart) {
        return await this.creditService.buy(cart);
    }
}
