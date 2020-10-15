<template>
 <div class="star " :class="`star-${size}`">
    <span class="star-item " v-for="(sc,index) in scoreClassArr" :key="index" :class="sc"></span>
    
 </div>
</template>

<script type="text/ecmascript-6">
  export default {
      name:'Star',
      props:{
          score:Number,
          size:Number //星星图的大小
      },
      computed:{
          //计算星星的全星/on 半星/half 灰星/off 的数量
          scoreClassArr (){
              //获取评分
            const {score} = this
            const arr = []
            //向下取整，代表全亮星星的数量
            const scoreIntMessage = Math.floor(score)
            for (let index = 0; index < scoreIntMessage; index++) {
                arr.push('on')
            }
            //向数组中添加 0/1 个 半星  -->JS小数计算不精准，*10
            if (score*10 - scoreIntMessage*10 >= 5){
                arr.push('half')
            }
            //剩余的都是灰星
            while (arr.length<5){
                arr.push('off')
            }

            //返回保存着对应类名的数组
            return arr
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
                margin-right: 0
            &.on
                bg-image('./images/stars/star48_on')
            &.half
                bg-image('./images/stars/star48_half')
            &.off
                bg-image('./images/stars/star48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right 0
            &.on
                bg-image('./images/stars/star36_on')
            &.half
                bg-image('./images/stars/star36_half')
            &.off
                bg-image('./images/stars/star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right 0
            &.on
                bg-image('./images/stars/star24_on')
            &.half
                bg-image('./images/stars/star24_half')
            &.off
                bg-image('./images/stars/star24_off')
                  
 
</style>
