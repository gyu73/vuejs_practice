<template>
  <div>
    <!-- flickerからの返されたものに_contentがある -->
    <!-- v-ifとするとこのイコールの跡がtrueならcustom-naviを表示し、 -->
    <!-- falseならcustom-naviは動かない！ -->
    <!-- こうすることによって、imageTitleの中身がundefinedならこのcustom-naviが動かない -->
    <!-- imageTitleの中に値が入った瞬間にcustom-naviが動くようになる。 -->
    <custom-navi v-if="imageTitle" :pageName="imageTitle._content"></custom-navi>
    <div>
      <!-- 画像の余白がありつつ。というような書き方。 -->
      <div class="viewer__image">
        <div class="image__wrapper" v-bind:style="{'background-image': 'url(' + imageUrl + ')'}">
        </div>
        <div class="viewer__meta-info">
          <div v-if="imageDescription" class="meta-info__description">
            <div class="subject">Description</div>
            <div class="content">{{ imageDescription._content }}</div>
          </div>
          <div class="meta-info__ownername">
            <div class="subject">OwnerName</div>
            <div class="content">{{ imageOwner }}</div>
          </div>
          <div class="meta-info__tags">
            <div class="subject">Tags</div>
            <div class="content">
              <ul>
                <!-- // imageTagsという配列をitemとして使う。 -->
                <!-- htmlにおいて属性値の順番は自由 -->
                <li v-if="item" v-for="(item, index) in imageTags" v-bind:key="index" v-bind:data="item">
                  {{ item._content}}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <!-- routingを使う -->
            <!-- route.index.jsで定義しているnameをここで使う！！
            すると、そのコンポーネントが呼ばれる -->
            <router-link :to="{name:'ImageList'}">Back</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import AjaxFlickrList from '../services/AjaxFlickrInfo';
import CustomNavi from './CustomNavi';

export default {
  name: 'detail',
  components: {
    CustomNavi,
  },
  // 受けるデータの箱を用意。
  data() {
    return {
      imageUrl: null,
      imageTitle: null,
      imageDescription: null,
      imageOwner: null,
      imageTags: null,
    };
  },
  // 少しでも早く表示させたいから。
  // 引っ張ってきたレスポンスの中の様子を参照しているケース
  // imagetitleと言われる中のコンテント
  // nullの中のコンテントを参照しようとするとエラーが吐くので
  // beforemount()にしている。
  // mountする直前に呼び出している。
  // 具体的にいうと、imageDescription._contentのところで
  // もしもimageDescrtptionがundefinedならエラーを吐いてしまう。
  beforeMount() {
    const ajax = new AjaxFlickrList();
    // path: '/detail/:id'の:idはこのコンポーネントの中でidとして呼び出せる！！
    ajax.setPhotoId(this.$route.params.id).load().then((data) => {
      this.imageUrl = data.imageurl;
      this.imageTitle = data.title;
      this.imageDescription = data.description;
      this.imageOwner = data.owner.username;
      this.imageTags = data.tags.tag;
    });
  },
};
</script>

<style scoped lang="scss">
.viewer__image {
  border: 1px dotted #eee;
  // 幅1pxの.がら
  height: auto;
  margin: 0 auto;
  max-width: 400px;
  padding: 4px;
  width: 90%;
}
// 枠を作る


.image__wrapper {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  max-width: 390px;
  min-height: 390px;
  width: 100%;
}

//　背景画像としてだす

.viewer__meta-info {
  border-top: 1px dotted #eee;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  max-width: 400px;
  padding-bottom: 32px;
  padding-top: 16px;
}

.meta-info__description,
.meta-info__ownername {
  display: flex;
  margin-bottom: 16px;

  .subject {
    flex: 0 0 auto;
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
    width: 120px;
  }

  .content {
    flex: 1 1 auto;
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
  }
}

.meta-info__tags {
  display: flex;
  margin-bottom: 24px;

  .subject {
    flex: 0 0 auto;
    font-size: 16px;
    text-align: left;
    width: 120px;
  }

  .content {
    flex: 1 1 auto;
    .tags {
      text-align: left;

      .tags__item {
        font-size: 16px;
      }
    }
  }
}

.tags {
  .tags__item {
    list-style-type: square;
    list-style-position: outside;
    margin-left: 24px;
  }
}
</style>
