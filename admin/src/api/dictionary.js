import axios from '@/libs/api.request'

// 新增一类目录
export const upsertTypeOne = (data) => {
    return axios.request({
        url: '/dic/upsertTypeOne',
        data,
        method: 'post'
    })
}
// 获取一类目录
export const getTypeOne = (data) => {
    return axios.request({
        url: '/dic/getTypeOne',
        method: 'get'
    })
}
// 删除一类目录
export const delTypeOne = (id) => {
    return axios.request({
        url: '/dic/delTypeOne',
        params: {
            id
        },
        method: 'get'
    })
}
// 新增二类目录
export const upsertTypeTwo = (data) => {
    return axios.request({
        url: '/dic/upsertTypeTwo',
        data,
        method: 'post'
    })
}
// 获取二类目录
export const getTypeTwo = (data) => {
    return axios.request({
        url: '/dic/getTypeTwo',
        data,
        method: 'post'
    })
}
// 删除二类目录
export const delTypeTwo = (id) => {
    return axios.request({
        url: '/dic/delTypeTwo',
        params: {
            id
        },
        method: 'get'
    })
}
// 新增三类目录
export const upsertTypeThree = (data) => {
    return axios.request({
        url: '/dic/upsertTypeThree',
        data,
        method: 'post'
    })
}
// 获取三类目录
export const getTypeThree = (data) => {
    return axios.request({
        url: '/dic/getTypeThree',
        data,
        method: 'post'
    })
}
// 删除三类目录
export const delTypeThree = (id) => {
    return axios.request({
        url: '/dic/delTypeThree',
        params: {
            id
        },
        method: 'get'
    })
}
// 获取
export const getDictionary = () => {
    return axios.request({
        url: '/dic/getDic',
        method: 'get'
    })
}
// 新增
export const upsertDictionary = (data) => {
    return axios.request({
        url: '/dic/upsertDic',
        data,
        method: 'post'
    })
}
// 删除
export const delDic = (id) => {
    return axios.request({
        url: '/dic/delDic',
        params: {
            id
        },
        method: 'get'
    })
}
