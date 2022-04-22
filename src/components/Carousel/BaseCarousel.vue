<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Navigation, Pagination];

defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div>
    <swiper
      :pagination="{
        dynamicBullets: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(img, index) in images">
        <img
          :src="img"
          alt=""
          :key="index"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  width: 300px;
  height: 200px;
  border-radius: 10px;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>