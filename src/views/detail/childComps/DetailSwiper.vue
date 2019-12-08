<template>
	<div class="detail-swiper">
		<swiper class="swipers">
			<swiper-item   v-for="item in topImages">
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
	.swipers{
		height: 300px;
		overflow: hidden;
	}
</style>
