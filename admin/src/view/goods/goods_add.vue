<template>
    <div>
        <Card>
            <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
                <FormItem label="商品名称：" prop="title">
                    <Input v-model="formData.title" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="一类目录：" prop="typeOneId">
                    <Select v-model="formData.typeOneId" placeholder="请选择一类目录" filterable label-in-value  @on-change="ChangeTypeOne">
                        <Option v-for="(item,index) in typeOne" :value="item._id" :key="index">{{ item.typeOne }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="二类目录：" >
                    <Select v-model="formData.typeTwoId" placeholder="请选择二类目录" filterable label-in-value @on-change="ChangeTypeTwo">
                        <Option v-for="(item,index) in typeTwo" :value="item._id" :key="index">{{ item.typeTwo }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="三类目录：">
                    <Select v-model="formData.typeThreeId" placeholder="请选择三类目录" filterable label-in-value @on-change="ChangeTypeThree" ref="typeThree">
                        <Option v-for="(item,index) in typeThree" :value="item._id" :key="index">{{ item.typeThree }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商品简介：">
                    <Input type="textarea" v-model="formData.summary" placeholder="请输入商品简介"></Input>
                </FormItem>
                <FormItem label="图片：">
                    <div class="demo-upload-list" v-for="(item,index) in defaultImg" :key="index">
                        <template>
                            <img :src="item.path">
                            <div class="demo-upload-list-cover">
                                <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon> -->
                                <Icon type="ios-trash-outline" @click.native="removeImg(item)"></Icon>
                            </div>
                        </template>
                    </div>
                    <Upload :action="baseUrl+'api/files/upload'"
                            :show-upload-list="false"
                            :default-file-list="defaultImg"
                            :on-success="uploadSuccess"
                            type="drag"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"
                            style="display: inline-block;width:58px;"
                    >
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="库存：">
                    <Input v-model="formData.stock" placeholder="请输入库存"></Input>
                </FormItem>
                <FormItem label="价格：">
                    <Input v-model="formData.price" placeholder="请输入价格"></Input>
                </FormItem>
                <FormItem label="排序：">
                    <Input v-model="formData.sortNumber" placeholder="请输入排序号"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formData')">提交</Button>
                    <Button  @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import { getTypeOne, getTypeTwo, getTypeThree } from '@/api/dictionary'
import { upsertGoods, findOne, deleteImg } from '@/api/goods'
import MarkdownEditor from '_c/markdown'
import configInfo from '@/config/index.js'
// import { constants } from 'fs'
export default {
    name: 'archiveAdd',
    components: {
        MarkdownEditor
    },
    data () {
        return {
            formData: {
                imgUrl: []
            },
            id: '', // 文章详情id
            ruleValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                typeOneId: [
                    { required: true, message: '请选择一类目录', trigger: 'change' }
                ],
                typeTwoId: [
                    { required: true, message: '请选择一类目录', trigger: 'change' }
                ],
                typeThreeId: [
                    { required: true, message: '请选择一类目录', trigger: 'change' }
                ],
                summary: [
                    { required: true, message: '请输入简介', trigger: 'blur' }
                ]
            },
            typeOne: [],
            typeTwo: [],
            baseUrl: '',
            defaultImg: [],
            typeThree: []
        }
    },
    methods: {
        handleFormatError (file) {
            this.$Notice.warning({
                title: '只能上传图片',
                desc: '文件' + file.name + ' 格式不正确, 请选择jpg,jpeg,png'
            })
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // if (!this.formData.imgUrl) {
                    //     this.$Message.error({
                    //         background: true,
                    //         content: '请上传商品图片'
                    //     })
                    //     return
                    // }
                    this.formData.sortNumber = this.formData.sortNumber ? this.formData.sortNumber : null
                    upsertGoods(this.formData)
                        .then((res) => {
                            if (!res.data.code) {
                                if (this.formData._id) {
                                    this.$Message.success('修改成功！')
                                } else {
                                    this.$Message.success('新增成功！')
                                }
                                this.$router.push({
                                    name: 'goods'
                                })
                            }
                        })
                }
            })
        },
        // 上传图片
        uploadSuccess (res, file) {
            if (res.data) {
                this.formData.imgUrl.push(res.data)
                this.defaultImg.push({
                    name: res.data.name,
                    path: this.baseUrl + res.data.path
                })
            }
        },
        // 删除图片
        async removeImg (data) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否删除该照片，删除后不可恢复！',
                onOk: async () => {
                    // 删除图片
                    await new Promise((resolve, reject) => {
                        deleteImg(data.name).then(res => {
                            if (res) {
                                // this.defaultImg = this.defaultImg.filter((item, index) => {
                                //     return item.name !== data.name
                                // })
                                resolve()
                            }
                        })
                    })
                    let boolSub = false
                    // 更新字段  判断图片是否已经写入数据库
                    this.formData.imgUrl.forEach((item, index) => {
                        if (item.name === data.name) {
                            this.formData.imgUrl.splice(index, 1)
                            boolSub = true
                        }
                    })
                    if (!boolSub) return
                    upsertGoods(this.formData)
                        .then((res) => {
                            if (!res.data.code) {
                                this.$Message.success('删除成功！')
                                this.GetInfo()
                            }
                        })
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },
        // 获取一类目录
        GetTypeOne () {
            getTypeOne().then(res => {
                this.typeOne = []
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        this.typeOne.push({
                            _id: item._id,
                            typeOne: item.typeOne
                        })
                    })
                }
            })
        },
        // 一类目录变化
        ChangeTypeOne (value) {
            if (!value) return
            this.formData.typeTwoId = ''
            this.formData.typeOne = value.label
            this.formData.typeOneId = value.value
            getTypeTwo({typeOneId: value.value}).then(res => {
                this.typeTwo = []
                this.typeThree = []
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        this.typeTwo.push({
                            _id: item._id,
                            typeTwo: item.typeTwo
                        })
                    })
                }
            })
        },
        // 二类目录变化
        ChangeTypeTwo (value) {
            console.log(value)
            this.formData.typeThreeId = ''
            this.formData.typeThree = ''
            this.$nextTick(() => {
                this.$refs.typeThree.setQuery(null)
            })
            console.log(this.$refs.typeThree)
            if (!value) return
            this.formData.typeTwo = value.label
            this.formData.typeTwoId = value.value
            this.typeThree = []
            getTypeThree({typeTwoId: value.value}).then(res => {
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        this.typeThree.push({
                            _id: item._id,
                            typeThree: item.typeThree
                        })
                    })
                }
            })
        },
        // 三类目录变化
        ChangeTypeThree (value) {
            if (!value) return
            this.formData.typeThree = value.label
            this.formData.typeThreeId = value.value
        },
        // 查询详情
        GetInfo () {
            findOne({id: this.id}).then(async res => {
                this.formData = res.data.data || {
                    imgUrl: []
                }
                console.log(this.formData)
                this.defaultImg = []
                if (this.formData.imgUrl) {
                    this.formData.imgUrl.forEach(item => {
                        this.defaultImg.push({
                            path: this.baseUrl + item.path,
                            name: item.name
                        })
                    })
                }
                // 通过一级目录查询二级目录
                await new Promise((resolve, reject) => {
                    getTypeTwo({typeOneId: this.formData.typeOneId}).then(res => {
                        this.typeTwo = []
                        if (res.data.data) {
                            res.data.data.forEach(item => {
                                this.typeTwo.push({
                                    _id: item._id,
                                    typeTwo: item.typeTwo
                                })
                            })
                        }
                        resolve()
                    })
                })
                await new Promise((resolve, reject) => {
                    getTypeThree({typeTwoId: this.formData.typeTwoId}).then(res => {
                        this.typeThree = []
                        if (res.data.data) {
                            res.data.data.forEach(item => {
                                this.typeThree.push({
                                    _id: item._id,
                                    typeThree: item.typeThree
                                })
                            })
                        }
                    })
                })
            })
        }
    },
    created () {
        if (this.$route.query.id) {
            this.id = this.$route.query.id
            this.GetInfo()
        }
        this.baseUrl = process.env.NODE_ENV === 'development' ? configInfo.baseUrl.imgDev : configInfo.baseUrl.imgPro
        // 获取一类目录
        this.GetTypeOne()
    }
}
</script>
<style>
    .editor-preview-active blockquote, .editor-preview-active dl, .editor-preview-active ol, .editor-preview-active p, .editor-preview-active pre, .editor-preview-active table, .editor-preview-active ul{
        margin-top: 0;
        margin-bottom: .72em;
    }
    .editor-preview-active ol, .editor-preview-active ul{
        padding-left: 2em;
    }
    .editor-preview-active blockquote {
        margin: 1em 0;
        border-left: 4px solid #ddd;
        padding: 0 1em;
        color: #666;
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

</style>
