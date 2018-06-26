<template>
  <div class="home"
       @mousewheel="showContent($event)"
       @scroll="scrollHome($event)"
       :class="[isShowContent?'active':'']">
    <div class="top">
      <div class="_modal">
        <transition name="fadeTop">
          <h1 v-if="showTitle">
            <span>我是一尘</span>
            <span class="sub-title">一骑绝尘</span>
          </h1>
        </transition>
        <transition name="fadeTop">
          <p v-if="showInfo">君子食无求饱，居无求安，敏于事而慎于言，就有道而正焉</p>
        </transition>
        <transition name="fadeTop">
          <div v-if="showMore&&!isShowContent" class="showMore">
            <span>点此开始</span>
            <i class="arrow_down" @click="showContent($event)"></i>
          </div>
        </transition>
      </div>
      <img src="http://p9kmzrcfb.bkt.clouddn.com/default-blog-img-1.jpg" alt="">
    </div>
    <transition name="isShowContent">
      <div class="content" v-if="isShowContent" :class="[isShowContent?'isShowContent':'']">
        <div class="content-box">
          <p>我是一尘，这是我的个人网站，里面有我的学习历程，有我的技术分享，也有毫无营养的闲聊扯淡，欢迎你的到来</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  const Home = {
    data: function () {
      return {
        showTitle: false,
        showInfo: false,
        showMore:false,
        isShowContent:false,
        showSubTitle:false
      }
    },
    computed: {
      title() {
        return this.$store.state.homeTitle
      }
    },
    methods:{
      showContent(event){
        let self = this;
        if(event.type === 'click'){
          self.isShowContent = true;
          self.showInfo = true;
          return;
        }
        if(event.wheelDelta>0&&$('.home').scrollTop() === 0){
          this.isShowContent = false;
          this.showInfo = false;
        }else if(event.wheelDelta<0){

          if(!self.isShowContent){
            self.isShowContent = true;
            self.showInfo = true;
          }
        }
      },
      scrollHome(event){
        if(event.srcElement.scrollTop === 0){
          this.isShowContent = false;
          this.showInfo = false;
        }
      }
    },
    mounted() {
      let self = this;
      this.showTitle = true;
      setTimeout(function () {
        self.showMore = true;
      }, 2200);
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

  .top p {
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
    display: block;
  }

  .home {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .home.active{
    height: 100%;
    overflow: auto;
  }

  .top{
    height: 100%;
    overflow: hidden;
    /*position: absolute;*/
    z-index: 996;
    width: 100%;
    transition: all 1s ease;
  }
  .home.active ._modal{
    background: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,1) 100%);
  }

  .home.active .top{
    height: 100%;
    transform: translateY(-150px);
  }
  ._modal {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.29);
    z-index: 997;
  }

  .home.active img{

  }

  .home.active ._modal{
    height: 100%;
  }

  .fadeTop-enter-active,.fadeTop-leave-active {
    transition: all 1s ease;
  }

  .fadeTop-enter,.fadeTop-leave-to {
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

  .sub-title{
    font-size: 16px;
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

  .home .content{
    width: 50%;
    margin: -150px auto 0;
  }

  .isShowContent-enter-active{
    transition: all 1.5s ease .3s;
  }
  .isShowContent-enter{
    opacity: 0;
  }
  .home .content p{
    text-align: left;
    text-indent: 26px;
    width: 100%;
    margin-top: 10px;
    padding: 0 5px;
    font-size: 18px;
  }

  @media screen and (max-width: 1400px) {
    h1 {
      font-size: 60px;
    }

    .top p {
      font-size: 20px;
    }

    .home .content{
      width: 80%;
    }
  }

  @media screen and (max-width: 800px) {
    h1 {
      font-size: 40px;
      padding: 0 5px;
    }
    .top p {
      font-size: 14px;
      padding: 0 5px;
      letter-spacing: 3px;
    }

    .home .content{
      width: 100%;
    }
  }
</style>
