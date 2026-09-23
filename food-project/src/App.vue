<template>
  <HeaderCont/>
  <router-view/>
  <FooterCont/>
</template>

<script>
import FooterCont from './components/layout/FooterCont.vue';
import HeaderCont from './components/layout/HeaderCont.vue';

export default {
  name: 'App',
  components: {
    HeaderCont,
    FooterCont
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