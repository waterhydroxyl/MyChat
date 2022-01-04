<template>
  <div id="root">
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './views/Login.vue';
export default {
  // components: { Login },
  name: 'App',
  // component: {
  //   Login,
  // },
};
</script>

<style lang="less" scoped>
#root {
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
