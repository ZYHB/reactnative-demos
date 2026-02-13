import API from './api';
import { requestManager } from './jingdong';

class HomeService {
  fetchWelcomeHome(): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO('tab/home/welcomeHome.json');
    return requestManager.get(fullUrl);
  }

  fetchCategoryHome(pcid: string): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/home/category/pcid/${pcid}/categoryHome.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchCategoryFeeds(pcid: string, page: number): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/home/category/pcid/${pcid}/categoryFeeds_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchHoursHome(): Promise<any> {
    const fullUrl = API.GET_JINGDONG_REPO('tab/home/hours/hours_home.json');
    return requestManager.get(fullUrl);
  }
}

export const homeService = new HomeService();
