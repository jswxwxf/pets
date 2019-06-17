import _ from 'lodash';
import BaseForm from 'shared/utility/BaseForm';

export default class PublishFormStep4 extends BaseForm {

    static options = {
        name: 'publishForm'
    };

    constructor(form) {
        super();
        this.form = form;
        this.id = Date.now();
        this.name = ['name', {
            rules: [
                { required: true, whitespace: false, message: '请填写发布人姓名' }
            ],
        }];
        this.idcard = ['idcard', {
            rules: [
                { required: true, whitespace: false, message: '请填写发布人身份证号码' }
            ],
        }];
        this.company_name = ['company_name', {
            rules: [
                { required: true, whitespace: false, message: '请填写公司名称' }
            ],
        }];
        this.company_license = ['company_license', {
            rules: [
                { required: true, message: '请上传身份证照片' }
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