<template>
	<div class="cart">
		<nav-bar class="cart-nav-bar">
			<div slot="center" >购物车({{cartLength}})</div>
		</nav-bar>
		<!-- 商品列表 -->
		<cart-list></cart-list>
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	import {mapGetters} from 'vuex'

	export default {
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		computed:{
			...mapGetters(['cartLength','cartList'])
		}
	}
</script>

<style>
	.cart{
		height: 100vh;
	}
	.cart-nav-bar{
		background-color: crimson;
		color: white;
	}
</style>
