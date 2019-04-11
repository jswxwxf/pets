export default class ActivityController {

  utilService;
  activityService;

  constructor(utilService, activityService) {
    this.utilService = utilService;
    this.activityService = activityService;
  }

  async getActivity(id, silent = false) {
    this.utilService.showSpinner(undefined, silent);
    return await this.activityService.getActivity(id);
  }
  
}
