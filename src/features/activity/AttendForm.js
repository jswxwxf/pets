import { rcValidator } from 'shared/utility';
import _ from 'lodash';

import BaseForm from 'shared/utility/BaseForm';

import { Utils } from 'shared/utility';

export default class AttendForm extends BaseForm {

  static options = {
    name: 'attendForm'
  };

  constructor(form) {
    super();
    this.form = form;
    this.id = Date.now();
    this.name = ['name', {
      rules: [
        { required: true, whitespace: false, message: '请填写姓名' }
      ],
    }];
    this.mobile = ['mobile', {
      rules: [
        { required: true, whitespace: false, message: '请填写手机号' },
        { validator: rcValidator('mobile', '请填写正确的手机号') }
      ],
    }];
  }

  validate() {
    return new Promise((resolve) => {
      this.form.validateFields((errors, values) => {
        resolve({ errors, values });
      });
    })
  }

  static validateAll(forms) {
    return new Promise(async (resolve, reject) => {
      let allValues = [];
      await Utils.asyncForEach(forms, async form => {
        let result = await form.validate();
        let values = _.omitBy(result.values, val => val === undefined);
        if (_.isEmpty(values)) return;
        if (!result.errors) return allValues.push(values);
        reject(result.errors);
      });
      resolve(allValues);
    })
  }

}