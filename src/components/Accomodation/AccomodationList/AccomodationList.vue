<script setup>
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Servicios
import { removeAccomodationByRegisterNumber } from "@/services/accomodation/AccomodationService";

// Utils
import { formatArrayAsDate } from "@/helpers/utils";

import { IMG_NOT_FOUND_PLACEHOLDER } from "@/helpers/iconConstants";

const router = useRouter();

/**
 * Manejador click mostrar alojamiento.
 */
const handleShowAccomodation = (registerNumber) => {
  router.push({
    name: "accomodation-detail",
    params: {
      registerNumber,
    },
  });
};

/**
 * Manejador click eliminar alojamiento.
 */
const handleRemoveAccomodation = async (registerNumber) => {
  const opt = window.confirm("¿Estás seguro de eliminar este alojamiento?");

  if (!opt) {
    return;
  }

  await removeAccomodationByRegisterNumber(registerNumber);
};

defineProps({
  accomodations: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="accomodation-list-item">
    <ul>
      <li v-for="acc in accomodations" :key="acc.registerNumbers">
        <img
          :src="
            acc.accomodationImages[0]?.accomodationAccImageId
              .idAccomodationImage.imageUrl ?? IMG_NOT_FOUND_PLACEHOLDER
          "
          alt=""
        />
        <span>{{ formatArrayAsDate(acc.createdAt) }}</span>
        <span>{{ acc.pricePerNight }}€</span>
        <span>{{ acc.registerNumber }}</span>
        <BaseButton
          text="Ver"
          buttonStyle="baseButton-dark--filled--small"
          @click="handleShowAccomodation(acc.registerNumber)"
        />
        <BaseButton
          text="Eliminar"
          buttonStyle="baseButton-danger--filled--small"
          @click="handleRemoveAccomodation(acc.registerNumber)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-list-item {
  & > ul {
    @include flex-column;
    gap: 20px;
    list-style: none;
    padding-left: 0;

    & > li {
      @include flex-row;
      align-items: center;
      gap: 20px;

      & > img {
        width: 80px;
        height: auto;
        border-radius: $global-border-radius;
      }

      & > span {
        @include flex-column-center;
        gap: 10px;
        color: $color-dark;
      }
    }
  }
}
// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .accomodation-list-item {
    & > ul {
       & > li {
         flex-wrap: wrap;
       }
    }
  }
}
</style>