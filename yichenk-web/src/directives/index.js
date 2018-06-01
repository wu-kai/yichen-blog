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

Vue.directive('showSocialistValues',{
  inserted:function(el,binding){
    const values = ['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'];
    $(el).on('click',function(event){
      console.log(event.pageX);
      console.log(event.pageY);
      const n = Math.floor(Math.random() * values.length + 1)-1;
      const value = values[n];
      console.log(value);
      const $showEl = $('<div class="showSocialistValues">'+value+'</div>');
      $showEl.css({
        left:event.pageX-14+'px',
        top:event.pageY-16+'px',
        position:'absolute'
      });
      $(this).append($showEl);
      setTimeout(function(){
        $showEl.remove()
      },3600)
    });
  }
});
