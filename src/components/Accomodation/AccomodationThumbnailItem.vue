<script setup>
import { onMounted, withDefaults } from "vue";
import { useRouter } from "vue-router";

// Iconos
import { ICON_EDIT, ICON_DELETE } from "@/helpers/iconConstants";

// Componentes
import BaseCarousel from "@/components/Carousel/BaseCarousel.vue";
import BaseBadge from "@/components/Accomodation/Badge/BaseBadge.vue";
import SavedAccomodationIcon from "@/components/icons/Accomodation/SavedAccomodationIcon.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import IconButton from "@/components/Buttons/IconButton.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const router = useRouter();

const props = defineProps({
  accData: Object,
  showDeleteButton: {
    type: Boolean,
    default: false,
  },
  showEditButton: {
    type: Boolean,
    default: false,
  },
  isCurrentUserOwner: Boolean,
  savedAccId: Number,
  isMarkerMapSelectionEnable: {
    type: Boolean,
    default: false,
  },
});

const getAccomodationStarAverage = async () => {
  accomodationStore.stars = await accomodationStore.getStarAverage(
    accomodationStore.registerNumber
  );
};

const handleDeleteAccomodation = async () => {
  await accomodationStore.deleteAccomodationBySavedAccId(props.savedAccId);
};

onMounted(() => {
  accomodationStore.registerNumber = props.accData?.registerNumber;
  getAccomodationStarAverage();
});

const emit = defineEmits(["highlightMarker", "deselectMarker"]);

const handleMouseEnter = () => {
  emit("highlightMarker", props.accData.registerNumber);
};

const handleMouseLeave = () => {
  emit("deselectMarker", props.accData.registerNumber);
};
</script>

<template>
  <article
    :class="`accomodation-thumbnail-base ${
      isMarkerMapSelectionEnable && 'highlightActive'
    }`"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseCarousel
      :images="
        accData.accomodationImages.map(
          (img) => img.accomodationAccImageId.idAccomodationImage.imageUrl
        )
      "
    />

    <!-- Detalles del alojamiento -->
    <div
      class="accomodation-thumbnail-detail-container"
      @click.prevent="!showEditButton && router.push(`/accomodation/${accData.registerNumber}`)"
      title="Haz click para el alojamiento"
    >
      <div class="accomodation-thumbnail-detail-container__header">
        <div>
          <!-- Categoría del alojamiento -->
          <BaseBadge
            :text="accData.idAccomodationCategory.accomodationCategory"
            backgroundColor="#F0F0F0"
          />
          <!-- Nombre del alojamiento -->
          <h2>
            {{ accData.idAccomodationCategory.accomodationCategory }} en
            {{ accData.idAccomodationLocation.direction }}
          </h2>
        </div>
        <div>
          <!-- Icono guardar alojamiento -->
          <SavedAccomodationIcon
            v-if="!accData.idUserHost && !isCurrentUserOwner"
          />
          <div class="accomodation-icons">
            <!-- Botón de eliminar -->
            <IconButton
              v-if="showDeleteButton"
              :buttonIcon="ICON_DELETE"
              buttonStyle="iconButton-accomodation-action--delete"
              class="bt-delete-accomodation"
              title="Haz click aquí para eliminar el alojamiento"
              @click="handleDeleteAccomodation"
            />

            <!-- Botón de editar -->
            <IconButton
              v-if="showEditButton && isCurrentUserOwner"
              :buttonIcon="ICON_EDIT"
              buttonStyle="iconButton-accomodation-action"
              class="bt-edit-accomodation"
              title="Haz click aquí para editar el alojamiento"
              @click="
                router.push({
                  name: 'accomodation-edit',
                  params: {
                    accUser: `${encodeURI(accData.idUserHost.name)}-${encodeURI(
                      accData.idUserHost.surname
                    )}`,
                    registerNumber: accData.registerNumber,
                  },
                })
              "
            />
          </div>
        </div>
      </div>
      <div class="accomodation-thumbnail-detail-container__body">
        <p>{{ accData.idAccomodationLocation.direction }}</p>
        <div class="accomodation-thumbnail-detail-container__services"></div>
      </div>
      <div class="accomodation-thumbnail-detail-container__footer">
        <div class="accomodation-star-average-container">
          <!-- Icono de estrella -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5516 2.90848C11.735 2.53686 12.265 2.53686 12.4484 2.90848L14.8226 7.71918C14.8954 7.86676 15.0362 7.96904 15.1991 7.9927L20.508 8.76414C20.9181 8.82373 21.0818 9.32772 20.7851 9.61698L16.9435 13.3616C16.8257 13.4765 16.7719 13.642 16.7997 13.8042L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12.2327 17.1223C12.087 17.0457 11.913 17.0457 11.7673 17.1223L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.20028 13.8042C7.2281 13.642 7.17433 13.4765 7.05648 13.3616L3.21491 9.61698C2.91815 9.32772 3.08191 8.82373 3.49202 8.76414L8.80094 7.9927C8.9638 7.96904 9.10458 7.86676 9.17741 7.71918L11.5516 2.90848Z"
              fill="#F5562A"
              stroke="#F5562A"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span>{{ accomodationStore.stars }}</span>
        </div>
        <div class="accomodation-price-per-night">
          <span>{{ accData.pricePerNight }} €</span>
          <span>&nbsp; / noche</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-thumbnail-base {
  @include flex-row;
  gap: 20px;

  // Estilos parte derecha (Detalles del alojamiento)
  & > .accomodation-thumbnail-detail-container {
    @include flex-column-between;
    cursor: pointer;
    // Estilos header
    & > .accomodation-thumbnail-detail-container__header {
      @include flex-row-space-between;
      gap: 20px;

      & > div {
        // Contenedor nombre y categoría del alojamiento
        &:first-of-type {
          & > span {
            font-size: 14px;
            font-weight: 300;
            color: #828282;
          }

          // Estilos nombre del alojamiento
          & > h2 {
            font-size: 18px;
            font-weight: 500;
            color: #1a1a1a;
          }
        }
        // Contenedor icono guardar alojamiento
        &:last-of-type {
          @include flex-column-center;
        }
      }
    }

    // Estilos body
    & > .accomodation-thumbnail-detail-container__body {
      @include flex-column-start;
    }

    // Estilos footer
    & > .accomodation-thumbnail-detail-container__footer {
      @include flex-row-space-between;

      // Estilos contenedor de valoración media
      & > .accomodation-star-average-container {
        @include flex-row-center;
        gap: 5px;
      }

      // Estilos precio por noche
      & > .accomodation-price-per-night {
        @include flex-row-center;
        color: #1a1a1a;

        // Precio
        & > span:first-of-type {
          font-size: 1.3em;
          font-weight: 700;
        }
      }
    }
  }

  .bt-delete-accomodation {
    align-self: flex-end;
  }
}

// Estilos si se selecciona un marker de un mapa
.highlightActive {
  background-color: $color-tertiary-light;
  border-radius: $global-border-radius;
  padding: 10px;
}

// ---------------------------------------------------------------
// Responsive design
// ---------------------------------------------------------------

  @media (max-width: $breakpoint-sm) {
    .accomodation-thumbnail-base{
      @include flex-column;
    }
  }


</style>