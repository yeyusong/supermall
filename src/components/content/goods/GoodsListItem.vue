<template>
	<div class="goods-list-item" @click="itemclick">
			<a>
			      <img v-lazy="showImage" alt="" @load="imageLoad" >
			 </a>
			<div class="goods-info">
				 <p>{{goodsItem.title}}</p>
				 <span class="price">价格:{{goodsItem.price}}</span>
				 <span class="collect">收藏人数:{{goodsItem.cfav}}</span>
			</div>
	</div>
</template>

<script>
	export default{
		props:{
			goodsItem:{
				type:Object,
				default(){
					return {};
				}
			}
		},
		computed:{
			showImage(){
				return this.goodsItem.image || this.goodsItem.show.img
			}
		},
		methods:{
			imageLoad(){
				this.$bus.$emit('itemimageLoad')
				
			},
			itemclick(){
				this.$router.push('/detail/' + this.goodsItem.iid)
				
			}
		}
	}
</script>

<style scoped="scoped">
	 .goods-list-item {
		padding: 2px;
	    padding-bottom: 40px;
	    position: relative;
	    width: 48%;
		
	  }
	  .goods-list-item img {
	    width: 100%;
	    border-radius: 5px;
	  }
	  .goods-info {
		 
	    font-size: 12px;
	    position: absolute;
	    bottom: 5px;
	    left: 0;
	    right: 0;
	    overflow: hidden;
	    text-align: center;
	  }
	  .goods-info p {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    margin-bottom: 3px;
	  }
	  .goods-info .price {
	    color: red;
	    margin-right: 20px;
	  }
	  .goods-info .collect {
	    position: relative;
		color: darkgoldenrod;
	  }
	  .goods-info .collect::before {
	    content: '';
	    position: absolute;
	    left: -15px;
	    top: -1px;
	    width: 14px;
	    height: 14px;
	    
	  }
	
</style>
