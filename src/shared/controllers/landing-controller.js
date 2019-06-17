export default class LandingController {

    utilService;
    landingService;

    constructor(utilService, landingService) {
        this.landingService = landingService;
    }

    async getFeed(id, silent = false) {
        return await this.landingService.getFeed(id);
    }

    async getMoment(id, silent = false) {
        return await this.landingService.getMoment(id);
    }

    async getHashtag(id, silent = false) {
        return await this.landingService.getHashtag(id);
    }

    async getHashtagMoments(id, silent = false) {
        return await this.landingService.getHashtagMoments(id);
    }

    async getPet(id, silent = false) {
        return await this.landingService.getPet(id);
    }

    async getPetMoments(id, silent = false) {
        return await this.landingService.getPetMoments(id);
    }

    async getLeads(silent = false) {
        return await this.landingService.getLeads();
    }

    async getProfile(silent = false) {
        return await this.landingService.getProfile();
    }

    async getWiki(id) {
        return await this.landingService.getWiki(id);
    }

    async createLead(data, silent = false) {
        return await this.landingService.createLead(data);
    }
}
