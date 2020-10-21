<template>
    <div class="cartcontrol">
        <transition name="move">
        <div class="iconfont iconiconremovecircleoutline" v-if="food.count > 0" @click.stop="updateFoodCount(false)"></div>
        </transition>
        <div class="cart-count" v-if="food.count > 0 ">{{food.count}}</div>
        <div class="iconfont iconicon-addcircle-line" @click.stop="updateFoodCount(true)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import throttle from 'lodash/throttle'
  export default {
      name:'CartControl',
      props:{
          //接受父组件传递过来的food对象
          food:Object
      },
      methods:{
        //使用了lodash的throttle方法进行了节流
        updateFoodCount:throttle(function( isAdd ){
            //1。当前组件不是food所在的组件-->数据在哪里就在那里更新
            //2。count开始值是undefined
            //通过vuex更新food中的count值
            this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
        },800)
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .iconiconremovecircleoutline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
      position: relative;
      top: 2px;
    .iconicon-addcircle-line
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
      position: relative;
      top: 3px;
</style>
