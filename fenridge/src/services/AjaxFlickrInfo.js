// import * as _ from 'lodash';
import CONST from './const';
import AjaxFlickrBase from './AjaxFlickrBase';

export default class AjaxFlickrInfo extends AjaxFlickrBase {
  constructor() {
    super();
    this.setData({
      method: 'flickr.photos.getInfo',
      api_key: CONST.FLICKR.API_KEY,
      format: 'json',
    });
  }

  setPhotoId(_photoId) {
    this.options.data.photo_id = _photoId;
    return this;
  }

  load() {
    return super.load().then((_data) => {
      const photo = _data.photo;
      photo.imageurl = AjaxFlickrBase.getPhotoUrl(photo);
      return photo;
    });
  }
}
