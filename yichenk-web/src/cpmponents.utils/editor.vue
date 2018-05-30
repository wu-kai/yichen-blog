<template>
  <div :id="id"></div>
</template>

<script>

  require('../../static/lib/ueditor-utf8-php/themes/default/css/ueditor.css');
  require('../../static/lib/ueditor-utf8-php/ueditor.config');
  require('../../static/lib/ueditor-utf8-php/ueditor.all');
  require('../../static/lib/ueditor-utf8-php/ueditor.parse.min');
  require('../../static/lib/ueditor-utf8-php/lang/zh-cn/zh-cn');

	export default {
		name: 'editor',
    data:function(){
		  return {
		    content:''
      }
    },
    props:['id'],
    mounted(){
      const self = this;
      const editor = UE.getEditor(self.id, {
        initialFrameWidth:'100%',
        initialFrameHeight:'500',
        UEDITOR_HOME_URL:'/static/lib/ueditor-utf8-php/'
      });
      console.log(self.$store.state.editingContent);
      if(self.$store.state.editingContent){
        editor.addListener("ready", function () {
          editor.setContent(self.$store.state.editingContent);
        });
      }
      editor.addListener('contentChange',function(){
        self.content = editor.getContent();
        self.$store.commit('saveContent',self.content);
      });
    }
	}
</script>

<style scoped>

</style>
