import Vue from 'vue'

Vue.directive('inputFocus',{
  inserted:function(el,binding){
    const color = $(el).css('border-color');
    $(el).on('focus',function(){
      $(this).css({
        border:'1px solid '+binding.value
      })
    });
    $(el).on('blur',function(){
      $(this).css({
        border:'1px solid '+color
      })
    })
  }
});
