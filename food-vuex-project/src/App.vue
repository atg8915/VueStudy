<template>
  <HeaderCont/>
  <router-view/>
</template>

<script>
import HeaderCont from './components/HeaderCont.vue';


export default {
  name: 'App',
  components: {
    HeaderCont
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>