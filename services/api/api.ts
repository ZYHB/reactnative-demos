interface ApiConfig {
  GET_POPULAR_REPO: (language: string) => string;
  GET_TRENDING_REPO: (language: string, since?: string) => string;
  GET_JINGDONG_REPO: (url: string) => string;
}

const api: ApiConfig = {
  GET_POPULAR_REPO: language =>
    `https://api.github.com/search/repositories?q=${language}&sort=stars`,
  GET_TRENDING_REPO: (language, since = 'daily') =>
    `https://ghapi.huchen.dev/repositories?language=${language}&since=${since}`,

  // GET_JINGDONG_REPO: url =>
  //   `https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/${url}`,
  GET_JINGDONG_REPO: url =>
    `https://raw.githubusercontent.com/MiaoPaSiRN/mstartapp/main/AwesomeProject/mock-data/functionId/%40new/${url}`,
};

export default api;
//https://raw.githubusercontent.com/MiaoPaSiRN/mstartapp/main/AwesomeProject/mock-data/functionId/%40new/tab/cart/cart.json
