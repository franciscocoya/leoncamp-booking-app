<script setup>

// Iconos
import { ICON_VERIFIED_USER_ITEM } from "@/helpers/iconConstants";

const props = defineProps({
  verifiedText: {
    type: String,
    default: "",
  },
  verifiedIcon: {
    type: String,
    default: ICON_VERIFIED_USER_ITEM,
  },
});
</script>

<template>
  <div class="verified-user-item">
    <img :src="props.verifiedIcon" :alt="props.verifiedText" />
    <span>{{ props.verifiedText }}</span>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.verified-user-item {
  @include flex-row;
  align-items: center;
  gap: 10px;

  // Estilos icono verificación
  & > img {
    width: 20px;
    height: 20px;
  }

  // Estilos descripción de la verificación realizada
  & > span {
      font-size: 1rem;
  }
}
</style>