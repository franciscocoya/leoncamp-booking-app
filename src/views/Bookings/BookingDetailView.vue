<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Store
import { useAppContextStore } from "@/store/appContext";
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";
import { useBookingStore } from "@/store/booking";

// Componentes
import SingleAccomodationMap from "@/components/Maps/SingleAccomodationMap.vue";
import ThumbnailMap from "@/components/Maps/ThumbnailMap.vue";
import BaseCarousel from "@/components/Carousel/BaseCarousel.vue";
import UserAccountSummaryDataItem from "@/components/Account/UserAccountSummaryDataItem.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import IconButton from "@/components/Buttons/IconButton.vue";

// Icons
import { ICON_DOWNLOAD } from "@/helpers/iconConstants";

// Generador de la factura en PDF
import { generateReceipt } from "@/helpers/receiptGenerator";

import {
  formatArrayAsDate,
  getDateDiffOnDays,
  convertArrayToDate,
} from "@/helpers/utils";

const bookingStore = useBookingStore();
const appContextStore = useAppContextStore();
const authStore = useAuthStore();
const userStore = useUserStore();

const bookingData = ref({});

const router = useRouter();

// Datos del usuario anfitrión de la reserva
const userHostData = ref({});
const currentUserData = ref({});

/**
 * Manejador de click del botón de decargar factura de la reserva.
 */
const handleGenerateReceipt = () => {
  const numOfNights = getDateDiffOnDays(
    convertArrayToDate(bookingData?.value?.checkIn),
    convertArrayToDate(bookingData?.value?.checkOut)
  );

  generateReceipt(
    bookingData.value,
    userHostData.value,
    currentUserData.value,
    numOfNights
  );
};

/**
 * Manejador de click del botón que redirecciona a la página del alojamiento reservado.
 */
const handleRedirectToAccomodation = () => {
  router.push({
    name: "accomodation-detail",
    params: {
      registerNumber: bookingData?.value?.idAccomodation?.registerNumber,
    },
  });
};

onMounted(async () => {
  const bookingId = router.currentRoute.value.params.bookingId;
  bookingData.value = await bookingStore.getBookingDataById(bookingId);
  userHostData.value = await userStore.getUserDataById(
    bookingData?.value.idAccomodation.idUserHost.id
  );

  currentUserData.value = await userStore.getUserDataById(
    authStore?.userData?.id
  );
});
</script>

<template>
  <div class="booking-detail-view">
    <div class="booking-detail__data">
      <div class="booking-detail_data__header">
        <h1>
          {{ $t("booking_details_view.title") }}
          <span>{{ bookingData?.idAccomodation?.registerNumber }}</span>
        </h1>
        <!-- Botón ver anuncio alojamiento -->
        <BaseButton
          :text="$t('booking_details_view.button_show_ad')"
          buttonStyle="baseButton-primary--filled"
          :fullWidth="appContextStore.isMobile == true"
          @click="handleRedirectToAccomodation"
        />
        <p>{{ $tc("booking_details_view.guests") }}</p>
      </div>
      <div class="booking_detail_data__wrapper">
        <!-- Imágenes del alojamiento -->
        <BaseCarousel
          :images="
            bookingData?.idAccomodation?.accomodationImages.map(
              (img) => img.accomodationAccImageId?.idAccomodationImage.imageUrl
            )
          "
          :sliderWidth="`${appContextStore.isMobile ? '100%' : '500px'}`"
          :sliderHeight="`${appContextStore.isMobile ? '250px' : '350px'}`"
          slideWidth="100%"
        />
        <!-- Datos usuario host -->
        <h2>{{ $t("booking_details_view.host") }}</h2>
        <UserAccountSummaryDataItem
          :name="userHostData?.name"
          :surname="userHostData?.surname"
          :profileImage="userHostData?.profileImage"
          :createdAt="userHostData?.createdAt"
        />

        <!-- Sección fechas reserva -->
        <section class="booking_detail_data__dates">
          <h2>{{ $t("booking_details_view.dates") }}</h2>
          <div class="booking_detail_data__dates_container">
            <LabelFormInput
              :inputValue="formatArrayAsDate(bookingData.checkIn)"
              :isReadonly="true"
              :inputLabel="$t('components.forms.checkIn')"
            />
            <LabelFormInput
              :inputValue="formatArrayAsDate(bookingData.checkOut)"
              :isReadonly="true"
              :inputLabel="$t('components.forms.checkOut')"
            />
          </div>
        </section>

        <!-- Sección resumen de coste y desglose de la reserva -->
        <section class="booking_detail_data__price_summary">
          <div class="booking_detail_data__price_summary__price">
            <h2>{{ $t("booking_details_view.price_summary.title") }}</h2>
            <ul>
              <li>
                <span>{{
                  $t("booking_details_view.price_summary.price_per_night")
                }}</span>
                <span>
                  {{ bookingData?.idAccomodation?.pricePerNight }}
                  {{ $t("currency.symbol") }}
                </span>
              </li>
              <li>
                <span>
                  {{
                    $tc("booking_details_view.price_summary.cost", {
                      name: bookingData?.idAccomodation?.pricePerNight,
                      nights: `
                      ${
                        bookingData?.checkIn &&
                        getDateDiffOnDays(
                          convertArrayToDate(bookingData?.checkIn),
                          convertArrayToDate(bookingData?.checkOut)
                        )
                      }`,
                    })
                  }}
                </span>
                <span
                  >{{ bookingData?.amount }} {{ $t("currency.symbol") }}</span
                >
              </li>
              <li>
                <span>{{
                  $t("booking_details_view.price_summary.service_fee")
                }}</span>
                <span
                  >{{ bookingData?.serviceFee }}
                  {{ $t("currency.symbol") }}</span
                >
              </li>
              <li v-if="bookingData?.disccount > 0">
                <span>{{
                  $t("booking_details_view.price_summary.disccount")
                }}</span>
                <span
                  >{{ bookingData?.disccount }}
                  {{ $t("currency.symbol") }}</span
                >
              </li>
              <li>
                <span>{{
                  $t("booking_details_view.price_summary.total")
                }}</span>
                <span
                  >{{ bookingData?.total }} {{ $t("currency.symbol") }}</span
                >
              </li>
            </ul>
            <IconButton
              :text="$t('components.buttons.download_invoice')"
              buttonStyle="iconButton-primary--outlined"
              :buttonIcon="ICON_DOWNLOAD"
              buttonWidth="250px"
              :fullWidth="appContextStore.isMobile == true"
              @click="handleGenerateReceipt"
            />
          </div>
        </section>

        <section
          v-if="appContextStore.isTablet"
          class="booking_detail_data__mobileMap"
        >
          <h2>{{ $t("booking_details_view.location") }}</h2>
          <p>
            {{ bookingData?.idAccomodation?.idAccomodationLocation.direction }},
            {{ bookingData?.idAccomodation?.idAccomodationLocation.city }} -
            {{ bookingData?.idAccomodation?.idAccomodationLocation.zip }}
          </p>
          <ThumbnailMap
            :lat="
              bookingData?.idAccomodation?.idAccomodationLocation?.latitude
            "
            :lng="
              bookingData?.idAccomodation?.idAccomodationLocation?.longitude
            "
            mapWidth="100%"
            mapHeight="350px"
          />
        </section>
      </div>
    </div>
    <!-- Mapa ubicación alojamiento -->
    <div class="booking-detail_map" v-if="!appContextStore.isTablet">
      <SingleAccomodationMap
        :lat="bookingData?.idAccomodation?.idAccomodationLocation?.latitude"
        :lng="bookingData?.idAccomodation?.idAccomodationLocation?.longitude"
        :mapZoom="18"
      />
      <div class="booking-detail_map__direction">
        <p>
          {{
            bookingData &&
            bookingData?.idAccomodation?.idAccomodationLocation.direction
          }}
        </p>
        <p>
          {{
            bookingData &&
            bookingData?.idAccomodation?.idAccomodationLocation.city
          }}
        </p>
        <p>
          {{
            bookingData &&
            bookingData?.idAccomodation?.idAccomodationLocation.zip
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.booking-detail-view {
  display: grid;
  grid-template-columns: auto 55%;
  // height: 100vh;
  & > .booking-detail__data {
    @include flex-column;
    margin-top: 30px;

    & > .booking-detail_data__header {
      @include flex-row-center;
      flex-wrap: wrap;
      gap: 20px;
      & > h1 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 400;
        & > span {
          font-size: 2rem;
          font-weight: 700;
          color: $color-primary;
          background-color: $color-tertiary-light;
          padding: 5px 10px;
          border-radius: $global-border-radius;
        }
      }
    }
    & > .booking_detail_data__wrapper {
      @include flex-column;
      padding: 20px;
      gap: 20px;

      & > .booking_detail_data__dates {
        @include flex-column;
        gap: 20px;

        & > .booking_detail_data__dates_container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        } // FIn estilos booking_detail_data__dates_container
      } // Fin estilos booking_detail_data__dates

      & > .booking_detail_data__price_summary {
        @include flex-column;
        gap: 20px;

        & > .booking_detail_data__price_summary__price {
          @include flex-column;
          gap: 20px;

          & > ul {
            @include flex-column;
            gap: 30px;
            padding-left: 0;

            & > li {
              @include flex-row;
              justify-content: space-between;
              font-size: 1rem;
              padding: 10px 0;

              &:last-child {
                font-weight: 700;
                font-size: 1.2rem;
                text-transform: uppercase;
                text-decoration: underline;
              }
            }
          }
        }
      }

      & > .booking_detail_data__mobileMap {
        @include flex-column;
        gap: 10px;
        margin-top: 20px;
        border-top: 2px solid $color-tertiary-light;
        padding-top: 30px;

        & > h2 {
          color: $color-primary;
          font-weight: 400;
        }

        & > p {
          font-size: 1rem;
          color: $color-primary;
        }
      }
    } // Fin estilos booking_detail_data__wrapper
  } // Fin estilos booking-detail__data
} // Fin estilos booking-detail-view

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-md) {
  .booking-detail-view {
    @include flex-column;
    margin-bottom: 50px;

    & > .booking-detail__data {
      & > .booking-detail_data__header {
        @include flex-column;
        gap: 10px;
        padding: 0 25px;

        & > h1{
          @include flex-column;
          gap: 5px;
          & > span{
            font-size: 1.2rem;
          }
        }
        & > span {
          margin-top: 10px;
        }

        & > div {
          width: 100%;
        }
      }
    }
  }
}
</style>