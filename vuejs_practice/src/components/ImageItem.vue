<template>
  <li class="list__item">
    <router-link :to="{name: 'Detail', params:{id: imageId}}" class="image__item" v-bind:style="{ 'background-image': 'url(' + imageUrl + ')' }"></router-link>
  </li>
</template>

<!-- router-linkはviewのタブ。 -->

<script>
export default {
  name: 'image-item',
  props: [
    // imageListからこのpropsは受け取っている。
    'imageUrl',
    'imageId',
  ],
};
</script>

<style scoped lang="scss">
.list__item {
  border: 1px solid #eee;
  height: 280px;
  flex: 0 1 auto;
  // ショートハンド記法？
  // flexをシンプルに書く記法
  // 全部ブラウザ任せにしてしまう処理
  // 数年前からmodernなブラウザで見ることができるようになっている。
  list-style-position: outside;
  list-style-type: none;
  min-width: 280px;

  & > .image__item {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    height: 100%;
    width: 100%;
  }
}
</style>
