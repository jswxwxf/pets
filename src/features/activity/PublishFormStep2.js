import _ from 'lodash';
import BaseForm from 'shared/utility/BaseForm';

export default class PublishFormStep2 extends BaseForm {

    static options = {
        name: 'publishForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.background = ['background', {
            rules: [
                { required: true, whitespace: false, message: '请添加活动背景介绍' }
            ],
        }];
        this.background_img = ['background_img', {
            rules: [
                // { required: true, message: '请添加活动背景图' }
            ],
        }];
        this.proccess = ['proccess', {
            rules: [
                { required: true, whitespace: false, message: '请添加活动流程介绍' }
            ],
        }];
        this.proccess_img = ['proccess_img', {
            rules: [
                // { required: true, message: '请添加活动流程图' }
            ],
        }];
        this.other = ['other', {
            rules: [
                { required: true, whitespace: false, message: '请输入其他信息' }
            ],
        }];
    }

    static toJson(result) {
        result = _.cloneDeep(result);
        return { result };
    }

    static validateAll(form) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await form.validate();
            } catch (e) {
                reject(e);
                throw e;
            }
            resolve(result);
        })
    }

}