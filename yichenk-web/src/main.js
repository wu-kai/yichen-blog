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
import util from './js/util'

require('./css/font-awesome.css');
require('./css/common.css');

Vue.use(VueBlu);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

const INIT_URL = encodeURIComponent(location.href.split('#')[0]);

const wxShare = {
  title: 'test',
  desc: 'only test',
  link: 'yichenk.com',
  imgUrl: 'http://p9kmzrcfb.bkt.clouddn.com/default-blog-img-1.jpg'
};
if (false) {
  axios({
    method: 'GET',
    url: '/wxJssdk/getJssdk',
    params: {
      url: INIT_URL
    }
  }).then((response) => {
    var data = response.data.data;

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {

      console.log('验证成功');

      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          console.log('检测JS接口列表',res);
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      });
    });

    wx.error(function (res) {
      console.log('验证失败',res.errMsg);
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
