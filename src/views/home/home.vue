<template>
	<div id="home" class="wrapper">
		<nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行','新款','精选']"
		 @tabClick='tabclick' 
		 ref="tabControl1" class="tabnewcontrol"
		 v-show="isTabFixed"></tab-control>
		<scroll class="contents" ref="scroll" 
		:probe-type="3" @scroll="contentscroll"
		:pull-up-load="true" @pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"  
			v-if="banners.length"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature></feature>
			<tab-control :titles="['流行','新款','精选']"
			 @tabClick='tabclick' 
			 ref="tabControl2"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>		
	</div> 
</template>

<script>
	
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import Feature from './childComps/FeatureView.vue'
	
	import NavBar from '../../components/common/navbar/NavBar.vue'
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import BackTop from '../../components/content/backTop/backTop.vue'
	
	import {getHomeMultiData,getHomeGoods} from "../../network/home.js"
	import {debounce} from '../../common/utils.js'
	
	export default {
		name:"home",
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			Feature,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data(){
			return {
				banners:[],
				recommends:[],
				currentType:'pop',
				
				tabOffsetTop:0,
				isTabFixed:false,
				saveY:0,
				
				isShowBackTop:false,
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				}
			}
		},
		
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		
		activated(){
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			
		},
		deactivated(){
			this.saveY = this.$refs.scroll.getCurrentY()
			
		},
		created(){
			//请求多个数据(来源：methods)
			this.getHomeMultiData()
			//请求商品的数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			
		},
		methods:{   
			swiperImageLoad(){
				// 获取tabControl的offsetTop
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
			// 回到顶部的方法
			backClick(){
				this.$refs.scroll.scrollTo(0,0)
			},
			// 事件监听的方法
			tabclick(index){
				switch(index){
					case 0:
						this.currentType='pop'
						break
					case 1:
						this.currentType='new'
						break
					case 2:
						this.currentType='sell'
						break
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			// 网络请求的方法
			getHomeMultiData(){
				getHomeMultiData().then(res=>{
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res=>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					// 完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			},
			// 特定时候出现回到顶部图标
			contentscroll(pos){
				this.isShowBackTop = (-pos.y) > 1000
				// 决定tabControl是否吸顶（position:fixed）
				this.isTabFixed = (-pos.y)>this.tabOffsetTop
			},
			
			// 上拉加载更多的方法
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			
			getScrollY(){
				return this.scroll ? this.scroll.y : 0
			}
		},
		mounted(){
			// 图片加载完成的事件监听
			const refresh = debounce(this.$refs.scroll.refresh,50)
			this.$bus.$on('itemimageLoad',()=>{
				refresh()
			})
			
		}
	}
</script>

<style scoped>
	#home{
		padding-top: 44px;
		height: 100vh; 
		position: relative;
	}
	.homenav{
		background-color:indianred;
		color:white ;
		
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	
	.contents{
		
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	.tabnewcontrol{
		position: relative;
		z-index: 9;
	}
	
</style>
