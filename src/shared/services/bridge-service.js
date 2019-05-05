import _ from 'lodash';

const mockBridge = {
  deviceInfo: {
    isNavHidden: false,
    statusBarHeight: 0,
    safeBottomHeight: 34
  },
  getUserInfo(cb) {
    cb({ token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tcS5rYWktZGlhbi5jb21cL2FwaVwvbG9naW4iLCJpYXQiOjE1NTU4MjQ2NzIsImV4cCI6MTU4NzM2MDY3MiwibmJmIjoxNTU1ODI0NjcyLCJqdGkiOiI1c0tvWWFYRGY4Umh4U25IIiwic3ViIjo1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.kocTo4p3C7atLQeQzYEXkOzfO-wZpTFFZ8_jUeaQugE' });
  },
  login: _.noop,
  activityComment (cb) {
    console.log(cb)
  },
  selectAndUploadImage (cb) {
    cb({
      images: ['http://mq.kai-dian.com/storage/1554318577tmCfGFoPb4.png']
    })
  },
  pay: _.noop,
  openWebview: _.noop,
  openMap: _.noop,
  share: _.noop,
  back: _.noop,
  close: _.noop,
  showInviteCode: _.noop,
  showActivityEnrolledUserList: _.noop
};

window.getUserInfoCb = function (result) {
  window.getUserInfoResolve(result);
};

window.uploadImageCb = function (result) {
  window.selectAndUploadImageResolve(result);
}

export default class BridgeService {

  utilService;
  bridge;

  getBridge() {
    return new Promise((resolve) => {
      if (this.bridge) return resolve(this.bridge);
      setTimeout(() => {
        this.bridge = window.MPBridge || mockBridge;
        resolve(this.bridge);
      }, 1000);
    });
  }

  getDeviceInfo() {
    // this.utilService.alert(this.getBridge().deviceInfo);
    return this.getBridge().deviceInfo;
  }

  async getUserInfo() {
    let bridge = await this.getBridge();
    return new Promise((resolve) => {
      window.getUserInfoResolve = resolve;
      bridge.getUserInfo(JSON.stringify({ callback: 'getUserInfoCb' }));
    });
  }

  openLogin() {
    this.getBridge().login();
  }

  async openActivityComment(id) {
    let bridge = await this.getBridge();
    bridge.activityComment(JSON.stringify({ id }));
  }

  pay() {
    this.getBridge().pay();
  }

  async openWebview(url) {
    let bridge = await this.getBridge();
    console.log(JSON.stringify({ url }))
    bridge.openWebview(JSON.stringify({url}));
  }

  async openMap(latitude, longitude) {
    let bridge = await this.getBridge();
    console.log(JSON.stringify({ latitude, longitude }))
    bridge.openMap(JSON.stringify({ latitude, longitude}));
  }

  async showInviteCode() {
    let bridge = await this.getBridge();
    bridge.showInviteCode();
  }

  async showActivityEnrolledUserList(id) {
    let bridge = await this.getBridge();
    console.log(JSON.stringify({ id }))
    bridge.showActivityEnrolledUserList(JSON.stringify({id}));
  }

 async selectAndUploadImage(count) {
   let bridge = await this.getBridge();
   return new Promise((resolve) => {
     window.selectAndUploadImageResolve = resolve;
     bridge.selectAndUploadImage(JSON.stringify({ callback: 'uploadImageCb' }));
   });
    // let bridge = await this.getBridge();
    // bridge.selectAndUploadImage(JSON.stringify({ count }));
  }

  async share(config) {
    let bridge = await this.getBridge();
    bridge.share(config);
  }

  goBack() {
    this.getBridge().back();
  }

  closeWebView() {
    this.getBridge().close();
  }

}
