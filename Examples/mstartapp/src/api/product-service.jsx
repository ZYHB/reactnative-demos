import API from './api';
import {requestManager} from './jingdong';
class ProductService {
  fetchWareBusiness(shopId, sku) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/wareBusiness.json`,
    );
    return requestManager.get(fullUrl);
  }
  fetchAsynInteface(shopId, sku) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/asynInteface.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchLegoWareDetailComment(shopId, sku) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/getLegoWareDetailComment.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchObtainGrowingInfo(shopId, sku) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/obtainGrowingInfo.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchQueryTemplates(shopId, sku) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/queryTemplates.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchUniformRecommend(shopId, sku) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/uniformRecommend.json`,
    );
    return requestManager.get(fullUrl);
  }
}

export let productService = new ProductService();
