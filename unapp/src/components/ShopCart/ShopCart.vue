<template>
  <div>
    <div class="shopcart">
      <div class="content" >
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount > 0}">
              <i class="iconfont  iconicon-ShoppingCart-" :class="{highlight:totalCount > 0}"></i>
            </div>
            <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount > 0}">￥{{totalPricce}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
            </div>
            <div class="list-content"  ref="food">
                <ul>
                    <li class="food" v-for="(food) in cartFoods" :key="food.name">
                    <span class="name">{{food.name}}</span>
                    <div class="price"><span>￥{{food.price}}</span></div>
                    <div class="cartcontrol-wrapper">
                        <div class="cartcontrol">
                        <CartControl :food="food"/>
                        </div>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
      </transition>
     
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {mapGetters,mapState} from 'vuex'
    export default {
        name:'ShopCart',
        data () {
            return {
                //用于显示购物车中的食物列表,默认不显示
                isShow:false
            }
        },
        computed:{
            ...mapGetters(['totalCount','totalPricce']),
            ...mapState({
                info:state => state.shop.info,
                cartFoods: state => state.shop.cartFoods
            }),
            //计算高亮类  not-enough/enough
            payClass (){
                //获取最少起送价格和购物车总价格
                const {minPrice} = this.info
                const {totalPricce} = this
                return minPrice > totalPricce ?  'not-enough' : 'enough'
            },
            //计算右侧结算按钮的文本
            payText (){
                const {minPrice} = this.info
                const {totalPricce} = this
                if ( totalPricce === 0 ){
                    return `￥${minPrice}起送`
                }else if ( totalPricce < minPrice){
                    return `还差${minPrice - totalPricce}元起送`
                }else {
                    return '去结算'
                }
            },
            //用于计算显示隐藏
            listShow (){
                //当购物车没有添加点餐时，默认隐藏
                if ( this.totalCount === 0 ){
                    this.isShow = false
                    return false
                }
                /**
                 * 问题：如果创建多个scroll对象，会触发事件多次响应
                 * 解决：然Bscroll对象只创建一个
                 * 使用：单列(单一的实例)
                 * 1.创建前：判断对象不存在
                 * 2.创建后：保存该对象
                 */
                if ( this.isShow ){
                    //当显示购物车时，创建BScroll对象
                    this.$nextTick(() => {
                        //scroll对象还没创建
                        if ( !this.scroll ) this.scroll = new BScroll(this.$refs.food)
                        //scroll对象已经创建了，该方法内部会重新统计内容高度来决定是否形成滑动
                        else this.scroll.refresh()
                    })
                }
                return this.isShow
            }
        },
        methods:{
            toggleShow (){
                //只有当购物车有点餐的食物时，才切换
                if ( this.totalCount > 0  ) this.isShow = !this.isShow
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .iconicon-ShoppingCart-
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>

