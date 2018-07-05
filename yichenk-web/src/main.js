// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import _ from 'lodash'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import directive from './directives'
import util from './util'

require('./css/font-awesome.css');
require('./css/common.css');


Vue.use(VueBlu);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

const wxShare = {
  title:'test',
  desc:'only test',
  link:'yichenk.com',
  imgUrl:'http://p9kmzrcfb.bkt.clouddn.com/default-blog-img-1.jpg'
};
if (wx) {
  axios.get('/wxJssdk/getJssdk', {url: location.href}).then((response) => {
    var data = response.data;

    console.log(data);

    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {

      console.log('ready '+ wxShare.title);

      wx.onMenuShareTimeline({
        title: wxShare.title,
        desc: wxShare.desc,
        link: wxShare.link,
        imgUrl: wxShare.imgUrl
      });

      wx.onMenuShareAppMessage({
        title: wxShare.title,
        desc: wxShare.desc,
        link: wxShare.link,
        imgUrl: wxShare.imgUrl
      });
    });

    wx.error(function (res) {
      console.log(res.errMsg);
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
