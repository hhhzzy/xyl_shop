<template>
    <div class="box">
        <Tabs value="type_one" @on-click="GetType">
            <TabPane label="一类目录" name="type_one">

            </TabPane>
            <TabPane label="二类目录" name="type_two">

            </TabPane>
            <TabPane label="三类目录" name="type_three">

            </TabPane>
        </Tabs>
        <div>
            <div style="margin-bottom:15px;">
                <Button type="primary" @click="gotoAdd()">新增</Button>
            </div>
            <Table border v-if="typeName == 'type_one'"  :columns="tableOneColumn" :data="tableData"></Table>
            <Table border v-else-if="typeName == 'type_two'"  :columns="tableTwoColumn" :data="tableTwoData"></Table>
            <Modal
                v-model="visiable"
                :title="titleType"
                :loading="loading"
                @on-ok="showModel('formValidate')"
                @on-cancel="cancelModel">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="一类目录" prop="typeOne" v-if="typeName == 'type_one'">
                            <Input v-model="formValidate.typeOne" ></Input>
                        </FormItem>
                         <FormItem label="一类目录" prop="typeOne" v-if="typeName == 'type_two'">
                            <Select v-model="newTypeOne" @on-change="ChangeTypeOne" :label-in-value="true" >
                                <Option v-for="(item,index) in typeOneArr" :value="item._id" :key="index">{{ item.typeOne }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="二类目录" prop="typeTwo" v-if="typeName == 'type_two'">
                            <Input v-model="formValidate.typeTwo" ></Input>
                        </FormItem>
                         <FormItem label="一类目录" prop="typeOne" v-if="typeName == 'type_three'">
                            <Select v-model="newTypeOne" @on-change="ChangeTypeOne" :label-in-value="true" >
                                <Option v-for="(item,index) in typeOneArr" :value="item._id" :key="index">{{ item.typeOne }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="二类目录" prop="typeTwo" v-if="typeName == 'type_three'">
                             <Select v-model="newTypeOne" @on-change="ChangeTypeOne" :label-in-value="true" >
                                <Option v-for="(item,index) in typeTwoArr" :value="item._id" :key="index">{{ item.typeOne }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="三类目录" prop="content" v-if="typeName == 'type_three'">
                            <Input v-model="formValidate.typeThree" ></Input>
                        </FormItem>
                    </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
import { upsertTypeOne, getTypeOne, upsertTypeTwo, delTypeOne, delTypeTwo, getTypeTwo } from '@/api/dictionary'
// import { constants, truncate } from 'fs'
import { formatDateTime } from '@/global/global'
// import { fail } from 'assert'
export default {
    data () {
        return {
            formValidate: {
                typeOne: '',
                typeTwo: '',
                content: '',
                title: ''
            },
            ruleValidate: {
                typeOne: [
                    { required: true, message: '一级类别必填！', trigger: 'blur' }
                ],
                typeTwo: [
                    { required: true, message: '二级类别必填！', trigger: 'blur' }
                ]
                // content: [
                //     { required: true, message: '内容必填！', trigger: 'blur' }
                // ]
            },
            visiable: false,
            loading: true,
            titleType: '新增',
            tableData: [],
            tableTwoData: [],
            tableOneColumn: [
                {
                    title: '序号',
                    width: 100,
                    render: (h, params) => {
                        return h('div', params.index + 1)
                    }
                },
                {
                    title: '一类目录',
                    key: 'typeOne'
                },
                {
                    title: '创建时间',
                    key: 'created',
                    render: (h, params) => {
                        return h('div', params.row.created ? formatDateTime(params.row.created) : '')
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.visiable = true
                                        this.titleType = '编辑'
                                        this.formValidate = Object.assign({}, params.row)
                                        this.formValidate.content = String(this.formValidate.content)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '提示',
                                            content: '<p>是否删除该条数据？删除后不可恢复！</p>',
                                            okText: '确定',
                                            onOk: () => {
                                                delTypeOne(params.row._id).then(res => {
                                                    if (!res.data.code) {
                                                        this.$Message.success('删除成功!')
                                                        this.getTypeOneData()
                                                    }
                                                })
                                            },
                                            cancelText: '取消'
                                        })
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            tableTwoColumn: [
                {
                    title: '序号',
                    width: 100,
                    render: (h, params) => {
                        return h('div', params.index + 1)
                    }
                },
                {
                    title: '一类目录',
                    key: 'typeOne'
                },
                {
                    title: '二类目录',
                    key: 'typeTwo'
                },
                {
                    title: '创建时间',
                    key: 'created',
                    render: (h, params) => {
                        return h('div', params.row.created ? formatDateTime(params.row.created) : '')
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.visiable = true
                                        this.titleType = '编辑'
                                        this.formValidate = Object.assign({}, params.row)
                                        console.log(params)
                                        this.newTypeOne = params.row.typeOneId
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '提示11',
                                            content: '<p>是否删除该条数据？删除后不可恢复！</p>',
                                            okText: '确定',
                                            onOk: () => {
                                                delTypeTwo(params.row._id).then(res => {
                                                    if (!res.data.code) {
                                                        this.$Message.success('删除成功!')
                                                        this.GetTypeTwo()
                                                    }
                                                })
                                            },
                                            cancelText: '取消'
                                        })
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            typeName: 'type_one',
            typeOneArr: [],
            newTypeOne: '',
            typeTwoArr: []
        }
    },
    methods: {
        GetType (value) {
            this.typeName = value
            this.getTypeOneData()
            if (value === 'type_two') {
                this.GetTypeTwo()
            }
            this.newTypeOne = ''
        },
        ChangeTypeOne (value) {
            if (!value) return
            this.formValidate._id = value.value
            this.formValidate.typeOne = value.label
        },
        gotoAdd () {
            this.visiable = true
            this.titleType = '新增'
            this.formValidate = {}
        },
        showModel (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let formData = {}
                    if (this.typeName === 'type_one') {
                        formData = {
                            typeOne: this.formValidate.typeOne,
                            _id: this.formValidate._id
                        }
                        // 新增修改一类目录
                        upsertTypeOne(formData).then(res => {
                            if (!res.data.code) {
                                if (formData._id) {
                                    this.$Message.success('修改成功！')
                                } else {
                                    this.$Message.success('新增成功！')
                                }
                            }
                            this.getTypeOneData()
                            this.visiable = false
                        })
                    } else if (this.typeName === 'type_two') {
                        console.log(this.formValidate)
                        formData = {
                            typeOne: this.formValidate.typeOne,
                            typeOneId: this.formValidate.typeOneId,
                            typeTwo: this.formValidate.typeTwo,
                            _id: this.formValidate._id ? this.formValidate._id : null
                        }
                        console.log(formData)
                        // 新增修改二类目录
                        upsertTypeTwo(formData).then(res => {
                            if (!res.data.code) {
                                if (formData._id) {
                                    this.$Message.success('修改成功！')
                                } else {
                                    this.$Message.success('新增成功！')
                                }
                            }
                            this.newTypeOne = ''
                            this.GetTypeTwo()
                            this.visiable = false
                        })
                    }
                } else {
                    setTimeout(() => {
                        this.loading = false
                        this.$nextTick(() => {
                            this.loading = true
                        })
                    }, 1000)
                }
            })
        },
        cancelModel () {
            this.visiable = false
        },
        getTypeOneData () {
            this.typeOneArr = []
            this.tableData = []
            // 获取一类目录
            getTypeOne().then(res => {
                this.tableData = res.data.data
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        this.typeOneArr.push({
                            _id: item._id,
                            typeOne: item.typeOne
                        })
                    })
                }
            })
        },
        GetTypeTwo () {
            this.tableTwoData = []
            getTypeTwo().then(res => {
                console.log(res)
                this.tableTwoData = res.data.data ? res.data.data : []
            })
        }
    },
    created () {
        this.getTypeOneData()
    }
}
</script>
<style scoped>
    .box{
        padding: 10px;
        background-color: #fff;
    }
</style>
