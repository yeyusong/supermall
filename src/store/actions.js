import{
	ADD_COUNTER,
	ADD_TO_CART
}from './mutations-types'
export default {
	addCart(context,payload){
		return new Promise((resolve,reject)=>{
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
				resolve('当前商品数量+1')
			}else{
				payload.count = 1
				context.commit(ADD_TO_CART,payload)
				resolve('添加新商品成功')
			}
			
		})
		
	}
}