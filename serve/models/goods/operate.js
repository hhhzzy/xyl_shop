let goodsModel = require('./goods.js');
module.exports = {
    /**
     * 新增商品
     * 
     * @param {object} conditions 修改还是新增的条件
     * @param {object} update 修改还是新增的内容
     * @param {boolean} type 判断是新增还是修改
     */
    upsert(conditions, update, type) {
        return new Promise((resolve, reject) => {
            //model.update(查询条件,更新对象,callback)
            goodsModel.update(conditions, update,{"upsert":'true',new:'true'}, (error, doc) => {
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
     * @param {*} conditions 查询条件
     * @param {*} fields     过滤对象（只展示的字段）
     * @param {*} options 
     * @param {*} page  当前页数
     * @param {*} num   每页显示的数量
     */
    find(conditions = {}, fields = null, options = {}, page = 0, num = 10) {
        return new Promise((resolve, reject) => {
            console.log(conditions)
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            // goodsModel.find(conditions, fields, options).skip((page-1)*num).limit(num).sort({created:-1}).exec( (error, doc) => {
            //     if (error) {
            //         reject(error)
            //     } else {
            //         resolve(doc)
            //     }
            // });
            goodsModel.aggregate([
                {
                    $project:
                    {
                        "id": 1,
                        "sortNumber": 1,
                        "typeOne":1,
                        "typeOneId":1,
                        "typeTwo":1,
                        "typeTwoId":1,
                        "typeThree":1,
                        "typeThreeId":1,
                        "created": 1,
                        "stock":1,
                        "price":1,
                        "imgUrl":1,
                        "title":1,
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
                },
                {$match:conditions},
                {$skip: (page-1)*num},
                {$limit: num}
            ],(error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    /**
     * 查找详情
     */
    findOne(data) {
        return new Promise((resolve, reject) => {
            //model.findOne(需要查找的对象,callback)
            goodsModel.findOne(data, (error, doc) => {
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
            goodsModel.countDocuments(conditions,(error, doc) => {
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
            goodsModel.remove(conditions, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
}