<template>
  <div>
      <ShopHeader/>
      <div class='tab'>
        <div class="tab-item">
            <router-link :to="`/shop/${id}/goods`" replace>点餐</router-link>
        </div>
        <div class="tab-item">
            <router-link :to="`/shop/${id}/ratings`" replace>评价</router-link>
        </div>
        <div class="tab-item">
            <router-link :to="`/shop/${id}/info`" replace>商家</router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import {saveCartFoods} from '../../utils/index'

  export default {
      name:'Shop',
      props:['id'],
      components:{
          ShopHeader
      },
      computed: {
        ...mapState({
          shop: state => state.shop
        })
      },
      mounted(){
        //获取路由动态参数
        const id = this.$route.params.id
        //获取对应ID的商家数据
        this.$store.dispatch('getShop',id)
      },
      beforeDestroy() {
        const {shop:{id},cartFoods} = this.shop  //多重解构
        //保存当前商家的购物车信息sessionStroage中
        saveCartFoods(id,cartFoods)
      },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixins.styl'
  .tab
    height 40px
    line-height 40px
    background #ffffff
    bottom-border-1px(rgba(7,17,27,0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77,85,93)
      a
        display block
        text-decoration none
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
