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

    async getActivityPrices(id, silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getActivityPrices(id);
    }

    async getActivities(silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getActivities();
    }

    async getMyActivities(type, silent = false) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getMyActivities(type);
    }

    async getComments(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getComments(id);
    }

    async getPrices(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getPrices(id);
    }

    async getApplicants(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getApplicants(id);
    }

    async getApplicantAvatars(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getApplicantAvatars(id);
    }

    async getMyApplicants(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getMyApplicants(id);
    }

    async eventAddFav(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.eventAddFav(id)
    }

    async eventRemoveFav(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.eventRemoveFav(id)
    }

    async apply(id, payload, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.apply(id, payload);
    }

    async getOnline(id, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getOnline(id);
    }

    async addPet(id, pet, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.addPet(id, pet);
    }

    async modifyPet(id, pet, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.modifyPet(id, pet);
    }

    async getAddress(silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.getAddress()
    }

    async publish(data, silent = true) {
        this.utilService.showSpinner(undefined, silent);
        return await this.activityService.publish(data)
    }

}
