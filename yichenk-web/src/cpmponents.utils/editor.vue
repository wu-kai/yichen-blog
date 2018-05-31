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
		    content:''
      }
    },
    computed:{
      ...mapState({
        editingContent:state=>state.test.editingContent
      })
    },
    props:['id'],
    mounted(){
      console.log(123);
      const self = this;
      $(this.$el).append($('<div id="'+self.id+'"></div>'));
      self.editor = UE.getEditor(self.id, {
        initialFrameWidth:'50%',
        initialFrameHeight:'500',
        UEDITOR_HOME_URL:'/static/lib/ueditor-utf8-php/'
      });
      if(self.editingContent){
        self.editor.addListener("ready", function () {
          self.editor.setContent(self.editingContent);
        });
      }
      self.editor.addListener('contentChange',function(){
        self.content = self.editor.getContent();
        self.$store.commit('saveContent',self.content);
      });
    },
    beforeDestroy(){
      console.log('dddd');
//      this.editor.removeAllListeners();
//      this.editor.clearRange();
    }
	}
</script>

<style scoped>

</style>
