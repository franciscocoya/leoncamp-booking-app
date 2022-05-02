<script setup>
import { onMounted } from "@vue/runtime-core";

import { getAccomodationServiceImageById } from "@/helpers/utils";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

const props = defineProps({
  services: {
    type: Array,
    default: () => [],
  },
  iconSize: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <div class="accomodation-services-container">
    <ul class="accomodation-services__list">
      <li
        v-for="(service, index) in props.services.length > 8
          ? props.services.slice(0, 8)
          : props.services"
        :key="index"
      >
        <img
          :src="
            getAccomodationServiceImageById(
              service.accomodationAccServiceId.idAccomodationService.id
            )
          "
          alt=""
          :width="props.iconSize"
          :height="props.iconSize"
        />
        <span>
          {{
            service.accomodationAccServiceId.idAccomodationService.denomination
          }}
        </span>
      </li>
    </ul>
    <BaseButton
      v-if="props.services.length > 8"
      :text="`Mostrar los ${props.services.length} servicios`"
      buttonStyle="baseButton-dark--outlined"
      buttonWidth="250px"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.accomodation-services-container {
  @include flex-column-center;
  // Estilos listado de servicios
  & > .accomodation-services__list {
    line-height: 2.5rem;
    list-style: none;
    column-count: 2;

    & > li {
      @include flex-row;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
