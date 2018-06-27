<template>
  <div class="blog-list-box">
    <div class="left">
      <div class="content">
        <div class="overlay"></div>
        <div class="header-box">
          <div class="header">
            <transition name="showHead">
              <img v-if="showHead" src="../images/header.jpg" alt="">
            </transition>
          </div>
          <h3>KevinWu</h3>
          <p>一只苦逼的前端汪</p>
        </div>
      </div>
    </div>
    <div class="list-box">
        <BlogItem v-for="blog in list"
                  :blog="blog"
                  :key="blog._id">
        </BlogItem>
    </div>
  </div>
</template>

<script>
  import BlogItem from '../components.common/BlogItem.vue'
  export default {
    name: 'BlogList',
    data:function(){
      return {
        showHead:false
      }
    },
    computed:{
      list(){
        return this.$store.state.blog.blogList;
      }
    },
    mounted(){
      const self = this;
      this.$store.dispatch('getBlogList')
        .then(function(success){
      });
      self.showHead = true;
    },
    components:{
      BlogItem
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
    box-sizing: content-box;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
  }
</style>
