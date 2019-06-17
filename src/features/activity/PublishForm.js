import _ from 'lodash';

import BaseForm from 'shared/utility/BaseForm';

import { Utils } from 'shared/utility';

export default class PublishForm extends BaseForm {

    static options = {
        name: 'publishForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.title = ['title', {
            rules: [
                { required: true, whitespace: false, message: '请输入标题' }
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