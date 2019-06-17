import _ from 'lodash';

import PropTypes from 'prop-types';
import BaseForm from 'shared/utility/BaseForm';

import { Utils } from 'shared/utility';

export default class RegisterForm extends BaseForm {

    static options = {
        name: 'registerForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.mobile = ['mobile', {
            rules: [
                { required: true, whitespace: false, message: '请填写您的手机' }
            ],
        }];
        this.content = ['content', {
            rules: [
                { required: true, whitespace: false, message: '请填写活动概要' }
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