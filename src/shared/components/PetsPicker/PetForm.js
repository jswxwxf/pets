import BaseForm from 'shared/utility/BaseForm';

import Utils from '../../utility/Utils';

export default class PetForm extends BaseForm {

  static options = {
    name: 'petForm'
  };

  constructor(form, pet = {}) {
    super();
    this.form = form;
    this.name = ['name', {
      initialValue: pet.name,
      rules: [
        { required: true, whitespace: false, message: '请输入宝贝的大名' }
      ],
    }];
    this.birthday = ['birthday', {
      initialValue: pet.birthday ? new Date(pet.birthday) : undefined,
      rules: [
        { required: true, message: '请填写生日/到家日' }
      ],
    }];
    this.gender = ['gender', {
      initialValue: pet.gender,
      rules: [
        { required: true, message: '请填写性别' }
      ],
    }];
    this.type = ['type', {
      initialValue: [pet.type, pet.kind_id],
      rules: [
        { required: true, message: '请选择品种' }
      ],
    }];
  }

  static toJson(result) {
    let { type, birthday, ...other } = result;
    return {
      ...other,
      birthday: Utils.formatDate(birthday),
      type: type[0],
      kind_id: type[1]
    }
  }

}