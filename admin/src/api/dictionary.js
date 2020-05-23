import axios from '@/libs/api.request'

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
// 删除二级分类
export const delTypeTwo = (data) => {
    console.log(data)
    return axios.request({
        url: '/dic/delTypeTwo',
        data,
        method: 'post'
    })
}
