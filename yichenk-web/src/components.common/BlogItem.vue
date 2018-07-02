<template>
  <div class="blog clearF">
    <div class="item-head">
      <h1 v-text="blog.title||'no title'"></h1>
      <span class="time">{{time}}</span>
    </div>
    <div class="more">
      <p v-text="info"></p>
    </div>
    <div class="item-foot">
      <div class="item-labels">
        <span v-for="label in labels" class="item-label">
          <tag type="info" rounded v-text="label"></tag>
        </span>
      </div>
      <div class="readAll" @click="goDetails()"><tag type="primary">阅读全文 >></tag></div>
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
        return (this.blog.info || '作者太懒，没有写内容预览')
      },
      time() {
        return (new Date(this.blog.createTime)).Format('yyyy-MM-dd hh:mm:ss')
      },
      updateTime() {
        return '更新日期 : ' + (new Date(this.blog.updated||'')).Format('yyyy-MM-dd hh:mm:ss')
      },
      imgUrl() {
        const defaultUrl = 'http://p9kmzrcfb.bkt.clouddn.com/default-blog-img-1.jpg';
        return this.blog.createTime.image || defaultUrl
      },
      labels(){
        let arr = [];
        _.each(this.blog.label,function(item){
          if(item.indexOf('，')!==-1){
            arr = arr.concat(item.split('，'));
          }
          if(item.indexOf(',')!==-1){
            arr = arr.concat(item.split(','));
          }
        });
        return arr;
      }
    },
    methods:{
      goDetails(){
        this.$store.state.blog.currentBlog = this.blog;
        this.$router.push('/blogList/BlogDetailsBox/'+this.blog._id)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  *{
    font-family: 宋体;
  }
  .blog {
    width: 100%;
    margin: 0 auto 20px;
    position: relative;
    z-index: 999;
    /*border-bottom: 1px dashed #c4c4c4;*/
    transition: all 0.5s;
    box-shadow: 0 0 13px -1px #6f6f6f;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    padding: 16px 20px 0;
    box-sizing: border-box;
  }

  /*.blog:hover {*/
    /*background: rgba(255, 255, 255, 0.6);*/
    /*cursor: pointer;*/
    /*box-shadow: 0px 0 26px 2px #a2a2a2;*/
    /*transform: translateY(-1px);*/
  /*}*/

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
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid #989898;

  }
  .item-head{
    overflow: hidden;
  }
  h1{
    float: left;
    text-align: left;
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
  }
  .item-head .time{
    float: right;
    font-size: 13px;
    color: #94928e;
    padding-top: 10px;
  }
  .more>p{
    text-align: left;
    padding: 0 20px;
    text-indent: 20px;
    font-family: cursive;
    font-size: 18px;
  }
  .item-foot{
    overflow: hidden;
    padding: 10px 0;
  }
  .item-foot .item-labels{
    overflow: hidden;
    float: left;
    font-size: 13px;
    width: calc(100% - 100px);
    text-align: left;
  }
  .item-foot .item-label{
    font-weight: 500;
    color: #858585;
    font-family: Broadway;
    margin-right: 10px;
  }
  .item-foot .readAll{
    float: right;
  }
  .item-foot .readAll:hover{
    cursor: pointer;
  }

  @media screen and (max-width:400px){
    .blog{

    }
  }
</style>
