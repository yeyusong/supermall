<template>
  <div id="app">
	 <!-- keep-alive的作用是让其不要执行销毁操作，可以在路由跳转时记录之前所在位置 -->
	 <keep-alive exclude="Detail">
		  <router-view></router-view>
	 </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
	@import url("assets/css/base.css");
</style>
