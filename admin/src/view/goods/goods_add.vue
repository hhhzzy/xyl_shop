<template>
    <div>
        <Card>
            <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
                <FormItem label="商品名称：" prop="title">
                    <Input v-model="formData.title" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="一类目录：" prop="typeOne">
                    <Select v-model="formData.typeOne" placeholder="请选择一类目录" @on-change="ChangeTypeOne">
                        <Option v-for="(item,index) in typeOne" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="二类目录：">
                    <Select v-model="formData.typeTwo" placeholder="请选择二类目录">
                        <Option v-for="(item,index) in typeTwo" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商品简介：" prop="summary">
                    <Input type="textarea" v-model="formData.summary" placeholder="请输入商品简介"></Input>
                </FormItem>
                <FormItem label="图片：">
                    <div class="demo-upload-list" v-for="(item,index) in defaultImg" :key="index">
                        <template>
                            <img :src="item.url">
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
                <!-- <FormItem label="排序：">
                    <Input v-model="formData.sortIndex" placeholder="请输入排序号"></Input>
                </FormItem> -->
                <!-- <FormItem label="内容：">
                    <markdown-editor v-model="formData.content"/>
                </FormItem> -->
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formData')">提交</Button>
                    <Button  @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import { getDictionary } from '@/api/dictionary'
import { upsertGoods, findOne } from '@/api/goods'
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
            },
            id: '', // 文章详情id
            ruleValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                typeOne: [
                    { required: true, message: '请选择一类目录', trigger: 'change' }
                ],
                summary: [
                    { required: true, message: '请输入简介', trigger: 'blur' }
                ]
            },
            typeOne: [],
            typeTwo: [],
            baseUrl: '',
            defaultImg: []
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
                    if (!this.formData.imgUrl) {
                        this.$Message.error({
                            background: true,
                            content: '请上传商品图片'
                        })
                        return
                    }
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
            this.defaultImg = []
            if (res.data) {
                this.formData.imgUrl = res.data
                this.defaultImg.push({
                    name: res.data.data,
                    url: this.baseUrl + res.data
                })
            }
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },
        // 获取一类目录
        GetTypeOne () {
            getDictionary().then(res => {
                this.typeOne = []
                this.typeTwo = []
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        this.typeOne.push(item.typeOne)
                        if (item.typeOne === this.formData.typeOne) {
                            this.typeTwo = item.typeTwo
                        }
                    })
                }
            })
        },
        // 一类目录变化
        ChangeTypeOne (value) {
            getDictionary().then(res => {
                this.typeTwo = []
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        if (item.typeOne === value) {
                            this.typeTwo = item.typeTwo
                        }
                    })
                }
            })
        }
    },
    created () {
        if (this.$route.query.id) {
            this.id = this.$route.query.id
            findOne({id: this.id}).then(res => {
                this.formData = res.data.data || {}
                this.defaultImg.push({
                    name: res.data.data.imgUrl,
                    url: this.baseUrl + res.data.data.imgUrl
                })
            })
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
