import env from './env'

const DEV_URL = 'http://localhost:3005/api/'
const PRO_URL = 'https://www.ysjiancai.cn/api/'

export default env === 'development' ? DEV_URL : PRO_URL
