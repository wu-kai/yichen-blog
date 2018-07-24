import Vue from 'vue'

//输入框的边框颜色
Vue.directive('inputFocus', {
  inserted: function (el, binding) {
    const color = $(el).css('border-color');
    $(el).on('focus', function () {
      $(this).css({
        border: '1px solid ' + binding.value
      })
    });
    $(el).on('blur', function () {
      $(this).css({
        border: '1px solid ' + color
      })
    })
  }
});

//点击显示社会主义价值观
Vue.directive('showSocialistValues', {
  inserted: function (el, binding) {
    const values = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
    $(el).on('click', function (event) {
      const n = Math.floor(Math.random() * values.length + 1) - 1;
      const value = values[n];
      const $showEl = $('<div class="showSocialistValues">' + value + '</div>');
      $showEl.css({
        left: event.pageX - 14 + 'px',
        top: event.pageY - 16 + 'px',
        position: 'absolute'
      });
      $(this).append($showEl);
      setTimeout(function () {
        $showEl.remove()
      }, 3600)
    });
  }
});

//鼠标移动上到元素显示提示信息
Vue.directive('mouseOver', {
  inserted: function (el, binding) {
    let message = binding.value || '没有提示信息';
    let $showEl = $('<span class="mouseOverShowMessage">' + message + '</span>');
    $(el).on('mouseover', function () {
      $showEl.css({
        left: event.pageX + 14 + 'px',
        top: event.pageY + 16 + 'px',
        display: 'block'
      });
      $('html').append($showEl)
    });

    $(el).on('mousemove', function () {
      $showEl.css({
        left: event.pageX + 14 + 'px',
        top: event.pageY + 16 + 'px',
      });
    });

    $(el).on('mouseleave', function () {
      $showEl.remove();
    })
  }
});

//列表懒加载，进入屏幕才会显示
Vue.directive('lazyLoadList', {
  bind(el, binding){

  },
  // inserted(el, binding) {
  //   let elTop = $(el).offset().top;
  //   let scrollTop = binding.value;
  //   let windowHeight = $(window).height();
  //   if (scrollTop + windowHeight < elTop) {
  //     $(el).css({
  //       visibility: 'hidden',
  //       transform: 'translateX('+$(el).width()+'px)'
  //     });
  //     $(el).removeClass('move');
  //   }
	//
  // },
  // update(el, binding) {
  //   let elTop = $(el).offset().top;
  //   let scrollTop = binding.value;
  //   let windowHeight = $(window).height();
  //   let isHide = $(el).css('visibility') === 'hidden';
  //   if (isHide) {
  //     $(el).removeClass('move');
  //   }
  //   if (windowHeight - 40 >= elTop && isHide) {
  //     $(el).css({
  //       transition:'translateX(670px)'
  //     });
  //     $(el).css({
  //       visibility: 'visible',
  //       transition:'translateX(0px)'
  //     });
      // el.style.opacity = 0;
      // el.style.transform = 0;
      // setTimeout(function () {
      //   function move(){
      //     $(el).addClass('move');
      //   }
      //   console.log($(el).width());
      //   $(el).animate(
      //     { opacity: 1,translateX: $(el).width()},
      //     { complete: move}
      //   );
      // }, 100);
    // }
  // }
});
