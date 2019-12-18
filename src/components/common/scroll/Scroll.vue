<template>
	<div class="wrapper" ref="wrappers">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default{
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default :false
			}
		},
		data(){
			return {
				scroll:{}
			}
		},
		mounted(){
			
			
			this.scroll = new BScroll(this.$refs.wrappers,{
				// tap:true,
				click: true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			
			this.scroll.refresh()
			// 监听滚动的位置
			this.scroll.on('scroll',(pos)=>{
				this.$emit('scroll',pos)
			})
			// 监听上拉事件
			this.scroll.on("pullingUp",()=>{
				this.$emit('pullingUp')
			})
			//监听是否滚动到底部
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',()=>{
					this.$emit('pullingUp')
				})
			}
		},
		methods:{
			
			// scrollTo 有三个参数，x值，y值，时间（毫秒）
			scrollTo(x,y,time=1000){
				// 特殊写法，当this.scroll不为空值时才会执行下一步操作
				this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
			},
			refresh(){
				this.scroll && this.scroll.refresh && this.scroll.refresh()
				// console.log('数据刷新')
			},
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
			},
			getCurrentY(){
				return this.scroll.y ? this.scroll.y : 0
			}
		}
	}
</script>

<style>
</style>
