export default class UserController {

  utilService;
  userService;

  constructor(utilService, userService) {
    this.utilService = utilService;
    this.userService = userService;
  }

  async login(silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.userService.login();
  }

}
