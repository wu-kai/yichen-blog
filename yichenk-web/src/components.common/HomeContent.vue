<template>
  <div>
    <p class="section">我是一尘，这是我的个人网站，里面有我的学习历程，有我的技术分享，也有毫无营养的闲聊扯淡，欢迎你的到来</p>

    <div class="world">
      <div class="map">
        <Map></Map>
      </div>
    </div>
  </div>
</template>

<script>
  import Map from '../components.common/Map.vue';

  export default {
    name: "HomeContent",
    components:{
      Map
    }
  }
</script>

<style scoped>
  .section {
    font-size: 24px;
  }
  .world{
    height: 500px;
  }
</style>
