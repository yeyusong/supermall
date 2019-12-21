<template>
	<div class="toast"  v-show="isshow">
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default{
		props:{},
		data(){
			return{
				message:'',
				isshow:false
			}
		},
		methods:{
			show(message='默认文字',duration=1500){
				this.isshow = true
				this.message = message
				setTimeout(()=>{
					this.isshow = false
					this.message = ''
				},duration)
			}
		}
	}
</script>

<style>
	.toast{
		position: fixed;
		top:50%;
		left: 50%;
		padding: 8px 10px;
		/* 文字偏移 */
		
		transform: translate(-50%, -50%);
		background-color: rgba(0,0,0,.7);
		color: white;
		font-family: "微软雅黑";
		font-size: 15px;
		z-index: 999;
	}
</style>
