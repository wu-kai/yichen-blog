<template>
    <div class="resume">
      <button onclick="location.href = 'http://www.yichenk.com/libStatic/resume.html'">在线浏览</button>
      <button onclick="location.href = 'http://pc5833j8t.bkt.clouddn.com/%E5%90%B4%E5%87%AF%E7%9A%84%E7%AE%80%E5%8E%86.doc'">下载PDF</button>
      <button onclick="location.href = 'http://pc5833j8t.bkt.clouddn.com/%E5%90%B4%E5%87%AF%E7%9A%84%E7%AE%80%E5%8E%86.pdf'">下载DOC</button>
    </div>
</template>

<script>
  export default {
    name: "Resume"
  }
</script>

<style scoped>
    .resume{
        padding-top:300px;
    }

    button:hover{
      color: #00ff00;
      background: #0f0f0f;
    }
</style>
