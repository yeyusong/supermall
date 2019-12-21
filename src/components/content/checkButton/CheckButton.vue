<template>
	<div class="check-button" :class="{check:ischecked}">
		<div style="height: 15px;width: 15px;"></div>
	</div>
</template>

<script>
	export default{
		props:{
			ischecked:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style scoped="scoped">
	.check-button{
		background-color:white;
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.check{
		background-color: green;
	}
</style>
