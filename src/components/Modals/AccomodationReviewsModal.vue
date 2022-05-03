<script setup>
// Utils
import { getAccomodationServiceImageById } from "@/helpers/utils";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import SingleAccomodationReviewItem from "@/components/Accomodation/AccomodationReview/SingleAccomodationReviewItem.vue";

const props = defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
  iconSize: {
    type: Number,
    default: 24,
  },
});

const emit = defineEmits(["close-modal"]);

const closeModal = () => {
  emit("close-modal");
};
</script>

<template>
  <div class="base-modal">
    <div class="base-modal-window">
      <BaseButton
        text="x"
        buttonStyle="baseButton-close--filled"
        id="bt-close-modal"
        title="Cerrar la ventana"
        @click="closeModal"
      />
      <h2>Valoraciones del alojamiento</h2>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <SingleAccomodationReviewItem :review="review" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.base-modal-window {
  @include flex-column;
  gap: 20px;
  width: 30%;
  height: 60vh;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: $global-border-radius;
  overflow: hidden;

  & > #bt-close-modal {
    align-self: flex-start;
  }

  & > h2 {
    color: $color-dark;
  }
}

ul {
  @include flex-column;
  padding: 0;
  gap: 30px;
  list-style: none;
  overflow-y: scroll;
  margin-right: -50px;

  & > li {
    @include flex-row;
    gap: 15px;
    margin-bottom: 1px solid $color-tertiary-light;
  }
}
</style>