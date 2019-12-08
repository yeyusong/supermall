<template>
	<div id="detail">
		<detail-nav-bar 
		class="detail-nav"></detail-nav-bar>
		<!-- <scroll class="content" > -->
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
		<!-- </scroll> -->
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	
	import Scroll from '../../components/common/scroll/Scroll.vue'
	
	import {getDetail,goods,shop} from '../../network/detail.js'
	
	export default{
		name:'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll
		},
		data(){
			return{
				iid:null,
				topImages:[],
				goods:{},
				shop:{}
			}
		},
		created(){
			this.iid = this.$route.params.iid
			
			getDetail(this.iid).then(res=>{
				const data = res.result
				// 获取详情页的轮播图
				this.topImages = data.itemInfo.topImages
				// 获取商品信息
				this.goods = new goods(data.itemInfo,data.columns,data.shopInfo.services)
				// 创建店铺信息对象
				this.shop = new shop(data.shopInfo)
			})
		}
	}
</script>

<style>
	#detail{
		/* 使得在详情页面情况下首页导航栏消失 */
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.content{
		
		height: calc(100% - 44px);
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		
	}
	
</style>
