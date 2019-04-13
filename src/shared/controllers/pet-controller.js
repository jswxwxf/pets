import _ from 'lodash';

function kindMapper(data) {
  return _(data)
    .map(kind => kind.data)
    .flatten()
    .map(kind => ({ label: kind.name, value: kind.id }))
    .value();
}

export default class OrderController {

  utilService;
  petService;

  constructor(utilService, petService) {
    this.utilService = utilService;
    this.petService = petService;
  }

  async getPetKinds(type, silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.petService.getPetKinds(type);
  }

  getAllKinds = _.memoize(async (silent = true) => {
    let [dogResult, catResult] = await Promise.all([
      this.getPetKinds(1, silent),
      this.getPetKinds(2, silent)
    ]);
    return {
      data: [
        { label: '汪星人', value: 1, children: kindMapper(dogResult.data) },
        { label: '喵星人', value: 2, children: kindMapper(catResult.data) },
        { label: '其他', value: 3 }
      ]
    }
  })

  async searchPets(silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.petService.searchPets();
  }

  async addPet(payload, silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.petService.addPet(payload);
  }

  async updatePet(id, payload, silent = true) {
    this.utilService.showSpinner(undefined, silent);
    return await this.petService.updatePet(id, payload);
  }

}
