import BaseForm from 'shared/utility/BaseForm';

export default class PetForm extends BaseForm {

  static options = {
    name: 'petForm'
  };

  constructor(form) {
    super();
    this.form = form;
    this.name = ['name', {
      rules: [
        { required: true, whitespace: false, message: '请输入宝贝的大名' }
      ],
    }];
    this.birthday = ['birthday', {
      rules: [
        { required: true, message: '请填写生日/到家日' }
      ],
    }];
    this.gender = ['gender', {
      rules: [
        { required: true, message: '请填写性别' }
      ],
    }];
    this.type = ['type', {
      rules: [
        { required: true, message: '请选择品种' }
      ],
    }];
  }

}