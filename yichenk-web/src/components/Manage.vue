<template>
  <div class="manage-box">
    <div class="menu">
      <router-link class="menu-item" to="/manage">首页</router-link>
      <router-link class="menu-item" to="/manage/createBlog">写文章</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {

  };
</script>
<style scoped>
  .manage-box{
    overflow: hidden;
    height: 100%;
  }
  .menu{
    width: 160px;
    float: left;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    text-align: left;
    box-shadow: 0 1px 4px rgba(0,0,0,.15);
    padding-top: 70px;
  }
  .menu-item{
    float: left;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    line-height: 30px;
    border-top: 1px solid #c8c8c8;
  }
  .menu-item:last-child{
    border-bottom: 1px solid #c8c8c8;
  }
  .menu-item:hover{
    cursor: pointer;
    background: #d9d9d9;
    color: #fff;
  }
  .content{
    width: calc(100% - 170px);
    float: left;
    height: 100%;
    margin-left: 10px;
    overflow-y: auto
  }
</style>
