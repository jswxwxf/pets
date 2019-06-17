import _ from 'lodash';
import BaseForm from 'shared/utility/BaseForm';

export default class PublishFormStep3 extends BaseForm {

    static options = {
        name: 'publishForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.park = ['park', {
            rules: [
                { required: true, whitespace: false, message: '请填写姓名' }
            ],
        }];
        this.max_pets = ['max_pets', {
            rules: [
                { required: true, whitespace: false, message: '请填写每人最多可携带宠物数量' }
            ],
        }];
        this.forbiddens = ['forbiddens', {
            rules: [
                { required: true, whitespace: false, message: '请填写禁止携带物品' }
            ],
        }];
        this.belongings = ['belongings', {
            rules: [
                { required: true, whitespace: false, message: '请填写报名用户须携带物品' }
            ],
        }];
        this.remark = ['remark', {
            rules: [
                { required: true, whitespace: false, message: '请填写备注' }
            ],
        }];
    }

    static toJson(result) {
        result = _.cloneDeep(result);
        return { result };
    }

    static validateAll(form) {
        debugger
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