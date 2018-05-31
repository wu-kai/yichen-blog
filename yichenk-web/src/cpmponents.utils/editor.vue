<template>
  <div></div>
</template>

<script>

  require('../../static/lib/ueditor-utf8-php/themes/default/css/ueditor.css');
  require('../../static/lib/ueditor-utf8-php/ueditor.config');
  require('../../static/lib/ueditor-utf8-php/ueditor.all');
  require('../../static/lib/ueditor-utf8-php/ueditor.parse.min');
  require('../../static/lib/ueditor-utf8-php/lang/zh-cn/zh-cn');
  import { mapState } from 'vuex';
	export default {
		name: 'editor',
    data:function(){
		  return {
      }
    },
    computed:{
      ...mapState({
        editingContent:state=>state.test.editingContent
      })
    },
    props:['id','height','width','content'],
    mounted(){
      const self = this;
      $(this.$el).append($('<div id="'+self.id+'"></div>'));
      self.editor = UE.getEditor(self.id, {
        initialFrameWidth:self.width||'100%',
        initialFrameHeight:self.height||'500',
        UEDITOR_HOME_URL:'/static/lib/ueditor-utf8-php/'
      });
      if(self.content){
        self.editor.addListener("ready", function () {
          self.editor.setContent(self.content||'');
        });
      }
      self.editor.addListener('contentChange',function(){
        self.$store.commit('saveTempBlogContent',self.editor.getContent());
      });
    },
    beforeDestroy(){}
	}
</script>

<style scoped>

</style>
