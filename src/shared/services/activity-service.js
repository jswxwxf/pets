import BaseService from './base-service';

export default class ActivityService extends BaseService {

  async getActivity(id) {
    const resp = await this._get(`/events/${id}`);
    return resp.data;
  }

}
