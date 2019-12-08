<template>
	<div class="tab-control">
		<div v-for="(item,index) in titles" class="tab-control-item"
		:class="{active:index === currentIndex}" @click="itemclick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				currentIndex:0
			}
		},
		methods:{
			itemclick(index){
				this.currentIndex = index;
				this.$emit('tabClick',index)
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 15px;
		font-family: '微软雅黑';
		background-color: #fff;
	}
	.tab-control-item{
		flex: 1;
		/* 使得无文字时也可以显现出来 */
		height: 40px;
		line-height: 40px;
	}
	.tab-control-item span{
		padding: 5px;
	}
	.active{
		color: #CD5C5C;
		
	}
	.active span{
		border-bottom: 3px solid #CD5C5C;
	}
</style>
