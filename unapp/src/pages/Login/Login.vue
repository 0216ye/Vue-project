<template>
<section class="loginContainer">
    <div class="loginInner">
    <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
        <a href="javascript:;" :class="{on:isShowPwd}" @click="isShowPwd =true">{{$t('note_login')}}</a>
        <a href="javascript:;" :class="{on:!isShowPwd}" @click="isShowPwd = false">{{$t('password_login')}}</a>
        </div>
    </div>
    <div class="login_content">
        <form>
        <div :class="{on:isShowPwd}">
            <section class="login_message">
            <input type="tel" maxlength="11" placeholder="手机号" 
              v-model="phone" name='phone' v-validate="'required|mobile'">
            <!--disabled用于禁用input，值为布尔总，ture则为禁用,当在倒计时时，禁用-->
            <button :disabled="!isRightPhone || computeTime > 0" class="get_verification" 
              :class="{right_phone_number:isRightPhone}" @click.prevent="sendCode">
              {{computeTime>0 ? `短信已发送(${computeTime}s)` : '发送验证码'}}
            </button>
            <span style="color:red;" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
            </section>
            <section class="login_verification">
            <input type="text" maxlength="8" placeholder="验证码"
              v-model="code" name = "code" v-validate="{required:true,regex:/^\d{6}$/}"
            >
             <span style="color:red;" v-show="errors.has('code')">{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
            温馨提示：未注册外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
            </section>
        </div>
        <div :class="{on:!isShowPwd}">
            <section>
            <section class="login_message">
                <input type="text" maxlength="11" placeholder="用户名"
                 v-model="name" name="name" v-validate="'required'"
                >
                 <span style="color:red;" v-show="errors.has('name')">{{errors.first('name')}}</span>
            </section>
            <section class="login_verification">
                <input :type="isShowInputPwd ? 'text':'password'" maxlength="8" placeholder="密码"
                   v-model="pwd" name="pwd" v-validate="'required'"
                >
                 <span style="color:red;" v-show="errors.has('pwd')">{{errors.first('pwd')}}</span>
                <div class="switch_button" :class="isShowInputPwd ?'on':'off'" @click="isShowInputPwd=!isShowInputPwd">
                <div class="switch_circle" :class="{right:isShowInputPwd}"></div>
                <span class="switch_text">{{isShowInputPwd ? '显示':'隐藏'}}</span>
                </div>
            </section>
            <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码"
                   v-model="captcha" name="captcha" v-validate="{required:true,regex:/^[0-9a-zA-Z]{4}$/}"
                >
                <!--验证码-->
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" 
                  ref ="captcha"  @click="updateCaptcha" 
                >
                <span style="color:red;" v-show="errors.has('captcha')">{{errors.first('captcha')}}</span>
            </section>
            </section>
        </div>
        <button class="login_submit" @click.prevent="login">{{$t('login_login')}}</button>
        </form>
        <a href="javascript:;" class="about_us">{{$t('login_about')}}</a>
    </div>
    <a href="javascript:" class="go_back" @click="$router.replace('/profile')">
        <i class="iconfont iconjiantou" ></i>
    </a>
    </div>
    <button id="target" @click="toggleLocale">切换为{{language === 'zh_CN' ? '英语' : '中文'}}</button>
</section>
</template>

<script type="text/ecmascript-6">
import { Toast,MessageBox } from 'mint-ui';
import {reqPhoneText,reqUSerPwd,reqPhoneVerify } from '../../api/index'
  export default {
    name: "Login",
    data(){
      return {
        isShowPwd:true, //true：短信登录 ，false：密码登录
        isShowInputPwd:false, //判断是否显示密码: true不显示  false显示
        phone:'',//手机号
        code:'', //短信验证吗
        name:'',//用户名
        pwd:'',//密码
        captcha:'',//图形验证码       
        computeTime:0 ,//计时剩余时间
        flag:true, //用于验证码节流
        language:'zh_CN' //切换语言的标志
      }
    },
    computed:{
      //用于判断是否为手机号
      isRightPhone(){
        return /^1[3-9]\d{9}$/.test(this.phone)
      }
    },
    //路由导航守卫-->组件守卫，对路由的跳转进行监视和控制
    beforeRouteEnter (to, from, next) {
      next( com => {
        //获取校验是否登录的token
        const token = com.$store.state.user.token
        //已经登录，自动跳转到个人中心页面
        if ( token ) {
          Toast('当前为登录状态中!')
          return next('/profile')
        }
        //还没登录，放行,进入登录界面
        else next() 
      })
    },
  
    methods:{
      //取消获取验证码的from默认跳转
    async sendCode(){
        this.computeTime = 10
       //进入倒计时
        this.intervalId = setInterval(() => {
          //让计时剩余时间-1
          this.computeTime--
          if(this.computeTime === 0){
            clearInterval(this.intervalId)
          }
        },1000)
       //发送请求
      const result = await reqPhoneText(this.phone)
      if ( result.code === 1 ){
        //失败提示
        Toast(result.msg)
        //请求失败，清除倒计时
        this.computeTime = 0
        clearInterval(this.intervalId)
      }
      else MessageBox('提示','短信发送成功!') 
      },

      async login(){
        //进行前台表单验证
        let names
        if (this.isShowPwd){
          names = ['phone','code']
        } else {
          names = ['name','pwd','captcha']
        }
        //对所有表单项进行验证 
        const success = await this.$validator.validateAll(names)
        let result 
        //验证成功发送请求
        if (success){
          const { isShowPwd,phone,code,name,pwd,captcha } = this
          if ( isShowPwd){
            //短信登录，发送手机号验证登录的API
            result = await reqPhoneVerify({phone,code})
          }else {
            //密码登录，发送用户密码登录的API
            result = await reqUSerPwd({name,pwd,captcha})
            this.updateCaptcha()
            this.captch = ''
          }
          //统一处理结果
          if ( result.code === 0 ){
            const user = result.data
            //登录成功,保存用户信息
            this.$store.dispatch('showUser',user)
            //跳转到个人中心
            this.$router.replace('/profile')
          }else{
            //登录失败
            MessageBox('提示',result.msg)
          }
          
        }
      },

      //用于更新验证码的图片-->节流
      updateCaptcha (){
        if ( this.flag ){
          this.flag = false
          setTimeout(() => {
            this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
            this.flag = true
          },500)
        }
      },

      //用于切换界面的语言
      toggleLocale (){
        //用于显示切换语言的按钮
        this.language= this.language === 'zh_CN' ? 'en' : 'zh_CN'
        //根据当前的locale确定新的locale
        const locale =  this.$i18n.locale === 'en' ? 'zh_CN' : 'en'
        //指定新的
        this.$i18n.locale = locale
        //保存到LocalStorage
        localStorage.setItem('locale_key', locale)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .loginContainer
      width 100%
      height 100%
      overflow hidden
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone_number
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -4px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right 
                      transform translateX(32px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconjiantou
            font-size 18px
            color #999
      #target
          display block
          width 25%
          height 42px
          margin 0 auto
          margin-top 30px
          border-radius 4px
          background #80f09c
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

</style>
