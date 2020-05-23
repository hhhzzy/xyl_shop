import axios from '@/libs/api.request'
/**
 * @param {object} data 上传的图片
 */
export const imgUpload = (data) => {
  return axios.request({
    url: '/files/upload',
    data,
    method: 'post'
  })
}
