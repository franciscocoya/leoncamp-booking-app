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
        clickable: true,
      }"
      :keyboard="{
        enabled: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(img, index) in images" :key="index">
        <img :src="img" alt="" class="swiper-lazy" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

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

// Estilos para Swiper

:global(.swiper-button-next),
:global(.swiper-button-prev) {
  color: $color-dark;
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 30px;
  text-align: center;
  opacity: 0.8;
  transition: opacity 0.3s ease-in-out;
}

:global(.swiper-button-next:hover),
:global(.swiper-button-prev:hover) {
  opacity: 1;
}

:global(.swiper-button-next:after),
:global(.swiper-button-prev:after) {
  font-size: 1rem;
  font-weight: 700;
}

:global(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
  width: 0.4rem;
  height: 0.4rem;
}

:global(.swiper-pagination-bullet-active) {
  background: white;
  opacity: 1;
}

:global(.swiper-button-disabled) {
  display: none;
}
</style>