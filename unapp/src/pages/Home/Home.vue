<template>
  <section class="msite">
    <!--首页头部-->
    <Header :text='address.name|| "定位中..."'>
      <!--使用了插槽-->
      <span class="header_search" slot="left">
        <i class="iconfont  iconicon-sousuo"></i>
      </span>
      <span class="header_login" slot = "right">
      <span class="header_login_text">登录|注册</span>
      </span>
    </Header>    
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="categorys.length>0" >
          <!--遍历二维，在遍历一维数组-->
          <div class="swiper-slide"  v-for="(cs,index) in catagotysArr2" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index) in cs" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+c.image_url" />
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <div class="swiper-wrapper" v-else>
           <img id = "loading-img" src="./images/msite_back.svg" alt="loading" />
        </div>
        <!-- 如果需要分页器 -->
       <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list" v-if="shops.length>0">
          <li class="shop_li border-1px" 
              v-for="shop in shops" :key="shop.id"
              @click="$router.push(`shop/${shop.id}`)"
          >
            <a>
              <div class="shop_left">
                <img class="shop_img" :src="'https://fuss10.elemecdn.com'+shop.image_path" />
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                  <ul class="shop_detail_ul">
                    <li class="supports" v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <!--评分星星组件-->
                    <Star :score="shop.rating" :size="24"/>
                    <div class="rating_section">
                      {{shop.rating}}
                    </div>
                    <div class="order_section">
                      月售{{shop.recent_order_num}}单
                    </div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费: ¥{{shop.float_delivery_fee}}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>   
        </ul>
        <ul v-else>
          <li>
            <img src="./images/shop_back.svg" alt="loading">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading">
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper/swiper-bundle'
import 'swiper/swiper-bundle.css'
import chunk from 'lodash/chunk'
import {mapState} from 'vuex'

export default {
  async mounted(){
    //将请求到的数据维护到store状态中
    this.$store.dispatch('getShops')
     //解决swiper的方案二
     /*
    this.$store.dispatch('getCategorys',() =>{
      // this.$nextTick(() => {
      //  new Swiper('.swiper-container',{
      //     loop: true, // 循环模式选项
      //     // 如果需要分页器
      //     pagination: {
      //       el:'.swiper-pagination',
      //     },
      //   })
      // })
    })
    */
   //方案三:dispathc会返回一个Promise,而该Promise在数据更新且界面更新后才会为成功的状态，再通过await+async,即可在await this.$store.dispatch('getCategorys')，后直接创建swiper
   await this.$store.dispatch('getCategorys')
   new Swiper('.swiper-container',{
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el:'.swiper-pagination',
      },
   })

    
  },
  computed:{
    //从state中读取状态数据，可以直接在组件中使用数组中的元素 ['address','categorys','shops']
    ...mapState({
      address : state => state.home.address,
      categorys : state => state.home.categorys,
      shops : state => state.home.shops,
    }),

    /**
     * 要求：将一个一维数组分成一个二维数组
     *       二维数组中，每个数组长度最大为8
     * 
     */
    catagotysArr(){
      //获取一维数组
      const {categorys} = this
      //定义大数组-->二维数组，包含了smallArr
      const bigArr = []
      let smallArr = []

      //遍历原本的一维数组
      categorys.forEach(category => {
         //保证只将小数组添加到大数组中一次
        if (smallArr.length === 0){
          bigArr.push(smallArr)
        }
        // 将原本数组的元素添加到小数组中
        smallArr.push(category)
        //小数组添加到8个时，重新创建小数组
        if (smallArr.length === 8){
          smallArr = []
        }
      })
      //返回一个二维数组
      return bigArr
    },

    /**
     * 通过引入lodash库(import chunk from 'lodash/chunk'),chunk('数组',n)实现将一个一维数组分成二维，-->参数二：将原本数组中n个元素弄成一个新数组
     */
    catagotysArr2(){
      return chunk(this.categorys,8)
    }
  },
  watch:{
    /*
    watch监视属性的流程:
        一、更新数据
        二、立即同步调用监视数据的回调函数
        三、异步更新界面
    */
    // 对categorys进行监视
    categorys(){
      //轮播图库，swiper对象必须要在轮播列表数据显示之后创建
       //解决swiper的方案1
      //因为界面是异步更新的，而categorys的代码是同步执行的，数据还没显示好!(通过事件循环队列，加个setTimeout,达到界面更新后才创建),让swiper对象在界面更新后，才创建
      // setTimeout(() => {
      //   new Swiper('.swiper-container',{
      //     loop: true, // 循环模式选项
      //     // 如果需要分页器
      //     pagination: {
      //       el:'.swiper-pagination',
      //     },
      //   })
      // },10)
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'

.msite  //首页
  width 100%
  overflow hidden
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        #loading-img
          width 100%
          height 100% 
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc
        
</style>
