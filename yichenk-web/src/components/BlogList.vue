<template>
  <div class="blog-list-box">
    <audio id="music" :src="musicList[0]" autoplay></audio>
    <div class="left">
      <div class="content">
        <div class="overlay">
          <img src="../images/music.png" alt=""
               v-mouseOver="'双击可随机切换'"
               @click="pausedMusic()"
               @dblclick="changeMusic()"
               :class="[isPaused?'paused':'']">
        </div>
        <div class="header-box">
          <div class="header">
            <transition name="showHead">
              <img v-if="showHead" src="../images/header.jpg" alt="">
            </transition>
          </div>
          <h3>KevinWu</h3>
          <p>一只苦逼的前端汪</p>
        </div>
        <div class=""></div>
      </div>
    </div>
    <div class="list-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import BlogListBox from '../components.common/BlogListBox'
  export default {
    name: 'BlogList',
    data:function(){
      return {
        showHead:false,
        musicEl:'',
        isPaused:false,
        timer:''
      }
    },
    methods:{
      pausedMusic:function(){
        let self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
          self.isPaused?self.musicEl[0].play():self.musicEl[0].pause();
          self.isPaused = !self.isPaused;
        }, 300);
      },
      changeMusic(){
        clearTimeout(this.timer);
        let self = this;
        let max = this.musicList.length;
        let index = Math.ceil(Math.random()*max);
        index = index === 0?index:index-1;
        this.timer = setTimeout(function(){
          self.musicEl[0].src = self.musicList[index];
          self.musicEl[0].play();
        },150);
      }
    },
    computed:{
      list(){
        return this.$store.state.blog.blogList;
      },
      musicList(){
        return this.$store.state.musicList;
      }
    },
    mounted(){
      const self = this;
      this.$store.dispatch('getBlogList')
        .then(function(success){
      });
      self.showHead = true;
      this.musicEl = $('#music');
      this.musicEl[0].volume = 0.013;
      this.musicEl[0].load();
      this.musicEl[0].play();
      this.musicEl.on('ended',function(){
        self.changeMusic();
      })
    },
    components:{
      BlogListBox
    }
  }
</script>

<style scoped>
  *{
    font-family: 宋体;
  }
  .blog-list-box {
    height: 100%;
    background: url('http://p9kmzrcfb.bkt.clouddn.com/list_bg2.jpg');
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
  .blog-list-box:after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    z-index: 10;
    top:0;
    left: 0;
  }
  .left{
    width: 300px;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 0px 0 26px 2px #a2a2a2;
    background: rgba(255, 255, 255, 0.2);
    z-index: 11;
  }
  .left .content .overlay{
    background: rgba(129, 171, 147, 0.33);
    height: 190px;
    width: 100%;
  }
  .left .content{
    height: 100%;
    position: relative;
  }
  .left .content .header-box{
    box-sizing: border-box;
    position: absolute;
    z-index: 12;
    top: 140px;
    left: 0;
    width: 100%;
  }
  .left .content .header-box h3{
    width: 100%;
    text-align: center;
    padding-top: 10px;
    margin: 0;
    font-size: 30px;
    color: #313131;
    font-weight: 800;
  }
  .left .content .header-box p{
    color: #5b5b5b;
    font-size: 14px;
    margin-top: 15px;
  }
  .left .content .header{
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border:3px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0, 183, 238, 0.36);
  }
  .left .content .header img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .showHead-enter{
    transform: scale(0.1,0.1);
  }
  .showHead-enter-active{
    transition: all 0.7s ease 0.3s;
  }
  .showHead-enter-to{}
  .list-box{
    margin-left: 300px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
  }

  .overlay{
    position: relative;
  }

  .overlay img{
    width: 50px;
    height: 50px;
    position: absolute;
    animation: music 6s ;
    animation-iteration-count: infinite;
    animation-timing-function:linear;
    top:12px;
    right:12px;
    animation-play-state: running;
  }
  .overlay img:hover{
    cursor: pointer;
  }

  .overlay img.paused{
    animation-play-state: paused;
  }

  @keyframes music {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width:900px){
    .left{
      width: 100%;
      height: 170px;
    }
    .left .content .overlay{
      height: 70px;
    }
    .left .content .header-box{
      top: 30px;
    }
    .left .content .header{
      height: 80px;
      width: 80px;
    }
    .left .content .header-box h3{
      font-size: 20px;
    }
    .left .content .header-box p{
      margin-top: 6px;
      font-size: 13px;
    }

    .list-box{
      margin-left: 0;
      margin-top: 170px;
      padding-bottom:170px;
    }

    .overlay img{
      width: 40px;
      height: 40px;
    }
  }

  @media screen and (max-width:500px){
    .left{
      width: 100%;
      height: 160px;
    }
    .left .content .overlay{
      height: 70px;
    }
    .left .content .header-box{
      top: 40px;
    }
    .list-box{
      padding: 20px 5px 160px;
      margin-left: 0;
      margin-top: 160px;
    }
    .left .content .header{
      height: 60px;
      width: 60px;
    }
  }
</style>
