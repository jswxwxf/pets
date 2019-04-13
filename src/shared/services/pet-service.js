import BaseService from './base-service';

export default class PetService extends BaseService {

  async searchPets() {
    const resp = await this._get(`/pet/search`);
    return resp.data;
  }

}
