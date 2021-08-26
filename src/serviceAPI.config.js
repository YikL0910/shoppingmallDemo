const BASEURL = "https://mockapi.eolinker.com/bnDU3zy6b0caff7a75315b1bd0af90f545b64b1b7cfd6ee/smile/";
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getShoppingMallInfo: BASEURL + 'getData',
    getGoodsInfo: BASEURL + 'getData',
    registerUser: LOCALURL + 'user/register',
    loginUser: LOCALURL + 'user/login',
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
    getCategoryList: LOCALURL + 'goods/getCategoryList',
    getCategorySubList: LOCALURL + 'goods/getCategorySubList', //得到小类信息
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID', //得到小类商品信息
}

module.exports = URL