import API from './api';
import { requestManager } from './jingdong';

class ProductService {
  fetchWareBusiness(shopId: string, sku: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/wareBusiness.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchAsynInteface(shopId: string, sku: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/asynInteface.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchLegoWareDetailComment(shopId: string, sku: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/getLegoWareDetailComment.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchObtainGrowingInfo(shopId: string, sku: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/obtainGrowingInfo.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchQueryTemplates(shopId: string, sku: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/queryTemplates.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchUniformRecommend(shopId: string, sku: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `product/shopId/${shopId}/sku/${sku}/uniformRecommend.json`,
    );
    return requestManager.get(fullUrl);
  }
}

export const productService = new ProductService();
