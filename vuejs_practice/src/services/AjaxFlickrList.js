import * as _ from 'lodash';
import CONST from './const';
import AjaxFlickrBase from './AjaxFlickrBase';

// ajax通信でflickeAPIを叩いている
// 一覧表示を行う


export default class AjaxFlickrList extends AjaxFlickrBase {
  constructor() {
    super();
    this.setData({
      method: 'flickr.photos.getRecent',
      api_key: CONST.FLICKR.API_KEY,
      per_page: 48,
      safe_search: 3,
      format: 'json',
    });
  }


  // api通信する
  // _dataはdataそのもの。オブジェクトである
  // _
  load() {
    return super.load().then((_data) => {
      _.forEach(_data.photos.photo, (_photo) => {
        const photo = _photo;
        photo.imageurl = AjaxFlickrBase.getPhotoUrl(_photo);
        return photo;
      });
      return _data;
    });
  }
}
