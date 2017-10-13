import jsonp from 'jsonp';
import CONST from './const';

// ここからはurlを返す処理をしている。

export default class AjaxFlickrBase {
  constructor() {
    this.options = {
      dataType: 'json',
      cache: false,
      data: {},
      headers: {},
    };

    this.setUrl(CONST.FLICKR.BASE_URL);
  }

  setUrl(_url) {
    this.options.url = _url;
    return this;
  }

  setData(_data) {
    this.options.data = _data;
    return this;
  }

  /**
   * URL を組み立てる
   */
  static buildUrl(_baseurl, _param) {
    const params = [];
    Object.keys(_param).forEach((key) => {
      params.push(_param[key]
        ? `${key}=${_param[key]}`
        : `${key}`);
    });
    if (params.length) {
      const param = params.join('&');
      return `${_baseurl}?${param}`;
    }
    return `${_baseurl}`;
  }

  /**
   * Flickr の URL を取得する
   * @param  {[type]} _photo [description]
   * @return {[type]}        [description]
   */
  static getPhotoUrl(_photo) {
    const photo = _photo;
    const farm = photo.farm;
    const server = photo.server;
    const id = photo.id;
    const secret = photo.secret;
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  }

  load() {
    return new Promise((resolve, reject) => {
      jsonp(AjaxFlickrBase.buildUrl(this.options.url, this.options.data), {
        name: 'jsonFlickrApi',
      }, (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }
}
