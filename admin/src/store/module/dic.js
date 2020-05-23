import { getDictionary } from '@/api/dictionary'
export default {
  state: {
    dictionary: JSON.parse(sessionStorage.getItem('blog_dic')) ? JSON.parse(sessionStorage.getItem('blog_dic')) : {}
  },
  mutations: {
    setDic (state, dic) {
      state.dictionary = dic
      sessionStorage.setItem('blog_dic', JSON.stringify(dic))
    }
  },
  actions: {
    // 获取字典
    getDic ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getDictionary()
          .then(res => {
            const data = res.data.data
            commit('setDic', data)
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}
