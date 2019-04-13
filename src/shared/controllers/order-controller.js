export default class OrderController {

  utilService;
  orderService;

  constructor(utilService, orderService) {
    this.utilService = utilService;
    this.orderService = orderService;
  }

}
