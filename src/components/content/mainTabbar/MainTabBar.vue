<template>
  <tab-bar>
    <tab-bar-item path="/home" >
     <!-- 若想改变活跃状态下的文字颜色，需在path后面加上activecolor="想要的颜色" -->
      <img slot="itemicon" src="~assets/img/tabbar/home.png" alt="">
      <img slot="itemiconactive" src="~assets/img/tabbar/home_active.png" alt="">
      <div slot="itemtext">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="itemicon" src="~assets/img/tabbar/category.png" alt="">
      <img slot="itemiconactive" src="~assets/img/tabbar/category_active.png" alt="">
      <div slot="itemtext">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="itemicon" src="~assets/img/tabbar/cart.png" alt="">
      <img slot="itemiconactive" src="~assets/img/tabbar/cart_active.png" alt="">
      <div slot="itemtext">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="itemicon" src="~assets/img/tabbar/profile.png" alt="">
      <img slot="itemiconactive" src="~assets/img/tabbar/profile_active.png" alt="">
      <div slot="itemtext">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
    import TabBar from '../../common/tabbar/TabBar'
    import TabBarItem from '../../common/tabbar/TabBarItem'
    export default {
        name: "MainTabBar",
        components: {
            TabBar,TabBarItem
        }
    }
</script>

<style scoped>
</style>