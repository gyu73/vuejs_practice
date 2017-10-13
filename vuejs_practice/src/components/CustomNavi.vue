<!-- vue.jsには3つに分かれている -->
<template>
  <nav>
    <div>
      {{ pageName }}
    </div>
  </nav>
</template>
<!-- テンプレートには実際に表示するものを書く -->

<script>
export default {
  name: 'custom-navi',
  props: [
    'pageName',
  ],
};

</script>
<!-- scriptにはjsの部分 -->
<!-- データをロードしたり文字を入れ替えたりを担う -->
<style scoped lang="scss">
</style>
<!-- スタイルシートはここに書く -->
