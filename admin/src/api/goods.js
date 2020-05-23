import axios from '@/libs/api.request'

// 新增商品
export const upsertGoods = (data) => {
    return axios.request({
        url: '/goods/upsertGoods',
        data,
        method: 'post'
    })
}

// 查询商品列表
export const findGoods = (data) => {
    return axios.request({
        url: '/goods/findGoods',
        data,
        method: 'post'
    })
}

// 删除商品
export const delGoods = (id) => {
    return axios.request({
        url: '/goods/delGoods',
        params: {
            id
        },
        method: 'get'
    })
}

// 查找单个
export const findOne = (data) => {
    return axios.request({
        url: '/goods/findOne',
        data,
        method: 'post'
    })
}
