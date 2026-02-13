import API from './api';
import {requestManager} from './jingdong';

class HomeService {
  fetchWelcomeHome() {
    const fullUrl = API.GET_JINGDONG_REPO('tab/home/welcomeHome.json');
    return requestManager.get(fullUrl);
  }

  fetchCategoryHome(pcid) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/home/category/pcid/${pcid}/categoryHome.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchCategoryFeeds(pcid, page) {
    const fullUrl = API.GET_JINGDONG_REPO(
      `tab/home/category/pcid/${pcid}/categoryFeeds_${page}.json`,
    );
    return requestManager.get(fullUrl);
  }

  fetchHoursHome() {
    const fullUrl = API.GET_JINGDONG_REPO('tab/home/hours/hours_home.json');
    return requestManager.get(fullUrl);
  }
}

export let homeService = new HomeService();
