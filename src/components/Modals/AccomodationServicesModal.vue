<script setup>
// Utils
import { getAccomodationServiceImageById } from "@/helpers/utils";

// Iconos
import { ICON_CLOSE } from "@/helpers/iconConstants";

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

const emit = defineEmits(["close-modal"]);

const closeModal = () => {
  emit("close-modal");
};
</script>

<template>
  <div class="base-modal">
    <div class="base-modal-window">
      <!-- Icono cerrar modal -->
      <img
        :src="ICON_CLOSE"
        alt=""
        @click.prevent="closeModal"
        class="close-modal-button"
      />
      <h2>Servicios del alojamiento</h2>
      <ul>
        <li v-for="(service, index) in props.services" :key="index">
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
              service.accomodationAccServiceId.idAccomodationService
                .denomination
            }}
          </span>
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
  height: 80%;
  padding: 20px 50px;
  background-color: #fff;
  border-radius: $global-border-radius;
  overflow: hidden;
  position: relative;

  & > .close-modal-button {
    width: 40px;
    height: auto;
    background-color: $color-tertiary-light;
    border-radius: 100%;
    padding: 10px;
    align-self: flex-start;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
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

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .base-modal-window {
    width: 90%;
    height: 80vh;
    margin-bottom: 20%;
    z-index: $z-index-1;

    & > h2 {
      font-weight: 400;
    }
  }
}
</style>