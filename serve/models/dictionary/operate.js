let dicModel = require('./dictionary.js');
module.exports = {
    save(data) {
        return new Promise((resolve, reject) => {
            dicModel.create(data, (err, docs) => {
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
     */
    find(data = {}, fields = null, options = {}) {
        return new Promise((resolve, reject) => {
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            dicModel.find(data, fields, options, (error, doc) => {
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
            dicModel.findOne(data, (error, doc) => {
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
            dicModel.update(conditions, update,{"upsert":'true',new:'true'}, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    // 修改二级分类
    findOneAndUpdateTypeTwo(conditions, update){
        return new Promise((resolve, reject) => {
            //model.update(查询条件,更新对象,callback)
            dicModel.findOneAndUpdate(conditions, {$addToSet:{typeTwo:update.typeTwo}}, {new:true}, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    // 删除二级分类
    delTypeTwo(conditions, update){
        return new Promise((resolve, reject) => {
            //model.update(查询条件,更新对象,callback)
            console.log(conditions,update,'8888')
            dicModel.updateOne(conditions, {$pull:update}, {new:true}, (error, doc) => {
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
            dicModel.remove(conditions, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
};
