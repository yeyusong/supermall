<template>
	<div id="details"> 
		<detail-nav-bar ref="nav"
		class="detail-navs" @titleclick="titleclick"></detail-nav-bar>
		<scroll class="contents" ref="scroll" 
		@scroll="contentScroll" :probeType="3">
			
			<detail-swiper :top-images="topImages" ></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			
			<detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
			<detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
			<!-- <goods-list :goods="recommends" ref="recommend"></goods-list> -->
			
			<detail-new-goods :goods="recommends" ref="recommend" @newimgload="newimgload"></detail-new-goods>
			
			</scroll>
			<back-top v-show="isShowBackTop" @click.native="backClick" class="backtop"></back-top>
			<detail-bottom-bar @addCart="addtoCart"></detail-bottom-bar>
			
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	
	import DetailParamInfo from  './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailNewGoods from './childComps/DetailNewGoods.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import BackTop from '../../components/content/backTop/backTop.vue'

	
	import {getDetail,goods,shop,GoodsParam,getRecommend} from '../../network/detail.js'
	import {debounce} from '../../common/utils.js'
	import {itemListenerMixin} from '../../common/mixin.js'
	
	import { mapActions } from 'vuex'
	
	export default{
		name:'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList,
			BackTop,
			DetailNewGoods
		},
		mixins:[itemListenerMixin],
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
				recommends:[],
				themeTopYs:[],
				getThemeTopY:null,
				currentIndex:0,
				isShowBackTop:false
			}
		},
		activated(){
			
		},
		created(){
			//1.获取数据
			this.iid = this.$route.params.iid
			
			getDetail(this.iid).then(res=>{
				// console.log(res)
				const data = res.result
				// 2.获取详情页的轮播图
				this.topImages = data.itemInfo.topImages
				
				 this.goods = new goods(data.itemInfo, data.columns)
				// 4.创建店铺信息对象
				this.shop = new shop(data.shopInfo)
				//5.获取商品详细信息
				this.detailInfo = data.detailInfo
				//6.获取参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				// 7.获取评论信息
				if(data.rate.list){
					this.commentInfo = data.rate.list[0]
				}
				
			})
			// 请求推荐数据
			getRecommend().then(res=>{
				this.recommends = res.data.list
				
			})
			// 给getThemeTopY赋值
			this.getThemeTopY = debounce(()=>{
				// 获取四个组件的头部y值
					this.$nextTick(()=>{
					this.themeTopYs=[]
					this.themeTopYs.push(0)
					this.themeTopYs.push(this.$refs.params.$el.offsetTop)
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
					// this.themeTopYs.push(Number.MAX_VALUE)
					// console.log(this.themeTopYs)
					// console.log('9877')
				},500)
			})
		},
		mounted(){},
		destroyed(){
			this.$bus.$off('itemImgLoad',this.itemImgListener)
		},
		methods:{
			...mapActions(['addCart']),
			// 添加到购物车的方法
			addtoCart(){
				// 获取商品信息
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				// 添加到购物车
				// this.$store.commit('addCart',product)
				
				//第一种方法 
				// this.$store.dispatch('addCart',product).then(res=>{
				// console.log(res)
				// })
				// 第二种方法
				this.addCart(product).then(res=>{
					this.$toast.show(res)
				})
			},
			// 回到顶部的方法
			backClick(){
				this.$refs.scroll.scrollTo(0,20)
			},
			titleclick(index){
				
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+30,1000)
			},
			newimgload(){
				this.$refs.scroll.refresh()
				this.getThemeTopY()
			},
			contentScroll(pos){
				// 获取详情页当前的y值
				const positionY = -pos.y
				// 与组件的y值进行对比
				let length = this.themeTopYs.length
				for(let i =0;i<length;i++){
					if(this.currentIndex !== i &&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
					||(i===length-1&&positionY>this.themeTopYs[i]))){
						this.currentIndex = i
						// console.log(this.currentIndex)
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
				// 显示回到顶部按钮
				this.isShowBackTop = -pos.y > 500
			}
		}
	}
</script>

<style scoped="scoped">
	#details{
		
		background-color: #fff;
		position: relative;
		height: 100vh;
		z-index: 1;
	}
	.contents{
		background-color: #fff;
		height: calc(100% - 44px - 58px);
	}
	.detail-navs{
		position: relative;
		z-index: 9;
		background-color: white;
	}
	.backtop{
		
		padding-bottom: 15px;
	}
	
</style>
