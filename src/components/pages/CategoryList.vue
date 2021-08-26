<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item, index) in category"
                :key="index"
                :class="{ categoryActive: categoryIndex == index }"
                @click="clickCategory(index, item.ID)"
              >
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                    <div class="list-item-img">
                        <img :src="item.IMAGE1" width="100%" alt="" :onerror="errorImg">
                    </div>
                    <div class="list-item-text">
                        <div>{{item.NAME}}</div>
                        <div>￥{{item.ORI_PRICE |moneyFilter}}</div>
                    </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
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
      category: [],
      categoryIndex: 0,
      active: 0,
      categorySub: [],
      loading: false,
      finished: false,
      isRefresh: false,
      page:1,
      goodList:[],
      categorySubId:'',
      errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
    };
  },
  filters: {
      moneyFilter: function(money) {
          return toMoney(money);
      }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    //让左侧当行适应页面高度
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 -50+ "px";
    document.getElementById("list-div").style.height = winHeight - 90 -50+ "px";
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get",
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page=1
      this.finished=false
      this.goodList=[]
      this.getCategorySubByCategoryId(categoryId);
    },
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList + "/" + categoryId,
        method: "get",
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onLoad() {
      setTimeout(() => {
          this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
          this.getGoodList()
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished=false;
        this.goodList = [];
        this.page=1
        this.onLoad();
      }, 500);
    },
    getGoodList(){
        axios({
            url:url.getGoodsListByCategorySubID,
            method:'post',
            data:{
                categorySubId:this.categorySubId,
                page:this.page
            }
        })
        .then(response=>{
            console.log(response);
            if(response.data.code==200&&response.data.message.length){
                this.page++
                this.goodList=this.goodList.concat(response.data.message)
            }else{
                this.finished=true
            }
            this.loading=false;
            console.log(this.finished)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    onClickCategorySub(index,title){
        this.categorySubId=this.categorySubId[index].ID

        this.goodList=[]
        this.finished=false
        this.page=1
        this.onLoad()
    },
    goGoodsInfo(id){
        console.log("------------------"+id)
        this.$router.push({name:'Goods',params:{goodsId:id}})
    },
  },
};
</script>

<style  scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: coral;
}

#list-div {
  overflow: scroll;
}
.list-item{
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
}
.list-item-img{
    flex: 8;
}
.list-item-text{
    flex: 16;
    margin-top: 10px;
    margin-left: 10px;
}
</style>