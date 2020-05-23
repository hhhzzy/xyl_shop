import axios from '@/libs/api.request'
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/users/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/users/getUser',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
/**
 *  查询所有用户
 */
export const findAllUser = () => {
  return axios.request({
    url: '/users/findAllUser',
    method: 'get'
  })
}
