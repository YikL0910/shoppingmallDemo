<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" alt="" width="100%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">价格:{{ goodsInfo.PRESENT_PRICE | moneyFilter }}</div>
    <div>
      <!-- swipeable: 开启手势滑动切换-->
      <!-- sticky： 使用粘性定位布局，也就是开启吸顶效果 -->
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价"> 正在制作中 </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
        <div>
            <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
        </div>
        <div>
            <van-button size="large" type=danger>直接购买</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import {toMoney} from '@/filter/moneyFilter'

export default {
  data() {
    return {
      goodsId: "775e575ce28a4f89b1dfe2c99eb08ae7",
      goodsInfo: {},
    };
  },
  filters: {
      moneyFilter: function(money) {
          return toMoney(money);
      }
  },
  created() {
    /**
     * params传参与query 传参的区别：
     *    - params路径只能使用name，取数据时用params获取
     *    - query路径用path，取数据时用query获取
     */
  
    this.goodsId = this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId;
    // console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart(){
      let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[]
      let isHaveGoods=cartInfo.find(item=>item.goodsId==this.goodsId)
      if(!isHaveGoods){
        let newGoodsInfo={
          goodsId:this.goodsInfo.ID,
          Name:this.goodsInfo.NAME,
          price:this.goodsInfo.PRESENT_PRICE,
          image:this.goodsInfo.IMAGE1,
          count:1
        }
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo=JSON.stringify(cartInfo);
        Toast.success('添加成功')
      }else{
        Toast.success("已有此商品")
      }
      this.$router.push({name:'Cart'})
    },
  },
};
</script>

<style  scoped>
    .detail{
        font-size: 0;
    }
    .goods-name{
        background-color: #fff;
        text-align: center;
    }
    .goods-price{
        background-color: #fff;
        text-align: center;
    }
    .goods-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom >div{
        flex: 1;
        padding: 5px;
    }
</style>