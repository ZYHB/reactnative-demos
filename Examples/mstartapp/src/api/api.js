// const GET_POPULAR_REPO = (repo) => `https://api.github.com/search/repositories?q=${repo}&sort=stars`
export default {
  GET_POPULAR_REPO: language =>
    `https://api.github.com/search/repositories?q=${language}&sort=stars`,
  GET_TRENDING_REPO: (language, since = 'daily') =>
    `https://ghapi.huchen.dev/repositories?language=${language}&since=${since}`,

  // GET_JINGDONG_REPO: url =>
  //   `https://gitlab.com/ikumock-data/MockDatas/-/raw/JingDong/20220629/functionId/@new/${url}`,
  GET_JINGDONG_REPO: url =>
    `https://raw.githubusercontent.com/MiaoPaSiRN/mstartapp/main/AwesomeProject/mock-data/functionId/%40new/${url}`,
};
//https://raw.githubusercontent.com/MiaoPaSiRN/mstartapp/main/AwesomeProject/mock-data/functionId/%40new/tab/cart/cart.json
