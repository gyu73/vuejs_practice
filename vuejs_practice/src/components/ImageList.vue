<template>
  <div id="image-list">
    <custom-navi pageName="画像一覧"></custom-navi>
    <ul class="list">
      <!--  for文をこの中で使う -->
      <!-- v-bindは紐付けを表している -->
      <!-- v-bind:dataはvueclを入れると怒るから定義してあげた -->
      <!-- :はv-bind:imageUrlの:を省略した記法 -->
      <image-item v-for="item in images" v-bind:data="item" v-bind:key="item.url" :imageUrl="item.url" :imageId="item.id"></image-item>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import CustomNavi from './CustomNavi';
import ImageItem from './ImageItem';
import AjaxFlickrList from '../services/AjaxFlickrList';

export default {
  name: 'image-list',
  components: {
    CustomNavi,
    ImageItem,
  },
  data() {
    return {
      images: [],
    };
  },
  // mountされる直前に読み込まれる。これがmounted()である！
  // <!-- vue.jsにはいくつかAPIが用意されている
  // componentsやdataやmountedやinitialなど
  // 決められた名前がある。
  // その決められた定義を見て処理を行っている
  //
  // dataはコンポーネントの中のローカル変数！！
  // vueファイルの中で自由に使える関数！！ -->
  //
  // <!-- vue.jsがまず
  // new Vewしたタイミングで、、、
  // vue.jsが読み込まれた後にHTMLを解析する
  // HTMLを解析し始めてvueに書かれたものを読み込む
  // vueに書かれたものを埋め込んだ後に実行する処理。 -->
  mounted() {
        // これはクラスのイメージ
    const ajax = new AjaxFlickrList();
    // AjaxFlickrListの中にあるloadとい関数を呼ぶ
        // thenはpromiseの定義。loadが成功したら行う処理をthen()にかく。
        // 第一引数にfunctionをかく。
        // thenの中にはloadで撮ってきた引数を入れる
        // _の中にはforEachやfilteringなど、普通のJSで花井便利関数が集まっている。
        // ある条件に一致したのものをとる
        // forEachは第一引数に指定したものの中を操作する。
    ajax.load().then((_data) => {
      //       // このphotoは配列。第二引数に、第一引数で獲得したものを入れる

      _.forEach(_data.photos.photo, (photo) => {
        this.images.push({
          url: photo.imageurl,
          title: photo.title,
          id: photo.id,
        });
      });
    });
  },
};
</script>

<style scoped lang="scss">
.list {
  // flexは親と子がしっかりとflexでないと動かない。
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // デフォルトは左に寄ったやつを中心よりで表現する
  margin: 0 auto;
  max-width: 900px;
  position: relative;
  width: 100%;
}
</style>
