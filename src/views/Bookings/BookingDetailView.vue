<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

doc.text("Hello world!", 10, 10);

// Componentes
import SingleAccomodationMap from "@/components/Maps/SingleAccomodationMap.vue";
import BaseCarousel from "@/components/Carousel/BaseCarousel.vue";
import UserAccountSummaryDataItem from "@/components/Account/UserAccountSummaryDataItem.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import IconButton from "@/components/Buttons/IconButton.vue";

// Icons
import { ICON_DOWNLOAD } from "@/helpers/iconConstants";

import { formatArrayAsDate } from "@/helpers/utils";

// Store
import { useBookingStore } from "@/store/booking";
const bookingStore = useBookingStore();

const bookingData = ref({});

const router = useRouter();

const handleGenerateReceipt = () => {
  console.log("hola");
  doc.output("dataurlnewwindow");
};

onMounted(async () => {
  const bookingId = router.currentRoute.value.params.bookingId;
  bookingData.value = await bookingStore.getBookingDataById(bookingId);
});
</script>

<template>
  <div class="booking-detail-view">
    <div class="booking-detail__data">
      <h1>Reserva</h1>
      <div class="booking_detail_data__wrapper">
        <!-- Imágenes del alojamiento -->
        <BaseCarousel
          :images="
            bookingData?.idAccomodation?.accomodationImages.map(
              (img) => img.accomodationAccImageId?.idAccomodationImage.imageUrl
            )
          "
          :sliderWidth="600"
          :sliderHeight="350"
        />
        <!-- Datos usuario host -->
        <h2>Anfitrión</h2>
        <UserAccountSummaryDataItem
          :name="bookingData?.idAccomodation?.idUserHost?.name"
          :surname="bookingData?.idAccomodation?.idUserHost?.surname"
          :profileImage="bookingData?.idAccomodation?.idUserHost?.profileImage"
          :createdAt="bookingData?.idAccomodation?.idUserHost?.createdAt"
        />

        <!-- Fechas reserva -->
        <section class="booking_detail_data__dates">
          <h2>Fechas reserva</h2>
          <LabelFormInput
            :inputValue="formatArrayAsDate(bookingData.checkIn)"
            :isReadonly="true"
            inputLabel="Check-In"
          />
          <LabelFormInput
            :inputValue="formatArrayAsDate(bookingData.checkOut)"
            :isReadonly="true"
            inputLabel="Check-Out"
          />
        </section>

        <div class="booking_detail_data__price_summary">
          <section class="booking_detail_data__price_summary__price">
            <h2>Resumen pago</h2>
            <ul>
              <li>
                <span>Precio / noche</span>
                <span>
                  {{ bookingData?.idAccomodation?.pricePerNight }} €
                </span>
              </li>
              <li>
                <span
                  >Coste ({{ bookingData?.numOfGuests }}
                  {{
                    bookingData?.numOfGuests > 1 ? "huéspedes" : "huésped"
                  }})</span
                >
                <span>{{ bookingData?.amount }} €</span>
              </li>
              <li>
                <span>Comisión servicio</span>
                <span>{{ bookingData?.serviceFee }} €</span>
              </li>
              <li>
                <span>Total</span>
                <span>{{ bookingData?.total }} €</span>
              </li>
            </ul>
            <IconButton
              text="Descargar factura"
              buttonStyle="iconButton-primary--outlined"
              :buttonIcon="ICON_DOWNLOAD"
              buttonWidth="250px"
              @click="handleGenerateReceipt"
            />
          </section>
        </div>

        <!-- Botón ver anuncio alojamiento -->
        <BaseButton text="Ver anuncio" buttonStyle="baseButton-dark--filled" />
      </div>
    </div>
    <div class="booking-detail_map">
      <SingleAccomodationMap
        :lat="
          bookingData &&
          bookingData?.idAccomodation?.idAccomodationLocation.latitude
        "
        :lng="
          bookingData &&
          bookingData?.idAccomodation?.idAccomodationLocation.longitude
        "
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

.booking-detail-view {
  display: grid;
  grid-template-columns: auto 55%;
  height: 100vh;

  & > .booking-detail__data {
    & > .booking_detail_data__wrapper {
      @include flex-column;
      padding: 20px;
      gap: 20px;

      & > .booking_detail_data__dates {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }
  }
}
</style>