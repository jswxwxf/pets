export default class OrderController {

  utilService;
  orderService;

  constructor(utilService, orderService) {
    this.utilService = utilService;
    this.orderService = orderService;
  }

  async getMyOrders(silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.orderService.getMyOrders();
  }

}
