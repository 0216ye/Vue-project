<template>
  <div>
    <router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterNav from './components/FooterNav/FooterNav'
export default {
  components:{//注册组件
    FooterNav
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 
</style>  
