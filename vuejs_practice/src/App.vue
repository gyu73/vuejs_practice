<template>
  <div id="app" class="app-container">
    <!-- transitioonはviewのタグ -->
    <transition name="fade">
    <router-view></router-view>
    </transition>
    <!-- そしてrouterが呼ばれる。このrouterの部分でroutingが表示される。ここで画面が切り替わる -->
    <!-- router/index.jsで設定されている -->
  </div>
</template>

<!-- リッチな印象。
フェードをして見る。 -->

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 1.25s;
}
// 0.25s間opacityを操作する。
// 時間経過で何かしら演出するスタイル
// opacityは透明度

.fade-enter-active {
  transition-delay: 1.25s;
}
// 0.25びょう遅れて実行

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
// opacityは0~1を持つ
// 0が完全透明
// 1が完全不透明
</style>
