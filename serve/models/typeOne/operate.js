let typeOneModel = require('./typeOne.js');
module.exports = {
    /**
     * 
     * @param {*} conditions 查询条件
     * @param {*} fields     过滤对象（只展示的字段）
     * @param {*} options 
     */
    find(data = {}, fields = null, options = {}) {
        return new Promise((resolve, reject) => {
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            // typeOneModel.find(data, fields, options).sort({sortNumber:1}).exec((error, doc) => {
            //     if (error) {
            //         reject(error)
            //     } else {
            //         resolve(doc)
            //     }
            // })
            typeOneModel.aggregate([
                {
                    $project:
                    {
                        "id": 1,
                        "sortNumber": 1,
                        "typeOne":1,
                        "created": 1,
                        sortValue: {
                            $cond: {
                            if: { $eq: ['$sortNumber', null] },
                                then: 0,
                                else: 1,
                            },
                        }
                    }
                },
                {
                    $sort:
                    {
                      "sortValue": -1,
                      "sortNumber": 1,
                      "created": -1
                    }
                }
            ],(error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    findOne(data) {
        return new Promise((resolve, reject) => {
            //model.findOne(需要查找的对象,callback)
            typeOneModel.findOne(data, (error, doc) => {
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
            typeOneModel.updateOne(conditions, update,{"upsert":'true',new:'true'}, (error, doc) => {
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
            typeOneModel.remove(conditions, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
};
