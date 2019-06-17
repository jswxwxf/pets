import BaseService from './base-service';

export default class ActivityService extends BaseService {

    async getActivity(id) {
        const resp = await this._get(`/events/${id}`);
        return resp.data;
    }

    async getActivityPrices(id) {
        const resp = await this._get(`/events/${id}/prices`);
        return resp.data;
    }

    async getActivities() {
        const resp = await this._get(`/events`);
        return resp.data;
    }

    async getMyActivities(type) {
        const resp = await this._get(`/my/events?type=${type}`);
        return resp.data;
    }

    async getComments(id) {
        const resp = await this._get(`/events/${id}/comments`);
        return resp.data;
    }

    async getPrices(id) {
        const resp = await this._get(`/events/${id}/prices`);
        return resp.data;
    }

    async getApplicants(id) {
        const resp = await this._get(`/events/${id}/applicants`);
        return resp.data;
    }

    async getMyApplicants(id) {
        const resp = await this._get(`/events/${id}/myapplicants`);
        return resp.data;
    }

    async getApplicantAvatars(id) {
        const resp = await this._get(`/events/${id}/applicants/avatars`);
        return resp.data;
    }

    async eventAddFav(id) {
        const resp = await this._post(`/events/${id}/favorite`);
        return resp.data;
    }

    async eventRemoveFav(id) {
        const resp = await this._post(`/events/${id}/unfavorite`);
        return resp.data;
    }

    async apply(id, payload) {
        const resp = await this._post(`/events/${id}/applicants`, payload);
        return resp.data;
    }

    async publish(payload) {
        const resp = await this._post(`/event/publish`, payload);
        return resp.data;
    }

    async getOnline(id) {
        const resp = await this._get(`/events/${id}/online`);
        return resp.data;
    }

    async addPet(id, payload) {
        const resp = await this._post(`/event/pet`, payload);
        return resp.data;
    }

    async getAddress() {
        const resp = await this._get(`/credit/address`);
        return resp.data;
    }

    async modifyPet(id, payload) {
        let { petId, ...others } = payload;
        const resp = await this._put(`/${id}/pets/${petId}`, others);
        return resp.data;
    }

}
