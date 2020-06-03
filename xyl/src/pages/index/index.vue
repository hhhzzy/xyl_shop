<template>
  <div class="index-box">
      <div class="info-box">
          <p class="name"><img src="../../../static/images/logo.png" alt=""></p>
          <p class="info">
                <span>简介：销售、批发。五金类、工具类、灯具类、劳保类、消防类、日杂类、化工类、水暖类、电器类、电子类、办公类、开关类、锁具类、焊材类、元丝、圆钉、扎丝类</span>
          </p>
      </div>
      <div class="nav-box">
          <span v-for="(item,index) in breadArr" :key="index"><i @click="SwitchNav(item,index)">{{item.label}}</i> <i v-if="index != (breadArr.length-1)">></i> </span>
          <!-- <span>全部</span>>
          <span>水电</span>>
          <span class="current">水电4</span> -->
      </div>
      <div class="shop-box">
            <div class="left">
                <van-sidebar @change="ChangeType" :activeKey="activeKey">
                    <van-sidebar-item title="全部"/>
                    <van-sidebar-item :title="item.label" v-for="(item,index) in Dic"  :key="index"/>
                </van-sidebar>
            </div>
            <div class="right" v-if="GoodsArr">
                    <scroll-view @scrolltolower="scrollBottom" scroll-y="true">
                        <van-card
                            :num="item.stock?item.stock:''"
                            :desc="item.summary"
                            :title="item.title"
                            :price="item.price"
                            :thumb="imgBaseUrl+item.imgUrl[0].path"
                            v-for="(item,index) in GoodsArr"
                            :key="index"
                            @click="ShowBigImg(item)"
                        >
                        </van-card>
                    </scroll-view>
            </div>
      </div>
      <div class="img-show" v-if="boolBimImg" @click="CloseShater">
            <swiper :indicator-dots="swiper.indicatorDots"
                :autoplay="swiper.autoplay" :interval="swiper.interval" :duration="swiper.duration">
                <block v-for="(item,index) in bigImg" :key="index">
                <swiper-item>
                    <view :class="['swiper-item',item]">
                        <a>
                            <img :src="imgBaseUrl+item.path" alt="">
                        </a>
                    </view>
                </swiper-item>
                </block>
            </swiper>
      </div>
      <van-toast id="van-toast" />
  </div>
</template>

<script>
import axios from '../../utils/request.js'
import {imgBaseUrl} from '../../utils/common.js'
import { resolve } from 'url';
import Toast from '../../../static/vant/toast/toast';
export default {
    data () {
        return {
            swiper:{
                indicatorDots: true,
                vertical: false,
                autoplay: false,
                interval: 2000,
                duration: 500
            },
            Dic:[],
            GoodsArr:[],
            imgBaseUrl:imgBaseUrl,
            typeOne:'',
            page:{
                num:5,
                size:1
            },
            total:null,
            bigImg:[],
            boolBimImg:false,
            timer1:null,
            typeTwoArr:[],
            breadArr:[
                {
                    label:'全部',
                    _id:'',
                }
            ],
            searchData:{

            },
            activeKey:null
        }
    },

    components: {
    },

    methods: {
        GetTypeOne(){
            this.Dic = [];
            return new Promise( (resolve,reject) => {
                axios({
                    url: 'dic/getTypeOne',
                    method: 'get'
                }).then( data => {
                    console.log(data.data.data)
                    if(data.data.data){
                        this.Dic = data.data.data.map(item => {
                            item.label = item.typeOne
                            item.isType = 'one'
                            return item;
                        })
                    }
                    this.typeOne = this.Dic[0].typeOne;
                    resolve();
                } )
            } )
        },
        GetGoods(){
            Toast.loading({
                mask: false,
                message: '加载中...',
                duration:0,
                forbidClick:true
            });
            axios({
                url: 'goods/findGoods',
                method: 'post',
                data:{
                    page: this.page.size,
                    num: this.page.num,
                    typeOne: this.searchData.typeOne,
                    typeTwo: this.searchData.typeTwo,
                    typeThree: this.searchData.typeThree
                }
            }).then( data => {
                this.timer1 = setTimeout(()=>{
                    Toast.clear();
                    this.GoodsArr = this.GoodsArr.concat(data.data.data.data);
                    clearTimeout(this.timer1);
                },500)
                this.total = data.data.data.total;
            } )
        },
        async ChangeType(data){
            // 全部
            if(data.mp.detail == 0){
                if(this.breadArr.length == 1) return;
                // 点击全部获取数据
                this.page.size = 1,
                this.page.num = 5,
                this.GoodsArr = [];
                this.searchData = {};
                this.breadArr.splice((this.breadArr.length-1),1)
                this.breadArr.forEach((item,index) => {
                    if(item._id){
                        console.log(item)
                        index == 1 ? this.searchData.typeOne = item.label:'';
                        index == 2 ? this.searchData.typeTwo = item.label:'';
                        index == 3 ? this.searchData.typeThree = item.label:'';
                    }
                });
                this.GetGoods();
                return;
            }
            this.page.size = 1;
            this.GoodsArr = [];
            let currentObj = this.Dic[data.mp.detail-1];
            // 获取二级分类
            if(currentObj.isType == 'one'){
                await new Promise((resolve,reject) => {
                    this.breadArr[1] = {
                                label:currentObj.label,
                                _id:currentObj._id,
                            }
                    axios({
                            url: 'dic/getTypeTwo',
                            data:{
                                typeOneId:currentObj._id
                            },
                            method: 'post'
                        }).then( data => {
                            if(data.data.data && data.data.data.length){
                                this.Dic = data.data.data.map(item => {
                                    item.label = item.typeTwo
                                    item.isType = 'two'
                                    return item;
                                })
                            }
                            this.searchData.typeOne = currentObj.typeOne;
                            this.GetGoods();
                            resolve();
                        } )
                })
            }
            // 获取三级分类
            if(currentObj.isType == 'two'){
                this.breadArr[1] = {
                            label:currentObj.typeOne,
                            _id:currentObj.typeOneId,
                        }
                axios({
                        url: 'dic/getTypeThree',
                        data:{
                            typeTwoId: currentObj._id
                        },
                        method: 'post'
                    }).then( data => {
                        if(data.data.data && data.data.data.length){
                            this.Dic = data.data.data.map(item => {
                                item.label = item.typeThree
                                item.isType = 'three'
                                return item;
                            })
                            this.breadArr[2] = {
                                label:currentObj.typeTwo,
                                _id:currentObj._id,
                            }
                            
                        }else {
                            if(this.breadArr.length < 3){
                                this.breadArr.push({
                                    label:currentObj.typeTwo,
                                    _id:currentObj.typeTwoId,
                                })
                            }
                        }
                        this.searchData.typeOne = currentObj.typeOne;
                        this.searchData.typeTwo = currentObj.typeTwo;
                        this.GetGoods();
                    } )
            }
            // 点击三级分类
            if(currentObj.isType == 'three'){
                this.breadArr[3] = {
                    label:currentObj.typeThree,
                    _id:currentObj._id,
                }
                this.searchData.typeOne = currentObj.typeOne;
                this.searchData.typeTwo = currentObj.typeTwo;
                this.searchData.typeThree = currentObj.typeThree;
                this.activeKey = data.mp.detail;
                this.GetGoods();
            }
            
        },
        // 切换导航
        SwitchNav(data,index){
            this.page.size = 1,
            this.page.num = 5,
            this.GoodsArr = [];
            this.searchData = {};
            this.breadArr.splice((index+1),(this.breadArr.length-index));
            this.breadArr.forEach((item,index) => {
                if(item._id){
                    index == 1 ? this.searchData.typeOne = item.label:'';
                    index == 2 ? this.searchData.typeTwo = item.label:'';
                    index == 3 ? this.searchData.typeThree = item.label:'';
                }
            });
            console.log(this.breadArr)
            this.GetGoods();
            // 修改导航 
            // 点击一级分类
            if(this.breadArr.length == 2){
                axios({
                    url: 'dic/getTypeTwo',
                    data:{
                        typeOneId:this.breadArr[1]._id
                    },
                    method: 'post'
                }).then( data => {
                    if(data.data.data && data.data.data.length){
                        this.Dic = data.data.data.map(item => {
                            item.label = item.typeTwo
                            item.isType = 'two'
                            return item;
                        })
                    }
                    this.GetGoods();
                } )
            }
            // 点击全部
            if(this.breadArr.length == 1){
                axios({
                    url: 'dic/getTypeOne',
                    method: 'get'
                }).then( data => {
                    if(data.data.data){
                        this.Dic = data.data.data.map(item => {
                            item.label = item.typeOne
                            item.isType = 'one'
                            return item;
                        })
                    }
                    this.typeOne = this.Dic[0].typeOne;
                } )
            }
            // 点击二级分类
            if(this.breadArr.length == 3){
                this.activeKey = 0;
                console.log(this.activeKey)
            }

        },
        scrollBottom(){
            if(this.total == this.GoodsArr.length) return;
            this.page.size++;
            this.GetGoods();
        },
        ShowBigImg(item){
            this.bigImg = item.imgUrl;
            this.boolBimImg = true;
        },
        CloseShater(){
            this.boolBimImg = false;
        }
    },
    mounted(){
    },
    onShareAppMessage: (res) => {
        if(res.from == 'menu'){
            return {
                title: '源升建材',
                // imageUrl: '', // 图片 URL
                // path: "/pages/index/main?parentMemberId="+store.state.user.userInfo.id
            };
        }
    },
    async onShow(){
        await this.GetTypeOne();
        this.GoodsArr = [];
        this.page.size = 1;
        this.GetGoods();
    },
    onTabItemTap(){
        this.GoodsArr = [];
    }
}
</script>

<style lang="less" scoped>
.index-box{
    height: 100%;
    overflow: hidden;
}
.info-box{
    background-color: #fff;
    padding: 10px 10px;
    overflow: hidden;
    width: 340px;
    height: 80px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin: 10px auto;
    margin-bottom: 0;
    .name{
            width: 70px;
            height: 70px;
            float: left;
       img{
            width: 70px;
            height: 70px;
       }
    } 
    .info{
        font-size: 14px;
        float: left;
        width: calc(100% - 80px);
        margin-left: 10px;
        height: 80px;
        overflow: hidden;
        span{
            display: block;

        }
    }
}
.nav-box{
    padding: 10px 10px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    span{
        font-size: 15px;
        font-weight: 500;
        color: #3a95de;
        &.current{
            font-weight: bold;
        }
        i{
            display: inline;
        }
    }
}
.shop-box{
    background-color: #fff;
    overflow: hidden;
    height: calc(100% - 150px);
    position: relative;
    .left{
        width: 85px;
        float: left;
        overflow-y: auto;
        height: 100%;
        ul{
            overflow-y: scroll;
            height: auto;
            li{
                text-align: right;
                padding-right: 10px;
                height: 30px;
                line-height: 30px;
            }
        }
        /deep/ .van-sidebar-item{
            background-color: #f2f2f2;
        }
        /deep/ .van-sidebar-item--selected,.van-sidebar-item--selected.van-sidebar-item--hover {
            background-color: #fff;
        }
    }
    .right{
        // float: left;
        position: absolute;
        left: 85px;
        width: calc( 100% - 85px );
        background-color: #fff;
        /deep/ .van-card{
            background-color: #fff;
        }
        height: 100%;
        scroll-view{
            height: 100%;
        }
    }
}
.img-show{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.8);
    z-index: 999;
    swiper{
        position: relative;
        width: 300px;
        height: 300px;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    img{
        width: 300px;
        height: 300px;
        position: relative;
    }
}
.no-data{
    font-size: 18px;
    margin: 20px auto;
}
</style>
