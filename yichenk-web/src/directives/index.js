import Vue from 'vue'

console.log(jQuery);
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
  bind:function(el,binding){
    console.log(el);
    console.log($);
    // $(el).append($('<script id="ueditor-demo"></script>'));
    setTimeout(function(){

      var editor =  UE.getEditor('ueditor-demo', {
        initialFrameWidth:'100%',
        initialFrameHeigh:'200px;',
        UMEDITOR_HOME_URL:'/static/lib/ueditor-utf8-php/'
      });
    },50)
  }
});
