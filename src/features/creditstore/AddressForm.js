import _ from 'lodash';
import { rcValidator } from 'shared/utility';
import BaseForm from 'shared/utility/BaseForm';
import { Utils } from 'shared/utility';

export default class AddressForm extends BaseForm {

    static options = {
        name: 'addressForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.name = ['name', {
            rules: [
                { required: true, whitespace: false, message: '请填写收货人信息' }
            ],
        }];
        this.mobile = ['mobile', {
            rules: [
                { required: true, whitespace: false, message: '请填写收货人联系电话' },
                { validator: rcValidator('mobile', '请填写正确的手机号') }
            ],
        }];
        this.region = ['region', {
            rules: [
                { required: true, whitespace: false, message: '请添加所在地区' },
            ],
        }];
        this.address = ['address', {
            rules: [
                { required: true, whitespace: false, message: '请填写详细地址' },
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