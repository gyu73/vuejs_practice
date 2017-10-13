// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // メインで表示するid="app"を取得
  router,
  template: '<App/>',
  // id="app"にappendChildしてAppコンポーネント
  // Appのviewから取り込んできてください
  components: { App },
  // Appコンポーネントを呼び出してください
});
