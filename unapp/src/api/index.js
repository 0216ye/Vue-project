/**
 * 管理所有接口的文件
 */
import myAxios from './ajax'
//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => myAxios(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => myAxios('/index_category')

// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude }) => myAxios('/shops',{params:{latitude,longitude}})