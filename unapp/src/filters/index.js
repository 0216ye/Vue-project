/**
 * 自定义过滤器模块
 * 
 */
import Vue from 'vue'
import moment from 'moment'

Vue.filter('date-format',function(value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
})