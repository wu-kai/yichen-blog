<template>
  <div class="common_container details">
    <img src="" alt="">
    <h2 v-text="blog.title"></h2>
    <div class="content-info">
      <span v-text="contentTime"></span>
      <span v-text="contentLabel"></span>
      <span v-text="contentAuthor"></span>
    </div>
    <div v-text="contentInfo" class="introduction"></div>
    <p v-html="blog.body"></p>
  </div>
</template>

<script>
  import _ from 'lodash'
	export default {
		name: '',
    data(){
		  return {
		    blog:this.$store.state.blog.currentBlog
      }
    },
    computed:{
      contentTime(){
        return '创建日期 : ' + (new Date(this.blog.createTime)).Format('yyyy-MM-dd hh:mm:ss')
      },
      contentLabel(){
        return '标签 : '+ (_.isArray(this.blog.label)?this.blog.label[0]:'')
      },
      contentAuthor(){
        return '作者 : '+this.blog.author
      },
      contentInfo(){
        return '导读 : '+this.blog.info
      }
    },
    mounted(){
      if(!this.blog.createTime){
        this.$router.push('/blogList')
      }
    }
	}
</script>

<style scoped>
  .details{
    min-height: 100%;
    padding: 30px;
    text-align: left;
  }
  .details img{
    width: 100%;
    min-height: 100px;
    display: block;
  }
  h2{
    font-size: 28px;
    text-align: left;
    color: #1565c0;
  }
  .content-info{
    color: #dcdcdc;
    margin-top: 10px;
  }
  .content-info span{
    padding: 10px 30px;
  }
  .content-info span:first-child{
    padding-left: 0;
  }
  p{
    text-align: left;
    padding: 20px 0;
    margin-top: 40px;
    overflow: hidden;
  }
  .introduction{
    border-bottom: 1px solid #bbdefb;
    margin-top: 30px;
    padding-bottom: 20px;
    color: #bbdefb;
  }
</style>
