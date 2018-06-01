<template>
  <div id="app" v-showSocialistValues>
    <NavigationBar></NavigationBar>
    <NavigationMenu v-if="$store.state.menuShow"></NavigationMenu>
    <router-view :class="{filter:$store.state.menuShow}"/>
  </div>
</template>

<script>
  import NavigationBar from './components.common/NavigationBar.vue'
  import NavigationMenu from './components.common/NavigationMenu.vue'

  export default {
    name: 'App',
    components: {
      NavigationBar,
      NavigationMenu
    },
    mounted() {
      $(this.$el).css({})
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100%;
  }
</style>
