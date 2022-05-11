<script setup>
import { onMounted, ref } from "vue";

// Icono
import { ICON_INFO } from "@/helpers/iconConstants";

import { createPopper } from '@popperjs/core/lib/popper-lite.js';

defineProps({
  text: {
    type: String,
    default: "",
  },
});

const showMessage = ref(false);

/**
 * Manejador evento click del icono de información.
 */
const handleIconClick = () => {
  showMessage.value = !showMessage.value;
};

onMounted(() => {
  createPopper(
    document.querySelector("#info-icon-image"),
    document.querySelector("#toolip"),
    {
      placement: "right",
    }
  );
});
</script>

<template>
  <div class="info-icon">
    <img
      :src="ICON_INFO"
      alt="Icono que contiene información acerca del elemento o vista donde se ubica."
      id="info-icon-image"
      @click.prevent="handleIconClick"
    />
    <Transition name="fade">
      <div v-if="showMessage" id="toolip" role="tooltip">{{ text }}</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";
.info-icon {
  @include flex-row;
  gap: 5px;

  & > img {
    width: 24px;
    height: auto;
    cursor: pointer;
  }

  & > #toolip {
    background: $color-tertiary-dark;
    padding: 3px 10px;
    border-radius: 5px;
    color: $color-dark;
    font-size: 0.9rem;
    font-weight: 300;
  }
}
</style>