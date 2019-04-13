export default class UserController {

  utilService;
  userService;

  constructor(utilService, userService) {
    this.utilService = utilService;
    this.userService = userService;
  }

}
