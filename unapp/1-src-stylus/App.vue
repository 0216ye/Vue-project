<template>
  <div>
    <h1>测试stylus的组件</h1>
    <button class="btn">点我</button>
    <div class="div">你好</div>
    <ul>
      <li @click="ji(index)"  :class="{active: newIndex === index}" v-for="(item,index) in 20" :key="index" >{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data(){
    return {
      newIndex:0
    }
  },
  methods:{
    ji(index){
      this.newIndex = index
    }
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
@import './common/stylus/mixins.styl'
$color = red;
btn(w,h,c,bg)
  width w
  height h
  background-color bg
  border none
  color c
add(a,b)
  return a+b
h1
  color $color
.btn
  btn(100px,100px,red,$color)
.div
  padding add(2px,2)
ul
  li
    line-height 50px
    bottom-border-1px($color)
    &.active
      color $color
</style>  
