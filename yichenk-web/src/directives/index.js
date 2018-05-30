import Vue from 'vue'

console.log(jQuery);
require('../../static/lib/um/themes/default/css/umeditor.css');
require('../../static/lib/um/umeditor.config');
require('../../static/lib/um/umeditor');
require('../../static/lib/um/lang/zh-cn/zh-cn');

Vue.directive('vueUEditor',{
  bind:function(el,binding){
    console.log(el);
    console.log($);
    // $(el).append($('<script id="ueditor-demo"></script>'));
    setTimeout(function(){
      console.log(UM);
      var editor =  UM.getEditor('ueditor-demo', {
        initialFrameWidth:'100%',
        initialFrameHeigh:'200px;',
        UMEDITOR_HOME_URL:'/static/lib/um/'
      });
    },50)
  }
});
