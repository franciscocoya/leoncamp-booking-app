<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Iconos
import { ICON_EDIT, ICON_DELETE } from "@/helpers/iconConstants";

// i18n
import { translateCategory } from "@/helpers/i18nTranslations";

// Componentes
import BaseCarousel from "@/components/Carousel/BaseCarousel.vue";
import BaseBadge from "@/components/Accomodation/Badge/BaseBadge.vue";
import SavedAccomodationIcon from "@/components/icons/Accomodation/SavedAccomodationIcon.vue";

import IconButton from "@/components/Buttons/IconButton.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useAppContextStore } from "@/store/appContext";
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";

const accomodationStore = useAccomodationStore();
const appContextStore = useAppContextStore();
const userStore = useUserStore();
const authStore = useAuthStore();

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
  isCurrentUserOwner: {
    type: Boolean,
    default: false,
  },
  savedAccId: Number,
  isMarkerMapSelectionEnable: {
    type: Boolean,
    default: false,
  },
});
const loadingView = ref(true);

let starAverage = ref(0);

const getAccomodationStarAverage = async () => {
  starAverage.value = await accomodationStore.getStarAverage(
    props.accData?.registerNumber
  );
};

const handleDeleteAccomodation = async () => {
  await accomodationStore.deleteAccomodationBySavedAccId(props.savedAccId);
};

const emit = defineEmits(["highlightMarker", "deselectMarker"]);

const handleMouseEnter = () => {
  emit("highlightMarker", props.accData.registerNumber);
};

const handleMouseLeave = () => {
  emit("deselectMarker", props.accData.registerNumber);
};

onBeforeMount(async () => {
  loadingView.value = true;

  // await authStore.loadCurrentUserData();
});

onMounted(async () => {
  accomodationStore.registerNumber = props.accData?.registerNumber;
  await getAccomodationStarAverage();
  loadingView.value = false;
});
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
      :sliderWidth="`${appContextStore.isMobile ? '100%' : '400px'}`"
      :sliderHeight="`${appContextStore.isMobile ? '300px' : '250px'}`"
    />

    <!-- Detalles del alojamiento -->
    <div
      class="accomodation-thumbnail-detail-container"
      :title="$t('accomodation_thumbnail.title_click')"
    >
      <div class="accomodation-thumbnail-detail-container__header">
        <div
          @click.prevent="
            !showEditButton &&
              router.push(`/accomodation/${accData.registerNumber}`)
          "
        >
          <!-- Categoría del alojamiento -->
          <BaseBadge
            :text="
              $t(
                `accomodation_categories[${
                  accData?.idAccomodationCategory?.id - 1
                }]`
              )
            "
            backgroundColor="#F0F0F0"
          />
          <!-- Nombre del alojamiento -->
          <h2>
            {{
              $t(
                `accomodation_categories[${
                  accData.idAccomodationCategory.id - 1
                }]`
              )
            }}
            {{ $t("linkers.in") }}
            {{ accData.idAccomodationLocation.direction }}
          </h2>
        </div>
        <div>
          <!-- Icono guardar alojamiento -->
          <SavedAccomodationIcon
            v-if="authStore?.userData?.id && authStore?.userData?.id !== accData?.idUserHost?.id"
            :regNumber="accData?.registerNumber"
          />
          <div class="accomodation-icons">
            <!-- Botón de eliminar -->
            <IconButton
              v-if="showDeleteButton && userStore?.id == accData?.idUserHost.id"
              :buttonIcon="ICON_DELETE"
              buttonStyle="iconButton-accomodation-action--delete"
              class="bt-delete-accomodation"
              :title="$t('accomodation_thumbnail.delete_button.title')"
              @click="handleDeleteAccomodation"
            />

            <!-- Botón de editar -->
            <IconButton
              v-if="showEditButton && isCurrentUserOwner"
              :buttonIcon="ICON_EDIT"
              buttonStyle="iconButton-accomodation-action"
              class="bt-edit-accomodation"
              :title="$t('accomodation_thumbnail.edit_button.title')"
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
        <p>{{ accData.idAccomodationLocation.city }} - {{ accData.idAccomodationLocation.zip }}</p>
        <div class="accomodation-thumbnail-detail-container__services"></div>
      </div>
      <div class="accomodation-thumbnail-detail-container__footer">
        <div class="accomodation-star-average-container">
          <!-- Icono de estrella -->
          <svg
            v-if="starAverage > 0"
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
          <span>{{ starAverage }}</span>
        </div>
        <div class="accomodation-price-per-night">
          <span
            >{{ accData.pricePerNight }}
            {{ $t("currency.symbol") }}
          </span>
          <span>&nbsp; / {{ $t("accomodation_thumbnail.night") }}</span>
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
  .accomodation-thumbnail-base {
    @include flex-column;
  }
}
</style>