import Vue from 'vue'

// require('../../static/lib/um/themes/default/css/umeditor.css');
// require('../../static/lib/um/umeditor.config');
// require('../../static/lib/um/umeditor');
// require('../../static/lib/um/lang/zh-cn/zh-cn');

require('../../static/lib/ueditor-utf8-php/themes/default/css/ueditor.css');
require('../../static/lib/ueditor-utf8-php/ueditor.config');
require('../../static/lib/ueditor-utf8-php/ueditor.all');
require('../../static/lib/ueditor-utf8-php/ueditor.parse.min');
require('../../static/lib/ueditor-utf8-php/lang/zh-cn/zh-cn');

Vue.directive('vueUEditor',{
  inserted:function(el,binding){
    console.log(binding);
    const id=binding.value.id;
    const content=binding.value.content;
    if(!id){
      return;
    }else{
      $(el).append($('<div id='+id+'></div>'))
    }

    const editor = UE.getEditor(id, {
      initialFrameWidth:'100%',
      initialFrameHeight:'500',
      UEDITOR_HOME_URL:'/static/lib/ueditor-utf8-php/'
    });
    editor.addListener('contentChange',function(){
      binding.value.content = editor.getContent();
      console.log(binding.value.content);
    });
  }
});
