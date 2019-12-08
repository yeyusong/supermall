import {request} from "./request";

export function getHomeMultiData(){
	return request({
		url:"home/multidata"
	})
}

export function getHomeGoods(type,page){
	return request({
		url:'home/data',
		params:{
			type,page
		}
	})
}
//函数调用结束后会弹出函数栈，回收内存
// function test(){
// 	const names = []
// }