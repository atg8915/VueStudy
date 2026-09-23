<template>
  <HeaderCont/>
  <router-view/>
  <FooterCont />
</template>

<script>
import HeaderCont from './layout/HeaderCont.vue'
import FooterCont from './layout/FooterCont.vue'


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
  margin-top: 60px;
}
</style>
