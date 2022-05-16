<script setup>
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

// Componentes
import AccomodationImagesGallery from "@/components/Accomodation/AccomodationImagesGallery.vue";
import AccomodationServicesItem from "@/components/Accomodation/AccomodationServicesItem.vue";
import AccomodationReviewsItem from "@/components/Accomodation/AccomodationReview/AccomodationReviewsItem.vue";
import ThumbnailMap from "@/components/Maps/ThumbnailMap.vue";
import AccountIcon from "@/components/icons/Account/AccountIcon.vue";

// Utils
import {
  cropTextByWordCount,
  formatArrayAsSimpleStringDate,
} from "@/helpers/utils";

// Iconos
import { ICON_MAP_MARKER, ICON_VERIFIED_USER } from "@/helpers/iconConstants";

// Modales
import AccomodationServicesModal from "@/components/Modals/AccomodationServicesModal.vue";
import AccomodationReviewsModal from "@/components/Modals/AccomodationReviewsModal.vue";

// Preloader
import BasePreloader from "@/components/Preloader/BasePreloader.vue";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseBadge from "@/components/Accomodation/Badge/BaseBadge.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useAppContextStore } from "@/store/appContext";

const accomodationStore = useAccomodationStore();
const appContextStore = useAppContextStore();

const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");
const currentUserData = JSON.parse(sessionStorage.getItem("data") || "{}");

const router = useRouter();

const isLoading = ref(true);
const showAllDescription = ref(false);

// Variables condicionales para mostrar dialogos modales.
const showServiceModal = ref(false);
const showReviewsModal = ref(false);

const handleUserProfileButtonClick = () => {
  const { id } = currentUser;
  router.push(
    id === accomodationStore.userHost.id
      ? `/account/${currentUserData.name}-${currentUserData.surname}/profile`
      : `/u/${accomodationStore.userHost.id}`
  );
};

/**
 * Manejador de click de la redirección a la página de perfil del usuario.
 */
const handleRedirectToBooking = () => {
  router.push({
    name: "booking-accomodation",
    query: {
      regnum: accomodationStore.registerNumber,
    },
  });
};

onBeforeMount(() => {
  isLoading.value = true;
});

onMounted(async () => {
  const currentAccRegisterNumber =
    router.currentRoute.value.params.registerNumber;

  await accomodationStore.getAccomodationByRegisterNumber(
    currentAccRegisterNumber
  );

  isLoading.value = false;
});
</script>

<template>
  <Transition v-if="isLoading === false">
    <div class="accomodation-detail-view">
      <!-- Modales -->
      <AccomodationServicesModal
        v-if="showServiceModal == true"
        :services="accomodationStore.accomodationServices"
        @close-modal="showServiceModal = false"
      />
      <AccomodationReviewsModal
        v-if="showReviewsModal == true"
        :reviews="accomodationStore.accomodationReviews"
        @close-modal="showReviewsModal = false"
      />

      <div class="accomodation-detail-view__wrapper">
        <!-- Seccion título y galería de imágenes -->
        <section class="accomodation-detail__header">
          <h1>
            {{ accomodationStore.category.accomodationCategory }} en
            {{ accomodationStore.accomodationLocation.city }}
          </h1>

          <AccomodationImagesGallery
            :images="
              accomodationStore.accomodationImages.map(
                (img) => img.accomodationAccImageId.idAccomodationImage
              )
            "
            :regNumber="accomodationStore.registerNumber"
          />
        </section>

        <!-- Descripción del alojamiento -->
        <section class="accomodation-detail__description">
          <div class="accomodation-detail_description__details">
            <BaseBadge
              :text="accomodationStore.category.accomodationCategory"
              backgroundColor="rgb(221, 221, 221)"
              color="#222222"
              badgeWidth="200px"
              badgePadding="10px"
            />
            <p>
              {{ accomodationStore.numOfBeds }}
              {{ accomodationStore.numOfBeds > 1 ? "camas" : "cama" }} ·

              {{ accomodationStore.numOfBathRooms }}
              {{ accomodationStore.numOfBathRooms > 1 ? "baños" : "baño" }} ·

              {{ accomodationStore.numOfBedRooms }}
              {{
                accomodationStore.numOfBedRooms > 1
                  ? "dormitorios"
                  : "dormitorio"
              }}
              ·
              <b>
                {{ accomodationStore.numOfGuests }}
                {{ accomodationStore.numOfGuests > 1 ? "viajeros" : "viajero" }}
              </b>
            </p>
            <p class="accomodation-description-text">
              <Transition name="slide-fade">
                <span>
                  {{
                    accomodationStore.description.length > 50 &&
                    showAllDescription == false
                      ? cropTextByWordCount(accomodationStore.description, 50)
                      : accomodationStore.description
                  }}
                </span>
              </Transition>
              <span
                v-if="
                  accomodationStore.description.length > 50 &&
                  showAllDescription == false
                "
                class="link-show-more"
                title="Mostrar toda la descripción"
                @click.prevent="showAllDescription = true"
                >Mostrar más</span
              >
            </p>
          </div>

          <!-- Botón reservar alojamiento -->
          <div class="accomodation-detail_description__booking-price-container">
            <span>{{ accomodationStore.pricePerNight }} € / noche</span>
            <BaseButton
              v-if="accomodationStore.userHost.id !== currentUser.id"
              text="Reservar"
              buttonStyle="baseButton-primary-gradient--filled"
              @click="handleRedirectToBooking"
            />
          </div>
        </section>

        <!-- Seccion servicios -->
        <section class="accomodation-detail__services">
          <h2 v-once>Servicios que ofrece</h2>
          <AccomodationServicesItem
            :services="accomodationStore.accomodationServices"
            @show-modal="showServiceModal = true"
          />
        </section>

        <!-- Sección mapa ubicación alojamiento -->
        <section class="accomodation-detail__location">
          <h2>Dónde se encuentra</h2>
          <div class="accomodation-detail_location__direction">
            <img :src="ICON_MAP_MARKER" alt="" />
            <p>
              {{ accomodationStore.accomodationLocation.direction }} ·
              {{ accomodationStore.accomodationLocation.city }}
            </p>
          </div>
          <ThumbnailMap
            :lat="accomodationStore.accomodationLocation.latitude"
            :lng="accomodationStore.accomodationLocation.longitude"
            :mapWidth="`${appContextStore.isMobile ? '100%' : '800px'}`"
            :mapHeight="`${appContextStore.isMobile ? '300px' : '400px'}`"
          />
        </section>

        <!-- Sección detalles anfitrión -->
        <section class="accomodation-host">
          <h2 v-once>Detalles del anfitrión</h2>
          <div class="accomodation-host-summary">
            <div class="accomodation-host__info">
              <div class="accomodation-host_info__details">
                <AccountIcon
                  v-once
                  :profileImage="accomodationStore.userHost.profileImage"
                  :width="80"
                  :height="80"
                />
                <div class="accomodation-host_details__fullname">
                  <p>
                    {{ accomodationStore.userHost.name }}
                    {{ accomodationStore.userHost.surname }}
                  </p>
                  <span
                    >Usuario desde
                    {{
                      formatArrayAsSimpleStringDate(
                        accomodationStore.userHost.createdAt
                      )
                    }}</span
                  >
                </div>
              </div>
              <div
                v-if="accomodationStore.userHost.verified"
                class="accomodation-host_info__verified"
              >
                <img :src="ICON_VERIFIED_USER" alt="" />
                <p>Identidad verificada</p>
              </div>
            </div>
            <BaseButton
              v-once
              :text="`${
                accomodationStore.userHost.id === currentUser.id
                  ? 'Ir a tu perfil'
                  : 'Ver perfil'
              }`"
              buttonStyle="baseButton-primary--outlined"
              @click="handleUserProfileButtonClick"
            />
          </div>
        </section>

        <!-- Sección normas del alojamiento -->
        <section class="accomodation-detail__rules">
          <h2>Normas del alojamiento</h2>
          <div class="accomodation-detail_rules__details">
            <ul>
              <li
                v-for="(rule, index) in accomodationStore.accomodationRules"
                :key="index"
              >
                {{ rule.accomodationAccRuleId.idAccomodationRule.rule }}
              </li>
            </ul>
          </div>
        </section>

        <!-- Sección valoraciones -->
        <section class="accomodation-detail__reviews">
          <AccomodationReviewsItem
            :registerNumber="accomodationStore.registerNumber"
            @show-reviews-modal="showReviewsModal = true"
          />
        </section>
      </div>
    </div>
  </Transition>
  <!-- Preloader -->
  <BasePreloader v-else />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-detail-view {
  position: relative;

  & > .accomodation-detail-view__wrapper {
    @include flex-column;
    width: 80%;
    margin: 0 auto;
    gap: 40px;

    // Estilos cabecera detalles
    & > .accomodation-detail__header {
      @include flex-column-center;
    }

    // Estilos descripción alojamiento
    & > .accomodation-detail__description {
      display: grid;
      grid-template-columns: 60% auto;
      grid-gap: 40px;

      & > .accomodation-detail_description__details {
        @include flex-column;
        gap: 10px;

        & > p {
          font-size: 1rem;
          word-break: break-word;
          line-height: 1.5rem;
        }

        & > .accomodation-description-text {
          @include flex-column;

          & > .link-show-more {
            font-weight: 600;
            text-decoration: underline;
            margin-top: 10px;
            cursor: pointer;
          }
        }
      }

      & > .accomodation-detail_description__booking-price-container {
        @include flex-column;
        gap: 20px;
        border: 1px solid $color-tertiary-dark;
        border-radius: $global-border-radius;
        padding: 10px;
      }
    }

    // Estilos seccion servicios
    & > .accomodation-detail__services {
      @include flex-column;
      align-items: flex-start;
    }

    // Estilos sección ubicación del alojamiento
    & > .accomodation-detail__location {
      border-radius: $global-border-radius;

      & > .accomodation-detail_location__direction {
        @include flex-row;
        gap: 5px;

        & > img {
          width: 30px;
        }
      }
    } // Fin estilos accomodation-detail__location

    // Estilos sección detalles anfitrión
    & > .accomodation-host {
      @include flex-column;
      align-content: flex-start;

      & > .accomodation-host-summary {
        @include flex-row;
        width: 60%;
        justify-content: space-between;
        gap: 50px;
        padding: 20px;
        margin-top: 20px;
        border-radius: $global-border-radius;
        border: 1px solid $color-tertiary-dark;

        & > .accomodation-host__info {
          @include flex-column;
          align-items: flex-start;
          gap: 20px;

          & > .accomodation-host_info__details {
            @include flex-row;
            align-items: center;
            gap: 20px;

            // Estilos nombre y apellidos del usuario host
            & > .accomodation-host_details__fullname {
              @include flex-column;
              gap: 5px;

              // Estilos nombre y apellido
              & > p {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
              }

              // Estilos fecha registro
              & > span {
                color: gray;
              } // fin estilos span
            } // Fin estilos accomodation-host_details__fullname
          } // Fin estilos accomodation-host_info__details

          & > .accomodation-host_info__verified {
            @include flex-row;
            gap: 5px;

            & > img {
              object-fit: contain;
            }

            & > p {
              font-size: 1rem;
              font-weight: 300;
            }
          }
        } // Fin estilos accomodation-host__info
      }
    } // FIn estilos accomodation-host

    // Estilos sección normas del alojamiento
    & > .accomodation-detail__rules {
      @include flex-column;

      & ul {
        @include flex-column;
        gap: 10px;
        padding: 0;
        list-style: none;
      }
    }
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .accomodation-detail-view {
    & > .accomodation-detail-view__wrapper {
      & > .accomodation-detail__header {
        & > h1 {
          font-size: 1.5rem;
          font-weight: 400;
        }
      }

      & > .accomodation-detail__description {
        @include flex-column;

        & > .accomodation-detail_description__booking-price-container {
          text-align: center;
          padding: 30px 0;
        } // Fin accomodation-detail_description__booking-price-container
      } // Fin estilos accomodation-detail__description

      & > .accomodation-host {
        & > .accomodation-host-summary {
          @include flex-column;
          width: 100%;
        }
      }
    }
  } // Fin estilos accomodation-detail-view__wrapper
}
</style>