<template>
  <div class="blog clearF" @click="goDetails()">
    <div class="img">
      <img :src="imgUrl" alt="">
    </div>
    <div class="more">
      <h1 v-text="blog.title||'no title'"></h1>
      <p v-text="info"></p>
      <div class="time">
        <div>{{updateTime}}</div>
        <div>{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'BlogItem',
    props: ['blog'],
    computed: {
      title() {
        return (new Date(this.blog.createTime)).Format('yyyy-MM-dd hh:mm:ss')
      },
      info() {
        return '内容提要：' + (this.blog.info || '没有详情介绍')
      },
      time() {
        return '创建日期 : ' + (new Date(this.blog.created||this.blog.createTime)).Format('yyyy-MM-dd hh:mm:ss')
      },
      updateTime() {
        return '更新日期 : ' + (new Date(this.blog.updated||'')).Format('yyyy-MM-dd hh:mm:ss')
      },
      imgUrl() {
        const defaultUrl = 'http://p9kmzrcfb.bkt.clouddn.com/default-blog-img-1.jpg';
        return this.blog.createTime.image || defaultUrl
      }
    },
    methods:{
      goDetails(){
        this.$store.state.blog.currentBlog = this.blog;
        this.$router.push('/details')
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .blog {
    width: 60%;
    margin: 0 auto 0;
    position: relative;
    z-index: 999;
    padding: 20px 10px;
    /*border-bottom: 1px dashed #c4c4c4;*/
    transition: all 0.5s;
    height: 100%;
    overflow-y: auto;
  }

  .blog:hover {
    background: rgba(238, 238, 238, 0.38);
    cursor: pointer;
    box-shadow: 0 0 13px -1px #dcdcdc;
    transform: translateY(-1px);

  }

  .blog:hover .img img {
    width: 120%;
  }

  .img {
    width: 180px;
    height: 120px;
    float: left;
    overflow: hidden;
    border-radius: 3px;
  }

  .img img {
    display: block;
    width: 100%;
  }
  .more{
    padding-left: 26px;
    float: left;
    width: calc(100% - 180px);
  }
  h1{
    text-align: left;
  }
  .more>p{
    text-align: left;
    padding-top: 10px;
  }
  .more>div.time{
    text-align: right;
    padding-top: 30px;
    color: #aeaeae;
  }
</style>
