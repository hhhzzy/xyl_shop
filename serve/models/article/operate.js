let articleModel = require('./article.js');
module.exports = {
    save(data) {
        return new Promise((resolve, reject) => {
            articleModel.create(data, (err, docs) => {
                if (err) {
                    rejct(err);
                } else {
                    resolve(docs);
                }
            })
        })
    },
    /**
     * 
     * @param {*} conditions 查询条件
     * @param {*} fields     过滤对象（只展示的字段）
     * @param {*} options 
     * @param {*} page  当前页数
     * @param {*} num   每页显示的数量
     */
    find(conditions = {}, fields = null, options = {}, page = 0, num = 10) {
        return new Promise((resolve, reject) => {
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            articleModel.find(conditions, fields, options).skip((page-1)*num).limit(num).sort({created:-1}).exec( (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            });
        })
    },
    findOne(data) {
        return new Promise((resolve, reject) => {
            //model.findOne(需要查找的对象,callback)
            articleModel.findOne(data, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 
     * @param {object} conditions 修改还是新增的条件
     * @param {object} update 修改还是新增的内容
     * @param {boolean} type 判断是新增还是修改
     */
    upsert(conditions, update, type) {
        return new Promise((resolve, reject) => {
            //model.update(查询条件,更新对象,callback)
            articleModel.update(conditions, update, {"upsert":'true'}, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    update(conditions, update) {
        return new Promise((resolve, reject) => {
            //model.update(查询条件,更新对象,callback)
            articleModel.update(conditions, update, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 
     * @param {string} conditions 删除数据id
     */
    remove(conditions) {
        return new Promise((resolve, reject) => {
            articleModel.remove(conditions, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 计算数据中的条数
     */
    count(conditions = {}) {
        return new Promise((resolve, reject) => {
            articleModel.countDocuments(conditions,(error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    }
}