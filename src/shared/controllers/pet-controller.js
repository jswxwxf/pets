export default class OrderController {

  utilService;
  petService;

  constructor(utilService, petService) {
    this.utilService = utilService;
    this.petService = petService;
  }

  async searchPets(silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.petService.searchPets();
  }

  async addPet(payload, silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.petService.addPet(payload);
  }

}
