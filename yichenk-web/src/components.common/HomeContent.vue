<template>
  <div>
    <p class="section">我是一尘，这是我的个人网站，里面有我的学习历程，有我的技术分享，也有毫无营养的闲聊扯淡，欢迎你的到来</p>

    <div class="blog section">
      <h2>学海无涯 回头是岸</h2>
      <p>买了好多书，有些看了，有些没看，有些看了两三遍，有些只看了一点点，想着写写博客做些记录，可以以后自己翻越，也可与人分享</p>
    </div>

    <div class="world section">
      <h2>读书为阅 行走为历</h2>
      <div class="map">
        <p>
          其实所谓的什么旅行感悟人生，骑行川藏净化灵魂啥的，我一点感觉都没有，我只是简单的想看看这个世界而已
        </p>
        <div class="images">
          <span class="changeImages">换一批</span>
          <div class="list">
            <div class="img">
              <img src="http://p9kmzrcfb.bkt.clouddn.com/pic3.jpg" alt="">
            </div>
            <div class="img">
              <img src="http://p9kmzrcfb.bkt.clouddn.com/pic2.jpg" alt="">
            </div>
            <div class="img">
              <img src="http://p9kmzrcfb.bkt.clouddn.com/pic4.jpg" alt="">
            </div>
            <div class="img">
              <img src="http://p9kmzrcfb.bkt.clouddn.com/pic5.jpg" alt="">
            </div>
          </div>
        </div>
        <p>
          希望有一天可以把这个地图的城市都点亮，证明我曾来过这个世界
        </p>
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
  .section h2{
    font-size: 1.5em;
  }
  .world{
    height: 500px;
  }
  .map{
    /*width: 80%;*/
  }
  .section p{
    font-size: 14px;
    text-align: left;
    line-height: 26px;
    margin-top: 20px;
  }
  .images{
    overflow: hidden;
    position: relative;
  }
  .images .changeImages{
    top: 50%;
    right: 0;
  }
  .images .img{
    width: 25%;
    float: left;
    overflow: hidden;
    box-sizing: border-box;
    padding: 2px;
    height: 140px;
  }
  .images .img img{
    display: block;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1000px) {
    .images .img{
      height: 120px;
    }
  }

  @media screen and (max-width: 800px) {
    .images .img{
      height: 100px;
    }
  }

  @media screen and (max-width: 600px) {
    .images .img{
      height: 80px;
    }
  }

  @media screen and (max-width: 500px) {
    .images .img{
      height: 120px;
      width: 50%;
    }
  }




</style>
