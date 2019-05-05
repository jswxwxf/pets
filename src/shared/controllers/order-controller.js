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

  async getOrder(id, silent = true) {
    // this.utilService.showSpinner(undefined, silent);
    return await this.orderService.getOrder(id);
  }

}
