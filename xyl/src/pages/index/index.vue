<template>
  <div class="index-box">
      <div class="info-box">
          <p class="name"><img src="../../../static/images/logo.png" alt=""></p>
          <p class="info">
                <span>简介：销售、批发。五金类、工具类、灯具类、劳保类、消防类、日杂类、化工类、水暖类、电器类、电子类、办公类、开关类、锁具类、焊材类、元丝、圆钉、扎丝类</span>
          </p>
      </div>
      <div class="shop-box">
            <div class="left">
                <van-sidebar @change="ChangeType">
                    <van-sidebar-item :title="item" v-for="(item,index) in Dic"  :key="index"/>
                </van-sidebar>
            </div>
            <div class="right" v-if="GoodsArr">
                    <scroll-view @scrolltolower="scrollBottom" scroll-y="true">
                        <van-card
                            :num="item.stock?item.stock:''"
                            :desc="item.summary"
                            :title="item.title"
                            :thumb="imgBaseUrl+item.imgUrl"
                            v-for="(item,index) in GoodsArr"
                            :key="index"
                            @click="ShowBigImg(item)"
                        >
                        </van-card>
                    </scroll-view>
            </div>
      </div>
      <div class="img-show" v-if="boolBimImg" @click="CloseShater">
          <img :src="bigImgUrl" alt="">
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
            Dic:[],
            GoodsArr:[],
            imgBaseUrl:imgBaseUrl,
            typeOne:'',
            page:{
                num:5,
                size:1
            },
            total:null,
            bigImgUrl:null,
            boolBimImg:false,
            timer1:null,
        }
    },

    components: {
    },

    methods: {
        GetDic(){
            this.Dic = [];
            return new Promise( (resolve,reject) => {
                axios({
                    url: 'dic/getDic',
                    method: 'get'
                }).then( data => {
                    if(data.data.data){
                        data.data.data.forEach(item => {
                            this.Dic.push(item.typeOne);
                        });
                    }
                    this.typeOne = this.Dic[0];
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
                    typeOne: this.typeOne
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
        ChangeType(data){
            this.page.size = 1;
            this.GoodsArr = [];
            this.typeOne = this.Dic[data.mp.detail];
            this.GetGoods();
        },
        scrollBottom(){
            if(this.total == this.GoodsArr.length) return;
            this.page.size++;
            this.GetGoods();
        },
        ShowBigImg(item){
            this.bigImgUrl = this.imgBaseUrl+item.imgUrl;
            this.boolBimImg = true;
        },
        CloseShater(){
            this.boolBimImg = false;
        }
    },
    mounted(){
        wx.showShareMenu({
            withShareTicket: true
        })  
    },
    async onShow(){
        await this.GetDic();
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
    height: 110px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin: 10px auto;
    .name{
            width: 100px;
            height: 100px;
            float: left;
       img{
            width: 100px;
            height: 100px;
       }
    } 
    .info{
        font-size: 14px;
        float: left;
        width: calc(100% - 120px);
        margin-left: 10px;
        span{
            display: block;
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
    img{
        width: 300px;
        height: 300px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
}
</style>
