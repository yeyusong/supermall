import{
	ADD_COUNTER,
	ADD_TO_CART
}from './mutations-types'
export default {
	addCart(context,payload){
		
		// payLoad新添加的商品
		// let oldProduct = null
		// for(let item of state.cartList){
		// 	if(item.iid === payload.iid){
		// 		oldProduct = item
		// 	}
		// }
		
		// 查找之前的数组是否有该商品
		let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
		// 判断oldProduct是否有值
		if(oldProduct){
			context.commit(ADD_COUNTER,oldProduct)
		}else{
			payload.count = 1
			context.commit(ADD_TO_CART,payload)
		}
		
	}
}