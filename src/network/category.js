import {request} from './request.js';


// 请求分类数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

// 请求分类的id及介绍
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

// 获取分类详情
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: 'subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
