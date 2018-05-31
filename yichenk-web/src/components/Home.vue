<template>
  <div class="home">
    <img src="http://p9kmzrcfb.bkt.clouddn.com/080339.14528086.jpg" alt="">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
  const Home = {
    data: function () {
      return {}
    },
    computed: {
      title() {
        return this.$store.state.homeTitle
      }
    }
  };
  export default Home;
</script>
<style scoped>

  h1 {
    font-size: 100px;
    margin-top: 100px;
  }

</style>
