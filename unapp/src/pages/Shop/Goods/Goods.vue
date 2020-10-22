<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="leftUi">
          <li class="menu-item "
            @click="currenItem(index)"
            v-for="(good,index) in goods" :key="index" 
            :class="{current:currentIndex === index}">
            <span class="text bottom-border-1px">
              <img  class="icon" v-if="good.icon" :src="good.icon"/>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="rightUi">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" 
                v-for="(food,index) in good.foods" 
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57"  :src="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food ="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <!--标签对象就是组件对象-->
    <Food :food="food" ref="food"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  import {mapState} from 'vuex'
  //引入用于滑动的库
  import BScroll from '@better-scroll/core'
  export default {
    name:'Goods',
    data(){
      return {
        //用于计算右侧滑动的Y轴坐标 不断改变的
        scrollY:0,
        //用于保存右侧每个li距离顶部的top值 ：第一次列表数据显示后，统计完成不再更改
        tops:[],
        food:{} //用于保存每个食物li的弹出页面的信息
      }
    },
    computed:{ 
      ...mapState({
        goods: state => state.shop.goods,
      }),
      currentIndex(){
        const {scrollY,tops} = this
        //findIndex条件满足时返回其索引
        const index = tops.findIndex((top,index) =>  scrollY >= top && scrollY < tops[index+1])
        //当滑动右侧的列表时，左侧列表始终可见-->通过比较旧的index跟新的是否一致
        if ( index !== this.index && this.leftScroll) {
          //将新的index保存起来
          this.index = index
          //通过ref和children指定索引获取li
          const li = this.$refs.leftUi.children[index]
          //scrollToElement:滚动到指定的目标元素。
          this.leftScroll.scrollToElement(li,300,)
        }
        
        return index
      }
    },
    methods:{
      //初始化better-scorll对象
      _initScroll(){
       //左侧的scroll滑动对象
       this.leftScroll = new BScroll(this.$refs.menuWrapper,{})
       //右侧的scroll滑动对象
       this.rightScroll = new BScroll(this.$refs.foodsWrapper,{
         probeType:1 // probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
       })

       //给右侧的scroll对象绑定监听函数
       this.rightScroll.on('scroll',({x,y}) => {
         console.log('scroll',x,y)
         //将获取到的Y轴的值取绝对值后赋给scrollY
         this.scrollY = Math.abs(y)
       })

       this.rightScroll.on('scrollEnd',({x,y}) => {
         console.log('scroll',x,y)
         this.scrollY = Math.abs(y)
       })
     },
     //统计右侧所有分类li的高度组成的tops数组
      _initTops(){
      const tops = [] 
      //tops第一个值必定为0
      let top = 0
      tops.push(top)
      //获取ul下每个li，并将获取到的伪数组转为真数组
      const lis = Array.from(this.$refs.rightUi.children)
      lis.forEach(li =>{
        //累加每个li的高度,并添加到tops中
        top+=li.clientHeight
        tops.push(top)
      })
      this.tops = tops
     },
      //用于给左侧每个li绑定监听，选中左侧某个li时，右侧列表自动滑动
      currenItem (index){
        //获取右侧对应li距离的top值--->tops中保存的值是右侧每个li的top临界值
        const top = this.tops[index]
        //立即更新scroll-->currentIndex是根据它进行计算的,不然会有延迟
        this.scrollY = top
        //让右侧列表自动滚动到对应top的地方 -->scrollTo（x，y,time）
        this.rightScroll.scrollTo(0,-top,300)
      },

      //用于将点击时对应的li的food保存到data数据中，同props传递给Food组件使用
      showFood (food) {
        this.food = food
        //通过ref获取到标签对象(也是组件对象),调用他的方法
        this.$refs.food.toggleShow()
      }
    
    },
    watch:{
      goods(){ //goods数据有了
        this.$nextTick(() => {//列表数据显示了，再进行滑动效果
          this._initTops()
          this._initScroll()
        })

      }
    },
    components:{
      Food,
      ShopCart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

