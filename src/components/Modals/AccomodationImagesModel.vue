<script setup>
// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["close-modal"]);

const closeModal = () => {
  emit("close-modal");
};
</script>

<template>
  <div class="base-modal">
    <div class="base_modal__overlay" @click.prevent="closeModal"></div>
    <div class="base-modal-window">
      <BaseButton
        text="x"
        buttonStyle="baseButton-close--filled"
        id="bt-close-modal-acc-images"
        title="Cerrar la ventana"
        @click="closeModal"
      />
      <h2 v-t="'modals.accomodation_images.title'"></h2>
      <div class="base-modal__accomodation-images-container">
        <img
          v-for="(url, index) in images"
          :key="index"
          :id="`img_preview_${index}`"
          :src="url.imageUrl"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.base-modal {
  & > .base_modal__overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - $header-height);
    z-index: $z-index-4;
  }

  & > .base_modal__overlay {
    z-index: $z-index-4;
  }
  .base-modal-window {
    @include flex-column;
    gap: 20px;
    width: 70%;
    height: 90%;
    padding: 20px 50px;
    background-color: #fff;
    border-radius: $global-border-radius;
    position: relative;
    z-index: $z-index-5;

    & > #bt-close-modal-acc-images {
      align-self: flex-end;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    & > h2 {
      color: $color-dark;
    }

    & > .base-modal__accomodation-images-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      gap: 10px;
      overflow-y: scroll;
      overflow-x: hidden;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      & > .--img-fullscreen {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .base-modal {
    @include flex-column;
    justify-content: center;
    height: 100vh;
    z-index: $z-index-5;

    .base-modal-window {
      width: 90%;
      height: 70%;
      margin-bottom: 30%;
      padding: 10px;

      & > .base-modal__accomodation-images-container {
        @include flex-column;
        border-radius: $global-border-radius;
      }
    }
  }
}
</style>