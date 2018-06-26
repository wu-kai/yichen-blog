<template>
  <div class="home">
    <div class="_modal">
      <transition name="fadeTop">
        <h1 v-if="showTitle">我是一尘，一骑绝尘</h1>
      </transition>
      <transition name="fadeTop">
        <p v-if="showInfo">君子食无求饱，居无求安，敏于事而慎于言，就有道而正焉</p>
      </transition>
      <transition name="fadeTop">
        <div v-if="showMore" class="showMore">
          <span>点此开始</span>
          <i class="arrow_down"></i>
        </div>
      </transition>
    </div>
    <img src="http://p9kmzrcfb.bkt.clouddn.com/default-blog-img-1.jpg" alt="">
  </div>
</template>
<script>
  const Home = {
    data: function () {
      return {
        showTitle: false,
        showInfo: false,
        showMore:false,
      }
    },
    computed: {
      title() {
        return this.$store.state.homeTitle
      }
    },
    mounted() {
      let self = this;
      this.showTitle = true;
      setTimeout(function () {
        self.showInfo = true;
      }, 1100);
      setTimeout(function () {
        self.showMore = true;
      }, 2200)
    }
  };
  export default Home;
</script>
<style scoped>

  * {
    font-family: 宋体;
  }

  h1 {
    font-size: 80px;
    color: #fff;
    position: absolute;
    top: calc(50% - 120px);
    width: 100%;
    text-align: center;
    padding: 0 20px;
  }

  p {
    font-size: 24px;
    color: #fff;
    position: absolute;
    top: calc(60% - 100px);
    width: 100%;
    text-align: center;
    padding: 0 20px;
    letter-spacing: 6px;
  }

  img {
    width: 100%;
    min-width: 1430px;
  }

  .home {
    height: 100%;
    overflow: hidden;
    position: relative;

  }

  ._modal {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.29);
    z-index: 997;
  }

  .fadeTop-enter-active {
    transition: all 1s ease;
  }

  .fadeTop-enter {
    opacity: 0;
    transform: translateY(60px);
  }

  .showMore i{
    margin-top: 10px;
    animation: top-down 1.5s ease;
    animation-delay:0s;
    animation-iteration-count:infinite;
    animation-direction:alternate;
  }

  @keyframes top-down {
    0%{
      transform: translateY(0px);
    }
    100%{
      transform: translateY(15px);
    }
  }

  .showMore{
    position: absolute;
    bottom: 20px;
    color: #fff;
    text-align: center;
    width: 100%;
    font-size: 12px;
  }

  .showMore span{
    display: block;
  }

  .showMore i{
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #fff;
  }

  @media screen and (max-width: 1400px) {
    h1 {
      font-size: 60px;
    }

    p {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    h1 {
      font-size: 40px;
      padding: 0 5px;
    }
    p {
      font-size: 14px;
      padding: 0 5px;
      letter-spacing: 3px;
    }
  }

</style>
