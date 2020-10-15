/*vee-validate是专门用来做表单验证的vue插件 */
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

// 提示信息本地化
import zh_CN from 'vee-validate/dist/locale/zh_CN'
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码',
    captcha:'验证码',
    name:'用户名',
    pwd:'密码'
  }
})

// 自定义验证规则
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1[3-9]\d{9}$/.test(value)
  },
  getMessage: field => field + '输入错误'
})