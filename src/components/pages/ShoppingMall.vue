<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="50%" alt="" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" placeholder="查找" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini" type="default" block class="search-button"> 查找 </van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
        <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                <img v-lazy="banner.image" width="100%">
            </van-swipe-item>
        </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
        <div v-for="(cate,index) in category" :key="index">
            <img v-lazy="cate.image" width="100%">
            <span>{{cate.mallCategoryName}}</span>
        </div>
    </div>
    <!-- ad banner area -->
    <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" alt="">
    </div>

    <!-- Recommend goods area -->
    <div class="recommend-area">
        <div class="recommend-title">商品推荐</div>
        <div class="recommend-body">
            <!-- vue-awesome-swiper -->
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                    <div class="recommend-item">
                        <img :src="item.image" width="80%" alt="">
                        <div>{{item.goodsName}}</div>
                        <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice}})</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>

    <!-- <swiper-default></swiper-default> -->
    <!-- floor  area -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!--  Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import swiperDefault from '../swiper/swiperDefault.vue'
import floorComponent from '../component/floorComponent.vue'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent.vue'
import url from '@/serviceAPI.config.js'
export default {
  data() {
    return {
    swiperOption:{
        slidesPerView:3,
        
    },
      msg: "shopping mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category:[],
      adBanner:'',
      recommendGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods:[],
    };
  },
  filters: {
    moneyFilter: function(money) {
      return toMoney(money);
    }
  },
  components:{
    Swiper, SwiperSlide,swiperDefault,floorComponent,goodsInfo
  },
  created(){
      axios({
          url:url.getShoppingMallInfo,
          method:'get',
      }).then(response=>{
          console.log(response)
          if(response.status==200){
              this.category=response.data.data.category;
              this.adBanner=response.data.data.advertesPicture;
              this.bannerPicArray=response.data.data.slides;
              this.recommendGoods=response.data.data.recommend;
              this.floor1=response.data.data.floor1;
              this.floor2=response.data.data.floor2;
              this.floor3=response.data.data.floor3;
              this.floorName=response.data.data.floorName;
              this.hotGoods=response.data.data.hotGoods;
          }
      }).catch(error=>{
          console.log(error)
      })
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
  margin:0.3rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border: 0;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #131313;
}
.search-button{
  width: 80%;
  margin: .2rem auto;
}
.swiper-area{
    width: 20rem;
    clear: both;
}
.type-bar{
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div{
    /* 解决获取到的图片大小不一致的问题  */
    flex: 1;  
    padding: .3rem;
    font-size: 10px;
    text-align: center;
}
.recommend-area{
    background-color: #fff;
    margin-top: .3rem;
}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
}
.recommend-body{
    border-bottom: 1px solid #eee;
}
.recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}

.hot-area{
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods{
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>