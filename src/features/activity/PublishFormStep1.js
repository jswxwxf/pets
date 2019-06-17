import _ from 'lodash';

import BaseForm from 'shared/utility/BaseForm';

import { Utils } from 'shared/utility';

export default class PublishFormStep1 extends BaseForm {

    static options = {
        name: 'publishForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.title = ['title', {
            rules: [
                { required: true, whitespace: false, message: '请填写活动标题' }
            ],
        }];
        this.content = ['content', {
            rules: [
                { required: true, whitespace: false, message: '请填写活动概要' }
            ],
        }];
        this.start_at = ['start_at', {
            rules: [
                { required: true, message: '请选择活动开始时间' }
            ],
        }];
        this.end_at = ['end_at', {
            rules: [
                { required: true, message: '请选择活动结束时间' }
            ],
        }];
        this.region = ['region', {
            rules: [
                { required: true, message: '请选择活动地点' }
            ],
        }];
        this.location = ['location', {
            rules: [
                { required: true, whitespace: false, message: '请填写活动详细地址' }
            ],
        }];
        this.quota = ['quota', {
            rules: [
                { required: true, whitespace: false, message: '请输入活动名额' }
            ],
        }];
        this.price = ['price', {
            rules: [
                { required: true, whitespace: false, message: '请设定报名费用' }
            ],
        }];
        this.pet_price = ['pet_price', {
            rules: [
                { required: true, whitespace: false, message: '请设定报名费用' }
            ],
        }];
        this.price_desc = ['price_desc', {
            rules: [
                { required: true, whitespace: false, message: '请输入费用介绍' }
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