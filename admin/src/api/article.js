import axios from '@/libs/api.request'
/**
 * @param {object} data 新增的表单
 */
export const saveArticle = (data) => {
    return axios.request({
        url: '/article/upsertArticle',
        data,
        method: 'post'
    })
}
export const findArticle = (data) => {
    return axios.request({
        url: '/article/findArticle',
        data,
        method: 'post'
    })
}
export const findOne = (data) => {
    return axios.request({
        url: '/article/findOne',
        data,
        method: 'post'
    })
}
export const delArticle = (id) => {
    return axios.request({
        url: '/article/delArticle',
        params: {
            id
        },
        method: 'get'
    })
}
