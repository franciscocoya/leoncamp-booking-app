<script setup>
import { onBeforeMount, onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";

// Service
import {
  listAccomodationBookingDates,
  addNewBooking,
} from "@/services/booking/BookingService";

import { checkPromocodeIsValid } from "@/services/accomodation/AccomodationService";

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

const router = useRouter();

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

let promoCode = reactive({
  value: "",
  data: {},
  isValid: false,
  showMessage: false,
  errorMessage: "components.forms.messages.promoCode.invalid",
});

/**
 * Borra las fechas seleccionadas.
 */
const clearSelectedDates = () => {
  range.value = null;
  bookingStore.amount = 0;
  bookingStore.serviceFee = 0;
  bookingStore.total = 0;
  bookingStore.disccount = 0;
  promoCode.data = {};
  promoCode.value = "";
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
  if (
    bookingStore.checkInDate !== new Date() &&
    bookingStore.checkOutDate !== new Date()
  ) {
    let pricePerNight = accomodationStore.pricePerNight;
    let amount = pricePerNight * getBookingNights();
    let bookingFee = amount * 0.1;
    let totalCost = amount + bookingFee;

    bookingStore.amount = amount.toFixed(2);
    bookingStore.serviceFee = bookingFee.toFixed(2);
    bookingStore.totalPrice = totalCost.toFixed(2);
    bookingStore.checkInDate = range.value.start;
    bookingStore.checkOutDate = range.value.end;
  } else {
    clearSelectedDates();
  }
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

const translatePaymentError = (originalMessage) => {
  let localeMessage = "";

  const baseErrorPath = "components.forms.messages.payment";
  switch (originalMessage) {
    case "El número de la tarjeta de crédito tiene que tener como mínimo 12 dígitos":
      localeMessage = `${baseErrorPath}.credit_card.min`;
      break;

    case "El número de tarjeta no es válido.":
      localeMessage = `${baseErrorPath}.credit_card.invalid`;
      break;

    case "Introduce el número de la tarjeta de crédito":
      localeMessage = `${baseErrorPath}.credit_card.required`;
      break;

    case "Alguno de los valores introducidos para la cuenta de PayPal no es válido.":
      localeMessage = `${baseErrorPath}.paypal.invalid`;
      break;

    default:
      localeMessage = `${baseErrorPath}.default`;
      break;
  }

  return localeMessage;
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
        console.log(err.data.message);
        bookingErrors.value.push(translatePaymentError(err.data.message));
        showBookingErrors.value = true;

        setTimeout(() => {
          showBookingErrors.value = false;
        }, 4000);
      }
    ).catch((err) => {
      if (!err.response) {
        router.push({
          name: "user-bookings",
          params: {
            username: `${authStore?.userData?.name}-${authStore?.userData?.surname}`,
          },
        });
      }
    });
  } else {
    if (showBookingErrors.value) {
      setTimeout(() => {
        showBookingErrors.value = false;
      }, 4000);
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
    bookingErrors.value.push(
      "components.forms.messages.dates.checkIn.required"
    );
    isValid = false;
  }

  if (!range.value?.end) {
    bookingErrors.value.push(
      "components.forms.messages.dates.checkOut.required"
    );
    isValid = false;
  }

  // Validar número de huéspedes
  if (!bookingStore.numOfGuests) {
    bookingErrors.value.push("components.forms.messages.guests.required");
    isValid = false;
  }
  // Validar método de pago
  if (paymentMethodToShow.value === 1) {
    if (!bookingStore.idPayment.cardNumber) {
      bookingErrors.value.push(
        "components.forms.messages.payment.credit_card.required"
      );
      isValid = false;
    }
  } else if (paymentMethodToShow.value === 2) {
    if (!bookingStore.idPayment.accountEmail) {
      bookingErrors.value.push(
        "components.forms.messages.payment.paypal.required"
      );
      isValid = false;
    }
  }

  if (bookingStore.numOfGuests > accomodationStore.numOfGuests) {
    bookingErrors.value.push("components.forms.messages.guests.max");
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

/**
 * Manejador de click del boton que comprueba si existe el código promocional, si es así, se aplica el descuento.
 */
const checkPromoCode = async () => {
  const promoCodeRes = await checkPromocodeIsValid(
    bookingStore.accomodation.registerNumber,
    promoCode.value
  );

  if (promoCodeRes) {
    promoCode.data = promoCodeRes;

    bookingStore.disccount = (
      bookingStore.amount *
      (promoCodeRes.amountPercentange / 100)
    ).toFixed(2);

    bookingStore.totalPrice -= bookingStore.disccount;
  } else {
    promoCode.showMessage = true;
    setTimeout(() => {
      promoCode.showMessage = false;
    }, 2000);
  }
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
      {{
        $tc("booking_task_view.title", {
          name: accomodationStore.registerNumber,
        })
      }}
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
          <h3 v-once v-t="'booking_task_view.pricing_details'"></h3>
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
                <span>{{ $t("currency.symbol") }}</span>
              </p>
            </li>
            <!-- Comisión aplicada -->
            <li>
              <p v-once v-t="'booking_task_view.service_fee'"></p>
              <p>
                {{
                  bookingStore.serviceFee > 0 && range !== null
                    ? bookingStore.serviceFee
                    : "-"
                }}
                <span>{{ $t("currency.symbol") }}</span>
              </p>
            </li>
            <!-- Descuento -->
            <li>
              <p>
                {{
                  $tc("booking_task_view.disccount", {
                    disc:
                      promoCode?.data?.amountPercentange > 0
                        ? promoCode?.data?.amountPercentange
                        : "",
                  })
                }}

                <span v-if="promoCode?.data?.amountPercentange > 0"
                  >({{ promoCode?.data?.amountPercentange }})</span
                >
              </p>
              <p>
                {{
                  bookingStore.disccount > 0 && range !== null
                    ? bookingStore.disccount
                    : "-"
                }}
                <span>{{ $t("currency.symbol") }}</span>
              </p>
            </li>
            <!-- Precio total (EUR) -->
            <li>
              <p v-once v-t="'booking_task_view.total'"></p>
              <p>
                {{
                  bookingStore.totalPrice > 0 && range !== null
                    ? bookingStore.totalPrice
                    : "-"
                }}
                <span>{{ $t("currency.symbol") }}</span>
              </p>
            </li>
          </ul>
        </div>
        <Transition name="fade">
          <div
            v-if="bookingStore?.amount > 0 && bookingStore?.disccount == 0"
            class="promo_code_checker_container"
          >
            <LabelFormInput
              :inputLabel="$t('components.forms.promo_code')"
              inputType="text"
              :inputValue="promoCode.value"
              id="input-booking-check-in"
              @handleInput="(value) => (promoCode.value = value)"
            />
            <BaseButton
              text="Aplicar"
              buttonStyle="baseButton-dark--filled"
              :fullWidth="appContextStore.isMobile == true"
              @click="checkPromoCode"
            />
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="promoCode.showMessage == true">
            <BaseMessage msgType="error" :msg="$t(promoCode.errorMessage)" />
          </div>
        </Transition>
      </div>

      <!-- Columna derecha -->
      <div class="accomodation_details">
        <ul class="accomodation_details__simplified_data">
          <li>
            {{
              $t(
                `accomodation_categories[${
                  accomodationStore?.category?.id - 1
                }]`
              )
            }}
            {{ $t("linkers.in") }}
            {{ accomodationStore.accomodationLocation.city }}
          </li>
          <li>
            {{ accomodationStore.accomodationLocation.direction }}
          </li>
          <li>
            {{
              $tc("booking_task_view.guest_max", {
                guest: accomodationStore.numOfGuests,
              })
            }}
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
          :text="$t('booking_task_view.button_clear_dates')"
          buttonStyle="baseButton-dark--outlined"
          @click="clearSelectedDates"
          id="bt-clear-selected-booking-dates"
        />

        <!-- Desglose precios -->
        <div class="booking-data-summary">
          <div class="booking-data-summary__dates">
            <LabelFormInput
              :inputLabel="$t('components.forms.checkIn')"
              inputType="text"
              :inputValue="range?.start ? formatDateType1(range.start) : ''"
              :isReadonly="true"
              id="input-booking-check-in"
            />
            <LabelFormInput
              :inputLabel="$t('components.forms.checkOut')"
              inputType="text"
              :isReadonly="true"
              :inputValue="range?.end ? formatDateType1(range.end) : ''"
              id="input-booking-check-out"
            />
          </div>
          <LabelFormInput
            :inputLabel="$tc('components.forms.guests', 2)"
            inputType="number"
            :inputNumberMax="accomodationStore.numOfGuests"
            :inputValue="bookingStore.numOfGuests"
            @handleInput="(value) => handleGuestsInput(Number(value))"
          />
          <!-- Contenedor métodos de pago disponibles -->
          <div class="booking-payment-method-container">
            <p v-once v-t="'booking_task_view.payment_method'"></p>
            <p
              class="payment-booking-info"
              v-t="'booking_task_view.payment_info'"
            ></p>
            <div class="booking-payment-method-container__radios">
              <div>
                <input
                  type="radio"
                  name="paymethod-type"
                  @change="showPaymentMethodInput(1)"
                  checked
                  :isPasteAvailable="true"
                />
                <label v-t="'components.forms.cardNumber'"></label>
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
                <label v-t="'components.forms.paypalAccount'">PayPal</label>
                <img :src="ICON_PAYMENT_PAYPAL" alt="Pagar con Paypal" />
              </div>
            </div>
            <div>
              <LabelFormInput
                v-if="paymentMethodToShow === 1"
                :inputLabel="$t('components.forms.cardNumber')"
                inputType="text"
                :inputMaxCharacters="16"
                :inputValue="bookingStore?.idPayment?.cardNumber"
                @handleInput="
                  (value) => (bookingStore.idPayment.cardNumber = Number(value))
                "
              />
              <LabelFormInput
                v-if="paymentMethodToShow === 2"
                :inputLabel="$t('components.forms.paypalAccount')"
                inputType="email"
                :inputMaxCharacters="70"
                :inputValue="bookingStore?.idPayment?.accountEmail"
                @handleInput="
                  (value) => (bookingStore.idPayment.accountEmail = value)
                "
              />
            </div>
          </div>
        </div>
        <Transition name="fade">
          <div v-if="showBookingErrors == true">
            <BaseMessage
              msgType="error"
              v-for="(msgContent, index) in bookingErrors"
              :key="index"
              :msg="
                $tc(msgContent, {
                  numOfGuests: accomodationStore.numOfGuests,
                  cardDigits: 12,
                })
              "
            />
          </div>
        </Transition>
        <BaseButton
          :text="$t('booking_task_view.button_confirm_booking')"
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

      & > .promo_code_checker_container {
        @include flex-row;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 10px;

        & > div {
          &:first-child {
            flex: 60%;
          }
          &:last-child {
            flex: 30%;
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

        & > .promo_code_checker_container {
          @include flex-column;
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