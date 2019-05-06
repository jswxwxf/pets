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
    this.license = ['license', {
      rules: [
        { required: true, whitespace: false, message: '请上传您的身份证信息' },
      ],
    }];
    this.petKeys = [Date.now()];
    this.pets = fieldName => [fieldName, {
      initialValue: new Array(2),
      rules: [
        {
          validator: (rule, value, callback) => {
            let pets = value[0];
            let cert = value[1];
            // 如果宠物和免疫证明都没有，则不作验证
            if (_.isEmpty(pets) && _.isEmpty(cert)) return callback();
            if (_.isEmpty(pets)) return callback('请选择宠物');
            if (_.isEmpty(cert)) return callback('请上传宠物免疫证明');
            callback();
          }
        }
      ],
    }];
  }

  addPets() {
    this.petKeys.push(Date.now());
  }

  static toJson(result) {
    result = _.cloneDeep(result);
    result.forEach(item => {
      let all_pet_ids = [];
      item.petKeys.forEach(key => {
        let pets = item[`pets-` + key];
        delete item[`pets-` + key];
        if (!pets[0]) return;
        let pet_ids = pets[0].map(pet => pet.id);
        all_pet_ids.push(pet_ids);
        // TODO: 格式化宠物免疫证明
      })
      item.pet_ids = all_pet_ids;
      delete item.petKeys;
    });
    return { applicants: result };
  }

  static getPetsCount(forms) {
    let count = 0;
    if (!forms) return count;
    forms.forEach(form => {
      form.petKeys.forEach(key => {
        let value = form.form.getFieldValue(`pets-` + key);
        if (!value) return;
        let pets = value[0];
        let cert = value[1];
        // 只有两个都填了才算一个
        if (_.isEmpty(pets) || _.isEmpty(cert)) return;
        count += pets.length;
      })
    });
    return count;
  }

  static validateAll(forms) {
    return new Promise(async (resolve, reject) => {
      let allValues = [];
      await Utils.asyncForEach(forms, async form => {
        try {
          var result = await form.validate();
          result.petKeys = form.petKeys;
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