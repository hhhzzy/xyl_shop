<template>
  	<div class="people-box">
		<h1>重庆源优居建材配送欢迎您</h1>
		<h2>源优居分店一：源升建材配送</h2>
		<h3>配送范围：<span>渝北、江北、蔡家</span></h3>
		<h3 class="tel"><i>配送电话：</i><div><span @click="Tel('023-67833317')">023-67833317（点击直接拨打）</span><span @click="Tel('13368179775')">13368179775（点击直接拨打）</span><span @click="Tel('13594077077')">13594077077（点击直接拨打）</span></div></h3>
		<h2>源优居分店二：优优建材配送</h2>
		<h3>配送范围：<span>大学城、璧山、沙坪坝、江津</span></h3>
		<h3 class="tel"><i>配送电话：</i><div><span @click="Tel('023-65234902')">023-65234902（点击直接拨打）</span><span @click="Tel('1522326685')">1522326685（点击直接拨打）</span><span @click="Tel('15178719018')">15178719018（点击直接拨打）</span></div></h3>
		<h2>源优居分店三：鸿远居建材配送</h2>
		<h3>配送范围：<span>巴南、九龙坡、南岸</span></h3>
		<h3 class="tel"><i>配送电话：</i><div><span @click="Tel('023-66456144')">023-66456144（点击直接拨打）</span><span @click="Tel('15178824452')">15178824452（点击直接拨打）</span><span @click="Tel('17338677448')">17338677448（点击直接拨打）</span></div></h3>
	</div>
</template>

<script>

export default {
	methods:{
		Tel(value){
			wx.makePhoneCall({
				phoneNumber: value, //呼叫号码
			})
		}
	},
    mounted(){
        wx.showShareMenu({
            withShareTicket: true
        })  
    },
 
}
</script>

<style lang="less">
.people-box{
	padding: 10px;
	h1 {
		font-size: 28px;
		color: red;
		text-align: center;
		padding: 10px 0;
		font-weight: bold;
	}
	h2{
		font-size: 20px;
		color: red;
		font-weight: bold;
		padding-left: 10px;
		margin: 10px 0 5px 0;
	}
	h3{
		font-size: 18px;
		padding-left: 10px;
		margin: 5px 0;
	}
	.tel{
		overflow: hidden;
		span{
			white-space: nowrap;
			margin-right: 10px;
			font-size: 16px;
			font-weight: bold;
			display: block;

		}
		div{
			float: left;
			width: calc(100% - 95px);
		}
		i{
			float: left;
			font-style: normal;
			display: block;
			width: 95px;
		}
	}
}
</style>
