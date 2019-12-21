import {request} from "./request.js"

export function getDetail(iid){
	return request({
		url:'/detail',
		params:{
			iid
		}
	})
}

export class goods {
	constructor(itemInfo,columns) {
	    this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		// this.services = itemInfo.shopInfo.services
		this.realPrice = itemInfo.lowNowPrice
	}
}

export class shop{
	constructor(shopInfo) {
	    this.logo = shopInfo.shopLogo
		this.name = shopInfo.name
		this.fans = shopInfo.cFans
		this.sells = shopInfo.cSells
		this.score = shopInfo.score
		this.goodsCount = shopInfo.cGoods
	}
}

export class GoodsParam {
	constructor(info,rule) {
	    this.image = info.images ? info.images[0] : '',
		this.infos = info.set
		this.sizes = rule.tables
	}
}

export function getRecommend(){
	return request ({
		url:'/recommend'
	})
}