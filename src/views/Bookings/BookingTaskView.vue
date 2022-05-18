<script setup>
import { onBeforeMount, onMounted, ref } from "vue";

// Service
import {
  listAccomodationBookingDates,
  addNewBooking,
} from "@/services/booking/BookingService";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useBookingStore } from "@/store/booking";
import { useAppContextStore } from "@/store/appContext";
import { useAuthStore } from "@/store/auth";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import { DatePicker } from "v-calendar";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseMessage from "@/components/Forms/Messages/BaseMessageItem.vue";

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
const authStore = useAuthStore();

// Lista de las fechas reservadas o pendientes de reserva del alojamiento.
const notAvailableBookingDates = ref([]);

// Método de pago a mostrar: 1 para tarjeta de crédito y 2 para PayPal
const paymentMethodToShow = ref(1);

// Mensajes de error al realizar la reserva.
let bookingErrors = ref([]);
let showBookingErrors = ref(false);

// Rango de fechas seleccionado
let range = ref({
  start: null,
  end: null,
});
/**
 * Borra las fechas seleccionadas.
 */
const clearSelectedDates = () => {
  range.value = null;
};

/**
 * Número de noches seleccionadas.
 */
const getBookingNights = () => {
  let nights = 0;
  if (range.value) {
    nights = getDateDiffOnDays(
      new Date(range.value.start),
      new Date(range.value.end)
    );
  }

  return nights;
};

/**
 * Manejador de la selección de fechas y cálculo dinámico de precios.
 */
const handleSelectedDates = () => {
  let pricePerNight = accomodationStore.pricePerNight;
  let amount = pricePerNight * getBookingNights();
  let bookingFee = amount * 0.1;
  let totalCost = amount + bookingFee;

  bookingStore.amount = amount.toFixed(2);
  bookingStore.serviceFee = bookingFee.toFixed(2);
  bookingStore.totalPrice = totalCost.toFixed(2);
  bookingStore.checkIn = range.value.start;
  bookingStore.checkOut = range.value.end;
};

/**
 * Manejador número huéspedes seleccionados.
 */
const handleGuestsInput = (value) => {
  bookingStore.numOfGuests = value;
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
  if (checkBookingData()) {
    await addNewBooking(
      bookingStore.$state,
      paymentMethodToShow.value,
      (err) => {
        bookingErrors.value.push(err.data.message);
        showBookingErrors.value = true;
      }
    );
  } else {
    if (showBookingErrors.value) {
      setTimeout(() => {
        showBookingErrors.value = false;
      }, 6000);
    }
  }
};

/**
 * Validación previa a la reserva.
 */
const checkBookingData = () => {
  let isValid = true;
  bookingErrors.value = [];

  // Validar fechas seleccionadas
  if (!range.value?.start) {
    bookingErrors.value.push("Selecciona una fecha de entrada");
    isValid = false;
  }

  if (!range.value?.end) {
    bookingErrors.value.push("Selecciona una fecha de salida");
    isValid = false;
  }

  // Validar número de huéspedes
  if (!bookingStore.numOfGuests) {
    bookingErrors.value.push("Selecciona el número de huéspedes");
    isValid = false;
  }
  // Validar método de pago
  if (paymentMethodToShow.value === 1) {
    if (!bookingStore.idPayment.cardNumber) {
      bookingErrors.value.push("Introduce el número de la tarjeta de crédito");
      isValid = false;
    }
  } else if (paymentMethodToShow.value === 2) {
    if (!bookingStore.idPayment.accountEmail) {
      bookingErrors.value.push(
        "Introduce el correo electrónico de tu cuenta PayPal"
      );
      isValid = false;
    }
  }

  if (bookingStore.numOfGuests > accomodationStore.numOfGuests) {
    bookingErrors.value.push(
      `El número de huéspedes máximo es de ${accomodationStore.numOfGuests}`
    );
    isValid = false;
  }

  showBookingErrors.value = bookingErrors.value.length > 0;

  return isValid;
};

/**
 * Deshabilita las fechas reservedas en el calendario.
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

onBeforeMount(async () => {
  // Usuario en sesión
  await authStore.loadCurrentUserData();
});

onMounted(async () => {
  let params = new URLSearchParams(window.location.search);
  await accomodationStore.getAccomodationByRegisterNumber(params.get("regnum"));
  await disableReservedDates(params.get("regnum"));

  bookingStore.userHost = authStore?.userData;

  const currentAccomodation =
    await accomodationStore.getAccomodationByRegisterNumber(
      params.get("regnum")
    );

  bookingStore.accomodation = currentAccomodation;
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
                {{ accomodationStore.pricePerNight }} €
                {{
                  getBookingNights() > 0 && range
                    ? getBookingNights() > 1
                      ? " x " + getBookingNights() + " días"
                      : " x " + getBookingNights() + " día"
                    : ""
                }}
              </p>
              <p>
                {{
                  bookingStore.amount > 0 && range !== null
                    ? bookingStore.amount
                    : "-"
                }}
                <span v-once>€</span>
              </p>
            </li>
            <!-- Comisión aplicada -->
            <li>
              <p v-once>Comisión servicio</p>
              <p>
                {{
                  bookingStore.serviceFee > 0 && range !== null
                    ? bookingStore.serviceFee
                    : "-"
                }}
                <span>€</span>
              </p>
            </li>
            <!-- Precio total (EUR) -->
            <li>
              <p v-once>Total(EUR)</p>
              <p>
                {{
                  bookingStore.totalPrice > 0 && range !== null
                    ? bookingStore.totalPrice
                    : "-"
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
        <BaseButton
          text="Limpiar fechas"
          buttonStyle="baseButton-dark--outlined"
          @click="clearSelectedDates"
          id="bt-clear-selected-booking-dates"
        />

        <!-- Desglose precios -->
        <div class="booking-data-summary">
          <div class="booking-data-summary__dates">
            <LabelFormInput
              inputLabel="Check-In"
              inputType="text"
              :inputValue="range?.start ? formatDateType1(range.start) : ''"
              :isReadonly="true"
              id="input-booking-check-in"
            />
            <LabelFormInput
              inputLabel="Check-Out"
              inputType="text"
              :isReadonly="true"
              :inputValue="range?.end ? formatDateType1(range.end) : ''"
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
            <p class="payment-booking-info">
              Los datos no serán tratados hasta el día de checkIn de la reserva.
              En caso de cancelarse, los datos de pago (Número de tarjeta o
              correo electrónico de PayPal) se borrarán del sistema.
            </p>
            <div class="booking-payment-method-container__radios">
              <div>
                <input
                  type="radio"
                  name="paymethod-type"
                  @change="showPaymentMethodInput(1)"
                  checked
                  :isPasteAvailable="true"
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
                inputType="number"
                :inputMaxCharacters="16"
                :inputMinCharacters="16"
                :inputValue="bookingStore.idPayment.cardNumber"
                @handleInput="
                  (value) => (bookingStore.idPayment.cardNumber = value)
                "
              />
              <LabelFormInput
                v-if="paymentMethodToShow === 2"
                inputLabel="Correo Cuenta PayPal"
                inputType="email"
                :inputMaxCharacters="70"
                :inputValue="bookingStore.idPayment.accountEmail"
                @handleInput="
                  (value) => (bookingStore.idPayment.accountEmail = value)
                "
              />
            </div>
          </div>
        </div>
        <!-- Mensajes de error -->
        <Transition name="fade">
          <div v-if="showBookingErrors">
            <BaseMessage
              msgType="error"
              v-for="(msgContent, index) in bookingErrors"
              :key="index"
              :msg="msgContent"
            />
          </div>
        </Transition>
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

      & > #bt-clear-selected-booking-dates {
        align-self: flex-end;
      }

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

          & > .payment-booking-info {
            max-width: 100%;
            background-color: $color-warning-light;
            color: $color-dark;
            font-size: 1rem;
            padding: 20px;
            margin: 0;
            border: 1px solid $color-warning;
            border-radius: $global-border-radius;
          }

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
      flex-wrap: wrap;
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