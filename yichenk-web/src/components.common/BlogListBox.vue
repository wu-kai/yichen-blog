<template>
    <div>
        <BlogItem v-for="blog in list"
                  :blog="blog"
                  :key="blog._id">
        </BlogItem>
    </div>
</template>

<script>
  import BlogItem from '../components.common/BlogItem.vue'
  export default {
    name: 'BlogListBox',
    data:function(){
      return {
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
    components:{
      BlogItem
    }
  }
</script>

<style scoped>

</style>
