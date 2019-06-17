import BaseService from './base-service';

export default class LandingService extends BaseService {

    async getFeed(id) {
        const resp = await this._get(`/public/feeds/${id}`);
        return resp.data;
    }

    async getMoment(id) {
        const resp = await this._get(`/public/moments/${id}`);
        return resp.data;
    }

    async getHashtag(id) {
        const resp = await this._get(`/public/hashtags/${id}`);
        return resp.data;
    }

    async getHashtagMoments(id) {
        const resp = await this._get(`/public/hashtags/${id}/moments`);
        return resp.data;
    }

    async getPet(id) {
        const resp = await this._get(`/pets/${id}`);
        return resp.data;
    }

    async getPetMoments(id) {
        const resp = await this._get(`/pets/${id}/moments`);
        return resp.data;
    }

    async getLeads() {
        const resp = await this._get(`/leads`);
        return resp.data;
    }

    async getProfile() {
        const resp = await this._get(`/profile`);
        return resp.data;
    }

    async createLead(data) {
        const resp = await this._post(`/leads`, data);
        return resp.data;
    }

    async getWiki(id) {
        const resp = await this._get(`/wiki/${id}`);
        return resp.data;
    }

}
