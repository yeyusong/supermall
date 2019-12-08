<template>
	<div class="goods">
		<goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
		
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	
	export default {
		components:{
			GoodsListItem
		},
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.goods{
		display: flex;
		/* 根据数据的宽度定义一行存放几个 */
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
</style>
