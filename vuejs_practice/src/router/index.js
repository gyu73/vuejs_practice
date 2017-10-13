import Vue from 'vue';
import Router from 'vue-router';
import ImageList from '@/components/ImageList';
// ここでvueをimportすればよい！！
// @をつけるとnode_modules以外のこのディレクトリから探すという明治をする
// 基本的にimport Vue from 'vue'などはnode_modulesから読み込もうとしている。
// @ をつけるとvuejsのファイルだと明示することができる。
import Detail from '@/components/Detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ImageList',
      component: ImageList,
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
    },
  ],
});
