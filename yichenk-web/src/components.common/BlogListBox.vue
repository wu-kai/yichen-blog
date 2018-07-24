<template>
    <div>
        <transition-group name="itemList"
                          :css="false"
                          @before-enter="beforeEnter"
                          @enter="enter"
                          tag="div">
          <BlogItem v-for="(blog,index) in list"
                    class="item"
                    v-lazyLoadList = "scrollTop"
                    v-if="showList"
                    :blog="blog"
                    :data-index="index"
                    :key="blog._id">
          </BlogItem>
        </transition-group>
    </div>
</template>

<script>

  import BlogItem from '../components.common/BlogItem.vue'
  export default {
    name: 'BlogListBox',
    data:function(){
      return {
        showList:false,
        scrollTop:0
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
    watch:{
//      scrollTop(val){
//        console.log(val);
//      }
    },
    components:{
      BlogItem
    },
    mounted(){
      let self = this;
      self.showList = true;
      $('.list-box').scroll(function(){
        self.scrollTop = $('.list-box').scrollTop();
      });

      $('.item').css({
        transition: 'translateX('+1500+'px)'
      })
    },
    methods:{
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.transform = 0;
      },
      enter: function (el, done) {
        let delay = el.dataset.index * 150;
        setTimeout(function () {
          function move(){
            $(el).addClass('move');
          }
          $(el).animate(
            { opacity: 1,translateX: $(el).width()},
            { complete: move}
          );
        }, delay);
      },
    }
  }
</script>

<style scoped>
  .item{
    transform: translateX(270px);
    transition: all 1.2s;
  }
  .item.move{
    transform: translateX(0px);
  }
</style>
