import Vue from 'vue';
import Router from 'vue-router';
import ImageList from '@/components/ImageList';
// mport Detail from '@/components/Detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ImageList',
      component: ImageList,
    },
  ],
});
