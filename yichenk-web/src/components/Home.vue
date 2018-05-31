<template>
  <div class="home">
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
  .home {
    padding-top: 150px;
  }

  h1 {
    font-size: 100px;
  }

</style>
