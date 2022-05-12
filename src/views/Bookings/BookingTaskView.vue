<script setup>
import { onMounted, ref } from "vue";

// Service
import { listAccomodationBookingDates } from "@/services/booking/BookingService";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useBookingStore } from "@/store/booking";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import { DatePicker } from "v-calendar";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Utils
import { getDateDiffOnDays, formatDateType1 } from "@/helpers/utils";

const accomodationStore = useAccomodationStore();
const bookingStore = useBookingStore();

const notAvailableBookingDates = ref([]);

/**
 * Rango de fechas seleccionado.
 */
const range = ref({
  start: new Date(),
  end: new Date(),
});

const getBookingNights = () => {
  return getDateDiffOnDays(
    new Date(range.value.start),
    new Date(range.value.end)
  );
};

const handleSelectedDates = () => {
  const pricePerNight = accomodationStore.pricePerNight;
  const amount = pricePerNight * getBookingNights();
  const bookingFee = amount * 0.1;
  const totalCost = amount + bookingFee;

  bookingStore.amount = amount.toFixed(2);
  bookingStore.serviceFee = bookingFee.toFixed(2);
  bookingStore.totalPrice = totalCost.toFixed(2);
};

const handleGuestsInput = (value) => {
  bookingStore.numOfGuests = value;
  handleSelectedDates();
};

onMounted(async () => {
  let params = new URLSearchParams(window.location.search);
  console.log(params.get("regnum"));
  await accomodationStore.getAccomodationByRegisterNumber(params.get("regnum"));

  const datesToDisable = await listAccomodationBookingDates(
    params.get("regnum")
  );

  datesToDisable.map((dateRange) => {
    //   let checkIn = dateRange[0];
    //     let checkOut = dateRange[1];
    // console.log(checkIn[0], checkIn[1], checkIn[2]);
    notAvailableBookingDates.value.push({
      start: new Date(dateRange[0][0], dateRange[0][1] - 1, dateRange[0][2]),
      end: new Date(dateRange[1][0], dateRange[1][1] - 1, dateRange[1][2]),
    });
  });
});
</script>

<template>
  <div class="booking-task-view">
    <h2 v-once>
      Reserva para el alojamiento {{ accomodationStore.registerNumber }}
    </h2>
    <div class="booking-task-view__wrapper">
      <!-- Columna izquierda -->
      <div class="accomodation_image_thumbnail">
        <img
          :src="
            accomodationStore.accomodationImages[0]?.accomodationAccImageId
              .idAccomodationImage.imageUrl
          "
          alt=""
        />
        <div>
          <h3 v-once>Detalles del precio</h3>
          <div>
            <div>
              <p>
                {{ accomodationStore.pricePerNight }} € x
                {{ getBookingNights() }} noches
              </p>
              <p>
                {{ bookingStore.amount > 0 ? bookingStore.amount : "-" }}
                <span v-once>€</span>
              </p>
            </div>
            <div>
              <p v-once>Comisión servicio</p>
              <p>
                {{
                  bookingStore.serviceFee > 0 ? bookingStore.serviceFee : "-"
                }}
                <span>€</span>
              </p>
            </div>
            <div>
              <p v-once>Total(EUR)</p>
              <p>
                {{
                  bookingStore.totalPrice > 0 ? bookingStore.totalPrice : "-"
                }}
                <span v-once>€</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="accomodation_details">
        <div>
          <p>
            {{ accomodationStore.category.accomodationCategory }} en
            {{ accomodationStore.accomodationLocation.city }}
          </p>
          <p>
            {{ accomodationStore.accomodationLocation.direction }}
          </p>
          <p>
            Hasta un máximo de {{ accomodationStore.numOfGuests }} huéspedes.
          </p>
        </div>

        <!-- Calendario seleccion fechas reserva -->
        <DatePicker
          ref="datePicker"
          mode="range"
          v-model="range"
          :from-page="new Date()"
          is-range
          :columns="$screens({ default: 1, lg: 2 })"
          color="orange"
          :min-date="new Date()"
          transition="slide-h"
          :disabled-dates="notAvailableBookingDates"
          @dayclick="handleSelectedDates"
        />

        <!-- Desglose precios -->
        <div class="booking-data-summary">
          <div class="booking-data-summary__dates">
            <LabelFormInput
              inputLabel="Check-In"
              inputType="text"
              :inputValue="range.start && formatDateType1(range.start)"
              :isReadonly="true"
              id="input-booking-check-in"
            />
            <LabelFormInput
              inputLabel="Check-Out"
              inputType="text"
              :isReadonly="true"
              :inputValue="range.end && formatDateType1(range.end)"
              id="input-booking-check-out"
            />
          </div>
          <LabelFormInput
            inputLabel="Húespedes"
            inputType="number"
            :inputNumberMax="accomodationStore.numOfGuests"
            @handleInput="(value) => handleGuestsInput(value)"
          />
          <div class="booking-payment-method-container">
            <p>Método de pago:</p>
            <div>
              <input type="radio" name="paymethod-type" />
              <label>Tarjeta de crétito/débito</label>
              <input type="radio" name="paymethod-type" />
              <label>PayPal</label>
            </div>
          </div>
        </div>
        <BaseButton
          text="Confirmar reservar"
          buttonStyle="baseButton-secondary--filled"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

// Estilos vista realización de una reserva
.booking-task-view {
  @include flex-column;

  & > .booking-task-view__wrapper {
    @include flex-row;
    gap: 30px;
    flex-wrap: wrap;
    margin: 50px;

    // Estilos imagen del alojamiento
    & > .accomodation_image_thumbnail {
      & > img {
        width: 400px;
        height: auto;
        object-fit: cover;
        border-radius: $global-border-radius;
      }

      // Estilos contenedor detalles del precio
      & > div > div {
        @include flex-column;
        gap: 10px;

        & > div {
          @include flex-row;
          justify-content: space-between;
        }
      }
    }

    & > .accomodation_details {
      @include flex-column;
      gap: 20px;

      & > .booking-data-summary {
        @include flex-column;
        gap: 20px;

        & > .booking-data-summary__dates {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;
        }
      }
    }
  }
}
</style>