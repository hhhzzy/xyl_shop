export const formatDateTime = (data, type = 'yyyy-MM-dd HH:mm:ss') => {
  if (type === 'yyyy-MM-dd HH:mm:ss') {
    let dat = new Date(data)
    return dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDay() + ' ' + dat.getHours() + ':' + dat.getMinutes() + ':' + dat.getSeconds()
  }
}
