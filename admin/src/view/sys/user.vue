<template>
    <div class="box">
        <div style="margin-bottom:15px;">
            <Button type="primary" @click="gotoAdd()">新增</Button>
        </div>
        <Table border  :columns="tableColumn" :data="tableData"></Table>
        <Modal
            v-model="visiable"
            :title="title"
            :loading="loading"
            @on-ok="showModel('formValidate')"
            @on-cancel="cancelModel">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="姓名" prop="userName">
                        <Input v-model="formValidate.userName" ></Input>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                        <Input v-model="formValidate.sex" ></Input>
                    </FormItem>
                </Form>
        </Modal>

    </div>
</template>
<script>
import { findAllUser } from '@/api/user'
// import { constants, truncate } from 'fs'
import { formatDateTime } from '@/global/global'
// import { fail } from 'assert'
export default {
    data () {
        return {
            formValidate: {
                userName: '',
                sex: ''
            },
            ruleValidate: {
                userName: [
                    { required: true, message: '用户名必填！', trigger: 'blur' }
                ]
            },
            visiable: false,
            loading: true,
            title: '新增',
            tableData: [],
            tableColumn: [
                {
                    title: '序号',
                    width: 100,
                    render: (h, params) => {
                        return h('div', params.index + 1)
                    }
                },
                {
                    title: '姓名',
                    key: 'userName'
                },
                {
                    title: '性别',
                    key: 'summary'
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
                                        this.$router.push({
                                            path: 'archive_add',
                                            query: {
                                                id: params.row._id
                                            }
                                        })
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
                                                delArticle(params.row._id).then(res => {
                                                    if (!res.data.code) {
                                                        this.$Message.success('删除成功!')
                                                        this.GetData()
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
            ]
        }
    },
    methods: {
        gotoAdd () {
            this.visiable = true
        },
        showModel (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$nextTick(() => {
                        this.loading = false
                    })
                    this.$Message.success('Success!')
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
        }
    },
    created () {
        // 获取数据
        findAllUser().then(res => {
            this.tableData = res.data.data
        })
    }
}
</script>
<style scoped>
    .box{
        padding: 10px;
        background-color: #fff;
    }
</style>
