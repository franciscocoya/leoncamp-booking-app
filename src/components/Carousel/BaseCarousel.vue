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
  slidesPerView: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 0,
  },
  sliderWidth: {
    type: Number,
    default: 300,
  },
  sliderHeight: {
    type: Number,
    default: 200,
  },
  slideWidth: {
    type: Number,
    default: 300,
  },
});
</script>

<template>
  <div>
    <swiper
      v-if="images.length > 0"
      :pagination="{
        dynamicBullets: true,
        clickable: true,
      }"
      :keyboard="{
        enabled: true,
      }"
      :navigation="true"
      :modules="modules"
      :slidesPerView="slidesPerView"
      :spaceBetween="spaceBetween"
      :autoHeight="false"
      :style="`width: ${sliderWidth}px; height: ${sliderHeight}px;`"
      class="myswiper"
    >
      <swiper-slide
        v-for="(img, index) in images"
        :key="index"
        :style="`width: ${slideWidth}px`"
      >
        <img :src="img" alt="" />
      </swiper-slide>
    </swiper>
    <div v-else class="carousel-no-images">
      No hay imágenes
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.swiper {
  border-radius: 10px;
}
.swiper-slide {
  height: auto;
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

.carousel-no-images {
  @include flex-column-center;
  width: 300px;
  height: 200px;
  background-color: $color-tertiary-light;
  border-radius: $global-border-radius;
  font-size: 1.1rem;
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

// -------------------------------
// -- Responsive design
// -------------------------------
@media (max-width: $breakpoint-sm) {
  .carousel-no-images {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>