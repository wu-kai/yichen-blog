<template>
  <div class="blog-list common_container">
    <BlogItem v-for="blog in list"
              :blog="blog"
              :key="blog._id">
    </BlogItem>
  </div>
</template>

<script>
  import BlogItem from '../components.common/BlogItem.vue'
  export default {
    name: 'BlogList',
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
    },
    components:{
      BlogItem
    }
  }
</script>

<style scoped>
  .blog-list {
    padding: 150px 0 50px;
  }
</style>
