<template>
	<div class="wrapper">
		<div class="content"> 
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
			<h2 style="font-size: 100px;">我是category</h2>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default{
		data(){
			return{
				scroll:null
			}
		},
		mounted(){
			// probe:侦测
			// 0,1都不侦测
			// 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
			// 3:只要是滚动都侦测
			this.scroll = new BScroll('.wrapper',{
				probeType:3,
				pullUpLoad:true
			})
			this.scroll.on('scroll',(jieguo)=>{
				//console.log(jieguo)
			})
			this.scroll.on('pullingUp',()=>{
				console.log('上拉加载更多');
				setTimeout(()=>{
					this.scroll.finishPullUp()
				},2000)
			})
		}
	}
</script>

<style scoped="scoped">
	.wrapper{
		/* 设置高度为150px的区域局部可滚动 */
		height: 200px;
		background-color: yellow;
		overflow: hidden;
		/* overflow-y: scroll; */
	}
</style>
