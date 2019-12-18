<template>
	<div class="goods">
		<detail-new-goods-item v-for="item in goods" :goodsItem="item" @itemimageLoad="itemimageLoad"></detail-new-goods-item>
	</div>
</template>

<script>
	import DetailNewGoodsItem from './DetailNewGoodsItem.vue'
	
	
	export default {
		components:{
			DetailNewGoodsItem
		},
		
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			itemimageLoad(){
				
				this.$emit('newimgload')
			}
		}
	}
</script>

<style scoped="scoped">
	.goods{
		display: flex;
		/* 根据数据的宽度定义一行存放几个 */
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
</style>