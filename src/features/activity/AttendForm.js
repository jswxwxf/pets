import _ from 'lodash';

import { rcValidator } from 'shared/utility';

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
    this.pets = ['pets', {
      rules: [
        { required: true, message: '请选择宠物' },
      ],
    }];
  }

  static toJson(result) {
    result.forEach(item => {
      item.pet_ids = item.pets.map(pet => pet.id);
      delete item.pets;
    });
    return { applicants: result };
  }

  static getPets(forms) {
    return _(forms)
      .map(form => form.form.getFieldValue('pets'))
      .flatten()
      .value();
  }

  static validateAll(forms) {
    return new Promise(async (resolve, reject) => {
      let allValues = [];
      await Utils.asyncForEach(forms, async form => {
        try {
          var result = await form.validate();
        } catch (e) {
          reject(e);
          throw e;
        }
        allValues.push(result);
      });
      resolve(allValues);
    })
  }

}