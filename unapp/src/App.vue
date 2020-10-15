<template>
  <div>
    <router-view ></router-view>
    <FooterNav v-show="$route.meta.isFooterShow"></FooterNav>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterNav from './components/FooterNav/FooterNav'
import {reqAddress} from './api/index'
export default {
  components:{//注册组件
    FooterNav
  },
  async mounted(){
    //通知action异步获取address并保存到state中
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 
</style>  
