<template>
	<div>
		<swiper class="swipers" v-if="topImages.length">
			<swiper-item  class="item" v-for="(item,index) in topImages" :key="index">
				<img :src="item" />
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
	
	export default {
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			topImages:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped="scoped">
	/* .swipers{
		height: 300px;
		overflow: hidden;
	} */
	.item{
		text-align: center;
		height: 300px;
	}
</style>
