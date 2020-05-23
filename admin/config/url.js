import env from './env'

const DEV_URL = 'http://localhost:3005/api/'
const PRO_URL = 'http://www.hoom.xin:3005/api/'

export default env === 'development' ? DEV_URL : PRO_URL
