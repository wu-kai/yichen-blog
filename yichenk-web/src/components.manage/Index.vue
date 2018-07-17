<template>
  <div class="index">
    <div>欢迎进入管理页面</div>
    <div class="upload">
      上传文件:
      <input type="file" @change="selectImg">
      <div class="img-list">
        <div class="img" v-for="imgUrl in imgUrlList">
          <img :src="imgUrl" alt="">
        </div>
      </div>
    </div>
    <form method="post" action="/api/uploadFile_to_qiniu" enctype="multipart/form-data">
      <p><input type="file" name="file" value="" @change="getShowImgUrl"></p>
      <p><input type="submit" value="提交"></p>
    </form>
  </div>
</template>

<script>
  import util from '../js/util';
	export default {
		name: '',
    data:function(){
		  return {
        imgUrlList:[]
      }
    },
    methods:{
      getShowImgUrl(e){
        var url = null ;
        if (window.createObjectURL!==undefined) { // basic
          url = window.createObjectURL(e.srcElement.files[0]) ;
        } else if (window.URL!==undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(e.srcElement.files[0]) ;
        } else if (window.webkitURL!==undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(e.srcElement.files[0]) ;
        }
        this.imgUrlList.push(url);
      },
      selectImg(e){
        console.dir(e.target);
        console.log(e.srcElement.files);
      }
    },
	}
</script>

<style scoped>
  .index{
    text-align: left;
  }
.upload{
  float: left;
}
.upload .img-list{
  overflow: hidden;
}
.upload .img{
  width: 100px;
  height: 100px;
  float: left;
  overflow: hidden;
  padding:10px;
}
.upload .img img{
  width: 100%;
}
</style>
