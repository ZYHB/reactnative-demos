import API from './api';
import {requestManager} from './jingdong';
class CommonService {
  fetchPersoninfoBusiness() {
    const fullUrl = API.GET_JINGDONG_REPO('tab/person/personinfoBusiness.json');
    return requestManager.get(fullUrl);
  }

  fetchUniformRecommendTabs() {
    const fullUrl = API.GET_JINGDONG_REPO(
      'tab/person/uniformRecommend/uniformRecommend.json',
    );
    return requestManager.get(fullUrl);
  }

  fetchUniformRecommend(tabId, page) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/person/uniformRecommend/tabId/${tabId}/result_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }
  /**
   * 浏览历史
   * @param {页数} page
   * @returns
   */
  fetchBrowseHistory(page) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/person/browseHistory/result_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }

  /**
   * 商品收藏
   * @param {页数} page
   * @returns
   */
  fetchProductFavorite(page) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/person/favorite/result_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }

  /**
   * 订单列表
   * @param {订单类型} orderType
   * @param {当前页} page
   * @returns
   */
  fetchOrderList(orderType, page) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/person/order/${orderType}/result_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }

  /// 快手短视频
  fetchKuaiShowVideoList(page) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `kuaishou/operationName/brilliantTypeDataQuery/result_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }
}

export let commonService = new CommonService();
