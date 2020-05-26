<template>
    <div class="list-box">
        <div style="margin-bottom:15px;">
            <Row>
                <Col span="24">
                <Form :label-width="80" inline>
                    <FormItem label="一级类别：" >
                        <Select v-model="searchData.typeOne" clearable placeholder="请选择一类目录" style="width:200px;">
                            <Option v-for="(item,index) in typeOne" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="名称：">
                        <Input v-model="searchData.title" placeholder="请输入名称" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style="margin-right:10px;" @click="Search()">搜索</Button>
                        <Button type="primary" @click="gotoAdd()">新增</Button>
                    </FormItem>
                </Form>

                </Col>
            </Row>
        </div>
        <Table border  :columns="tableColumn" :data="tableData"></Table>
        <div style="margin-top:5px;">
            <Page :total="total" :page-size="10" :page-size-opts="pageOtp" @on-change="changePage($event)" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
    </div>
</template>
<script>
import { getTypeOne } from '@/api/dictionary'
import { findGoods, delGoods } from '@/api/goods'
import { formatDateTime } from '@/global/global'
import configInfo from '@/config/index.js'
export default {
    data () {
        return {
            searchData: {
                page: 1,
                num: 10
            },
            baseUrl: '',
            tableColumn: [
                {
                    title: '序号',
                    width: 100,
                    render: (h, params) => {
                        return h('div', params.index + 1)
                    }
                },
                {
                    title: '商品名称',
                    key: 'title'
                },
                {
                    title: '一级类目',
                    key: 'typeOne'
                },
                {
                    title: '二级类目',
                    key: 'typeTwo'
                },
                {
                    title: '简介',
                    key: 'summary'
                },
                {
                    title: '图片',
                    key: 'imgUrl',
                    render: (h, params) => {
                        return h('img', {
                            attrs: {
                                src: this.baseUrl + params.row.imgUrl
                            },
                            style: {
                                width: '50px',
                                hegith: '50px'
                            },
                            on: {
                                click: () => {

                                }
                            }
                        })
                    }
                },
                {
                    title: '创建时间',
                    key: 'created',
                    render: (h, params) => {
                        return h('div', formatDateTime(params.row.created))
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
                                            path: 'goods_add',
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
                                                delGoods(params.row._id).then(res => {
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
            ],
            tableData: [],
            total: null,
            pageOtp: [10, 20, 30, 40],
            typeOne: []
        }
    },
    created () {
        this.baseUrl = process.env.NODE_ENV === 'development' ? configInfo.baseUrl.imgDev : configInfo.baseUrl.imgPro
        // 查询
        this.GetData()
        // 获取一级类目
        this.GetTypeOne()
    },
    methods: {
        // 查询
        GetData () {
            findGoods(this.searchData).then(res => {
                if (!res.data.code) {
                    this.tableData = res.data.data.data
                    this.total = res.data.data.total
                }
            })
        }, // 获取一类目录
        GetTypeOne () {
            getTypeOne().then(res => {
                this.typeOne = []
                if (res.data.data) {
                    res.data.data.forEach(item => {
                        this.typeOne.push(item.typeOne)
                    })
                }
            })
        },
        changePage (page) {
            this.searchData.page = page
            // 查询
            this.GetData()
        },
        changePageSize (value) {
            this.searchData.num = value
            // 查询
            this.GetData()
        },
        // 新增
        gotoAdd () {
            this.$router.push({
                name: 'goods_add'
            })
        },
        Search () {
            this.GetData()
        }
    }
}
</script>
<style scoped>
    .list-box{
        background-color: #fff;
        padding: 10px 15px;
    }
</style>
