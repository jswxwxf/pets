import BaseService from './base-service';

export default class PetService extends BaseService {

  async getPetKinds(type) {
    const resp = await this._get(`/kinds?type=${type}`);
    return resp.data;
  }

  async searchPets() {
    const resp = await this._get(`/pet/search`);
    return resp.data;
  }

  async addPet(payload) {
    const resp = await this._post(`/pets`, payload);
    return resp.data;
  }

}
