import BaseService from './base-service';

export default class PetService extends BaseService {

    async getPetKinds(type) {
        const resp = await this._get(`/kinds?type=${type}`);
        return resp.data;
    }

    async searchPets() {
        const resp = await this._get(`/my/pets?event=1`);
        return resp.data;
    }

    async addPet(payload) {
        const resp = await this._post(`/pets?is_tmp=1`, payload);
        return resp.data;
    }

    async updatePet(id, payload) {
        const resp = await this._put(`/pets/${id}`, payload);
        return resp.data;
    }

}
