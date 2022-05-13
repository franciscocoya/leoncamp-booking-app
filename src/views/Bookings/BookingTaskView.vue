<script setup>
import { onMounted, ref } from "vue";

// Service
import {
  listAccomodationBookingDates,
  addNewBooking,
} from "@/services/booking/BookingService";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useBookingStore } from "@/store/booking";
import { useAppContextStore } from "@/store/appContext";
import { useUserStore } from "@/store/user";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import { DatePicker } from "v-calendar";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Iconos
import {
  ICON_PAYMENT_CREDIT_CARD,
  ICON_PAYMENT_PAYPAL,
} from "@/helpers/iconConstants";

// Utils
import { getDateDiffOnDays, formatDateType1 } from "@/helpers/utils";

const accomodationStore = useAccomodationStore();
const bookingStore = useBookingStore();
const appContextStore = useAppContextStore();
const userStore = useUserStore();

const notAvailableBookingDates = ref([]);

const paymentMethodToShow = ref(1);

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

/**
 * Muestra el input correspondiente al método de pago seleccionado.
 */
const showPaymentMethodInput = (methodNum) => {
  paymentMethodToShow.value = methodNum;
};

/**
 * Manejador del evento click de botón confirmar reserva.
 */
const handleConfirmBooking = async () => {
  await addNewBooking(bookingStore.$state, paymentMethodToShow.value);
};

/**
 * Deshabilidta las fechas reservedas en el calendario.
 */
const disableReservedDates = async (regNumber) => {
  const datesToDisable = await listAccomodationBookingDates(regNumber);

  // Deshabilitar las fechas reservadas en el calendario.
  datesToDisable.map((dateRange) => {
    notAvailableBookingDates.value.push({
      start: new Date(dateRange[0][0], dateRange[0][1] - 1, dateRange[0][2]),
      end: new Date(dateRange[1][0], dateRange[1][1] - 1, dateRange[1][2]),
    });
  });
};

onMounted(async () => {
  let params = new URLSearchParams(window.location.search);
  await accomodationStore.getAccomodationByRegisterNumber(params.get("regnum"));
  await disableReservedDates(params.get("regnum"));

  // Usuario en sesión
  const userId = JSON.parse(sessionStorage.getItem("user") || "{}")?.id;
  const userData = await userStore.getUserDataById(userId);
  bookingStore.userHost = userData;
});
</script>

<template>
  <div class="booking-task-view">
    <h2>
      Reserva para el alojamiento
      <span>{{ accomodationStore.registerNumber }}</span>
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
          <ul>
            <!-- Precio noche x días -->
            <li>
              <p>
                {{ accomodationStore.pricePerNight }} € x
                {{ getBookingNights() }} noches
              </p>
              <p>
                {{ bookingStore.amount > 0 ? bookingStore.amount : "-" }}
                <span v-once>€</span>
              </p>
            </li>
            <!-- Comisión aplicada -->
            <li>
              <p v-once>Comisión servicio</p>
              <p>
                {{
                  bookingStore.serviceFee > 0 ? bookingStore.serviceFee : "-"
                }}
                <span>€</span>
              </p>
            </li>
            <!-- Precio total (EUR) -->
            <li>
              <p v-once>Total(EUR)</p>
              <p>
                {{
                  bookingStore.totalPrice > 0 ? bookingStore.totalPrice : "-"
                }}
                <span v-once>€</span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="accomodation_details">
        <ul class="accomodation_details__simplified_data">
          <li>
            {{ accomodationStore.category.accomodationCategory }} en
            {{ accomodationStore.accomodationLocation.city }}
          </li>
          <li>
            {{ accomodationStore.accomodationLocation.direction }}
          </li>
          <li>
            Hasta un máximo de {{ accomodationStore.numOfGuests }} huéspedes.
          </li>
        </ul>

        <!-- Calendario seleccion fechas reserva -->
        <DatePicker
          ref="datePicker"
          mode="range"
          v-model="range"
          :from-page="new Date()"
          is-range
          :columns="$screens({ default: 1, lg: 2, sm: 1 })"
          color="orange"
          :min-date="new Date()"
          transition="slide-h"
          :disabled-dates="notAvailableBookingDates"
          :is-expanded="appContextStore.isMobile"
          @dayclick="handleSelectedDates"
          id="data-picker-booking-dates"
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
            :inputValue="bookingStore.numOfGuests"
            @handleInput="(value) => handleGuestsInput(value)"
          />
          <!-- Contenedor métodos de pago disponibles -->
          <div class="booking-payment-method-container">
            <p>Método de pago:</p>
            <div class="booking-payment-method-container__radios">
              <div>
                <input
                  type="radio"
                  name="paymethod-type"
                  @change="showPaymentMethodInput(1)"
                  checked
                />
                <label>Tarjeta de crétito/débito</label>
                <img
                  :src="ICON_PAYMENT_CREDIT_CARD"
                  alt="Pagar con tarjeta de crédito"
                />
              </div>
              <div>
                <input
                  type="radio"
                  name="paymethod-type"
                  @change="showPaymentMethodInput(2)"
                />
                <label>PayPal</label>
                <img :src="ICON_PAYMENT_PAYPAL" alt="Pagar con Paypal" />
              </div>
            </div>
            <div>
              <LabelFormInput
                v-if="paymentMethodToShow === 1"
                inputLabel="Número de tarjeta"
                :inputMaxCharacters="16"
                :inputMinCharacters="16"
                :inputValue="bookingStore.idPayment.cardNumber"
                @handleInput="(value) => bookingStore.idPayment.cardNumber = value"
              />
              <LabelFormInput
                v-if="paymentMethodToShow === 2"
                inputLabel="Correo Cuenta PayPal"
                inputType="email"
                :inputMaxCharacters="70"
                :inputValue="bookingStore.idPayment.accountEmail"
                @handleInput="(value) => bookingStore.idPayment.accountEmail = value"
              />
            </div>
          </div>
        </div>
        <BaseButton
          text="Confirmar reservar"
          buttonStyle="baseButton-secondary--filled"
          @click="handleConfirmBooking"
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

  & > h2 {
    color: $color-primary;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
    line-height: 2.5rem;

    & > span {
      background-color: $color-secondary;
      color: #fff;
      padding: 5px;
      border-radius: $global-border-radius;
    }
  }

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
      & > div > ul {
        @include flex-column;
        gap: 10px;
        list-style: none;
        padding-left: 0;

        & > li {
          @include flex-row;
          justify-content: space-between;

          // Separador desglose - precio total
          &:last-child {
            border-top: 1px solid $color-tertiary-light;
          }
        }
      }
    } // Fin estilos accomodation_image_thumbnail

    & > .accomodation_details {
      @include flex-column;
      gap: 20px;

      & > .accomodation_details__simplified_data {
        @include flex-column;
        gap: 20px;
        list-style: none;
      }

      & > .booking-data-summary {
        @include flex-column;
        gap: 20px;

        & > .booking-data-summary__dates {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;
        }

        & > .booking-payment-method-container {
          @include flex-column;
          gap: 20px;

          & > .booking-payment-method-container__radios {
            @include flex-column;
            gap: 20px;

            & > div {
              @include flex-row;
              align-items: center;
              gap: 10px;

              & > img {
                width: 30px;
                height: auto;
              }
            }
          }
        }
      } // Fin estilos booking-data-summary
    } // Fin estilos accomodation_details
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .booking-task-view {
    & > .booking-task-view__wrapper {
      margin: 30px;
      & > .accomodation_image_thumbnail {
        & > img {
          width: 100%;
        }
      } // Fin accomodation_image_thumbnail

      & > .accomodation_details {
        width: 100%;
        & > .data-picker-booking-dates {
          align-self: center;
        }
      }
    } // Fin estilos booking-task-view__wrapper
  }
}
</style>