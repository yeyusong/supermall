<template>
	<div class="cart">
		<nav-bar class="cart-nav-bar">
			<div slot="center" >购物车({{cartLength}})</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	import {mapGetters} from 'vuex'

	export default {
		components:{
			NavBar
		},
		computed:{
			...mapGetters(['cartLength','cartList'])
		}
	}
</script>

<style>
	.cart-nav-bar{
		background-color: crimson;
		color: white;
	}
</style>
