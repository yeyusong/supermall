<template>
	<div id="details"> 
		<detail-nav-bar 
		class="detail-navs"></detail-nav-bar>
		<scroll class="contents">
			<detail-swiper :top-images="topImages" ></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			
			<detail-param-info :paramInfo="paramInfo"></detail-param-info>
			<detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
			<goods-list :goods="recommends"></goods-list>
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	
	import DetailParamInfo from  './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	
	import {getDetail,goods,shop,GoodsParam,getRecommend} from '../../network/detail.js'
	
	export default{
		name:'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailParamInfo,
			DetailCommentInfo,
			Scroll,
			GoodsList
		},
		data(){
			return{
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				// 评论信息
				commentInfo:{},
				// 详情页底部的推荐数据
				recommends:[]
			}
		},
		activated(){
			
		},
		created(){
			//1.获取数据
			this.iid = this.$route.params.iid
			
			getDetail(this.iid).then(res=>{
				const data = res.result
				// 2.获取详情页的轮播图
				this.topImages = data.itemInfo.topImages
				
				// 4.创建店铺信息对象
				this.shop = new shop(data.shopInfo)
				//5.获取商品详细信息
				this.detailInfo = data.detailInfo
				//6.获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				// 7.获取评论信息
				if(data.rate.CRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
			})
			// 请求推荐数据
			getRecommend().then(res=>{
				this.recommends = res.data.list
			})
		}
	}
</script>

<style>
	#details{
		
		background-color: #fff;
		position: relative;
		height: 100vh;
		z-index: 1;
	}
	.contents{
		background-color: #fff;
		height: calc(100% - 44px);
	}
	.detail-navs{
		position: relative;
		z-index: 9;
		background-color: white;
	}
	
	 
</style>
