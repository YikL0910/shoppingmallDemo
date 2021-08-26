<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        class="swiper-slide"
        v-for="(item, index) in slide"
        :key="index"
      >
        Slide{{ item }}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      slide: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        loop:true,
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        direction:'vertical',
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped>
.swiper-slide {
  height: 4rem;
  text-align: center;
  line-height: 4rem;
}
.swiper{
    height: 7rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.swiper-pagination{
    color:red;

}
</style>